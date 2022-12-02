import Modal from "react-modal";
import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import DropDownComponent from "../dropDownComponent/DropDownComponent";


export default function FillRegulationComponent ({players, isOpen, event, funcs}) {
    const eventService = new EventService();
    const [selected, setSelected] = useState(players);
    const [format, setFormat] = useState(false);
    const [mode, setMode] = useState(false);
    const [countCircle, setCountCircle] = useState(false);
    const [duration, setDuration] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);


    useEffect(() => {
        let arr = [];
        players.forEach((item) => {
            arr.push(item.id.toString());
        })
        setSelected(arr)

    }, [players, isOpen])

    useEffect(() => {
        console.log(format)
    }, [format])

    const closeWindow = () => {
        funcs.closeFillRegulation();
    }

    const toConfirmPlayers = () => {
        closeWindow();
        funcs.openConfirmPlayers();
    }



    const fillRegulation = () => {

    }

    const popupClick = (e) => {
        if (!e.target.className.includes("dropdown-elem") && !e.target.className.includes("dropdown-label")) {
            setCloseDropDown(!closeDropDown);
        } else if (e.target.className.includes("dropdown-label")) {
            setCloseDropDown(e.target.id);
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame fill-regulation-component"} onClick={popupClick}>
                <div className={"elem elem-1"}>
                    <div onClick={toConfirmPlayers} className={"btn-back"}></div>
                    <span className={"title-22"}>Заполните регламент</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"gray-400-16"}>Шаг 1</span>
                    <span className={"el-center black-600-16"}>Шаг 2</span>
                    <span className={"gray-400-16"}>Шаг 3</span>
                </div>
                <div className={"elem elem-3"}>
                    <div className={"gray-line"}></div>
                    <div className={"orange-line"}></div>
                    <div className={"gray-line"}></div>
                </div>
                <div className={"elem elem-4"}>
                    <DropDownComponent value={format} setValue={setFormat} leftIcon={'two-people-icon'} sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={1}/>
                    <DropDownComponent value={mode} setValue={setMode} leftIcon={'man-in-target-icon'} sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={2}/>
                    <DropDownComponent value={countCircle} setValue={setCountCircle} leftIcon={'football-field-icon'} sizingClass={"dropdown-size-count-circle"} flagClose={closeDropDown} id={3}/>
                    <DropDownComponent value={duration} setValue={setDuration} leftIcon={'gray-clock-icon'} sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={4}/>

                </div>
                <button className={"elem elem-5 btn"} onClick={fillRegulation}>Поделиться на команды</button>
            </div>
        </Modal>
    )

}