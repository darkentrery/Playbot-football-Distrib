import Modal from "react-modal";
import {useEffect, useRef} from "react";
import {CloseButtonComponent} from "../../closeButtonComponent/CloseButtonComponent";


export const PopupWrapperComponent = ({
    isOpen,
    className='',
    zIndex=999,
    closeWindow = () => {},
    children
}) => {
    const windowRef = useRef();

    useEffect(() => {
        if (windowRef.current) {
            windowRef.current.parentNode.parentNode.style.zIndex = zIndex;
        }
    }, [windowRef.current])

    return (
        <Modal
            isOpen={isOpen}
            className={`popup-wrapper-component`}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={`frame ${className}`} ref={windowRef}>
                <CloseButtonComponent className={"close-element"} onClick={closeWindow}/>
                {children}
            </div>
        </Modal>
    )
}