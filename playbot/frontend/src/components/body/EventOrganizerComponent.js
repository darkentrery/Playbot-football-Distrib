import EventMembersComponent from "./EventMembersComponent";
import EventDescriptionComponent from "./EventDescriptionComponent";
import React from "react";
import $ from "jquery";
import EventChatComponent from "./EventChatComponent";


export default function EventOrganizerComponent ({event, players, user, funcs}) {

    const menuClick = (e) => {
        let parent = $(e.target).parent('.menu').parent('.elem-376');
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
            <div className={"elem-1280 elem-1"}>
                <EventDescriptionComponent event={event} user={user} funcs={funcs}/>
                <EventChatComponent/>
            </div>
            <div className={"elem-1280 elem-2"}>
                <EventMembersComponent event={event} players={players}/>
            </div>

            <div className={"elem-744"}>
                <EventDescriptionComponent event={event} user={user} funcs={funcs}/>
                <EventMembersComponent event={event} players={players}/>
            </div>
            <div className={"elem-744"}>
                <EventChatComponent/>
            </div>

            <div className={"elem-376"}>
                <div className={"menu"}>
                    <span className={"el active"} id={"description"} onClick={menuClick}>Информация</span>
                    <span className={"el inactive"} id={"members"} onClick={menuClick}>Участники</span>
                    <span className={"el inactive"} id={"chat"} onClick={menuClick}>Обсуждение</span>
                </div>
                <EventDescriptionComponent event={event} user={user} funcs={funcs}/>
                <EventMembersComponent event={event} players={players}/>
                <EventChatComponent/>
            </div>
        </div>
    )
}
