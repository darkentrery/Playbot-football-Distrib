import React, { useEffect } from 'react'
import hero from '../../../img/heroShield2.png'
import SectionsTitleText from '../SectionsTitleText';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux';

function SectionTwo() {
const engLang=useSelector(state=>state.Data.engLang)

    useEffect (() => {
    AOS.init({duration: 1000})
    }, []);
  return (
    <section className="section-two">
      <div className="section-two-container">
        <div data-aos="fade-right" className="section-two-container-left">
          <SectionsTitleText
            title={engLang?'Develop your profile':"Развивай свой профиль"}
            text={engLang?"All statistics from the games appear in yourpersonal card and profile":"Вся статистика с игр появляется в твоей персональной карточке и личном профиле"}
          />
        </div>
        <div data-aos="fade-left" className="section-two-container-right" >
          <img className='section-two-img' src={hero} alt="heroShield" />
          {/* <div className='img-shadow'></div> */}
        </div>
      </div>
    </section>
  );
}

export default SectionTwo