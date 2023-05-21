import EventMembersComponent from "../eventMembersComponent/EventMembersComponent";
import EventDescriptionComponent from "../eventDescriptionComponent/EventDescriptionComponent";
import React, {useEffect, useState} from "react";
import {EventChatComponent} from "../eventChatComponent/EventChatComponent";
import {eventService} from "../../services/EventService";


export default function EventOrganizerComponent ({event, user, hiddenMap, funcs}) {
    const flags = {
        description: "description",
        members: "members",
        chat: "chat",
    }
    const [ids, setIds] = useState([]);
    const [flagMenu, setFlagMenu] = useState(flags.description);

    useEffect(() => {
        if (event && event.event_player) {
            let arrray = [];
            event.event_player.map((item) => {
                arrray.push(item.player.id);
            })
            setIds(arrray);
        }
    }, [event])

    return (
        <div className={"event-organizer-component"}>
            <div className={"event-organizer-elem-1280 elem-1"}>
                <EventDescriptionComponent event={event} user={user} hiddenMap={hiddenMap} funcs={funcs}/>
                {event && !event.cancel && user.isAuth && (eventService.isOrganizer(event, user.user) || ids.includes(user.user.id)) && <EventChatComponent event={event} user={user}/>}
            </div>
            <div className={"event-organizer-elem-1280 elem-2"}>
                <EventMembersComponent event={event}/>
            </div>

            <div className={"event-organizer-elem-744"}>
                <EventDescriptionComponent event={event} user={user} hiddenMap={hiddenMap} funcs={funcs}/>
            </div>
            <div className={"event-organizer-elem-744"}>
                {event && !event.cancel && user.isAuth && (eventService.isOrganizer(event, user.user) || ids.includes(user.user.id)) && <EventChatComponent event={event} user={user}/>}
                <EventMembersComponent event={event}/>
            </div>

            <div className={"event-organizer-elem-376"}>
                <div className={"menu"}>
                    <span className={`el ${flagMenu === flags.description ? 'active' : 'inactive'}`} onClick={() => setFlagMenu(flags.description)}>Информация</span>
                    <span className={`el ${flagMenu === flags.members ? 'active' : 'inactive'}`} onClick={() => setFlagMenu(flags.members)}>Участники</span>
                    <span className={`el ${flagMenu === flags.chat ? 'active' : 'inactive'}`} onClick={() => setFlagMenu(flags.chat)}>Чат</span>
                </div>
                <EventDescriptionComponent
                    event={event}
                    user={user}
                    hiddenMap={hiddenMap}
                    funcs={funcs}
                    className={flagMenu === flags.description ? '' : 'disabled'}
                />
                <EventMembersComponent event={event} className={flagMenu === flags.members ? '' : 'disabled'}/>
                {event && !event.cancel && user.isAuth && (eventService.isOrganizer(event, user.user) || ids.includes(user.user.id)) &&
                    <EventChatComponent event={event} user={user} className={flagMenu === flags.chat ? '' : 'disabled'}/>}
            </div>
        </div>
    )
}
