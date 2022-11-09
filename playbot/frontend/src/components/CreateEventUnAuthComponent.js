import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import {OpenCreateEventUnAuthContext} from "../context/EventContext";


export default function CreateEventUnAuthComponent () {
    const [data, setData] = useState("No");

    const { openCreateEventUnAuth, setOpenCreateEventUnAuth } = useContext(OpenCreateEventUnAuthContext);


    // useEffect(() => {
    //     let bodyFormData = new FormData();
    //     bodyFormData.append('email', email);
    //     bodyFormData.append('password', password);
    //     setData(bodyFormData)
    // }, [email, password]);

    const sendForm = async () => {

    }

    return(
        <Modal
            isOpen={openCreateEventUnAuth}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login"}>

            </div>
        </Modal>
    )
}
