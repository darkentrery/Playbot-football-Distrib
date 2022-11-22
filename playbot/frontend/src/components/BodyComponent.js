import {Route, Routes} from "react-router-dom";

import React, {useContext} from "react";
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


export default function BodyComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };


    return(
        <div className={"body"}>
            <EventComponent/>
            {/*<OpenSignUpContext.Provider value={signUpWindow}>*/}
            {/*    <OpenLoginContext.Provider value={loginWindow}>*/}
            {/*        <BoardCreateEventComponent/>*/}
            {/*    </OpenLoginContext.Provider>*/}
            {/*</OpenSignUpContext.Provider>*/}

            <TitleComponent label={"Список событий"}/>
            <LocationComponent/>
            <NoEventsComponent/>

            <TitleComponent label={"Список событий"}/>
            <LocationComponent/>
            <EventsComponent/>

            <TitleComponent label={"Лучшие игроки"}/>
            <LocationComponent/>
            <BestPlayersComponent/>

        </div>
    )
}