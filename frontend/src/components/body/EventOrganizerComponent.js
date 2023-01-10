import EventMembersComponent from "./EventMembersComponent";
import EventDescriptionComponent from "./EventDescriptionComponent";
import React, {useEffect, useState} from "react";
import $ from "jquery";
import {EventChatComponent} from "./EventChatComponent";


export default function EventOrganizerComponent ({event, user, hiddenMap, funcs}) {
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

    const menuClick = (e) => {
        let parent = $(e.target).parent('.menu').parent('.event-organizer-elem-376');
        $(e.target).parent('.menu').children('span').addClass('inactive');
        $(e.target).parent('.menu').children('span').removeClass('active');
        $(e.target).removeClass('inactive');
        $(e.target).addClass('active');
        parent.children('.event-description-component').addClass('disabled');
        parent.children('.event-members-component').addClass('disabled');
        parent.children('.event-chat-component').addClass('disabled');
        parent.children(`.event-${$(e.target).attr('id')}-component`).removeClass('disabled');
    }

    return (
        <div className={"event-organizer-component"}>
            <div className={"event-organizer-elem-1280 elem-1"}>
                <EventDescriptionComponent event={event} user={user} hiddenMap={hiddenMap} funcs={funcs}/>
                {event && !event.cancel && user.isAuth && (event.organizer.id === user.user.id || ids.includes(user.user.id)) && <EventChatComponent event={event} user={user}/>}
            </div>
            <div className={"event-organizer-elem-1280 elem-2"}>
                <EventMembersComponent event={event}/>
            </div>

            <div className={"event-organizer-elem-744"}>
                <EventDescriptionComponent event={event} user={user} hiddenMap={hiddenMap} funcs={funcs}/>
            </div>
            <div className={"event-organizer-elem-744"}>
                {event && !event.cancel && user.isAuth && (event.organizer.id === user.user.id || ids.includes(user.user.id)) && <EventChatComponent event={event} user={user}/>}
                <EventMembersComponent event={event}/>
            </div>

            <div className={"event-organizer-elem-376"}>
                <div className={"menu"}>
                    <span className={"el active"} id={"description"} onClick={menuClick}>Информация</span>
                    <span className={"el inactive"} id={"members"} onClick={menuClick}>Участники</span>
                    <span className={"el inactive"} id={"chat"} onClick={menuClick}>Чат</span>
                </div>
                <EventDescriptionComponent event={event} user={user} hiddenMap={hiddenMap} funcs={funcs}/>
                <EventMembersComponent event={event}/>
                {event && !event.cancel && user.isAuth && (event.organizer.id === user.user.id || ids.includes(user.user.id)) && <EventChatComponent event={event} user={user}/>}
            </div>
        </div>
    )
}
