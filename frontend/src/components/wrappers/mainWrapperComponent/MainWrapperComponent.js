import HeadComponent from "../../headComponent/HeadComponent";
import BottomComponent from "../../bottomComponent/BottomComponent";
import React from "react";
import {NoticeListComponent} from "../../noticeListComponent/NoticeListComponent";


export const MainWrapperComponent = ({
    state,
    app,
    user,
    children,
    funcs,
}) => {
    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={`body scrollable ${app.isIPhone ? 'safari-margin' : ''}`}>{children}</div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone}/>
            {/*{!!user.user && <NoticeListComponent user={user.user} setUser={funcs.setAuth}/>}*/}
        </main>
    )
}