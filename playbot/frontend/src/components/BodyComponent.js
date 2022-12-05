import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventService from "../services/EventService";
import VisibleEvent from "../redux/containers/VisibleEvent";
import VisibleMainPage from "../redux/containers/VisibleMainPage";
import VisibleEventsPage from "../redux/containers/VisibleEventsPage";


export default function BodyComponent () {
    const eventService = new EventService();
    const [eventsPk, setEventsPk] = useState(false);

    useEffect(() => {
        if (eventsPk === false) {
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
                <Route exact path={BaseRoutes.events} element={<VisibleEventsPage/>}/>
                <Route exact path={BaseRoutes.main} element={<VisibleMainPage/>}/>
                <Route exact path={'events/event/:pk/'} element={<VisibleEvent/>}/>
            </Routes>
        </div>
    )
}