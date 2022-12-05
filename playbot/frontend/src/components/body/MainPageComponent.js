import TitleComponent from "./TitleComponent";
import React from "react";
import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";
import BestPlayersComponent from "./BestPlayersComponent";
import VisibleBoardCreateEvent from "../../redux/containers/VisibleBoardCreateEvent";


export default function MainPageComponent () {

    return (
        <div className={"main-page-component"}>
            <VisibleBoardCreateEvent/>

            <TitleComponent label={"Список событий"}/>
            <LocationComponent/>
            <EventsComponent/>

            <div className={"elem-1280"}>
                <TitleComponent label={"Лучшие игроки"}/>
                <LocationComponent/>
                <BestPlayersComponent/>
            </div>


        </div>
    )
}