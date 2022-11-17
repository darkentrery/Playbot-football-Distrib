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
    OpenMobileFirstPageContext, OpenChoiceCityContext
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
import SuccessCreateEventComponent from "./components/SuccessCreateEventComponent";



function App(defaultValue) {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRefreshPassword, setOpenRefreshPassword] = useState(false);
    const [openCreateEvent, setOpenCreateEvent] = useState(false);
    const [openCreateEventUnAuth, setOpenCreateEventUnAuth] = useState(false);
    const [openSuccessCreateEvent, setOpenSuccessCreateEvent] = useState(false);
    const [openMobileFirstPage, setOpenMobileFirstPage] = useState(false);
    const [openChoiceCity, setOpenChoiceCity] = useState(false);

    const signUpWindow = { openSignUp, setOpenSignUp };
    const loginWindow = { openLogin, setOpenLogin };
    const refreshPasswordWindow = { openRefreshPassword, setOpenRefreshPassword };
    const createEventWindow = { openCreateEvent, setOpenCreateEvent };
    const createEventUnAuthWindow = { openCreateEventUnAuth, setOpenCreateEventUnAuth };
    const createSuccessEventWindow = { openSuccessCreateEvent, setOpenSuccessCreateEvent };
    const mobileFirstPageWindow = { openMobileFirstPage, setOpenMobileFirstPage };
    const choiceCityWindow = { openChoiceCity, setOpenChoiceCity };

    const eventService = new EventService();


    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"],
      };

    // useEffect(() => {

    // }, [openMobileFirstPage])

    const getOpenCreateEvent = async () => {
        await getData(eventService.getCreateEvent, [], openLogin, setOpenLogin).then((response) => {
            if (response.status == 200) {
                setOpenCreateEvent(!openCreateEvent)
            } else {
                setOpenCreateEventUnAuth(!openCreateEventUnAuth)
            }
            console.log(response)
        })
    }

    useEffect(() => {
        console.log(localStorage.telegramLogin)
        if (localStorage.telegramLogin === 'true') {
            setOpenChoiceCity(true);
            localStorage.telegramLogin = false;
        }
    }, [localStorage.telegramLogin])




  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <main>
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

                  <button onClick={() => setOpenSignUp(!openSignUp)} type="button" className="">Register</button>
                  <button onClick={() => setOpenLogin(!openLogin)} type="button" className="">Login</button>
                  <button onClick={getOpenCreateEvent} type="button" className="">Create Event</button>
                  <button onClick={() => setOpenChoiceCity(!openChoiceCity)} type="button" className="">Choice City</button>
                  <button onClick={() => setOpenSuccessCreateEvent(!openSuccessCreateEvent)} type="button" className="">Sucess Event</button>

                  <OpenLoginContext.Provider value={loginWindow}>
                      <OpenSignUpContext.Provider value={signUpWindow}>
                          <OpenChoiceCityContext.Provider value={choiceCityWindow}>
                              <SignUpComponent/>
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
                          <RefreshPasswordComponent/>
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


                  {/*<div className="features">*/}
                  {/*    <Routes>*/}
                  {/*        <Route exact path={AuthRoutes.login} element={<LoginComponent/>}/>*/}
                  {/*        <Route exact path={AuthRoutes.signUp} element={<SignUpComponent/>}/>*/}
                  {/*    </Routes>*/}
                  {/*</div>*/}
              </main>
          </Router>




      </header>
    </div>

  );
}

export default App;
