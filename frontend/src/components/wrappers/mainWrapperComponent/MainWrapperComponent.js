import HeadComponent from "../../HeadComponent";
import BottomComponent from "../../BottomComponent";
import React, {useState} from "react";
import $ from "jquery";


export const MainWrapperComponent = ({
    state,
    children,
    funcs,
}) => {
    const [isUserDropdown, setIsUserDropdown] = useState(false);

    const pageClick = (e) => {
        if (!$(e.target).hasClass('dropdown-icon') && !$(e.target).hasClass('dropdown-label')
            && !$(e.target).hasClass('arrow-icon') && !$(e.target).hasClass('dropdown-head')) {
            setIsUserDropdown(!isUserDropdown);
        }
    }

    return (
        <main className={"main-wrapper-component"} onClick={pageClick}>
            <HeadComponent user={state.user} flagDropdown={isUserDropdown} funcs={funcs}/>
            <div className={"body scroll"}>{children}</div>
            <BottomComponent/>
        </main>
    )
}