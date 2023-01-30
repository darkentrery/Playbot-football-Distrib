import {eventService} from "../../services/EventService";
import React, {useEffect} from "react";
import VisibleEventOrganizer from "../../redux/containers/VisibleEventOrganizer";
import {useParams} from "react-router-dom";
import VisibleBoardEvent from "../../redux/containers/VisibleBoardEvent";
import {SameEventComponent} from "./SameEventComponent";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";
import BaseRoutes from "../../routes/BaseRoutes";
import {Top376Component} from "../top376Component/Top376Component";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";


export default function EventComponent ({event, sameEvents, user, funcs}) {
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        funcs.setEvent(false);
        funcs.setSameEvents([]);
        funcs.setTeam(false);
        let isSubscribe = true;
        eventService.getEvent(pk).then((response) => {
            console.log(response.data.event)
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
        return () => isSubscribe = false;
    }, [pk])

    const editEvent = () => {
        if (event && user.isAuth && event.organizer.id === user.user.id) {
            funcs.openEditEvent();
        } else {
            funcs.openLogin();
        }
        funcs.removeMap();
    }

    const addToFavorites = () => {
        authDecoratorWithoutLogin(eventService.addToFavorites, {'id': event.id}).then((response) => {
            console.log(response)
            if (response.status === 200) {
                funcs.setAuth(true, response.data);
            }
        })
    }

    return (
        <VisibleMainWrapper>
            {event && <div className={"event-component"}>
                <Top376Component label={"Событие"} to={BaseRoutes.main}>
                    <div className={"icon dark-gray-star-icon"} onClick={addToFavorites}></div>
                    <div className={"icon send-icon"}></div>
                    {event.organizer.id === user.user.id && <div className={"icon black-edit-icon"} onClick={editEvent}></div>}
                </Top376Component>
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
            </div>}
        </VisibleMainWrapper>
    )
}