import {eventService} from "../../../services/EventService";
import React, {useEffect, useState} from "react";
import VisibleEventOrganizer from "../../../redux/containers/VisibleEventOrganizer";
import {useParams} from "react-router-dom";
import VisibleBoardEvent from "../../../redux/containers/VisibleBoardEvent";
import {SameEventComponent} from "../../sameEventComponent/SameEventComponent";
import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";
import BaseRoutes from "../../../routes/BaseRoutes";
import {Top376Component} from "../../top376Component/Top376Component";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {share} from "../../../services/LinkShareService";
import EventRoutes from "../../../routes/EventRoutes";
import EventTopAdminEditBar from "../../EventTopAdminEditBar/EventTopAdminEditBar";
import EventJoinWithInfoCards from "../../EventJoinWithInfoCards/EventJoinWithInfoCards";
import EventInfo from "../../EventInfo/EventInfo";
import { EventChatComponent } from "../../eventChatComponent/EventChatComponent";
import VisibleEventTopAdminEditBar from "../../../redux/containers/VisibleEventTopAdminEditBar";
import EventMembers from "../../EventMembers/EventMembers";
import VisibleJoinWithInfoCards from "../../../redux/containers/VisibleJoinWithInfoCards";
import ShareArrowIcon from '../../../assets/icon/share-arrow.svg'
import EventJoinInfo376 from "../../EventJoinInfo376/EventJoinInfo376";
import EventLimitsInfo376 from "../../EventLimitsInfo376/EventLimitsInfo376";

import VisibleEventOrganizerButtons from "../../../redux/containers/VisibleEventOrganizerButtons";
import VisibleEventPlayerButtons from "../../../redux/containers/VisibleEventPlayerButtons";



export default function EventComponent ({event, sameEvents, user, funcs}) {
    const { pk } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isTooltip, setIsTooltip] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [block, setBlock] = useState(false);
    const [ids, setIds] = useState([]);

    useEffect(() => {
        if (event && event.event_player) {
            let arrray = [];
            event.event_player.map((item) => {
                arrray.push(item.player.id);
            })
            setIds(arrray);
        }
    }, [event])

    useEffect(() => {
        funcs.setEvent(false);
        funcs.setSameEvents([]);
        funcs.setTeam(false);
        if (user.isAuth !== null && pk) {
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
        }
    }, [pk, user]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (event && !!user.user) {
            setIsFavorite(eventService.isFavorite(user.user, event));
        }
    }, [user, event])

    const editEvent = () => {
        if (event && user.isAuth && eventService.isOrganizer(event, user.user)) {
            funcs.openEditEvent();
        } else {
            funcs.openLogin();
        }
        funcs.removeMap();
    }

    const addToFavorites = () => {
        if (user.isAuth && !block) {
            if (!isTooltip) {
                setIsTooltip(true);
                setTooltip(isFavorite ? 'Удалено из избранного!' : 'Добавлено в избранное!')
                setTimeout(() => {
                    setIsTooltip(false);
                }, 1000)
            }
            setBlock(true);
            if (isFavorite) {
                setIsFavorite(false);
                authDecoratorWithoutLogin(eventService.removeFromFavorites, {'id': event.id}).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        funcs.setAuth(true, response.data);
                        setBlock(false);
                    }
                })
            } else {
                setIsFavorite(true);
                authDecoratorWithoutLogin(eventService.addToFavorites, {'id': event.id}).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        funcs.setAuth(true, response.data);
                        setBlock(false);
                    }
                })
            }
        }
    }
    return (
        <VisibleMainWrapper>
            <div className={`event-component ${!event ? 'loader' : ''}`}>
                {!event && <LoaderComponent/>}
                {event && <>
                    <Top376Component label={""} to={BaseRoutes.main}>
                        {/* <div className={`icon ${isFavorite ? 'yellow-star-icon' : 'dark-gray-star-icon'}`} onClick={addToFavorites}></div>  deleted design*/}
                        <img src={ShareArrowIcon} className={"icon"} onClick={() => share(EventRoutes.eventLink(event.id))}/>
                        {/* {user.isAuth && event && eventService.isOrganizer(event, user.user) && !event.is_end && !event.cancel && event.event_step.length <= 1 &&
                            <div className={"icon black-edit-icon"} onClick={editEvent}></div>} deleted design */}
                    </Top376Component>
                    {user.isAuth && event && eventService.isOrganizer(event, user.user) && 
                        <VisibleEventTopAdminEditBar/>
                    }
                    {(event.name && !eventService.isOrganizer(event, user.user)) && 
                    <div className="event-component-title">
                        {event.name}
                    </div>
                    }
                    <EventJoinInfo376 event={event} user={user.user}/>

                    {event && eventService.isOrganizer(event, user.user) &&
                    <div className="event-organizer-buttons-376">
                        <VisibleEventOrganizerButtons/>
                    </div>
                    }

                    

                    <VisibleJoinWithInfoCards/>
                    <EventInfo event={event}/>
                    <EventLimitsInfo376 event={event}/>
                    <EventMembers event={event}/>

                    {event && !event.cancel && user.isAuth && (eventService.isOrganizer(event, user.user) || ids.includes(user.user.id)) &&
                        <EventChatComponent event={event} user={user}/>
                    }
                   
                    {/* <VisibleBoardEvent/>
                    <VisibleEventOrganizer/> */}

                    {sameEvents.length !== 0 &&
                    <div className={"same-events-component"}>
                        <span className={"elem elem-1 black-600-20"}>Похожие события</span>
                        <div className={"elem elem-2"}>
                        {sameEvents.map((event, key) => (
                            <SameEventComponent className={`same-event-${key}`} event={event} key={key}/>
                        ))}
                        </div>
                    </div>}
                    <span className={`tooltip ${isTooltip ? '' : 'hidden'}`}>{tooltip}</span>
                </>}
                <div className="event-player-buttons-376">
                    <VisibleEventPlayerButtons/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}