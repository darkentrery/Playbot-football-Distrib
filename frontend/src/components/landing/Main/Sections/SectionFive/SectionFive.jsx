import React from 'react'
import SectionsTitleText from '../SectionsTitleText'
import stats from '../../../img/stats3.png'
import ball5 from '../../../img/BallVector5.png'
import { useSelector } from 'react-redux';

function SectionFive() {
const engLang=useSelector(state=>state.Data.engLang)

  return (
    <section className="section-five">
      <img className="ball5" src={ball5} alt="ball" />
    <div className="section-five-container" >
    <div className="section-five-container-left" >
        <img src={stats} alt="stats" />
      </div>
      <div className="section-five-container-right">
        <SectionsTitleText
        
          title={engLang?"Compete in the rankings":"Соревнуйся в рейтинге"}
          text={engLang?"Show everyone that":'Покажи всем, что '}
          goldtext={engLang?" you are":' ты лучше'}
          text2={engLang?" better not in words, but in deeds" :' не на словах, а на деле'}
          // mwidth={'340px'}
        />
      </div>

    </div>
  </section>
  )
}

export default SectionFive