import React from 'react'
import PlayerCard from './PlayerCard'


function LeftTeam({team}) {
  return (
    <div className='left-team'>
      {!!team && team["team_players"].map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
      ))}
    </div>
  )
}

export default LeftTeam