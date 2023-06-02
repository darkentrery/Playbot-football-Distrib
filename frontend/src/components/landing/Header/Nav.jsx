import React, { useEffect, useState } from "react";
import iconru from "../img/icon-ru.png";
import iconen from "../img/icon-en.png";
// import hambmenu from "../img/hambMenu.png";

import arrowBottom from "../img/chevron-bottom.png";
import PlayboxBtn from "../PlayboxButton/PlayboxBtn";
// import PlayboxGroupButtons from "../PlayboxButton/PlayboxGroupButtons";
import Logo from "../Logo/Logo";
import blackBall from "../img/ball.png";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStateValue } from "../../../redux/reducers/landingReducer";

function Nav() {
  const [lang, setLang] = useState("RU");
  const [langImg, setLangImg] = useState(iconru);
  const hambMenuActive = useSelector((state) => state.Data.hambMenuActive);

  // const navigate = useNavigate();
  const engLang = useSelector((state) => state.Data.engLang);
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 820);
  const [isHamb, setIsHamb] = useState(window.innerWidth <= 550);
  window.addEventListener("resize", () => {
    setIsSmallScreen(window.innerWidth <= 820);
    setIsHamb(window.innerWidth <= 550);
  });

  useEffect(() => {
    const savedEngLang = localStorage.getItem("engLang");

    if (savedEngLang === "true") {
      setLangImg(iconen);
      setLang("EN");
      dispatch(changeStateValue({ name: "engLang", value: true }));
    }
  }, [dispatch]);

  function En() {
    setLang("EN");
    setLangImg(iconen);
    dispatch(changeStateValue({ name: "engLang", value: true }));
    localStorage.setItem("engLang", true);
    // navigate('/en');
    window.location.reload();
  }

  function Ru() {
    setLang("RU");
    setLangImg(iconru);
    dispatch(changeStateValue({ name: "engLang", value: false }));
    localStorage.setItem("engLang", false);
    // navigate('/');
    window.location.reload();
  }
  function hambMenu() {
    dispatch(changeStateValue({ name: "hambMenuActive", value: !hambMenuActive }));
  }

  return (
    <nav>
      <div className="nav-left">
        <Logo ball={blackBall} />
        {/* {isSmallScreen ? (
          <img
            onClick={hambMenu}
            className="hambmenu"
            src={hambmenu}
            alt="hambMenu"
          />
        ) : (
          <PlayboxGroupButtons textColor={"black"} />
        )} */}
              {/* {
        isSmallScreen?
        <div
        className="hamb-buttons"
        style={hambMenuActive ? {top: isHamb ? '60px' : '80px',height:'140px' } : {top: isHamb ? '60px' : '80px',height:'0' }}
      >
        <a
          className="hamb-buttons-btn"
          href="https://t.me/playbot_playbot"
          target="_blank"
          rel="noopener"
        >
          Playbot
        </a>
        <a
          className="hamb-buttons-btn"
          href="https://t.me/playbot_playbot"
          target="_blank"
          rel="noopener"
        >
          Playbox
        </a>
      </div>:null
      } */}
      </div>
      <div className="nav-right">
        <PlayboxBtn />
        <div className="nav-right-lang">
          <div className="nav-right-lang-img">
            {/* <img className="lang-icon" src={langImg} alt="" /> */}
            <img className="lang-icon" src={engLang ? iconen : iconru} alt="languages" />
          </div>
          <div className="nav-right-lang-select">
            <p>{lang}</p>
            <img src={arrowBottom} alt="arrowBottom" />
            <div className="langs">
              <div className="lang-container">
                <img onClick={() => Ru()} src={iconru} alt="russianlanguage" />
              </div>
              <div className="lang-container">
                <img
                  onClick={() => En()}
                  className="iconen"
                  src={iconen}
                  alt="englishlanguage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
