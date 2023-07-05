import PlayerCard from './PlayerCard';

// eslint-disable-next-line react/prop-types
function RightTeam({team}) {
  let playersPart1 = []
  let playersPart2 = []
  if (team) {
    playersPart1 = team.team_players.slice(0, 6)
    if (team.team_players.length > 6) {
      playersPart2 = team.team_players.slice(6, 12)
    }
  }


  return (
    <div className='right-team'>
      {playersPart1.map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
      ))}
      <div className='right-team-vertical'>
        {playersPart2.map((player, key) => (
          <PlayerCard cardLine={team.color.color_hex} key={key} player={player}/>
        ))}
      </div>
    </div>
  );
}

export default RightTeam