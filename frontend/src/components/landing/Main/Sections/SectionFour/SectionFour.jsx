import React, { useEffect,useRef, useState } from 'react'
import SectionsTitleText from '../SectionsTitleText'
import greyimg from '../../../img/grey2.png'
import preview from '../../../img/videoPreview.PNG'
import goalmp4 from '../../../img/Petr Kozlov3.mp4'
import ball4 from '../../../img/BallVector4.png'
import { useSelector } from 'react-redux';


function SectionFour() {

const engLang=useSelector(state=>state.Data.engLang)
const videoRef = useRef(null);
const [playBtn,setPlayBtn]=useState(true)
const [video,setVideo]=useState(false)
const [previewLoaded, setPreviewLoaded] = useState(false);
const [videoClicked,setvideoClicked]=useState(false)

//Проверяю Ios ли уст-во
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const autoplay = isIOS ? true : false;

useEffect (() => {
  if (videoRef.current) {
    videoRef.current.currentTime = 2;
  }
  }, []);
    const handleClick = () => {
      // проверяем, играет ли видео, и если да, то останавливаем его
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setPlayBtn(true)
      } else {
        // // если видео не играет, включаем его
        setVideo(true);
        // Тут делаю так ,чтобы при остановке видее, при повторном клике оно продолжалось где остановились
        if (videoClicked) {
          videoRef.current.currentTime = videoRef.current.currentTime;
          videoRef.current.play();
          setPlayBtn(false);
        }else{
          videoRef.current.currentTime = 2;
          videoRef.current.play();
          setPlayBtn(false);
          setvideoClicked(true)
        }

      }
    }

    const handleVideoEnded = () => {
      // videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

  return (
    <section className="section-four">
      <img className="ball4" src={ball4} alt="ball" />
      <div className="section-four-container">
        <div className="section-four-container-left">
          <SectionsTitleText
            title={
              engLang ? "Grab media attention" : "Привлекай внимание медиа"
            }
            text={
              engLang
                ? "Create in streams, get into highlights and share your skills "
                : "Твори в стримах, попадай в хайлайты и делись своими скиллами"
            }
          />
        </div>
        <div className="section-four-container-right">
              <>
              <video
                ref={videoRef}
                src={goalmp4}
                loop
                muted
                autoPlay={autoplay}
                // onEnded={handleVideoEnded}
                onClick={handleClick}
                // controls={false}
                playsInline

              />
              {playBtn ? (
                <i onClick={handleClick} class="fa-solid fa-play playbtn"></i>
              ) : null}


            </>
        </div>
      </div>
    </section>
  );
}

export default SectionFour


          {/* {video ? (
            <>
              <video
                ref={videoRef}
                src={goalmp4}
                loop
                muted
                onEnded={handleVideoEnded}
                onClick={handleClick}
              />
              {playBtn ? (
                <i onClick={handleClick} class="fa-solid fa-play playbtn"></i>
              ) : null}
            </>
          ) : (
            <>
              <img className="preview" src={preview} alt="" />
              <i onClick={changeToVideo} class="fa-solid fa-play playbtn"></i>
            </>
          )} */}