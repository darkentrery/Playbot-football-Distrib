import {Route, Routes} from "react-router-dom";
import EventsComponent from "./EventsComponent";
import React from "react";
import BaseRoutes from "../routes/BaseRoutes";

export default function BodyComponent () {


    return(
        <div className={"body"}>
            <Routes>
                <Route exact path={BaseRoutes.events} element={<EventsComponent/>}/>
                <Route exact path={BaseRoutes.main} element={""}/>
            </Routes>
        </div>
    )
}