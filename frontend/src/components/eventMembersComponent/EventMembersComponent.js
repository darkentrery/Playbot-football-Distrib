import {PlayerRowComponent} from "../playerRowComponent/PlayerRowComponent";

export default function EventMembersComponent ({event, className=''}) {
    const ExistsPlayers = () => {
        return (
            <div className={"players-list scroll"}>
                {event.event_player.map((item, key) => (
                    <PlayerRowComponent player={item.player} key={key}/>
                ))}
            </div>
        )
    }

    const NoExistsPlayers = () => {
        return (
            <div className={"players-list no-exists"}>
                <div className={"socer-player-icon"}></div>
                <span className={"dark-gray-600-32"}>Список пуст</span>
                <span className={"dark-gray-400-14"}>Пока никто не присоединился</span>
            </div>
        )
    }

    return (
        <div className={`event-members-component ${className}`}>
            <span className={"title"}>Участники ({event && event.count_current_players ? event.count_current_players : 0})</span>
            {event && event.count_current_players !== 0 && <ExistsPlayers/>}
            {event && !event.count_current_players && <NoExistsPlayers/>}
        </div>
    )
}