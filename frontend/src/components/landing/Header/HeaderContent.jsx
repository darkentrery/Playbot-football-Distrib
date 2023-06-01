import React, { useEffect,useState } from 'react'
import headerGroup from '../img/headerGroup.png'
import cup from '../img/cup.png'
import cam from '../img/cam.png'
import shield from '../img/shield.png'
import list from '../img/list.png'

import PlayboxBtn from '../PlayboxButton/PlayboxBtn';
import {  useSelector } from 'react-redux'
function HeaderContent() {
  const engLang=useSelector(state=>state.Data.engLang)
  const hambMenuActive=useSelector(state=>state.Data.hambMenuActive)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 820);
  window.addEventListener("resize", () => {
    setIsSmallScreen(window.innerWidth <= 820);
  });


  return (
    <div className="header-content">
    
      <div className="shadow">
        <div className="header-text">
          <div className="header-text-top">
            <h1>
              <span>Playbox</span> —
              {engLang
                ? " play football like a game"
                : " играй в футбол, как в игру"}
            </h1>
          </div>
          <div className="header-text-middle">
            <p>
              {engLang
                ? "Play in the real world - evolve in the virtual"
                : "Играй в реальном мире – развивайся в виртуальном"}
            </p>
          </div>
          <div className="header-text-bottom">
            <img className="header-text-bottom-img" src={cup} alt="cup" />
            <img className="header-text-bottom-img" src={cam} alt="camera" />
            <img className="header-text-bottom-img" src={shield} alt="shield" />
            <img className="header-text-bottom-img" src={list} alt="list" />
          </div>
          <div className="header-text-bottom-button">
            <PlayboxBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderContent