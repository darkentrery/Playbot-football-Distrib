import AvatarSkeletonIcon from '../../assets/icon/avatar-skeleton-space.svg'
import Zaglushka from '../../assets/icon/star.png'
import WaitListIcon from '../../assets/icon/wait-list.svg';
import { EventMemberCard } from '../EventMemberCard/EventMemberCard'


export const EventMembers = ({
    event
}) => {
    const maxPlayersNumber = event.count_players;
    const currentPlayersNumber = event.count_current_players;
    const organizerName = event.organizers?.[0]?.username ?? null;

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
                {event.count_current_players !== 0 ?
                    <div className="event-members-list">
                        {event.count_current_players !== 0 && event.event_player.map((e, i) => {
                            return (
                                <EventMemberCard
                                    name={e.player.username}
                                    rating={e.player.rank}
                                    id={e.player.id}
                                    key={i}
                                />
                            )
                        })}
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