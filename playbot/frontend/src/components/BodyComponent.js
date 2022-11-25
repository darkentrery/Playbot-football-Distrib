import {Link, Route, Routes} from "react-router-dom";

import React, {useContext, useState} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventsComponent from "./body/EventsComponent";
import BoardCreateEventComponent from "./body/BoardCreateEventComponent";
import {OpenLoginContext, OpenSignUpContext} from "../context/AuthContext";
import BestPlayersComponent from "./body/BestPlayersComponent";
import NoEventsComponent from "./body/NoEventsComponent";
import TitleComponent from "./body/TitleComponent";
import LocationComponent from "./body/LocationComponent";
import BoardEventOrganizerComponent from "./body/BoardEventOrganizerComponent";
import EventComponent from "./body/EventComponent";
import InActiveMenuLinkComponent from "./head/InActiveMenuLinkComponent";
import MainPageComponent from "./body/MainPageComponent";
import EventsPageComponent from "./body/EventsPageComponent";


export default function BodyComponent () {
    const [eventPk, setEventPk] = useState(1);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };



    return(
        <div className={"body"}>
            <Routes>
                <Route exact path={BaseRoutes.events} element={<EventsPageComponent/>}/>
                <Route exact path={BaseRoutes.main} element={<MainPageComponent/>}/>

                <Route exact path={BaseRoutes.eventLink(eventPk)} element={<EventComponent pk={eventPk}/>}/>
            </Routes>

            <Link to={BaseRoutes.eventLink(2)} onClick={(e) => {
                console.log(eventPk)
                setEventPk(2)
            }}>sdfsdfsd</Link>





        </div>
    )
}