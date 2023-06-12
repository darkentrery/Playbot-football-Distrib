import React, {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {FormEventComponent} from "../../formEventComponent/FormEventComponent";
import {RightFonComponent} from "../../rightFonComponent/RightFonComponent";
import {eventService} from "../../../services/EventService";


export default function CreateEventComponent ({
    isOpen,
    isIPhone,
    user,
    closeComponent,
    openSuccessCreateEvent,
    setEvent,
}) {
    const [data, setData] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [addressFocus, setAddressFocus] = useState(false);
    const windowRef = useRef();

    useEffect(() => {
        if (isOpen) {
            windowRef.current.parentNode.parentNode.style.zIndex = 1000;
        }
    }, [windowRef.current])

    const closeWindow = () => {
        setData(false);
        closeComponent();
    }

    const sendForm = async () => {
        authDecoratorWithoutLogin(eventService.createEvent, data).then((response) => {
            setEvent(response.data);
            closeWindow();
            openSuccessCreateEvent();
        })
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} ref={windowRef}>
                <div className={`popup-frame create-event-component`}>
                    <FormEventComponent
                        className={"popup-left"}
                        onClick={sendForm}
                        data={data}
                        setData={setData}
                        titleText={"Создайте событие"}
                        isIPhone={isIPhone}
                        clickClose={closeWindow}
                        suggests={suggests}
                        isOpen={isOpen}
                        setSuggests={setSuggests}
                        addressFocus={addressFocus}
                        setAddressFocus={setAddressFocus}
                        user={user}
                    />
                    {/* <RightFonComponent
                        className={"popup-right"}
                        close={closeWindow}
                        slider={isOpen && window.screen.width > 743 ? true : false}
                        contents={[
                            "Создавай футбольные активности в любом месте и в любое время",
                            "Устанавливай свои правила игры",
                            "Фиксируй статистику матча",
                        ]}
                        imageClasses={["sign-up-fon", "sign-up-fon", "sign-up-fon"]}
                    /> */}
                </div>
            </div>
        </Modal>
    )
}
