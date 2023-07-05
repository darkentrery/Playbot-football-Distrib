import { useEffect, useState, useMemo } from "react"
import { getShortRolePosition } from "../../../utils/translateRole"
import NoPhotoIcon from '../../../assets/icon/big-card-alt.png'

const PlayerBigCard = ({game}) => {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(false)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const memoizedGoalsLength = useMemo(() => game, [game.goals.length]);
    const serverUrl = "http://127.0.0.1:8000";
    useEffect(() => {
        if (!game.goals.length || isFirstLoad) return
        const updatedGoals = [...game.goals];
        const { player } = updatedGoals.pop()
        setUser(player)
        setShow(true)
        setTimeout(() => {
            // setShow(false)
        }, 5000)
    }, [memoizedGoalsLength])

    const position1 = getShortRolePosition(user?.position_1?.id)
    useEffect(() => {
        setIsFirstLoad(false)
    }, [])
    return (
        <>
        {show && (
            <div className='goal-names-popup'>
                <div className="overlay__big-player-card">
                    <div className="overlay__big-player-card-top">
                        {user && user.is_accept_photo && user.photo ?
                            // eslint-disable-next-line react/prop-types
                            <img src={serverUrl + user.photo} className='overlay__big-player-card-user-img' alt="player" />
                            : <img src={NoPhotoIcon} className='overlay__big-player-card-user-img' alt="player" style={{marginBottom: "2vh"}}/>
                        }
                        <div className="overlay__big-player-card-top-position">
                            FW
                        </div>
                        <div className="overlay__big-player-card-top-fog"></div>
                    </div>
                    <div className="overlay__big-player-card-bottom-name">
                        Zagrebalski
                    </div>
                </div>
            </div>
        )}
        </>
        /* {user?.username}  {position1}  */

        /* 
                        {user && user.is_accept_photo && user.photo ?
                            // eslint-disable-next-line react/prop-types
                            <img src={serverUrl + user.photo} className='player-card-photo' alt="player" />
                            : <img src={NoPhotoIcon} className='player-card-photo' alt="player" style={{bottom: 100}}/>
                        }
        */
    )
}

export default PlayerBigCard
