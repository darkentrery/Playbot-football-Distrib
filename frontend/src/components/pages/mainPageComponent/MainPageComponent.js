import TitleComponent from "../../body/TitleComponent";
import React, {useEffect, useState} from "react";
import LocationComponent from "../../body/LocationComponent";
import EventsComponent from "../../body/EventsComponent";
import {BestPlayersComponent} from "../../bestPlayersComponent/BestPlayersComponent";
import VisibleBoardCreateEvent from "../../../redux/containers/VisibleBoardCreateEvent";
import BaseRoutes from "../../../routes/BaseRoutes";
import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";
import {authService} from "../../../services/AuthService";
import {NoticeListTopComponent} from "../../noticeListTopComponent/NoticeListTopComponent";


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
                {state.user.user && state.user.user.warning_notices.length !== 0 &&
                    <NoticeListTopComponent user={state.user.user} setUser={funcs.setAuth}/>}
                <VisibleBoardCreateEvent/>
                <TitleComponent label={"Список событий"} to={BaseRoutes.events}/>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user}/>
                <div className={"best-players-1280"}>
                    <TitleComponent label={"Лучшие игроки"} to={BaseRoutes.main}/>
                    <LocationComponent state={state} funcs={funcs}/>
                    <BestPlayersComponent players={players}/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}