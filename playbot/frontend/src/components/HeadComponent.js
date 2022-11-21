import React, {useContext} from "react";
import {OpenLoginContext} from "../context/AuthContext";
import {Link, Route, Routes} from "react-router-dom";
import BaseRoutes from "../routes/BaseRoutes";
import ActiveMenuLinkComponent from "./head/ActiveMenuLinkComponent";
import InActiveMenuLinkComponent from "./head/InActiveMenuLinkComponent";
import UnAuthUserComponent from "./head/UnAuthUserComponent";
import UserComponent from "./head/UserComponent";


export default function HeadComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const loginWindow = { openLogin, setOpenLogin };


    return(
        <div className={"head"}>
            <div className={"elem elem-1 logo-korobka-icon"}></div>
            <div className={"elem elem-2"}>
                <Routes>
                    <Route exact path={BaseRoutes.events} element={<InActiveMenuLinkComponent link={BaseRoutes.main} label={"Главная"}/>}/>
                    <Route exact path={BaseRoutes.main} element={<ActiveMenuLinkComponent link={BaseRoutes.main} label={"Главная"}/>}/>
                </Routes>
                <Routes>
                    <Route exact path={BaseRoutes.events} element={<ActiveMenuLinkComponent link={BaseRoutes.events} label={"События"}/>}/>
                    <Route exact path={BaseRoutes.main} element={<InActiveMenuLinkComponent link={BaseRoutes.events} label={"События"}/>}/>
                </Routes>

                {/*<div className={"menu-point black-point-icon"}>*/}
                {/*    <Link to={BaseRoutes.main}><span>Главная</span></Link>*/}
                {/*</div>*/}
                {/*<div className={"menu-point black-point-icon inactive"}>*/}
                {/*    <Link to={BaseRoutes.events}><span>События</span></Link>*/}
                {/*</div>*/}
                <div className={"menu-point black-point-icon inactive"}>
                    <span>Статистика</span>
                </div>
                <div className={"menu-point black-point-icon inactive"}>
                    <span>FAQ</span>
                </div>

            </div>

            <div className={"elem"}>

            </div>
            <div className={"elem search-black-icon"}></div>
            {/*<OpenLoginContext.Provider value={loginWindow}>*/}
            {/*    <UnAuthUserComponent/>*/}
            {/*</OpenLoginContext.Provider>*/}

            <UserComponent/>

        </div>
    )
}