import {WarningNoticeComponent} from "../warningNoticeComponent/WarningNoticeComponent";
import React from "react";


export const NoticeListTopComponent = ({user, setUser}) => {
    return (
        <div className={`notice-list-top-component`}>
            {user.warning_notices.map((userNotice, key) => {
                if (userNotice.show) {
                    return (
                        <WarningNoticeComponent notice={userNotice.notice} setUser={setUser} key={key}/>
                    )
                }
            })}
        </div>
    )
}