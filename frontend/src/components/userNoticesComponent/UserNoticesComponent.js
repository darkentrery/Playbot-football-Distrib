import {useState} from "react";
import $ from "jquery";


export const UserNoticesComponent = ({user}) => {
    const [isDropdown, setIsDropdown] = useState(false);

    const openDropdown = () => {
        setIsDropdown(!isDropdown);
    }

    const clickNotice = () => {
        openDropdown();
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
        <div className={`user-notices-component ${!!user.showing_notices ? 'active' : ''}`}>
            <div className={"black-bell-icon"} onClick={openDropdown}></div>
            {!!user.showing_notices && <span className={"notice-count white-600-14"} onClick={openDropdown}>{user.showing_notices}</span>}
            <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                {user.user_notices.map((userNotice, key) => (
                    <span className={`dropdown-elem black-400-16 ${userNotice.show ? 'show' : ''}`} onClick={clickNotice} key={key}>
                        {userNotice.notice.text}
                    </span>
                ))}
            </div>
            <div className={`dropdown-menu-376 ${isDropdown ? 'open' : ''}`}>
                <div className={"top-bar"}>
                    <span className={"black-600-20"}>Уведомления</span>
                    <span className={"btn-close"} onClick={openDropdown}></span>
                </div>
                {user.user_notices.map((userNotice, key) => (
                    <span className={`dropdown-elem black-400-16 ${userNotice.show ? 'show' : ''}`} onClick={clickNotice} key={key}>
                        {userNotice.notice.text}
                    </span>
                ))}
            </div>
        </div>
    )
}