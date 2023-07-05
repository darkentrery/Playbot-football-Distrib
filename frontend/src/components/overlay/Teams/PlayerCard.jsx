import { useState } from 'react'
import maskBottom from '../../../assets/icon/mask-bottom.png'
import maskTop from '../../../assets/icon/mask-top.png'
import mira from '../../../assets/icon/mira.png'
import ball from '../../../assets/icon/ball.svg'
import shoes from '../../../assets/icon/shoes.svg'


function PlayerCard({cardLine, player}) {
  // const [goals, setGoals] = useState(0);
  const [goalActive, setGoalActive] = useState(false);
  const [goals, setGoals] = useState(0);

    const [passActive, setpassActive] = useState(false);
    const [pass, setPass] = useState(0);
    const serverUrl = process.env.REACT_APP_SERVER_URL;


    function goalFunction() {
        setGoalActive(true)
        setTimeout(() => {
            setGoalActive(false)
        }, 3200);
        setGoals(goals + 1)
    }

    function passFunction() {
        setpassActive(true)
        setTimeout(() => {
            setpassActive(false)
        }, 1000);
        setPass(pass + 1)
    }

    return (
        <div className='player-card'>
            {!!player && player.player.is_accept_photo && player.player.overlay_photo ?
                <img src={serverUrl + player.player.overlay_photo} className='player-card__img' alt="player" />
                : <img src={mira} className='player-card__img' alt="player" />
            }

            <img src={maskBottom} className='player-card__mask-bottom' alt="mask" />
            <img src={maskTop} className='player-card__mask-bottom' alt="mask" />
            <div className="player-card__player-number">{player && player.number ? player.number.number : ''}</div>
            <div className="player-card__info">
                <div className="player-card__stats">
                    {player.do_goals ?
                        <div className='player-card__stats-row' onClick={goalFunction}>
                            <img className={"player-card__stats-row-ball-img " + (goalActive ? 'active' : '')} src={ball} alt="ball" />
                            <div className={goalActive ? 'active' : ''}>{player.do_goals}</div>
                        </div>
                        : null
                    }
                    {player.do_assist ?
                        <div className='player-card__stats-row' onClick={passFunction}>
                            <img className={'player-card__stats-row-shoes-img ' + (passActive ? 'activePass' : '')} src={shoes} alt="s hoes" />
                            <div className={passActive ? 'activePass' : ''}>{player.do_assist}</div>
                        </div>
                        : null
                    }
                </div>
                <div className="player-card__sep" style={{ backgroundColor: cardLine }}></div>
                <div className="player-card__name">
                    {player ? player.player.username : ''}
                </div>
            </div>
        </div>
    )
}

export default PlayerCard