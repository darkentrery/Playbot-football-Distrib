import AvatarSkeletonIcon from '../../assets/icon/avatar-skeleton-space.svg'
import Zaglushka from '../../assets/icon/star.png'
import WaitListIcon from '../../assets/icon/wait-list.svg';
import { EventMemberCard } from '../EventMemberCard/EventMemberCard'
import DownArrowIcon from '../../assets/icon/down-arrow.png';
import { useState } from 'react';

export const EventMembers = ({
    event
}) => {
    const maxPlayersNumber = event.count_players
    const currentPlayersNumber = event.count_current_players
    const organizerName = event.organizers?.[0]?.username ?? null;
    const [isMemberListOpened, setIsMemberListOpened] = useState(false)
    const [showMemberListFog, setShowMemberListFog] = useState(true)

    const handleOpenMemberList = () => {
        console.log("open list")
        setIsMemberListOpened(true)
        setShowMemberListFog(false)
    }

    if (event.event_player.length < 6 && showMemberListFog == true) {
        setShowMemberListFog(false)
    }
    return (
        <div className="event-members">
            <div className="event-members-active">
                <div className="event-members-info">
                    <div className="event-members-info__count">
                        <img src={AvatarSkeletonIcon} height={17} width={15} alt="avatar" />
                        <span>{currentPlayersNumber + '/' + maxPlayersNumber}</span>
                    </div>
                    {organizerName &&
                        <div className="event-members-info__creator">
                            <img src={Zaglushka} height={20} width={20} alt="" />
                            <span className="event-members-info__creator-name">{organizerName}</span>
                        </div>
                    }
                </div>
                {event.event_player.length !== 0 ?
                    <div className="event-members-list" style={{ maxHeight: (isMemberListOpened ? "max-content" : "120px") }}>
                        {event.event_player.length !== 0 && event.event_player.map((e, i) => {
                            return (
                                <EventMemberCard
                                    name={e.player.username}
                                    rating={e.player.rank}
                                    key={i}
                                />
                            )
                        })}
                        {showMemberListFog &&
                            <div className="event-members-list-show-all-wrapper">
                                <div className='event-members-list-show-all-decor'></div>
                                <img src={DownArrowIcon} width={30} height={30} onClick={handleOpenMemberList} alt="down arrow" />
                            </div>}
                    </div>
                    : <div className="event-members-no-players">Пока никто не присоединился.</div>
                }
            </div>
            {event.event_queues.length ?
                <div className="event-members-queue">
                    <div className="event-members-queue-info">
                        <img src={WaitListIcon} width={16} height={20} alt="wait list" />
                        <span>Лист ожидания ({event.event_queues.length})</span>
                    </div>
                    <div className="event-members-list" >
                        {event.event_queues.map((e, i) => {
                            return (
                                <EventMemberCard
                                    name={e.player.username}
                                    rating={e.player.rank}
                                    key={i} />
                            )
                        })}
                    </div>
                </div>
                : null}
        </div>
    )
}

export default EventMembers