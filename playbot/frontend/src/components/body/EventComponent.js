import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";
import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";
import EditEventComponent from "../EditEventComponent";
import {OpenEditEventContext} from "../../context/EventContext";


export default function EventComponent ({pk}) {
    const eventService = new EventService();
    const [event, setEvent] = useState(false);
    const [openEditEvent, setOpenEditEvent]= useState(false);
    const editEventWindow = { openEditEvent, setOpenEditEvent };

    useEffect(() => {
        if (!event) {
            eventService.getEvent(pk).then((response) => {
                console.log(response)
                setEvent(response.data)
            })
        }
    }, [event])


    return (
        <div className={"event-component"}>
            <div className={"elem-376"}>
                <div className={"event-mobile-head"}>
                    <div className={"el-1 gray-left-arrow-icon link"}></div>
                    <span className={"el-2"}>Событие</span>
                    <div className={"el-3 black-edit-icon link"} onClick={(e) => setOpenEditEvent(!openEditEvent)}></div>
                </div>
            </div>
            <BoardEventOrganizerComponent event={event}/>
            <EventOrganizerComponent event={event}/>

            <OpenEditEventContext.Provider value={editEventWindow}>
                <EditEventComponent event={event}/>
            </OpenEditEventContext.Provider>
        </div>
    )
}