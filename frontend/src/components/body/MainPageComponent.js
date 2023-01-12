import TitleComponent from "./TitleComponent";
import React from "react";
import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";
import BestPlayersComponent from "./BestPlayersComponent";
import VisibleBoardCreateEvent from "../../redux/containers/VisibleBoardCreateEvent";
import BaseRoutes from "../../routes/BaseRoutes";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";


export default function MainPageComponent ({state, funcs}) {

    return (
        <VisibleMainWrapper>
            <div className={"main-page-component"}>
                <VisibleBoardCreateEvent/>
                <TitleComponent label={"Список событий"} to={BaseRoutes.events}/>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user}/>
                <div className={"elem-1280"}>
                    <TitleComponent label={"Лучшие игроки"} to={BaseRoutes.main}/>
                    <LocationComponent state={state} funcs={funcs}/>
                    <BestPlayersComponent/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}