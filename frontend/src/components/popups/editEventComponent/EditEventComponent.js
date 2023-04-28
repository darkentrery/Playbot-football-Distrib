import React, {useState} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {FormEventComponent} from "../../formEventComponent/FormEventComponent";
import {eventService} from "../../../services/EventService";


export default function EditEventComponent ({isOpen, isIPhone, event, user, closeComponent, openSuccessEditEvent, setEvent, showMap}) {
    const [data, setData] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [closeDropDown, setCloseDropDown] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const closeWindow = () => {
        setData(false);
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    const sendForm = async () => {
        authDecoratorWithoutLogin(eventService.editEvent, data).then((response) => {
            setEvent(response.data);
            closeWindow();
            openSuccessEditEvent();
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"}>
                <FormEventComponent
                    className={`edit-event-component ${data && data.is_paid ? 'isPaid' : ''}`}
                    event={event}
                    onClick={sendForm}
                    data={data}
                    setData={setData}
                    titleText={"Редактировать событие"}
                    closeDropDown={closeDropDown}
                    isIPhone={isIPhone}
                    clickClose={toMenu}
                    suggests={suggests}
                    isOpen={isOpen}
                    setSuggests={setSuggests}
                    addressFocus={addressFocus}
                    setAddressFocus={setAddressFocus}
                    user={user}
                    isEdit={true}
                />
            </div>
        </Modal>
    )
}