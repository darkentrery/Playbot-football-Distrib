import React from 'react'
import tglogo from '../img/tglogo.png'
import instlogo from '../img/instlogo.png'
import twitchlogo from '../img/twitchlogo.png'
import youtubelogo from '../img/youtubelogo.png'

function FooterLogos() {
  return (
    <div className='footer-logo-container'>
        <a href='' rel="noopener" >
        <img className='footer-logo-img' src={tglogo} alt="telegram-logo" />
        </a>
        <a href="https://www.instagram.com/playbox.io/">
        <img className='footer-logo-img' src={instlogo} alt="instagram-logo" />
        </a>
        <a href="https://www.twitch.tv/playbot_football">
        <img className='footer-logo-img' src={twitchlogo} alt="twitch-logo" />
        </a>
        <a href="https://www.youtube.com/channel/UCCWChz3OIuWr9qrX23sZ2eg">
        <img className='footer-logo-img' src={youtubelogo} alt="youtube-logo" />
        </a>

    </div>
  )
}

export default FooterLogos