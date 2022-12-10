import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";
import VisibleEventOrganizer from "../../redux/containers/VisibleEventOrganizer";
import VisibleBoardEventOrganizer from "../../redux/containers/VisibleBoardEventOrganizer";
import {Link, useParams} from "react-router-dom";


export default function EventComponent ({event, user, funcs}) {
    const eventService = new EventService();
    const [flagRequest, setFlagRequest] = useState(false);
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        if (!flagRequest) {
            eventService.getEvent(pk).then((response) => {
                funcs.setEvent(response.data);
            })
        }
        setFlagRequest(true);
    }, [flagRequest])

    const editEvent = () => {
        if (event && user.isAuth && event.organizer.id === user.user.id) {
            funcs.openEditEvent();
        } else {
            funcs.openLogin();
        }
        funcs.removeMap();
    }


    return (
        <div className={"event-component"}>
            <div className={"elem-376"}>
                <div className={"event-mobile-head"}>
                    <Link className={"el-1 gray-left-arrow-icon link"} to={".."}></Link>
                    <span className={"el-2"}>Событие</span>
                    <div className={"el-3 black-edit-icon link"} onClick={editEvent}></div>
                </div>
            </div>
            {event && user.isAuth && event.organizer.id === user.user.id && <VisibleBoardEventOrganizer/>}
            <VisibleEventOrganizer/>
        </div>
    )
}