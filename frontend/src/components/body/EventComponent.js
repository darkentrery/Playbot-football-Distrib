import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";
import VisibleEventOrganizer from "../../redux/containers/VisibleEventOrganizer";
import {Link, useParams} from "react-router-dom";
import VisibleBoardEvent from "../../redux/containers/VisibleBoardEvent";
import {SameEventComponent} from "./SameEventComponent";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";


export default function EventComponent ({event, sameEvents, user, funcs}) {
    const eventService = new EventService();
    const [flagRequest, setFlagRequest] = useState(false);
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        setFlagRequest(false);
    }, [pk])

    useEffect(() => {
        if (!flagRequest) {
            eventService.getEvent(pk).then((response) => {
                funcs.setEvent(response.data.event);
                funcs.setSameEvents(response.data.same_events);
                if (response.data.event.teams.length !== 0) {
                    for (let team of response.data.event.teams) {
                        if (team.team_players.length === 0) {
                            funcs.setTeam(team);
                            break;
                        }
                        funcs.setTeam(team);
                    }
                }
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
        <VisibleMainWrapper>
            <div className={"event-component"}>
                <div className={"elem-376"}>
                    <div className={"event-mobile-head"}>
                        <Link className={"el-1 gray-left-arrow-icon link"} to={".."}></Link>
                        <span className={"el-2"}>Событие</span>
                        <div className={"el-3 black-edit-icon link"} onClick={editEvent}></div>
                    </div>
                </div>
                <VisibleBoardEvent/>
                <VisibleEventOrganizer/>
                {sameEvents.length !== 0 &&
                <div className={"same-events-component"}>
                    <span className={"elem elem-1 black-600-20"}>Похожие события</span>
                    <div className={"elem elem-2"}>
                        {sameEvents.map((event, key) => (
                            <SameEventComponent className={`same-event-${key}`} event={event} key={key}/>
                        ))}
                    </div>
                </div>}
            </div>
        </VisibleMainWrapper>
    )
}