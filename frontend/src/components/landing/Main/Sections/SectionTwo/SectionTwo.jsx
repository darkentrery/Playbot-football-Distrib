import React from 'react'
import hero from '../../../img/heroShield2.png'
import SectionsTitleText from '../SectionsTitleText';
import { useSelector } from 'react-redux';

function SectionTwo() {
const engLang=useSelector(state=>state.Data.engLang)

  return (
    <section className="section-two">
      <div className="section-two-container">
        <div className="section-two-container-left">
          <SectionsTitleText
            title={engLang?'Develop your profile':"Развивай свой профиль"}
            text={engLang?"All statistics from the games appear in yourpersonal card and profile":"Вся статистика с игр появляется в твоей персональной карточке и личном профиле"}
          />
        </div>
        <div className="section-two-container-right" >
          <img className='section-two-img' src={hero} alt="heroShield" />
          {/* <div className='img-shadow'></div> */}
        </div>
      </div>
    </section>
  );
}

export default SectionTwo