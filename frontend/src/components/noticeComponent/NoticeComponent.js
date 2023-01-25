import {Link} from "react-router-dom";
import {useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {noticeService} from "../..//services/NoticeService";



export const NoticeComponent = ({
    notice,
    to=false,
    accept=false,
    setUser,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const close = () => {
        setIsOpen(false);
        authDecoratorWithoutLogin(noticeService.hiddeNotice, notice).then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                setUser(true, response.data);
            }
        })
    }

    return (
        <div className={`notice-component ${isOpen ? '' : 'hidden'}`}>
            <div className={"elem-1"}>
                {children}
                {!accept &&<Link className={`links`} to={to}>
                    <span className={"yellow-500-16"}>Посмотреть сейчас</span>
                    <div className={"yellow-right-arrow-line-icon"}></div>
                </Link>}
                {accept && <div className={`links`}>
                    <Link className={"yellow-500-16"} to={to}>Принять</Link>
                    <span className={"yellow-500-16"} onClick={close}>Отказать</span>
                    <div className={"yellow-right-arrow-line-icon"}></div>
                </div>}
            </div>
            <span className={"btn-close"} onClick={close}></span>
        </div>
    )
}