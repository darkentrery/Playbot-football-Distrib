import HeadComponent from "../../HeadComponent";
import BottomComponent from "../../BottomComponent";
import React from "react";


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
        </main>
    )
}