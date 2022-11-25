import TitleComponent from "./TitleComponent";
import React, {useContext} from "react";
import LocationComponent from "./LocationComponent";
import NoEventsComponent from "./NoEventsComponent";
import EventsComponent from "./EventsComponent";
import BestPlayersComponent from "./BestPlayersComponent";
import {OpenLoginContext, OpenSignUpContext} from "../../context/AuthContext";
import BoardCreateEventComponent from "./BoardCreateEventComponent";


export default function MainPageComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };

    return (
        <div className={"main-page-component"}>
            {/*<OpenSignUpContext.Provider value={signUpWindow}>*/}
            {/*    <OpenLoginContext.Provider value={loginWindow}>*/}
                    <BoardCreateEventComponent/>
                {/*</OpenLoginContext.Provider>*/}
            {/*</OpenSignUpContext.Provider>*/}

            <TitleComponent label={"Список событий"}/>
            <LocationComponent/>
            <NoEventsComponent/>

            <TitleComponent label={"Список событий"}/>
            <LocationComponent/>
            <EventsComponent/>

            <TitleComponent label={"Лучшие игроки"}/>
            <LocationComponent/>
            <BestPlayersComponent/>
        </div>
    )
}