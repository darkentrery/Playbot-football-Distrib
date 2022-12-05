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
import VisibleHead from "./redux/containers/VisibleHead";
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


function App({state, funcs}) {
    console.log(state)

    const authService = new AuthService();
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const [isUserDropdown, setIsUserDropdown] = useState(false);

    const eventService = new EventService();

    const auth = async () => {
        await authDecoratorWithoutLogin(authService.isAuth, []).then((response) => {
            if (response.status == 200) {
                funcs.setAuth(true, response.data);
            } else {
                funcs.setAuth(false, false);
            }
        })
    }

    useEffect(() => {
        auth();
    }, [state.user.isAuth])

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

    // useEffect(() => {

    // }, [openMobileFirstPage])


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

    const pageClick = (e) => {
        if (!$(e.target).hasClass('dropdown-icon') && !$(e.target).hasClass('dropdown-label')
            && !$(e.target).hasClass('arrow-icon') && !$(e.target).hasClass('dropdown-head')) {
            setIsUserDropdown(!isUserDropdown);
        }
    }




  return (
      <div className="App">
          {/*<button onClick={funcs.openSignUp} type="button" className="">Register</button>*/}
          {/*<button onClick={() => setOpenLogin(!openLogin)} type="button" className="">Login</button>*/}
          {/*<button onClick={getOpenCreateEvent} type="button" className="">Create Event</button>*/}
          {/*<button onClick={(e) => setOpenCreateEventUnAuth(!openCreateEventUnAuth)} type="button" className="">Create Event UnAuth</button>*/}
          {/*<button onClick={funcs.openChoiceCity} type="button" className="">Choice City</button>*/}
          {/*<button onClick={() => setOpenSuccessCreateEvent(!openSuccessCreateEvent)} type="button" className="">Sucess Event</button>*/}
          <Router>
              <main className={"main-page"} onClick={pageClick}>
                  <HeadComponent user={state.user} flagDropdown={isUserDropdown} funcs={funcs}/>
                  <BodyComponent/>
                  <BottomComponent/>
              </main>

              {/*<ul>*/}
              {/*  <li>*/}
              {/*      <Link to={AuthRoutes.login}><h3>Login</h3></Link>*/}
              {/*  </li>*/}
              {/*  <li>*/}
              {/*      <Link to={AuthRoutes.signUp} ><h3>Sign Up</h3></Link>*/}
              {/*  </li>*/}
              {/*</ul>*/}
              {/*<YMaps>*/}
              {/*    <Map defaultState={defaultState} modules={["control.ZoomControl", "control.FullscreenControl"]} width={600}>*/}
              {/*      /!*<Placemark geometry={[55.684758, 37.738521]} />*!/*/}
              {/*        <Panorama defaultPoint={[55.733685, 37.588264]} />*/}
              {/*    </Map>*/}
              {/*  </YMaps>*/}

              <MobileFirstPageComponent isOpen={state.windows.isOpenMobileFirstPage} funcs={funcs}/>
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

              <ConfirmPlayersComponent isOpen={state.windows.isOpenConfirmPlayers} event={state.event.event}
                                       players={state.event.players} funcs={funcs}/>
              <FillRegulationComponent isOpen={state.windows.isOpenFillRegulation} event={state.event.event}
                                       funcs={funcs}/>
              <ConfirmTeamsComponent isOpen={state.windows.isOpenConfirmTeams} event={state.event.event}
                                     players={state.event.players} funcs={funcs}/>

          </Router>
      </div>
  );
}

export default App;
