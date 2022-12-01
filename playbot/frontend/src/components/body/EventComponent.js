import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";
import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";


export default function EventComponent ({pk, openEditEvent, setEvent, setPlayers, openCancelEvent, openConfirmPlayers}) {
    const eventService = new EventService();
    const [localeEvent, setLocaleEvent] = useState(false);
    const [localePlayers, setLocalePlayers] = useState([]);

    useEffect(() => {
        if (!localeEvent) {
            eventService.getEvent(pk).then((response) => {
                setEvent(response.data);
                setLocaleEvent(response.data);
            })
        }
    }, [localeEvent])

    useEffect(() => {
        if (!localePlayers.length) {
            eventService.getPlayers(pk).then((response) => {
                setPlayers(response.data);
                setLocalePlayers(response.data);
            })
        }
    }, [localePlayers])


    return (
        <div className={"event-component"}>
            <div className={"elem-376"}>
                <div className={"event-mobile-head"}>
                    <div className={"el-1 gray-left-arrow-icon link"}></div>
                    <span className={"el-2"}>Событие</span>
                    <div className={"el-3 black-edit-icon link"} onClick={openEditEvent}></div>
                </div>
            </div>
            <BoardEventOrganizerComponent event={localeEvent} players={localePlayers} openCancelEvent={openCancelEvent} openConfirmPlayers={openConfirmPlayers}/>
            <EventOrganizerComponent event={localeEvent} players={localePlayers} openEditEvent={openEditEvent}/>
        </div>
    )
}