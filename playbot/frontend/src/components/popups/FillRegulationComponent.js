import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import DropDownComponent from "../dropDownComponent/DropDownComponent";
import {CheckSliderComponent} from "../checkSliderComponent/CheckSliderComponent";
import {popupCloseDropdown} from "../../utils/manageElements";


export default function FillRegulationComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [format, setFormat] = useState(false);
    const [formats, setFormats] = useState([]);
    const [mode, setMode] = useState(false);
    const [modes, setModes] = useState([]);
    const [countCircle, setCountCircle] = useState(false);
    const [countCircles, setCountCircles] = useState([]);
    const [duration, setDuration] = useState(false);
    const [durations, setDurations] = useState([]);
    const [scorer, setScorer] = useState(false);
    const [untilGoal, setUntilGoal] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);

    useEffect(() => {
        if (event.id !== undefined) {
            eventService.getRegulation(event.id).then((response) => {
                let arr = [];
                response.data.formats.map((item, key) => {
                    arr.push(item.name);
                })
                setFormat(event.format ? event.format : arr[0]);
                setFormats(arr);
                arr = [];
                response.data.distribution_method.map((item, key) => {
                    arr.push(item.name);
                })
                setMode(event.distribution_method ? event.distribution_method : arr[0]);
                setModes(arr);
                arr = [];
                response.data.count_circles.map((item, key) => {
                    arr.push(item.name);
                })
                setCountCircle(event.count_circles ? event.count_circles : arr[0]);
                setCountCircles(arr);
                arr = [];
                response.data.duration.map((item, key) => {
                    arr.push(item.name);
                })
                setDuration(event.duration ? event.duration : arr[0]);
                setDurations(arr);
                setScorer(event.scorer);
                setUntilGoal(event.until_goal);
            })
        }
    }, [isOpen])

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('id', event.id);
        bodyFormData.append('format', format);
        bodyFormData.append('distribution_method', mode);
        bodyFormData.append('count_circles', countCircle);
        bodyFormData.append('duration', duration);
        bodyFormData.append('scorer', scorer);
        bodyFormData.append('until_goal', untilGoal);
        setData(bodyFormData);
    }, [format, mode, countCircle, duration, scorer, untilGoal])

    const closeWindow = () => {
        funcs.closeFillRegulation();
    }

    const toConfirmPlayers = () => {
        closeWindow();
        funcs.openConfirmPlayers();
    }

    const fillRegulation = () => {
        authDecoratorWithoutLogin(eventService.setRegulation, data).then((response) => {
            funcs.setEvent(response.data.event);
            funcs.setSteps(response.data.steps);
            closeWindow();
            funcs.openConfirmTeams();
        })
    }

    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={"popup-frame fill-regulation-component"}>
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
                        <DropDownComponent value={format} setValue={setFormat} leftIcon={'two-people-icon'}
                                           sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={1} content={formats}/>
                        <DropDownComponent value={mode} setValue={setMode} leftIcon={'man-in-target-icon'}
                                           sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={2} content={modes}/>
                        <DropDownComponent value={countCircle} setValue={setCountCircle} leftIcon={'football-field-icon'}
                                           sizingClass={"dropdown-size-count-circle"} flagClose={closeDropDown} id={3} content={countCircles}/>
                        <DropDownComponent value={duration} setValue={setDuration} leftIcon={'gray-clock-icon'}
                                           sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={4} content={durations}/>
                        <CheckSliderComponent value={scorer} setValue={setScorer} text={"Учитывать авторов голов"} sizingClass={"check-slider-size"}/>
                        <CheckSliderComponent value={untilGoal} setValue={setUntilGoal} text={"Игра до гола"} sizingClass={"check-slider-size"}/>
                    </div>
                    <button className={`elem elem-5 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={fillRegulation}>Поделиться на команды</button>
                </div>
            </div>
        </Modal>
    )

}