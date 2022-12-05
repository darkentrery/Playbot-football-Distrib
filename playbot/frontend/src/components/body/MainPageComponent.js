import TitleComponent from "./TitleComponent";
import React from "react";
import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";
import BestPlayersComponent from "./BestPlayersComponent";
import VisibleBoardCreateEvent from "../../redux/containers/VisibleBoardCreateEvent";
import BaseRoutes from "../../routes/BaseRoutes";


export default function MainPageComponent ({state, funcs}) {

    return (
        <div className={"main-page-component"}>
            <VisibleBoardCreateEvent/>

            <TitleComponent label={"Список событий"} to={BaseRoutes.events}/>
            <LocationComponent state={state} funcs={funcs}/>
            <EventsComponent/>

            <div className={"elem-1280"}>
                <TitleComponent label={"Лучшие игроки"} to={BaseRoutes.main}/>
                <LocationComponent state={state} funcs={funcs}/>
                <BestPlayersComponent/>
            </div>


        </div>
    )
}