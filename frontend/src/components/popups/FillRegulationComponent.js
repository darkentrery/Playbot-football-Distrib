import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import DropDownComponent from "../dropDownComponent/DropDownComponent";
import {CheckSliderComponent} from "../checkSliderComponent/CheckSliderComponent";
import {popupCloseDropdown} from "../../utils/manageElements";
import {InputComponent} from "../inputComponent/InputComponent";
import {ReglamentComponent} from "../reglamentComponent/ReglamentComponent";


export default function FillRegulationComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [format, setFormat] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const [formats, setFormats] = useState([]);
    const [mode, setMode] = useState(false);
    const [modes, setModes] = useState([]);
    const [countCircle, setCountCircle] = useState(false);
    const [countCircles, setCountCircles] = useState([]);
    const [duration, setDuration] = useState(false);
    const [durations, setDurations] = useState([]);
    const [scorer, setScorer] = useState(false);
    const [untilGoal, setUntilGoal] = useState(false);
    const [untilGoalCount, setUntilGoalCount] = useState('');
    const [closeDropDown, setCloseDropDown] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (event) {
            if (event.until_goal_count) setUntilGoalCount(event.until_goal_count);
            eventService.getRegulation(event.id).then((response) => {
                let arr = [];
                response.data.formats.map((item, key) => {
                    if (item.count * 2 <= event.event_player.length) arr.push(item.name);
                })
                if (!arr.length) arr.push(false);
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
    }, [isOpen, event])

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('id', event.id);
        bodyFormData.append('format', format);
        bodyFormData.append('distribution_method', mode);
        bodyFormData.append('count_circles', countCircle);
        bodyFormData.append('duration', duration);
        bodyFormData.append('scorer', scorer);
        bodyFormData.append('until_goal', untilGoal);
        if (!untilGoal) setUntilGoalCount('');
        if (untilGoalCount === '') {
            bodyFormData.append('until_goal_count', null);
        } else {
            bodyFormData.append('until_goal_count', untilGoalCount);
        }
        setData(bodyFormData);
    }, [format, mode, countCircle, duration, scorer, untilGoal, untilGoalCount])

    const closeWindow = () => {
        funcs.closeFillRegulation();
        funcs.showMap();
    }

    const toConfirmPlayers = () => {
        closeWindow();
        funcs.openConfirmPlayers();
        funcs.removeMap();
    }

    const fillRegulation = () => {
        if (untilGoal && untilGoalCount === '') {
            setErrorText('Введите количество голов!');
        } else {
            console.log(format, formatError)
            if (format) {
                authDecoratorWithoutLogin(eventService.setRegulation, data).then((response) => {
                    funcs.setEvent(response.data);
                    closeWindow();
                    funcs.openConfirmTeams();
                    funcs.removeMap();
                })
            } else {
                setFormatError('Выберите формат!');
            }
        }
    }

    const inputDigit = (value) => {
        setErrorText('');
        value = value.replace(/\D/g, '');
        if (value.length >= 1 && value[0] === '0') value = value.slice(1,);
        return value;
    }

    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
    }

    return (
        <ReglamentComponent className={`fill-regulation-component ${untilGoal ? 'until-goal' : ''}`} closeWindow={closeWindow} isOpen={isOpen} step={2}
                            title={"Заполните регламент"} popupClick={popupClick} clickBack={toConfirmPlayers}>
            <div className={"elem elem-4"}>
                <DropDownComponent
                    value={format} setValue={setFormat} leftIcon={'two-people-icon'} sizingClass={"dropdown-size-format"}
                    flagClose={closeDropDown} id={1} content={formats} errorText={formatError} setErrorText={setFormatError}
                />
                <DropDownComponent value={duration} setValue={setDuration} leftIcon={'gray-clock-icon'}
                                   sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={4} content={durations}/>
                <DropDownComponent value={countCircle} setValue={setCountCircle} leftIcon={'football-field-icon'}
                                   sizingClass={"dropdown-size-count-circle"} flagClose={closeDropDown} id={3} content={countCircles}
                                   rightSecondIcon={'question-mark-icon'} rightFirstIcon={'question-mark-icon'}/>
                <DropDownComponent value={mode} setValue={setMode} leftIcon={'man-in-target-icon'}
                                   sizingClass={"dropdown-size-format"} flagClose={closeDropDown} id={2} content={modes}/>
                <CheckSliderComponent value={scorer} setValue={setScorer} text={"Учитывать авторов голов"} sizingClass={"check-slider-size"}/>
                <CheckSliderComponent value={untilGoal} setValue={setUntilGoal} text={"Игра до X голов"} sizingClass={"check-slider-size"} textIcon={"question-mark-icon"}/>
                <InputComponent className={`until-goal-input ${untilGoal ? '' : 'hidden'}`} value={untilGoalCount}
                                setValue={setUntilGoalCount} placeholder={"Количество голов"} onChange={inputDigit} errorText={errorText}/>
            </div>
            <button className={`elem elem-5 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={fillRegulation}>Поделиться на команды</button>
        </ReglamentComponent>
    )

}