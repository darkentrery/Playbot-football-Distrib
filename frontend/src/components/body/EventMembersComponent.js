
export default function EventMembersComponent ({event}) {
    let players = false;
    if (event && event.event_player.length) players = event.event_player;

    return (
        <div className={"event-members-component disabled"}>
            <span className={"title"}>Участники ({players ? players.length : 0})</span>
            {players && players.length !== 0 && players.map((item, key) => {
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