import React from 'react'
import LeftTeam from './LeftTeam'
import RightTeam from './RightTeam'

function Teams({game}) {
  return (
    <div className='teams'>
    <LeftTeam team={game ? game.team_1 : false}/>
    <RightTeam team={game ? game.team_2 : false}/>
    </div>
  )
}

export default Teams