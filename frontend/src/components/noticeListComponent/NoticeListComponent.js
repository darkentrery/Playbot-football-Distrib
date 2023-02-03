import {NoticeComponent} from "../noticeComponent/NoticeComponent";
import React from "react";
import EventRoutes from "../../routes/EventRoutes";


export const NoticeListComponent = ({user, setUser}) => {

    return (
        <div className={"notice-list-component"}>
            {user.user_notices.map((userNotice, key) => {
                if (userNotice.show && !["Warning", "Critical"].includes(userNotice.notice.notice_type)) {
                    let link = false;
                    let accept = false;
                    if (["New Player", "Complete Players", "Invite"].includes(userNotice.notice.notice_type)) {
                        link = EventRoutes.eventLink(userNotice.notice.event.id);
                    } else if (["Cancel Event", "Join"].includes(userNotice.notice.notice_type)) {
                        link = false;
                    }
                    if ("Invite" === userNotice.notice.notice_type) {
                        accept = true
                    }
                    return (
                        <NoticeComponent notice={userNotice.notice} setUser={setUser} to={link} key={key} accept={accept}>
                            <span className={"black-400-16"}>{userNotice.notice.text}</span>
                        </NoticeComponent>
                    )
                }
            })}
        </div>
    )
}