import {Route, Routes} from "react-router-dom";

import React, {useContext} from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventsComponent from "./body/EventsComponent";
import BoardCreateEventComponent from "./body/BoardCreateEventComponent";
import {OpenLoginContext} from "../context/AuthContext";

export default function BodyComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const loginWindow = { openLogin, setOpenLogin };


    return(
        <div className={"body"}>
            <OpenLoginContext.Provider value={loginWindow}>
                <BoardCreateEventComponent/>
            </OpenLoginContext.Provider>

            <EventsComponent/>
            {/*<Routes>*/}
            {/*    <Route exact path={BaseRoutes.events} element={<EventsComponent/>}/>*/}
            {/*    <Route exact path={BaseRoutes.main} element={""}/>*/}
            {/*</Routes>*/}
        </div>
    )
}