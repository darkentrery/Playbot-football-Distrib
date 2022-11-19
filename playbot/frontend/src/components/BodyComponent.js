import {Route, Routes} from "react-router-dom";

import React from "react";
import BaseRoutes from "../routes/BaseRoutes";
import EventsComponent from "./body/EventsComponent";

export default function BodyComponent () {


    return(
        <div className={"body"}>
            <EventsComponent/>
            {/*<Routes>*/}
            {/*    <Route exact path={BaseRoutes.events} element={<EventsComponent/>}/>*/}
            {/*    <Route exact path={BaseRoutes.main} element={""}/>*/}
            {/*</Routes>*/}
        </div>
    )
}