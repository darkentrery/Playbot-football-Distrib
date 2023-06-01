import React, { useState } from 'react'
import SectionOne2Img from './SectionOne2Img';
import ball1 from '../../../img/BallVector1.png'
import ball2 from '../../../img/BallVector2.png'
import SectionsTitleText from '../SectionsTitleText';
import { useSelector } from 'react-redux';


function SectionOne() {
  const engLang=useSelector(state=>state.Data.engLang)


  return (
    <section className="section-one">
      
      <img className="ball1" src={ball1} alt="ball" />
      <img className="ball2" src={ball2} alt="ball" />
      <div className="section-one-container">
        <div className="section-one-left">
      <SectionOne2Img />
        </div>
        <SectionsTitleText
        title={engLang?'Play football':'Играй в футбол'}
        text={engLang?'Find events and join them':'Находи события и присоединяйся к ним'}
        />
      </div>
    </section>
  );
}

export default SectionOne