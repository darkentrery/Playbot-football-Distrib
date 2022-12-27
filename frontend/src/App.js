import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import { YMaps, Map, Placemark, Panorama } from '@pbe/react-yandex-maps';
import EventService from "./services/EventService";

import MobileFirstPageComponent from "./components/MobileFirstPageComponent";
import AuthService from "./services/AuthService";
import BodyComponent from "./components/BodyComponent";
import BottomComponent from "./components/BottomComponent";
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
import $ from "jquery";
import HeadComponent from "./components/HeadComponent";
import VisibleLeaveEvent from "./redux/containers/VisibleLeaveEvent";
import VisibleUnAuthJoin from "./redux/containers/VisibleUnAuthJoin";
import VisibleConfirmTeamPlayers from "./redux/containers/VisibleConfirmTeamPlayers";
import BaseRoutes from "./routes/BaseRoutes";
import VisibleEventsPage from "./redux/containers/VisibleEventsPage";
import {GeneralInformationComponent} from "./components/generalInformationComponent/GeneralInformationComponent";
import VisibleMainPage from "./redux/containers/VisibleMainPage";
import VisibleEvent from "./redux/containers/VisibleEvent";
import {AllowPolicyComponent} from "./components/body/AllowPolicyComponent";
import {AllowOfferComponent} from "./components/body/AllowOfferComponent";
import VisibleGeneralInformation from "./redux/containers/VisibleGeneralInformation";
import VisibleTeamsInformation from "./redux/containers/VisibleTeamsInformation";



function App({state, funcs}) {
    console.log(state)

    const authService = new AuthService();
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    // const [isUserDropdown, setIsUserDropdown] = useState(false);
    const [firstRequest, setFirstRequest] = useState(true);

    const eventService = new EventService();

    const auth = async () => {
        await authDecoratorWithoutLogin(authService.isAuth, []).then((response) => {
            if (response.status == 200) {
                funcs.setAuth(true, response.data);
            } else {
                funcs.setAuth(false, false);
            }
            setFirstRequest(false);
        })
    }

    var lastY = 1;
    document.addEventListener("touchmove", function (event) {
        let lastS = document.documentElement.scrollTop;
        if(lastS === 0 && (lastY - event.touches[0].clientY) < 0 && event.cancelable){
            event.preventDefault();
            event.stopPropagation();
        }
        lastY = event.touches[0].clientY;
    },{passive: false});

    useEffect(() => {
        let isSubscribe = true;
        auth();
        funcs.setIsIPhone(authService.deviceDetect());
        return () => isSubscribe = false;

    }, [])

    // useEffect(() => {
    //     auth();
    // }, [state.user.isAuth])
    //
    //
    //
    // useEffect(() => {
    //     funcs.setIsIPhone(authService.deviceDetect());
    // }, [state.app.isIPhone])

    useEffect(() => {
        if (!confirmSignUp && window.location.pathname.includes("confirm-sign-up/")) {
            authService.confirmSignUp(window.location.pathname)
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

    // const pageClick = (e) => {
    //     if (!$(e.target).hasClass('dropdown-icon') && !$(e.target).hasClass('dropdown-label')
    //         && !$(e.target).hasClass('arrow-icon') && !$(e.target).hasClass('dropdown-head')) {
    //         setIsUserDropdown(!isUserDropdown);
    //     }
    // }




  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route exact path={BaseRoutes.events} element={<VisibleEventsPage/>}/>
                  <Route exact path={BaseRoutes.main} element={<VisibleMainPage/>}/>
                  <Route exact path={BaseRoutes.statistic} element={<VisibleMainPage/>}/>
                  <Route exact path={BaseRoutes.faq} element={<VisibleMainPage/>}/>
                  <Route exact path={BaseRoutes.event} element={<VisibleEvent/>}/>
                  <Route exact path={BaseRoutes.allowPolicy} element={<AllowPolicyComponent/>}/>
                  <Route exact path={BaseRoutes.allowOffer} element={<AllowOfferComponent/>}/>
                  <Route exact path={BaseRoutes.eventInfo} element={<VisibleGeneralInformation/>}/>
                  <Route exact path={BaseRoutes.eventInfoTeams} element={<VisibleTeamsInformation/>}/>
              </Routes>

              {/*<YMaps>*/}
              {/*    <Map defaultState={defaultState} modules={["control.ZoomControl", "control.FullscreenControl"]} width={600}>*/}
              {/*      /!*<Placemark geometry={[55.684758, 37.738521]} />*!/*/}
              {/*        <Panorama defaultPoint={[55.733685, 37.588264]} />*/}
              {/*    </Map>*/}
              {/*  </YMaps>*/}

              <MobileFirstPageComponent isOpen={state.windows.isOpenMobileFirstPage} firstRequest={firstRequest} isAuth={state.user.isAuth} funcs={funcs}/>
              <VisibleSignUp/>
              <VisibleLogin/>
              <VisibleRefreshPassword/>
              <VisibleSuccessRefreshPassword/>
              <VisibleSuccessSignUp/>
              <VisibleSuccessSignUp2/>
              <VisibleChoiceCity/>
              <VisibleSuccessCreateEvent/>
              <VisibleSuccessEditEvent/>
              <VisibleCreateEvent/>
              <VisibleCreateEventUnAuth/>
              <VisibleEditEvent/>
              <VisibleCancelEvent/>
              <VisibleLeaveEvent/>
              <VisibleUnAuthJoin/>

              <ConfirmPlayersComponent isOpen={state.windows.isOpenConfirmPlayers} event={state.event.event}
                                       funcs={funcs} isIPhone={state.app.isIPhone}/>
              <FillRegulationComponent isOpen={state.windows.isOpenFillRegulation} event={state.event.event}
                                       funcs={funcs} isIPhone={state.app.isIPhone}/>
              <ConfirmTeamsComponent isOpen={state.windows.isOpenConfirmTeams} event={state.event.event}
                                     funcs={funcs} isIPhone={state.app.isIPhone}/>
              <VisibleConfirmTeamPlayers/>

          </Router>
      </div>
  );
}

export default App;
