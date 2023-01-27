import TitleComponent from "../body/TitleComponent";
import React, {useEffect, useState} from "react";
import LocationComponent from "../body/LocationComponent";
import EventsComponent from "../body/EventsComponent";
import {BestPlayersComponent} from "../bestPlayersComponent/BestPlayersComponent";
import VisibleBoardCreateEvent from "../../redux/containers/VisibleBoardCreateEvent";
import BaseRoutes from "../../routes/BaseRoutes";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";
import {WarningNoticeComponent} from "../warningNoticeComponent/WarningNoticeComponent";
import {authService} from "../../services/AuthService";


export default function MainPageComponent ({state, funcs}) {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let isSubscribe = true;
        authService.getUsers().then((response) => {
            if (response.status === 200) {
                setPlayers(response.data);
            }
        })
        return () => isSubscribe = false;
    }, [state.user.user])

    return (
        <VisibleMainWrapper>
            <div className={"main-page-component"}>
                <WarningNoticeComponent content={'Все места заняты. Вы можете попасть в лист ожидания. Если кто-то не сможет прийти на игру с вами свяжутся. '} critical={true}/>
                <VisibleBoardCreateEvent/>
                <TitleComponent label={"Список событий"} to={BaseRoutes.events}/>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user}/>
                <div className={"elem-1280"}>
                    <TitleComponent label={"Лучшие игроки"} to={BaseRoutes.main}/>
                    <LocationComponent state={state} funcs={funcs}/>
                    <BestPlayersComponent players={players}/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}