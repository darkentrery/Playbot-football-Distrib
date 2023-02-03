import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { YMaps, Map, Placemark, Panorama } from '@pbe/react-yandex-maps';

import MobileFirstPageComponent from "./components/MobileFirstPageComponent";
import AuthService from "./services/AuthService";
import VisibleSignUp from "./redux/containers/VisibleSignUp";
import VisibleLogin from "./redux/containers/VisibleLogin";
import VisibleRefreshPassword from "./redux/containers/VisibleRefreshPassword";
import VisibleSuccessRefreshPassword from "./redux/containers/VisibleSuccessRefreshPassword";
import VisibleSuccessSignUp from "./redux/containers/VisibleSuccessSignUp";
import VisibleSuccessSignUp2 from "./redux/containers/VisibleSuccessSignUp2";
import VisibleChoiceCity from "./redux/containers/VisibleChoiceCity";
import {authDecoratorWithoutLogin} from "./services/AuthDecorator";
import VisibleSuccessCreateEvent from "./redux/containers/VisibleSuccessCreateEvent";
import VisibleCreateEvent from "./redux/containers/VisibleCreateEvent";
import VisibleCreateEventUnAuth from "./redux/containers/VisibleCreateEventUnAuth";
import VisibleSuccessEditEvent from "./redux/containers/VisibleSuccessEditEvent";
import VisibleEditEvent from "./redux/containers/VisibleEditEvent";
import VisibleCancelEvent from "./redux/containers/VisibleCancelEvent";
import FillRegulationComponent from "./components/popups/FillRegulationComponent";
import ConfirmTeamsComponent from "./components/popups/ConfirmTeamsComponent";
import ConfirmPlayersComponent from "./components/popups/ConfirmPlayersComponent";
import VisibleLeaveEvent from "./redux/containers/VisibleLeaveEvent";
import VisibleUnAuthJoin from "./redux/containers/VisibleUnAuthJoin";
import VisibleConfirmTeamPlayers from "./redux/containers/VisibleConfirmTeamPlayers";
import BaseRoutes from "./routes/BaseRoutes";
import VisibleEventsPage from "./redux/containers/VisibleEventsPage";
import VisibleMainPage from "./redux/containers/VisibleMainPage";
import VisibleEvent from "./redux/containers/VisibleEvent";
import {AllowPolicyComponent} from "./components/body/AllowPolicyComponent";
import {AllowOfferComponent} from "./components/body/AllowOfferComponent";
import VisibleGeneralInformation from "./redux/containers/VisibleGeneralInformation";
import VisibleTeamsInformation from "./redux/containers/VisibleTeamsInformation";
import VisibleRepeatEvent from "./redux/containers/VisibleRepeatEvent";
import {RulesPageComponent} from "./components/pages/RulesPageComponent";
import {FaqPageComponent} from "./components/pages/FaqPageComponent";
import VisibleGamePlayer from "./redux/containers/VisibleGamePlayer";
import VisibleSuccessCancelEvent from "./redux/containers/VisibleSuccessCancelEvent";
import VisibleEndGame from "./redux/containers/VisibleEndGame";
import EventRoutes from "./routes/EventRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import VisibleMyEventsPage from "./redux/containers/VisibleMyEventsPage";
import VisibleFavorites from "./redux/containers/VisibleFavorites";
import VisibleProfilePersonalData from "./redux/containers/VisibleProfilePersonalData";
import VisiblePreviewPlayer from "./redux/containers/VisiblePreviewPlayer";
import VisibleSuccessUpdateUser from "./redux/containers/VisibleSuccessUpdateUser";
import VisibleUpdatePassword from "./redux/containers/VisibleUpdatePassword";
import VisibleSuccessUpdatePassword from "./redux/containers/VisibleSuccessUpdatePassword";
import VisibleMyProfile from "./redux/containers/VisibleMyProfile";
import VisibleShowEmblem from "./redux/containers/VisibleShowEmblem";
import VisibleShowMenu from "./redux/containers/VisibleShowMenu";
import VisibleStatisticPage from "./redux/containers/VisibleStatisticPage";


function App({state, funcs}) {
    const authService = new AuthService();
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const [firstRequest, setFirstRequest] = useState(true);

    var lastY = 1;
    document.addEventListener("touchmove", function (event) {
        let lastS = document.documentElement.scrollTop;
        if (lastS === 0 && (lastY - event.touches[0].clientY) < 0 && event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
        }
        lastY = event.touches[0].clientY;
    },{passive: false});

    useEffect(() => {
        console.log(state)
        if (firstRequest) {
            let isSubscribe = true;
            authDecoratorWithoutLogin(authService.isAuth, false).then((response) => {
                if (response.status == 200) {
                    funcs.setAuth(true, response.data);
                } else {
                    funcs.setAuth(false, false);
                    funcs.openMobileFirstPage();
                }
                setFirstRequest(false);
            })
            funcs.setIsIPhone(authService.deviceDetect());
            return () => isSubscribe = false;
        }
    }, [state.user])


    useEffect(() => {
        if (!confirmSignUp && window.location.pathname.includes("confirm-sign-up/")) {
            authService.confirmSignUp(window.location.pathname);
            setConfirmSignUp(true);
            funcs.openSuccessSignUp2();
        }
    }, [confirmSignUp])


    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"],
    };

    useEffect(() => {
        if (localStorage.telegramLogin === 'true') {
            // openChoiceCity();
            localStorage.telegramLogin = false;
            funcs.openSuccessSignUp2();
        }
    }, [localStorage.telegramLogin])

    // console.log(window.matchMedia)
    // console.log(navigator)
    // console.log(document.referrer)

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path={EventRoutes.events} element={<VisibleEventsPage/>}/>
                    <Route exact path={BaseRoutes.main} element={<VisibleMainPage/>}/>
                    <Route exact path={BaseRoutes.statistic} element={<VisibleStatisticPage/>}/>
                    <Route exact path={BaseRoutes.faq} element={<FaqPageComponent/>}/>
                    <Route exact path={EventRoutes.event} element={<VisibleEvent/>}/>
                    <Route exact path={BaseRoutes.allowPolicy} element={<AllowPolicyComponent/>}/>
                    <Route exact path={BaseRoutes.allowOffer} element={<AllowOfferComponent/>}/>
                    <Route exact path={EventRoutes.eventInfo} element={<VisibleGeneralInformation/>}/>
                    <Route exact path={EventRoutes.eventInfoTeams} element={<VisibleTeamsInformation/>}/>
                    <Route exact path={EventRoutes.eventGamePlayer} element={<VisibleGamePlayer/>}/>
                    <Route exact path={BaseRoutes.rules} element={<RulesPageComponent/>}/>
                    <Route exact path={ProfileRoutes.profileMyEvents} element={<VisibleMyEventsPage/>}/>
                    <Route exact path={ProfileRoutes.profileFavorites} element={<VisibleFavorites/>}/>
                    <Route exact path={ProfileRoutes.profilePersonalData} element={<VisibleProfilePersonalData/>}/>
                    <Route exact path={ProfileRoutes.previewPlayer} element={<VisiblePreviewPlayer/>}/>
                    <Route exact path={ProfileRoutes.myProfile} element={<VisibleMyProfile/>}/>
                </Routes>

                  {/*<YMaps>*/}
                  {/*    <Map defaultState={defaultState} modules={["control.ZoomControl", "control.FullscreenControl"]} width={600}>*/}
                  {/*      /!*<Placemark geometry={[55.684758, 37.738521]} />*!/*/}
                  {/*        <Panorama defaultPoint={[55.733685, 37.588264]} />*/}
                  {/*    </Map>*/}
                  {/*  </YMaps>*/}

                <MobileFirstPageComponent isOpen={state.windows.isOpenMobileFirstPage} isIPhone={state.app.isIPhone} funcs={funcs}/>
                <VisibleSignUp/>
                <VisibleLogin/>
                <VisibleRefreshPassword/>
                <VisibleSuccessRefreshPassword/>
                <VisibleSuccessSignUp/>
                <VisibleSuccessSignUp2/>
                <VisibleChoiceCity/>
                <VisibleSuccessCreateEvent/>
                <VisibleSuccessEditEvent/>
                <VisibleSuccessCancelEvent/>
                <VisibleSuccessUpdateUser/>
                <VisibleCreateEvent/>
                <VisibleCreateEventUnAuth/>
                <VisibleEditEvent/>
                <VisibleRepeatEvent/>
                <VisibleCancelEvent/>
                <VisibleLeaveEvent/>
                <VisibleUnAuthJoin/>
                <VisibleUpdatePassword/>
                <VisibleSuccessUpdatePassword/>
                <VisibleShowEmblem/>
                <VisibleShowMenu/>

                <ConfirmPlayersComponent isOpen={state.windows.isOpenConfirmPlayers} event={state.event.event}
                                           funcs={funcs} isIPhone={state.app.isIPhone}/>
                <FillRegulationComponent isOpen={state.windows.isOpenFillRegulation} event={state.event.event}
                                           funcs={funcs} isIPhone={state.app.isIPhone}/>
                <ConfirmTeamsComponent isOpen={state.windows.isOpenConfirmTeams} event={state.event.event}
                                         funcs={funcs} isIPhone={state.app.isIPhone}/>
                <VisibleConfirmTeamPlayers/>
                <VisibleEndGame/>

            </Router>
        </div>
    );
}

export default App;
