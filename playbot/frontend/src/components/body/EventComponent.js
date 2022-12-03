import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";
import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";


export default function EventComponent ({pk, steps, funcs}) {
    const eventService = new EventService();
    const [localeEvent, setLocaleEvent] = useState(false);
    const [localePlayers, setLocalePlayers] = useState([]);
    const [flagRequest, setFlagRequest] = useState(false);

    useEffect(() => {
        if (!localeEvent) {
            eventService.getEvent(pk).then((response) => {
                funcs.setEvent(response.data);
                setLocaleEvent(response.data);
            })
        }
    }, [localeEvent])

    // useEffect(() => {
    //     if (!localePlayers.length) {
    //         eventService.getPlayers(pk).then((response) => {
    //             funcs.setPlayers(response.data);
    //             setLocalePlayers(response.data);
    //         })
    //     }
    // }, [localePlayers])

    useEffect(() => {
        if (!flagRequest) {
            eventService.getEventSteps(pk).then((response) => {
                funcs.setSteps(response.data);
            })
            eventService.getPlayers(pk).then((response) => {
                funcs.setPlayers(response.data);
                setLocalePlayers(response.data);
            })
        }
        setFlagRequest(true);
    }, [flagRequest])


    return (
        <div className={"event-component"}>
            <div className={"elem-376"}>
                <div className={"event-mobile-head"}>
                    <div className={"el-1 gray-left-arrow-icon link"}></div>
                    <span className={"el-2"}>Событие</span>
                    <div className={"el-3 black-edit-icon link"} onClick={funcs.openEditEvent}></div>
                </div>
            </div>
            <BoardEventOrganizerComponent event={localeEvent} steps={steps} funcs={funcs}/>
            <EventOrganizerComponent event={localeEvent} players={localePlayers} openEditEvent={funcs.openEditEvent}/>
        </div>
    )
}