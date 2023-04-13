import Modal from "react-modal";
import {EmblemComponent} from "../../emblemComponent/EmblemComponent";
import {share} from "../../../services/LinkShareService";
import {useEffect} from "react";
import {blockBodyScroll} from "../../../utils/manageElements";


export const ShowEmblemComponent = ({isOpen, user, player, funcs}) => {

    useEffect(() => {
        blockBodyScroll(isOpen);
    }, [isOpen])

    const closeWindow = () => {
        funcs.closeComponent();
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame show-emblem-component"}>
                <div className={"upload-icon"} onClick={share}></div>
                <span className={"btn-close"} onClick={closeWindow}></span>
                {!!user && !!player && <EmblemComponent player={player} className={"emblem"}/>}
            </div>
        </Modal>
    )
}