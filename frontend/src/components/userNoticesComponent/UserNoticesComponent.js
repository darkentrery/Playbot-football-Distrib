import {useState} from "react";
import $ from "jquery";


export const UserNoticesComponent = ({user}) => {
    const [isDropdown, setIsDropdown] = useState(false);

    const openDropdown = () => {
        setIsDropdown(!isDropdown);
    }

    const clickNotice = () => {
        console.log(1)
    }

    document.addEventListener('click', function (e) {
        if (isDropdown) {
            if (!$(e.target).closest('.user-notices-component').length && e.target.className !== 'user-notices-component') {
                setIsDropdown(false);
            }
        }
    })

    return (
        <div className={`user-notices-component active`}>
            <div className={"black-bell-icon"} onClick={openDropdown}></div>
            <span className={"notice-count white-600-14"} onClick={openDropdown}>2</span>
            <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                <span className={"dropdown-elem black-400-16"} onClick={clickNotice}>
                    sdfasdafsad
                </span>
            </div>
            <div className={`dropdown-menu-376 ${isDropdown ? 'open' : ''}`}>
                <div className={"top-bar"}>
                    <span className={"black-600-20"}>Уведомления</span>
                    <span className={"btn-close"} onClick={openDropdown}></span>
                </div>
                <span className={"dropdown-elem black-400-16"} onClick={clickNotice}>
                    sdfasdafsad
                </span>
            </div>
        </div>
    )
}