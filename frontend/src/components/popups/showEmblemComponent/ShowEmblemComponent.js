import Modal from "react-modal";
import {EmblemComponent} from "../../emblemComponent/EmblemComponent";
import {share} from "../../../services/LinkShareService";


export const ShowEmblemComponent = ({isOpen, user, player, funcs}) => {

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