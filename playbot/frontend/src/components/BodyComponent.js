import {Link, Route, Routes} from "react-router-dom";

import React, {useContext, useEffect, useState} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import {OpenLoginContext, OpenSignUpContext} from "../context/AuthContext";
import EventComponent from "./body/EventComponent";
import MainPageComponent from "./body/MainPageComponent";
import EventsPageComponent from "./body/EventsPageComponent";
import EventService from "../services/EventService";


export default function BodyComponent () {
    const eventService = new EventService();
    const [eventsPk, setEventsPk] = useState([]);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };

    useEffect(() => {
        if (!eventsPk.length) {
            eventService.getEvents().then((response) => {
                console.log(response)
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

                {eventsPk.length !== 0 && eventsPk.map((item, key) => {
                    return (<Route exact path={'events/' + BaseRoutes.eventLink(item)} element={<EventComponent pk={item}/>}/>)
                })}
            </Routes>

        </div>
    )
}