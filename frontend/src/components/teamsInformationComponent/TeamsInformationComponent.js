import VisibleEventWrapper from "../../redux/containers/VisibleEventWrapper";


export const TeamsInformationComponent = ({event, user, funcs}) => {

    return (
        <VisibleEventWrapper>
            <div className={"teams-information-component"}>
                {event && event.teams.length !== 0 &&
                <div className={"team-row-1280 team-row-1280-1"}>
                    <div className={"elem elem-1"}>
                        <span className={"el black-700-13"}>{event.teams[0].name}</span>
                        {event.teams[0].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>
                    {event.teams.length > 1 && <div className={"elem elem-2"}>
                        <span className={"el black-700-13"}>{event.teams[1].name}</span>
                        {event.teams[1].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>}
                </div>}
                {event && event.teams.length > 2 &&
                <div className={"team-row-1280"}>
                    <div className={"elem elem-1"}>
                        <span className={"el black-700-13"}>{event.teams[2].name}</span>
                        {event.teams[2].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>
                    {event.teams.length > 3 && <div className={"elem elem-2"}>
                        <span className={"el black-700-13"}>{event.teams[3].name}</span>
                        {event.teams[3].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>}
                </div>}
                {event && event.teams.length > 4 &&
                <div className={"team-row-1280"}>
                    <div className={"elem elem-1"}>
                        <span className={"el black-700-13"}>{event.teams[4].name}</span>
                        {event.teams[4].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>
                    {event.teams.length > 5 && <div className={"elem elem-2"}>
                        <span className={"el black-700-13"}>{event.teams[5].name}</span>
                        {event.teams[5].team_players.map((player, p) => (
                            <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                        ))}
                    </div>}
                    {event && event.teams.length > 6 &&
                    <div className={"team-row-1280"}>
                        <div className={"elem elem-1"}>
                            <span className={"el black-700-13"}>{event.teams[6].name}</span>
                            {event.teams[6].team_players.map((player, p) => (
                                <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                            ))}
                        </div>
                        {event.teams.length > 7 && <div className={"elem elem-2"}>
                            <span className={"el black-700-13"}>{event.teams[7].name}</span>
                            {event.teams[7].team_players.map((player, p) => (
                                <span className={"el black-400-13"} key={p}>{`${p+1}. ${player.player.username}`}</span>
                            ))}
                        </div>}
                    </div>}
                </div>}

                {event && event.teams.map((team, t) => (
                    <div className={"team-row-376"} key={t}>
                        <span className={"elem elem-1 black-700-13"}>{team.name}</span>
                        {team.team_players.map((player, p) => (
                            <div className={"elem"} key={p}>
                                <span className={"black-400-13"}>{p+1}.</span>
                                <span className={"black-400-13"}>{player.player.username}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </VisibleEventWrapper>
    )
}