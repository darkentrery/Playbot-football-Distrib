import {useEffect, useState} from "react";
import EventService from "../../services/EventService";


export default function EventMembersComponent ({event, players}) {
    const eventService = new EventService();

    return (
        <div className={"event-members-component disabled"}>
            <span className={"title"}>Участники ({players.length})</span>
            {players.length !== 0 && players.map((item, key) => {
                return (
                    <div className={"elem"} key={key}>
                        <div className={"el el-1 player-avatar-icon"}>
                            <span className={"name"}>{item.username}</span>
                            <span className={"role"}>Форвард</span>
                        </div>
                        <span className={"el el-2"}>88,6</span>
                    </div>
                )
            })}
        </div>
    )
}