import React from 'react'
import Logo from '../Logo/Logo'
import PlayboxGroupButtons from '../PlayboxButton/PlayboxGroupButtons'
import whiteBall from '../img/whiteBall.png'
import FooterLogos from './FooterLogos'
import { useSelector } from 'react-redux'

function Footer() {
  const engLang=useSelector(state=>state.Data.engLang)

  return (
<>
<footer>
        <div className="footer-container">
        <div className='footer-container-left'>
        <Logo ball={whiteBall}/>
        {/* <PlayboxGroupButtons textColor={'white'}/> */}
        </div>
        <FooterLogos/>
        </div>
    </footer>
    <div className='footer-bottom'>
        <p>{engLang?"Public offer":"Публичная оферта"}</p>
    </div>
</>
  )
}

export default Footer