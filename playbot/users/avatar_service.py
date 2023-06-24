import random
from typing import Tuple
import face_recognition, rembg
from PIL import Image, ImageDraw, ImageFont, ImagePalette, ImageOps
import numpy
from django.conf import settings
from loguru import logger
from numpy.typing import NDArray
from io import BytesIO
import math
import halftone

from playbot.users.models import User


class UserAvatarProcessing:
    rembg_session = rembg.new_session("u2net")
    print(rembg_session)

    draw_test_data = False

    @classmethod
    def createMaskFromImage(cls, img: Image.Image) -> Image.Image:
        """Возвращает маску изображения"""
        original = img.copy()
        mask = []
        img_data = img.getdata()
        for px in img_data:
            if len(px) < 4:
                mask.append((255, 255, 255))
                continue
            mask.append((255, 255, 255)) if px[3] != 0 else mask.append((0, 0, 0))

        original.putdata(mask)
        original = original.convert("L")
        return original

    @classmethod
    def setAlphaForVisiblePixels(cls, img: Image.Image, alpha: int) -> Image.Image:
        """Задаёт альфу только на непрозрачные пиксели"""
        result = img.copy()
        pixels = img.getdata()
        new_data = []
        for px in pixels:
            if px[3] == 0:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append((px[0], px[1], px[2], alpha))

        result.putdata(new_data)
        return result

    @classmethod
    def applyHalftoneFilter(cls, image: Image.Image, spacing: int = 9, angle: int = 45):
        """Применяет фильтр полутонового растра"""
        halftone_image = image.copy().convert("L")
        halftoned = halftone.halftone(halftone_image, halftone.euclid_dot(spacing=spacing, angle=angle))
        halftoned = halftoned.convert("RGBA")
        original_mask = cls.createMaskFromImage(image)
        halftoned.putalpha(original_mask)
        halftoned = cls.setAlphaForVisiblePixels(halftoned, 40)
        image.alpha_composite(halftoned)
        return image

    @classmethod
    def rescalePhoto(cls, image: Image.Image, width: int) -> Image.Image:
        """Изменяет ширину фото сохраняя соотношение сторон"""
        new_height = int(math.ceil((width / image.width) * image.height))
        resized = image.resize((width, int(new_height)), Image.Resampling.LANCZOS)
        return resized

    @classmethod
    def init(cls):
        cls.rembg_session = rembg.new_session(model_name="u2net")

    @classmethod
    def getFacesData(cls, file: BytesIO | Image.Image) -> list[dict]:
        """
            Возвращает список с данными о лицах
            [faceTop, faceRight, faceBottom, faceLeft, faceWidth, faceHeight, faceCenter]
        """

        if isinstance(file, BytesIO):
            img = Image.open(file)
        else:
            if file.format == "JPG" or file.format == "JPEG":
                img = BytesIO()
                file.save(img, "png")
                file = Image.open(img)
            img = file

        face_unknown = img.convert("RGB")
        face_unknown = numpy.array(face_unknown)
        facesData = face_recognition.face_locations(face_unknown)
        print(facesData)

        result = []
        for faceData in facesData:
            faceTop, faceRight, faceBottom, faceLeft = faceData
            faceWidth = faceRight - faceLeft
            faceHeight = faceBottom - faceTop
            faceCenter = (faceRight - faceWidth / 2, faceBottom - faceHeight / 2)
            result.append({"faceTop": faceTop, "faceRight": faceRight, "faceBottom": faceBottom, "faceLeft": faceLeft,
                           "faceWidth": faceWidth, "faceHeight": faceHeight, "faceCenter": faceCenter})

        return result

    @classmethod
    def prepareAvatarImages(cls, file: BytesIO | Image.Image, faceData: dict | None = None) -> Tuple[
        BytesIO, BytesIO, BytesIO, BytesIO]:
        """
        (origThumbnail, regularCardFile, smallCardFile, faceOnlyFile)
        """

        if faceData is None:
            facesData = cls.getFacesData(file)
            if not len(facesData):
                raise Exception("No faces found")
            faceData = facesData[0]

        if isinstance(file, BytesIO):
            img = Image.open(file)
        else:
            if file.format == "JPG" or file.format == "JPEG":
                img = BytesIO()
                file.save(img, "png")
                file = Image.open(img)
            img = file

        withRemovedBG = rembg.remove(
            img,
            session=cls.rembg_session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=360,
            alpha_matting_background_threshold=30,
        )

        bbox = withRemovedBG.getbbox()
        cropX0, cropY0, cropX1, cropY1 = bbox

        cropX0 = (faceData['faceCenter'][0] - faceData['faceWidth'] * 3)
        if cropY0 < faceData['faceCenter'][1] - (faceData['faceHeight'] * 2):
            cropY0 = faceData['faceCenter'][1] - (faceData['faceHeight'] * 2)
        else:
            cropY0 = cropY0 - faceData['faceHeight'] * 1.5

        cropX1 = (faceData['faceCenter'][0] + faceData['faceWidth'] * 3)
        if cropY1 - faceData['faceTop'] > faceData['faceHeight'] * 5:
            cropY1 = faceData['faceTop'] + faceData['faceHeight'] * 5

        withRemovedBG = withRemovedBG.crop((cropX0, cropY0, cropX1, cropY1))
        cropped = withRemovedBG.crop(
            withRemovedBG.getbbox())  # Убираем лишние участки фото, на которых потенциально могут быть проблемные участки удалённого фона
        regularCardFile = BytesIO()

        croppedThumbnail = cropped.copy()
        croppedThumbnail = cls.rescalePhoto(croppedThumbnail, 800)

        regularCardPic = cropped.copy()
        regularCardPicBBox = regularCardPic.getbbox()
        regularCardPic.crop(regularCardPicBBox)

        facesData = cls.getFacesData(regularCardPic)

        if not len(facesData):
            raise Exception("No faces found after cropping")

        regularCardPicBBox = regularCardPic.getbbox()

        faceData = facesData[0]
        bboxWidth = abs(regularCardPicBBox[0] - regularCardPicBBox[2])

        fromFaceCenterToLeft = faceData['faceCenter'][0] - regularCardPicBBox[0]
        fromFaceCenterToRight = regularCardPicBBox[2] - faceData['faceCenter'][0]
        faceShiftDiff = fromFaceCenterToLeft - fromFaceCenterToRight

        rX0, rY0, rX1, rY1 = regularCardPicBBox

        if faceShiftDiff > 0:
            rX1 += abs(faceShiftDiff)
        else:
            rX0 -= abs(faceShiftDiff)

        regularCardPic = regularCardPic.crop((rX0, rY0, rX1,
                                              rY1))  # Обрезаем фото по корпусу и добавляем пространство для компенсации отклонения лица от центра
        ratio = 0.82
        fixedHeight = regularCardPic.width / ratio
        regularCardPic = regularCardPic.crop((0, 0, regularCardPic.width, fixedHeight))

        # halftoned = cls.applyHalftoneFilter(regularCardPic, spacing=regularCardPic.width/80)
        # halftoned.save(regularCardFile, "png")
        regularCardPic.save(regularCardFile, format='png')

        faceOnlyPic = cropped.copy()
        cropX0 = faceData['faceLeft'] - faceData['faceWidth']
        cropY0 = faceData['faceTop'] - faceData['faceHeight'] / 1.2
        cropX1 = faceData['faceRight'] + faceData['faceWidth']
        cropY1 = faceData['faceBottom'] + faceData['faceHeight'] * 1.5

        faceOnlyPic = faceOnlyPic.crop((cropX0, cropY0, cropX1, cropY1))
        faceOnlyFile = BytesIO()
        faceOnlyPicSmall = faceOnlyPic.copy()
        faceOnlyPicSmall = faceOnlyPicSmall.crop(faceOnlyPicSmall.getbbox())
        faceOnlyPicSmall = cls.rescalePhoto(faceOnlyPicSmall, 600)
        # halftoned = cls.applyHalftoneFilter(faceOnlyPicSmall, spacing=faceOnlyPicSmall.width/80)
        # halftoned.save(faceOnlyFile, "png")
        faceOnlyPicSmall.save(faceOnlyFile, "png")
        smallCardMask = Image.open(str(settings.APPS_DIR.path("static/images")) + '/smallCardMask.png').convert("L")

        smallCardImg = Image.new(mode="RGBA", size=(255, 318))
        faceOnlyPic = faceOnlyPic.crop(faceOnlyPic.getbbox())
        faceOnlyPicFaceData = cls.getFacesData(faceOnlyPic)

        if not len(faceOnlyPicFaceData):
            raise Exception("No faces found after cropping")

        faceOnlyPicFaceData = faceOnlyPicFaceData[0]
        if cls.draw_test_data:
            testDraw = ImageDraw.Draw(faceOnlyPic)
            testDraw.rectangle([(faceOnlyPicFaceData["faceLeft"], faceOnlyPicFaceData['faceTop']),
                                (faceOnlyPicFaceData['faceRight'], faceOnlyPicFaceData['faceBottom'])], outline="blue",
                               width=3)
            testDraw.rectangle([(faceOnlyPicFaceData["faceCenter"][0] - 5, faceOnlyPicFaceData['faceCenter'][1] - 5),
                                (faceOnlyPicFaceData['faceCenter'][0] + 5, faceOnlyPicFaceData['faceCenter'][1] + 5)],
                               outline="red", width=3)
        faceOnlyPicBBox = faceOnlyPic.getbbox()
        foX0 = faceOnlyPicFaceData['faceCenter'][0] - int(faceOnlyPicFaceData['faceWidth'] / 1.15)
        foY0 = faceOnlyPicBBox[1]
        foX1 = faceOnlyPicFaceData['faceCenter'][0] + int(faceOnlyPicFaceData['faceHeight'] / 1.15)
        foY1 = faceOnlyPicFaceData['faceBottom'] + int(faceOnlyPicFaceData['faceHeight'] * 0.4)

        w, h = faceOnlyPic.size

        lastRowWidth = 0
        for x in range(w):
            try:
                px = faceOnlyPic.getpixel((x, foY1 - 4))
            except:
                px = (255, 255, 255, 255)
            if px != (0, 0, 0, 0):
                lastRowWidth += 1
            else:
                if cls.draw_test_data:
                    faceOnlyPic.putpixel((x, foY1 - 4), (255, 0, 0, 255))
        if cls.draw_test_data:
            font = ImageFont.load_default()
            testDraw.text((foX0 + 10, foY0 + 30), f"lr: {lastRowWidth} | face: {faceOnlyPicFaceData['faceWidth']}",
                          font=font, fill='black')

        if lastRowWidth < faceOnlyPicFaceData['faceWidth']:
            if cls.draw_test_data:
                testDraw.text((foX0 + 10, foY1 - 30), "RECROP IT", font=font, fill='black')
        faceOnlyPic = faceOnlyPic.crop((foX0, foY0, foX1, foY1))

        faceOnlyPic = cls.rescalePhoto(faceOnlyPic, smallCardImg.width)
        if cls.draw_test_data:
            font = ImageFont.load_default()
            testDraw = ImageDraw.Draw(faceOnlyPic)
            testDraw.text((60, 10), str(faceOnlyPic.width), font=font, fill='black')
            testDraw.text((60, 30), str(faceOnlyPicFaceData['faceWidth']), font=font, fill='black')

            # faceOnlyPic = cls.applyHalftoneFilter(faceOnlyPic, spacing=faceOnlyPic.width/80)
        smallCardImg.paste(faceOnlyPic, box=(0, smallCardImg.height - (faceOnlyPic.height + 8)))

        smallCardImgData = smallCardImg.getdata()
        smallCardMaskData = smallCardMask.getdata()
        newData = []

        index = 0
        for px in smallCardMaskData:
            if px == 0:
                newData.append((0, 0, 0, 0))
            else:
                newData.append(smallCardImgData[index])
            index += 1

        smallCardImg.putdata(newData)

        smallCard = Image.open(str(settings.APPS_DIR.path("static/images")) + "/smallCard.png")
        smallCard.alpha_composite(smallCardImg)
        smallCardFile = BytesIO()
        smallCard.save(smallCardFile, format='png')

        origThumbnail = Image.open(file)
        origThumbnail.thumbnail(size=(720, 1280), resample=Image.Resampling.LANCZOS)
        origThumbnailFile = BytesIO()
        origThumbnail.save(origThumbnailFile, "png")

        return origThumbnailFile, regularCardFile, smallCardFile, faceOnlyFile


@logger.catch
def check_photo(user: User) -> tuple[list, list]:
    image = Image.open(user.photo.path)
    image = ImageOps.exif_transpose(image)
    errors = []
    photos = []
    logger.info(f"Begin processing!")
    faces_data = UserAvatarProcessing.getFacesData(image)
    logger.info(f"Continue processing!")
    logger.info(f"{faces_data}")
    if len(faces_data):
        face_data = faces_data[0]
        if image.height < face_data["faceHeight"] * 2 or image.width < face_data["faceWidth"] * 2:
            errors.append("Face is too big. Pick another picture.")

        if face_data["faceTop"] < face_data["faceHeight"] / 2:
            errors.append("Photo is cropped. Pick another picture.")

        with open(user.photo.path, "rb") as photo:
            logger.info(f"Open photo!")
            file = BytesIO(photo.read())
            logger.info(f"Open 2 photo!")
            original_photo, big_card_photo, small_card, overlay_photo = UserAvatarProcessing.prepareAvatarImages(file=file,
                                                                                                            faceData=face_data)
            logger.info(f"Open 3 photo!")
            photos.extend([original_photo, big_card_photo, small_card, overlay_photo])
    else:
        errors.append("No faces found. Upload another picture.")

    return errors, photos
