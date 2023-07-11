import Modal from "react-modal";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showMenuWindow} from "../../redux/actions/actions";


export default function SuccessComponent ({
    isOpen,
    closeSuccess,
    title,
    text,
    buttonLabel,
    clickSuccess = () => {},
}) {
    const windowRef = useRef();
    const dispatch = useDispatch();
    const {isOpenShowMenu} = useSelector(state => state.windows);

     useEffect(() => {
         console.log(windowRef.current);
        if (isOpen && windowRef.current) {
            console.log(windowRef.current.parentNode.parentNode);
            windowRef.current.parentNode.parentNode.style.zIndex = 1000;
        }
        if (isOpen) {
            if (isOpenShowMenu) {
                dispatch(showMenuWindow(false));
            }
        }
    }, [windowRef.current, isOpen])

    const closeWindow = () => {
        closeSuccess();
    }

    const clickButton = () => {
        closeWindow();
        clickSuccess();
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame success-component"} ref={windowRef}>
                <div className={"elem elem-1"}>
                    <span className={"black-600-22"}>{title}</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>{text}</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn btn-success-event"} onClick={clickButton}>{buttonLabel}</button>
                </div>
            </div>
        </Modal>
    )
}