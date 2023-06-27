import React from 'react'
import Pause from './Pause'

import Stick from './Stick'
import Timer from './Timer'


function ScoreTable({game, allGames, timer}) {
	return (

		<div className='test'>
			<div className="score-table">
				<div className="score-table-left score-container">
					<div className="left-team-color team-color" style={{backgroundColor: game ? game["team_1"]["color"]["color_hex"] : "#a8ffa1"}}>
					</div>
					<Stick />
					<div className="left-team-score">
						<p className='score'>{game ? game["score_1"] : 0}</p>
					</div>
					<Stick />
				</div>
				<div className="score-table-center score-container">
					<Timer timer={timer}/>
				</div>
				<div className="score-table-right score-container">
					<div className="right-team-color team-color" style={{backgroundColor: game ? game["team_2"]["color"]["color_hex"] : "#a8ffa1"}}>
					</div>
					<Stick />
					<div className="right-team-score">
						<p className='score'>{game ? game["score_2"] : 0}</p>
					</div>
					<Stick />
				</div>
			</div>
			<div className='score-table-stage'>{game.number ? game.number : 0}/{allGames}</div>
			<Pause />
		</div>
	)
}

export default ScoreTable