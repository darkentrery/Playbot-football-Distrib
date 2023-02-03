import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {noticeService} from "../../services/NoticeService";


export const WarningNoticeComponent = ({
    notice,
    btn=true,
    setUser
}) => {
    const close = () => {
        authDecoratorWithoutLogin(noticeService.hiddeNotice, notice).then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                setUser(true, response.data);
            }
        })
    }

    return (
        <div className={`warning-notice-component ${notice.notice_type === 'Critical' ? 'critical' : ''}`}>
            <div className={`icon ${notice.notice_type === 'Critical' ? 'red-warning-icon' : 'yellow-warning-icon'}`}></div>
            <span className={"content black-500-16"}>{notice.text}</span>
            {btn && <span className={"btn-close"} onClick={close}></span>}
        </div>
    )
}