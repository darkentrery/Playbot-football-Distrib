import {Link, Route, Routes} from "react-router-dom";

import React, {useContext, useEffect, useState} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventComponent from "./body/EventComponent";
import MainPageComponent from "./body/MainPageComponent";
import EventsPageComponent from "./body/EventsPageComponent";
import EventService from "../services/EventService";


export default function BodyComponent () {
    const eventService = new EventService();
    const [eventsPk, setEventsPk] = useState([]);

    useEffect(() => {
        if (!eventsPk.length) {
            eventService.getEvents().then((response) => {
                if (response.status === 200) {
                    let data = [];
                    response.data.map((item, key) => {
                        data.push(item.id)
                    })
                    setEventsPk(data);
                }
            })
        }
    }, [eventsPk])



    return(
        <div className={"body"}>
            <Routes>
                <Route exact path={BaseRoutes.events} element={<EventsPageComponent/>}/>
                <Route exact path={BaseRoutes.main} element={<MainPageComponent/>}/>

                {/*<Route exact path={'events/event/:pk/'} element={<EventComponent/>}/>*/}

                {eventsPk.length !== 0 && eventsPk.map((item, key) => {
                    return (<Route exact path={'events/' + BaseRoutes.eventLink(item)} element={<EventComponent pk={item}/>}/>)
                })}
            </Routes>

        </div>
    )
}