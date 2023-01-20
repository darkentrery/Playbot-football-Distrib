import HeadComponent from "../../HeadComponent";
import BottomComponent from "../../BottomComponent";
import React from "react";
import {NoticeComponent} from "../../noticeComponent/NoticeComponent";


export const MainWrapperComponent = ({
    state,
    app,
    children,
    funcs,
}) => {
    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"body scroll"}>{children}</div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone}/>
            <div className={"notice-list"}>
                <NoticeComponent to={"dsf"}>
                    <span className={"black-400-16"}>safasdfsdsaf asdfsfsdf dsfsdfdgdf</span>
                </NoticeComponent>
                <NoticeComponent>
                    <span className={"black-400-16"}>safasdfsdsaf asdfsfsdf dsfsdfdgdf</span>
                </NoticeComponent>

            </div>
        </main>
    )
}