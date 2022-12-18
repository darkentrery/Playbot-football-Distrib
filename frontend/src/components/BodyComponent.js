import {Route, Routes} from "react-router-dom";
import React from "react";
import BaseRoutes from "../routes/BaseRoutes";
import VisibleEvent from "../redux/containers/VisibleEvent";
import VisibleMainPage from "../redux/containers/VisibleMainPage";
import VisibleEventsPage from "../redux/containers/VisibleEventsPage";
import {AllowPolicyComponent} from "./body/AllowPolicyComponent";
import {AllowOfferComponent} from "./body/AllowOfferComponent";


export default function BodyComponent () {

    return(
        <div className={"body"}>
            <Routes>
                <Route exact path={BaseRoutes.events} element={<VisibleEventsPage/>}/>
                <Route exact path={BaseRoutes.main} element={<VisibleMainPage/>}/>
                <Route exact path={BaseRoutes.statistic} element={<VisibleMainPage/>}/>
                <Route exact path={BaseRoutes.faq} element={<VisibleMainPage/>}/>
                <Route exact path={BaseRoutes.event} element={<VisibleEvent/>}/>
                <Route exact path={BaseRoutes.allowPolicy} element={<AllowPolicyComponent/>}/>
                <Route exact path={BaseRoutes.allowOffer} element={<AllowOfferComponent/>}/>
            </Routes>
        </div>
    )
}