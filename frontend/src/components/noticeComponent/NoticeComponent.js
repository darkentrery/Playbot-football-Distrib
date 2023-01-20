import {Link} from "react-router-dom";
import {useState} from "react";


export const NoticeComponent = ({to=false, accept=false, children}) => {
    const [isOpen, setIsOpen] = useState(true);

    const close = () => {
        setIsOpen(false);
    }

    return (
        <div className={`notice-component ${isOpen ? '' : 'hidden'}`}>
            <div className={"elem-1"}>
                {children}
                {to !== false &&<Link className={`links`} to={to}>
                    <span className={"yellow-500-16"}>Посмотреть сейчас</span>
                    <div className={"yellow-right-arrow-line-icon"}></div>
                </Link>}
                {accept && <div className={`links`}>
                    <span className={"yellow-500-16"}>Принять</span>
                    <span className={"yellow-500-16"}>Отказать</span>
                    <div className={"yellow-right-arrow-line-icon"}></div>
                </div>}
            </div>
            <span className={"btn-close"} onClick={close}></span>
        </div>
    )
}