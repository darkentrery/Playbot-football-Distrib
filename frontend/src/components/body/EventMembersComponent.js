
export default function EventMembersComponent ({event}) {
    const ExistsPlayers = () => {
        return (
            <div className={"players-list scroll"}>
                {event.event_player.map((item, key) => {
                return (
                    <div className={"elem"} key={key}>
                        <div className={"el el-1 player-avatar-icon"}>
                            <span className={"name"}>{item.player.username}</span>
                            <span className={"role"}>Форвард</span>
                        </div>
                        <span className={"el el-2"}>88,6</span>
                    </div>
                    )
                })}
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
        <div className={"event-members-component disabled"}>
            <span className={"title"}>Участники ({event && event.event_player.length ? event.event_player.length : 0})</span>
            {event && event.event_player.length !== 0 && <ExistsPlayers/>}
            {event && !event.event_player.length && <NoExistsPlayers/>}
        </div>
    )
}