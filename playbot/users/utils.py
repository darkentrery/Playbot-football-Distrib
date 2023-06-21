import hmac
import json
import os
import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.parse import parse_qsl

import cv2
from PIL import Image
from asgiref.sync import async_to_sync
from django.conf import settings
from django.template.loader import render_to_string
from loguru import logger
from sendgrid import Mail, SendGridAPIClient


def send_message(recipient, new_password):
    server = "smtp.yandex.ru"
    user = "mikhail.badazhkov@yandex.kz"
    password = "snbwtingtgforyqw"

    # server = "smtp.gmail.com"
    # user = "badajkovmihail@gmail.com"
    # password = "EntreryOly89139362589"

    # recipient = ["badajkovmihail@gmail.com",]
    sender = "mikhail.badazhkov@yandex.kz"
    subject = "Востановление пароля"
    text = f"Новый пароль для вашего аккаунта в Playbot: {new_password}"
    html = f"<html><head></head><body><p>{text}</p></body></html>"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Playbot <{sender}>"
    msg["To"] = ', '.join(recipient)
    msg["Reply-To"] = sender
    msg["Return-Path"] = sender

    part_text = MIMEText(text, "plain")
    part_html = MIMEText(html, "html")

    msg.attach(part_text)
    msg.attach(part_html)

    with smtplib.SMTP(server, 587) as smtpObj:
        smtpObj.starttls()
        smtpObj.login(user, password)
        smtpObj.sendmail(sender, recipient, msg.as_string())


def generate_password():
    import secrets
    import string
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(10))
    return password


def send_email_refresh(recipient, password):
    subject = f"Востановление пароля"
    template = "refresh-password.html"


    message = Mail(
        from_email=settings.SENDGRID_DEFAULT_FROM_EMAIL,
        to_emails=recipient,
        subject=subject,
        html_content=render_to_string(template, context={"password": password})
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        logger.error(e)


def send_email_confirm_sign_up(recipient, slug):
    subject = f"Подтверждение регистрации"
    template = "confirm-sign-up.html"
    href = f"{settings.CONFIRM_REGISTRATION_DOMAIN}/confirm-sign-up/{slug}/"


    message = Mail(
        from_email=settings.SENDGRID_DEFAULT_FROM_EMAIL,
        to_emails=recipient,
        subject=subject,
        html_content=render_to_string(template, context={"href": href})
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        logger.error(e)


def findGreatesContour(contours):
    largest_area = 0
    largest_contour_index = -1
    i = 0
    total_contours = len(contours)
    while (i < total_contours):
        area = cv2.contourArea(contours[i])
        if (area > largest_area):
            largest_area = area
            largest_contour_index = i
        i += 1

    return largest_area, largest_contour_index


def get_face(image):
    dir_path = Path.cwd()
    path = os.path.dirname(sys.argv[0])
    image_path = Path(dir_path, path, "/playbot", image)
    image_path = f"{path}/playbot{image}"
    image = cv2.imread(image_path)
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # ret, thresh = cv2.threshold(image_gray, 150, 255, cv2.THRESH_BINARY)
    # cv2.imwrite('image_thres1.jpg', thresh)
    # contours, hierarchy = cv2.findContours(image=thresh, mode=cv2.RETR_TREE, method=cv2.CHAIN_APPROX_NONE)
    # cnt = contours[13]
    # M = cv2.moments(cnt)
    # cX = int(M["m10"] / M["m00"])
    # cY = int(M["m01"] / M["m00"])
    # largest_area, largest_contour_index = findGreatesContour(contours)
    # image_copy = image.copy()
    # cv2.drawContours(image=image_copy, contours=contours, contourIdx=-1, color=(0, 255, 0), thickness=2, lineType=cv2.LINE_AA)
    #
    # cv2.imshow('None approximation', image_copy)
    # cv2.waitKey(0)
    # cv2.imwrite(f"{path}/playbot/media/photos/contours.jpg", image_copy)
    # cv2.destroyAllWindows()

    print(cv2.data.haarcascades)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(image_gray)
    if len(faces):
        squares = []
        for x, y, width, height in faces:
            squares.append(width * height)
            # cv2.rectangle(image, (x, y), (x + width, y + height), color=(255, 0, 0), thickness=2)
        square = max(squares)
        index = squares.index(square)
        square = faces[index]
        x = square[0] - int(square[2] * 0.1) if square[0] - int(square[2] * 0.1) >= 0 else 0
        x2 = square[0] + int(square[2] * 1.1) if square[0] + int(square[2] * 1.1) <= image.shape[0] else image.shape[0]
        y = square[1] - int(square[3] * 0.3) if square[1] - int(square[3] * 0.3) >= 0 else 0
        y2 = square[1] + int(square[3] * 1.3) if square[1] + int(square[3] * 1.3) <= image.shape[1] else image.shape[1]
        new_image = image[y:y2, x:x2]
        # cv2.imshow("image", image)
        # cv2.waitKey(50)
        # cv2.imwrite(f"{path}/playbot/media/photos/new.jpg", image)
        # cv2.imwrite(f"{path}/playbot/media/photos/new_image.jpg", new_image)
        imag_pil = Image.fromarray(new_image)
        buffer = BytesIO()
        imag_pil.save(buffer, format="png")
        img_png = buffer.getvalue()
        return img_png
    else:
        return None


def validate_init_data(raw_init_data):
    try:
        parsed_data = dict(parse_qsl(raw_init_data))
    except ValueError:
        return False
    if "hash" not in parsed_data:
        return False

    init_data_hash = parsed_data.pop('hash')
    data_check_string = "\n".join(f"{key}={value}" for key, value in sorted(parsed_data.items()))
    secret_key = hmac.new(key=b"WebAppData", msg=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN.encode(), digestmod=sha256)

    return hmac.new(secret_key.digest(), data_check_string.encode(), sha256).hexdigest() == init_data_hash


def parse_init_data(raw_init_data: str):
    is_valid = validate_init_data(raw_init_data)
    if not is_valid:
        return False

    result = {}
    for key, value in parse_qsl(raw_init_data):
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            result[key] = value
        else:
            result[key] = value

    if result.get("user"):
        result.update({
            "id": result["user"].get("id"),
            "first_name": result["user"].get("first_name"),
            "last_name": result["user"].get("last_name"),
            "username": result["user"].get("username"),
            "language_code": result["user"].get("language_code"),
        })
        del result["user"]
    return result
