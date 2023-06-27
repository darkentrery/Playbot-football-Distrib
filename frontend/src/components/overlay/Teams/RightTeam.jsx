import PlayerCard from './PlayerCard';
import React from "react";


function RightTeam({team}) {
  return (
    <div className='right-team'>
      {!!team && team["team_players"].map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
      ))}
    </div>
  );
}

export default RightTeam