import React, {useState, useEffect, useContext, useRef} from "react";
import Modal from "react-modal";
import {OpenCreateEventContext} from "../context/EventContext";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";


export default function CreateEventComponent () {
    const [data, setData] = useState("No");
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [timeBegin, setTimeBegin] = useState(false);
    const [address, setAddress] = useState(false);
    const [count, setCount] = useState(false);
    const [notice, setNotice] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const refCount = useRef();
    const content = [1, 2, 3, 4];

    const { openCreateEvent, setOpenCreateEvent } = useContext(OpenCreateEventContext);

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('date', date);
        bodyFormData.append('time_begin', timeBegin);
        bodyFormData.append('address', address);
        bodyFormData.append('count', count);
        bodyFormData.append('notice', notice);
        setData(bodyFormData)
    }, [name, date, timeBegin, address, count, notice]);

    const sendForm = async () => {
        console.log(count)
        console.log(data)
    }

    return(
        <Modal
            isOpen={openCreateEvent}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login"}>
                <input type="text" placeholder={"Название *"} onChange={(event) => setName(event.target.value)}/>
                <ReactDatetimeClass/>

                <input type="text" placeholder={"Адрес проведения *"} onChange={(event) => setAddress(event.target.value)}/>

                <div className={"dropdown"}>
                    <span ref={refCount} onClick={() => setIsDropdown(!isDropdown)}>1</span>
                    <div className={`menu ${isDropdown ? 'open' : ''}`}>
                        <ul>
                            {/*{content && content.map((item, key) => {*/}
                            {/*    return (*/}
                            {/*        <li onClick={() => {*/}
                            {/*            console.log(refCount)*/}
                            {/*            refCount.current.innerHTML = item*/}
                            {/*            setCount(item)*/}
                            {/*            setIsDropdown(!isDropdown)*/}
                            {/*        }}>*/}
                            {/*            {item}*/}
                            {/*        </li>*/}
                            {/*    )*/}
                            {/*})}*/}
                        </ul>
                    </div>
                </div>

                <input type="text" placeholder={"Комментарии"} onChange={(event) => setNotice(event.target.value)}/>

                <button className={"btn btn-login"} onClick={sendForm}>
                    <div className={"btn-text"}>Создать</div>
                </button>

            </div>
        </Modal>
    )
}
