import React from 'react'
import PlayerCard from './PlayerCard'

function LeftTeam({team}) {
  let playersPart1 = []
  let playersPart2 = []
  if (team) {
    playersPart1 = team.team_players.slice(0, 6)
    playersPart2 = team.team_players.slice(6, 12)
  }


  return (
    <div className='left-team'>
       
      {playersPart1.map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
      ))}
      <div className='left-team-vertical'>
      {playersPart2.map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
      ))}
      </div>
    </div>
  )
}

export default LeftTeam