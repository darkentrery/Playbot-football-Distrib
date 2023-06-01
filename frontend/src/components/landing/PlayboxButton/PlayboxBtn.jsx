import React from 'react'
import { useSelector } from 'react-redux'

function PlayboxBtn() {
  const engLang=useSelector(state=>state.Data.engLang)

  return (
    <div className='playbox-button'>
    <a href='https://t.me/playbot_playbot' target="_blank" rel="noopener"  className='playbox-button-btn'>{engLang?"Go to Playbox":"Перейти в Playbot"}</a>
    </div>
  )
}

export default PlayboxBtn