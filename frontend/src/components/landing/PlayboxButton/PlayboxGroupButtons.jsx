import React from 'react'

function PlayboxGroupButtons({textColor}) {
  return (
    <div className="group-buttons">
    <a style={{ color: textColor }}  className='group-buttons-btn' href='https://t.me/playbot_playbot' target="_blank" rel="noopener" >Playbot</a>
    <a style={{ color: textColor }}  className='group-buttons-btn' href='https://t.me/playbot_playbot' target="_blank" rel="noopener" >Playbox</a>
  </div>
  )
}

export default PlayboxGroupButtons