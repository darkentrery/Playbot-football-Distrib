import React, { useEffect } from 'react'
import rewards from '../../../img/rewards.png'
import SectionsTitleText from '../SectionsTitleText'
import ball3 from '../../../img/BallVector2.png'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux';

function SectionThree() {
const engLang=useSelector(state=>state.Data.engLang)

  // useEffect (() => {
  //   AOS.init({duration: 1000, once: true})
  //   }, []);
  return (
    <section className="section-three">
      <img className="ball3" src={ball3} alt="ball" />
    <div className="section-three-container">
    <div className="section-three-container-left" data-aos="fade-right" >
        <img src={rewards} alt="rewards" />
      </div>
      <div className="section-three-container-right" data-aos="fade-left">
        <SectionsTitleText
          title={engLang?"Get rewards":"Получай награды"}
          text={engLang?"Earn":'Зарабатывай'}
          goldtext={engLang?' unique badges':' уникальные бэджи'}
          text2={engLang?' by reaching goals':', достигая целей'}
        />
      </div>

    </div>
  </section>
  )
}

export default SectionThree