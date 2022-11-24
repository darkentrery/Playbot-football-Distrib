import EventMembersComponent from "./EventMembersComponent";
import EventDescriptionComponent from "./EventDescriptionComponent";
import {Link, Route, Routes} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import InActiveMenuLinkComponent from "../head/InActiveMenuLinkComponent";
import React, {useRef} from "react";
import $ from "jquery";
import EventChatComponent from "./EventChatComponent";

export default function EventOrganizerComponent () {

    const infoClick = (e) => {
        let parent = $(e.target).parent('.menu').parent('.elem-376');
        $(e.target).parent('.menu').children('span').addClass('inactive');
        $(e.target).parent('.menu').children('span').removeClass('active');
        $(e.target).removeClass('inactive');
        $(e.target).addClass('active');
        parent.children('.event-description-component').removeClass('disabled');
        parent.children('.event-members-component').addClass('disabled');
    }

    const membersClick = (e) => {
        let parent = $(e.target).parent('.menu').parent('.elem-376');
        $(e.target).parent('.menu').children('span').addClass('inactive');
        $(e.target).parent('.menu').children('span').removeClass('active');
        $(e.target).removeClass('inactive');
        $(e.target).addClass('active');
        parent.children('.event-description-component').addClass('disabled');
        parent.children('.event-members-component').removeClass('disabled');
    }


    return (
        <div className={"event-organizer-component"}>
            <div className={"elem-1280 elem-1"}>
                <EventDescriptionComponent/>
                <EventChatComponent/>
            </div>
            <div className={"elem-1280 elem-2"}>
                <EventMembersComponent/>
            </div>

            <div className={"elem-376"}>
                <div className={"menu"}>
                    <span className={"el active"} onClick={infoClick}>Информация</span>
                    <span className={"el inactive"} onClick={membersClick}>Участники</span>
                    <span className={"el inactive"}>Обсуждение</span>
                </div>
                <EventDescriptionComponent/>
                <EventMembersComponent/>


            </div>

        </div>
    )
}
