import React from 'react'
import rewards from '../../../img/rewards.png'
import SectionsTitleText from '../SectionsTitleText'
import ball3 from '../../../img/BallVector2.png'

import { useSelector } from 'react-redux';

function SectionThree() {
const engLang=useSelector(state=>state.Data.engLang)

  return (
    <section className="section-three">
      <img className="ball3" src={ball3} alt="ball" />
    <div className="section-three-container">
    <div className="section-three-container-left"  >
        <img src={rewards} alt="rewards" />
      </div>
      <div className="section-three-container-right" >
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