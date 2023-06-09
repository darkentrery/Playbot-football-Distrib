import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import MobileFirstPageComponent from "./components/popups/mobileFirstPageComponent/MobileFirstPageComponent";
import {authService} from "./services/AuthService";
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
import FillRegulationComponent from "./components/popups/fillRegulationComponent/FillRegulationComponent";
import ConfirmTeamsComponent from "./components/popups/confirmTeamsComponent/ConfirmTeamsComponent";
import ConfirmPlayersComponent from "./components/popups/confirmPlayersComponent/ConfirmPlayersComponent";
import VisibleLeaveEvent from "./redux/containers/VisibleLeaveEvent";
import VisibleUnAuthJoin from "./redux/containers/VisibleUnAuthJoin";
import VisibleConfirmTeamPlayers from "./redux/containers/VisibleConfirmTeamPlayers";
import BaseRoutes from "./routes/BaseRoutes";
import VisibleEventsPage from "./redux/containers/VisibleEventsPage";
import VisibleMainPage from "./redux/containers/VisibleMainPage";
import VisibleEvent from "./redux/containers/VisibleEvent";
import {AllowPolicyComponent} from "./components/pages/AllowPolicyComponent";
import {AllowOfferComponent} from "./components/pages/AllowOfferComponent";
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
import VisibleSuccessExistsUser from "./redux/containers/VisibleSuccessExistsUser";
import VisibleDeleteAccount from "./redux/containers/VisibleDeleteAccount";
import {LandingComponent} from "./components/pages/landingComponent/LandingComponent";
import VisibleOnboardingStep1 from "./redux/containers/VisibleOnboardingStep1";
import VisibleOnboardingStep2 from "./redux/containers/VisibleOnboardingStep2";
import VisibleEndEvent from "./redux/containers/VisibleEndEvent";
import LoadPhotoPopup from "./components/popups/LoadPhotoPopup/LoadPhotoPopup";
import {AllowPolicyComponent as AllowPolicyPopup} from "./components/popups/allowPolicyComponent/AllowPolicyComponent";
import {AllowOfferComponent as AllowOfferPopup} from "./components/popups/allowOfferComponent/AllowOfferComponent";
import {OverlayPage} from "./components/pages/overlayComponent/OverlayPage";


function App({state, funcs}) {
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const refTelegram = useRef(false);

    const showNotice = () => {
        let notice = new Notification("fff?", {
            tag: "mail",
            body: "wait",
        })
    }

    useEffect(() => {
        // funcs.openOnboardingStep1();
        authDecoratorWithoutLogin(authService.isAuth, false).then((response) => {
            if (response.status === 200) {
                funcs.setAuth(true, response.data);
                // if ("Notification" in window) {
                //     if (Notification.permission === "granted") {
                //         console.log(1)
                //         setTimeout(showNotice, 2000);
                //     } else if (Notification.permission !== "denied") {
                //         Notification.requestPermission((permission) => {
                //             console.log(permission)
                //             if (Notification.permission === "granted") {
                //                 console.log(2)
                //                 setTimeout(showNotice, 2000);
                //             }
                //         })
                //     }
                // }
            } else {
                funcs.setAuth(false, false);
                let landing = document.querySelector('.landing-component');
                if (!landing && !window.location.href.includes('/overlay/')) {
                    funcs.openMobileFirstPage();
                }
            }
        })
        funcs.setIsIPhone(authService.deviceDetect());
        // if (refTelegram.current) {
        //     const tgScript = document.createElement('script');
        //     tgScript.src = "http://127.0.0.1:8000/static/js/telegram-web-app.js";
        //     tgScript.id = "id-tg";
        //     refTelegram.current.appendChild(tgScript);
        //
        // }
    }, [])

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp.initData) {
            funcs.setIsTelegramApp(true);
            authService.telegramAppLogin(window.Telegram.WebApp.initData).then(response => {
                if (response.status === 200) {
                    funcs.setAuth(true, response.data.user);
                }
            });
        }
    }, [window.Telegram])

    useEffect(() => {
        if (state.app.isTelegramApp) {
            funcs.closeMobileFirstPage();
        }
    }, [state.app.isTelegramApp])

    useEffect(() => {
        if (state.user.isAuth && state.user.user.first_login && !window.location.pathname.includes("confirm-sign-up/")) {
            funcs.openOnboardingStep1();
            authDecoratorWithoutLogin(authService.firstLogin, false).then(response => {
                if (response.status === 200) {
                    funcs.setAuth(true, response.data);
                }
            })
        }
    }, [state.user.user])

    // Listen for authorization success.
    // document.addEventListener('AppleIDSignInOnSuccess', (event) => {
    //     // Handle successful response.
    //     console.log(event.detail.data);
    //     authService.catchError({"success": event.detail});
    // });
    //
    // // Listen for authorization failures.
    // document.addEventListener('AppleIDSignInOnFailure', (event) => {
    //     // Handle error.
    //     console.log(event.detail.error);
    //     authService.catchError({"error": event.detail});
    // });

    useEffect(() => {
        if (!confirmSignUp && window.location.pathname.includes("confirm-sign-up/")) {
            authService.confirmSignUp(window.location.pathname).then((response) => {
                if (response.status === 200) {
                    setConfirmSignUp(true);
                    funcs.setAuth(true, response.data.user);
                    funcs.openSuccessSignUp2();
                }
            });
        }
    }, [confirmSignUp])

    useEffect(() => {
        if (localStorage.telegramLogin === 'true') {
            localStorage.telegramLogin = false;
            funcs.openSuccessSignUp2();
        } else if (localStorage.telegramLogin === 'username') {
            localStorage.telegramLogin = false;
            funcs.openSuccessExistsUser();
        }
    }, [localStorage.telegramLogin])

    const popupsStates = [
        state.windows.isOpenChoiceCity,
        state.windows.isOpenShowMenu,
        state.windows.isOpenConfirmPlayers,
        state.windows.isOpenFillRegulation,
        state.windows.isOpenConfirmTeamPlayers,
        state.windows.isOpenConfirmTeams,
        state.windows.isOpenSignUp,
        state.windows.isOpenLogin,
        state.windows.isOpenAllowPolicy,
        state.windows.isOpenAllowOffer,
    ]

    useEffect(() => {
        if (popupsStates.includes(true)) {
            document.body.style = 'overflow: hidden';
            document.querySelector('html').style = 'overflow: hidden';
        } else {
            document.body.style = null;
            document.querySelector('html').style = null;
        }
    }, [...popupsStates])

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path={EventRoutes.events} element={<VisibleEventsPage/>}/>
                    <Route exact path={BaseRoutes.main} element={<VisibleMainPage/>}/>
                    <Route exact path={BaseRoutes.confirmSignUp} element={<VisibleMainPage/>}/>
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
                    <Route exact path={ProfileRoutes.profilePersonalData} element={<VisibleProfilePersonalData/>}/>
                    <Route exact path={ProfileRoutes.previewPlayer} element={<VisiblePreviewPlayer/>}/>
                    <Route exact path={ProfileRoutes.myProfile} element={<VisibleMyProfile/>}/>
                    <Route exact path={BaseRoutes.landing} element={<LandingComponent/>}/>
                    <Route exact path={BaseRoutes.overlay} element={<OverlayPage user={state.user.user}/>}/>
                </Routes>

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
                <VisibleSuccessExistsUser/>
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
                <VisibleDeleteAccount/>

                <ConfirmPlayersComponent isOpen={state.windows.isOpenConfirmPlayers} event={state.event.event}
                                           funcs={funcs} isIPhone={state.app.isIPhone}/>
                <FillRegulationComponent isOpen={state.windows.isOpenFillRegulation} event={state.event.event}
                                           funcs={funcs} isIPhone={state.app.isIPhone}/>
                <ConfirmTeamsComponent isOpen={state.windows.isOpenConfirmTeams} event={state.event.event}
                                         funcs={funcs} isIPhone={state.app.isIPhone}/>
                <VisibleConfirmTeamPlayers/>
                <VisibleEndGame/>
                <VisibleEndEvent/>
                <VisibleOnboardingStep1/>
                <VisibleOnboardingStep2/>
                <LoadPhotoPopup isOpen={state.windows.isOpenLoadPhoto}/>
                <AllowPolicyPopup isOpen={state.windows.isOpenAllowPolicy}/>
                <AllowOfferPopup isOpen={state.windows.isOpenAllowOffer}/>
                <div ref={refTelegram}></div>
            </Router>
        </div>
    );
}

export default App;
