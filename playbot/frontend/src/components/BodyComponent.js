import {Route, Routes} from "react-router-dom";

import React, {useContext} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventsComponent from "./body/EventsComponent";
import BoardCreateEventComponent from "./body/BoardCreateEventComponent";
import {OpenLoginContext, OpenSignUpContext} from "../context/AuthContext";
import BestPlayersComponent from "./body/BestPlayersComponent";

export default function BodyComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };


    return(
        <div className={"body"}>
            <OpenSignUpContext.Provider value={signUpWindow}>
                <OpenLoginContext.Provider value={loginWindow}>
                    <BoardCreateEventComponent/>
                </OpenLoginContext.Provider>
            </OpenSignUpContext.Provider>


            <EventsComponent/>
            <BestPlayersComponent/>
            {/*<Routes>*/}
            {/*    <Route exact path={BaseRoutes.events} element={<EventsComponent/>}/>*/}
            {/*    <Route exact path={BaseRoutes.main} element={""}/>*/}
            {/*</Routes>*/}
        </div>
    )
}