import { useState, useEffect } from 'react';
import { eventService } from '../../services/EventService';
import { ButtonsBoardOrganizerComponent } from '../body/ButtonsBoardOrganizerComponent';
import { ButtonsBoardPlayerComponent } from '../body/ButtonsBoardPlayerComponent';
import { EventCardsInfo } from '../EventCardsInfo/EventCardsInfo';
import EventJoinInfo from '../EventJoinInfo/EventJoinInfo';

export const EventJoinWithInfoCards = ({
    event,
    user,
    funcs,
}) => {
    return (
        <>
            {event &&
            <div className={"event-join-top" + (eventService.isOrganizer(event, user.user) ? " event-join-top-organizer" : "")}>
                <EventCardsInfo event={event}/>
                <div className="event-join-action">
                    <EventJoinInfo event={event}/>
                    <div className="event-join-action-buttons">
                    {user.isAuth && eventService.isOrganizer(event, user.user) 
                    ?
                        <ButtonsBoardOrganizerComponent event={event} funcs={funcs}/> 
                    :
                        <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>
                    }
                    </div>
                </div>
            
            </div>}
        </>
        
    )
}

export default EventJoinWithInfoCards