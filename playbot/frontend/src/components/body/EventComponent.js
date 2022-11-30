import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";
import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";
import EditEventComponent from "../EditEventComponent";
import {OpenEditEventContext, OpenSuccessEditEventContext} from "../../context/EventContext";
import SuccessEditEventComponent from "../success/SuccessEditEventComponent";


export default function EventComponent ({pk}) {
    const eventService = new EventService();
    const [event, setEvent] = useState(false);
    const [players, setPlayers] = useState([]);
    const [openEditEvent, setOpenEditEvent]= useState(false);
    const editEventWindow = { openEditEvent, setOpenEditEvent };
    const [openSuccessEditEvent, setOpenSuccessEditEvent]= useState(false);
    const successEditEventWindow = { openSuccessEditEvent, setOpenSuccessEditEvent };

    useEffect(() => {
        if (!event) {
            eventService.getEvent(pk).then((response) => {
                setEvent(response.data);
            })
        }
    }, [event])



    useEffect(() => {
        if (!players.length) {
            eventService.getPlayers(pk).then((response) => {
                setPlayers(response.data);
            })
        }
    }, [players])


    return (
        <div className={"event-component"}>
            <div className={"elem-376"}>
                <div className={"event-mobile-head"}>
                    <div className={"el-1 gray-left-arrow-icon link"}></div>
                    <span className={"el-2"}>Событие</span>
                    <div className={"el-3 black-edit-icon link"} onClick={(e) => setOpenEditEvent(!openEditEvent)}></div>
                </div>
            </div>
            <BoardEventOrganizerComponent event={event} players={players}/>
            <EventOrganizerComponent event={event} players={players}/>

            <OpenSuccessEditEventContext.Provider value={successEditEventWindow}>
                <OpenEditEventContext.Provider value={editEventWindow}>
                    <EditEventComponent event={event}/>
                </OpenEditEventContext.Provider>
            </OpenSuccessEditEventContext.Provider>

            <OpenSuccessEditEventContext.Provider value={successEditEventWindow}>
                <SuccessEditEventComponent id={pk}/>
            </OpenSuccessEditEventContext.Provider>
        </div>
    )
}