import { useEffect, useState, useMemo } from "react"
import { getShortRolePosition } from "../../../utils/translateRole"

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
            setShow(false)
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
            <div className='player-card-wrapper'>
                <div className='player-card-component'>
                    {user && user.is_accept_photo && user.photo ?
                        // eslint-disable-next-line react/prop-types
                        <img src={serverUrl + user.photo} className='player-card-photo' alt="player" />
                        : <img src={""} className='player-card-photo' alt="player" />
                    }
                    <div className='player-card-bottom-bg'></div>
                    <div className="player-card-bg">
                        <div className='avatar-fade'></div>
                    </div>
                    <span className='player-main-position'>{position1}</span>
                    <span className='player-name'>
                        <span className="player-name-text" id="bombardier-name">
                            {user?.username}
                        </span>
                    </span>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default PlayerBigCard
