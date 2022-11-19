import logo from './assets/icon/logo.svg';

import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import React, {useState, useEffect, useRef} from "react";
import { YMaps, Map, Placemark, Panorama } from '@pbe/react-yandex-maps';
import {
    OpenSignUpContext,
    OpenLoginContext,
    OpenRefreshPasswordContext,
    OpenMobileFirstPageContext,
    OpenChoiceCityContext,
    OpenSuccessSignUpContext,
    OpenSuccessRefreshPasswordContext,
    OpenSuccessSignUp2Context
} from "./context/AuthContext";
import RefreshPasswordComponent from "./components/RefreshPasswordComponent";
import EventService from "./services/EventService";
import {authDecoratorWithoutLogin, getData} from "./services/AuthDecorator";
import CreateEventComponent from "./components/CreateEventComponent";
import CreateEventUnAuthComponent from "./components/CreateEventUnAuthComponent";
import {
    OpenCreateEventContext,
    OpenCreateEventUnAuthContext,
    OpenSuccessCreateEventContext
} from "./context/EventContext";
import MobileFirstPageComponent from "./components/MobileFirstPageComponent";
import ChoiceCityComponent from "./components/ChoiceCityComponent";
import AuthService from "./services/AuthService";
import SuccessCreateEventComponent from "./components/success/SuccessCreateEventComponent";
import SuccessSignUpComponent from "./components/success/SuccessSignUp";
import SuccessRefreshPasswordComponent from "./components/success/SuccessRefreshPassword";
import HeadComponent from "./components/HeadComponent";
import BodyComponent from "./components/BodyComponent";
import BottomComponent from "./components/BottomComponent";
import SuccessSignUp2Component from "./components/success/SuccessSignUp2";


function App(defaultValue) {
    const authService = new AuthService();
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRefreshPassword, setOpenRefreshPassword] = useState(false);
    const [openCreateEvent, setOpenCreateEvent] = useState(false);
    const [openCreateEventUnAuth, setOpenCreateEventUnAuth] = useState(false);
    const [openSuccessCreateEvent, setOpenSuccessCreateEvent] = useState(false);
    const [openMobileFirstPage, setOpenMobileFirstPage] = useState(false);
    const [openChoiceCity, setOpenChoiceCity] = useState(false);
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const [openSuccessRefreshPassword, setOpenSuccessRefreshPassword] = useState(false);
    const [openSuccessSignUp, setOpenSuccessSignUp] = useState(false);
    const [openSuccessSignUp2, setOpenSuccessSignUp2] = useState(false);


    const signUpWindow = { openSignUp, setOpenSignUp };
    const loginWindow = { openLogin, setOpenLogin };
    const refreshPasswordWindow = { openRefreshPassword, setOpenRefreshPassword };
    const createEventWindow = { openCreateEvent, setOpenCreateEvent };
    const createEventUnAuthWindow = { openCreateEventUnAuth, setOpenCreateEventUnAuth };
    const createSuccessEventWindow = { openSuccessCreateEvent, setOpenSuccessCreateEvent };
    const mobileFirstPageWindow = { openMobileFirstPage, setOpenMobileFirstPage };
    const choiceCityWindow = { openChoiceCity, setOpenChoiceCity };
    const successRefreshPasswordWindow = { openSuccessRefreshPassword, setOpenSuccessRefreshPassword };
    const successSignUpWindow = { openSuccessSignUp, setOpenSuccessSignUp };
    const successSignUp2Window = { openSuccessSignUp2, setOpenSuccessSignUp2 };

    const eventService = new EventService();

    useEffect(() => {
        if (!confirmSignUp && window.location.pathname.includes("confirm-sign-up/")) {
            authService.confirmSignUp(window.location.pathname)
            setConfirmSignUp(true);
            setOpenSuccessSignUp2(true);
        }
    }, [confirmSignUp])


    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"],
      };

    // useEffect(() => {

    // }, [openMobileFirstPage])

    const getOpenCreateEvent = async () => {
        await authDecoratorWithoutLogin(eventService.getCreateEvent, []).then((response) => {
            if (response.status == 200) {
                setOpenCreateEvent(!openCreateEvent)
            } else {
                setOpenCreateEventUnAuth(!openCreateEventUnAuth)
            }
            console.log(response)
        })
    }

    useEffect(() => {
        if (localStorage.telegramLogin === 'true') {
            setOpenChoiceCity(true);
            localStorage.telegramLogin = false;
        }
    }, [localStorage.telegramLogin])

    console.log(window.matchMedia)
    console.log(navigator)
    console.log(document.referrer)




  return (
      <div className="App">
          <button onClick={() => setOpenSignUp(!openSignUp)} type="button" className="">Register</button>
          <button onClick={() => setOpenLogin(!openLogin)} type="button" className="">Login</button>
          <button onClick={getOpenCreateEvent} type="button" className="">Create Event</button>
          <button onClick={(e) => setOpenCreateEventUnAuth(!openCreateEventUnAuth)} type="button" className="">Create Event UnAuth</button>
          <button onClick={() => setOpenChoiceCity(!openChoiceCity)} type="button" className="">Choice City</button>
          <button onClick={() => setOpenSuccessCreateEvent(!openSuccessCreateEvent)} type="button" className="">Sucess Event</button>
          <Router>
              <main className={"main-page"}>
                  <OpenLoginContext.Provider value={loginWindow}>
                      <HeadComponent/>
                  </OpenLoginContext.Provider>

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




                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <OpenChoiceCityContext.Provider value={choiceCityWindow}>
                              <OpenSuccessSignUpContext.Provider value={successSignUpWindow}>
                                  <SignUpComponent/>
                              </OpenSuccessSignUpContext.Provider>
                          </OpenChoiceCityContext.Provider>
                      </OpenSignUpContext.Provider>
                  </OpenLoginContext.Provider>

                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <OpenRefreshPasswordContext.Provider value={refreshPasswordWindow}>
                              <LoginComponent/>
                          </OpenRefreshPasswordContext.Provider>
                      </OpenSignUpContext.Provider>
                  </OpenLoginContext.Provider>

                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenRefreshPasswordContext.Provider value={refreshPasswordWindow}>
                          <OpenSuccessRefreshPasswordContext.Provider value={successRefreshPasswordWindow}>
                              <RefreshPasswordComponent/>
                          </OpenSuccessRefreshPasswordContext.Provider>
                      </OpenRefreshPasswordContext.Provider>
                  </OpenLoginContext.Provider>

                  <OpenCreateEventContext.Provider value={createEventWindow}>
                      <OpenSuccessCreateEventContext.Provider value={createSuccessEventWindow}>
                          <CreateEventComponent/>
                      </OpenSuccessCreateEventContext.Provider>
                  </OpenCreateEventContext.Provider>

                  <OpenSuccessCreateEventContext.Provider value={createSuccessEventWindow}>
                      <SuccessCreateEventComponent/>
                  </OpenSuccessCreateEventContext.Provider>

                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenCreateEventUnAuthContext.Provider value={createEventUnAuthWindow}>
                          <CreateEventUnAuthComponent/>
                      </OpenCreateEventUnAuthContext.Provider>
                  </OpenLoginContext.Provider>

                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <OpenMobileFirstPageContext.Provider value={mobileFirstPageWindow}>
                              <MobileFirstPageComponent/>
                          </OpenMobileFirstPageContext.Provider>
                      </OpenSignUpContext.Provider>
                  </OpenLoginContext.Provider>

                  <OpenChoiceCityContext.Provider value={choiceCityWindow}>
                      <ChoiceCityComponent/>
                  </OpenChoiceCityContext.Provider>

                  <OpenSuccessSignUpContext.Provider value={successSignUpWindow}>
                      <SuccessSignUpComponent/>
                  </OpenSuccessSignUpContext.Provider>

                  <OpenSuccessRefreshPasswordContext.Provider value={successRefreshPasswordWindow}>
                      <SuccessRefreshPasswordComponent/>
                  </OpenSuccessRefreshPasswordContext.Provider>

                  <OpenSuccessSignUp2Context.Provider value={successSignUp2Window}>
                      <SuccessSignUp2Component/>
                  </OpenSuccessSignUp2Context.Provider>


                  {/*<div className="features">*/}
                  {/*    <Routes>*/}
                  {/*        <Route exact path={"events/"} element={<EventsComponent/>}/>*/}
                  {/*        /!*<Route exact path={AuthRoutes.signUp} element={<SignUpComponent/>}/>*!/*/}
                  {/*    </Routes>*/}
                  {/*</div>*/}

          </Router>

      </div>

  );
}

export default App;
