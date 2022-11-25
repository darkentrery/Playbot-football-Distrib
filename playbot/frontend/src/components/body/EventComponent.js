import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";
import EventService from "../../services/EventService";
import {useEffect, useState} from "react";


export default function EventComponent ({pk}) {
    const eventService = new EventService();
    const [event, setEvent] = useState(false);

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
            <BoardEventOrganizerComponent event={event}/>
            <EventOrganizerComponent event={event}/>
        </div>
    )
}