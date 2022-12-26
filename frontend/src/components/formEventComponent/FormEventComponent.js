import ReactDatetimeClass from "react-datetime";
import DropDownComponent from "../dropDownComponent/DropDownComponent";
import React, {useEffect, useRef, useState} from "react";
import {choiceDate, choiceTime} from "../../utils/dates";
import {getLocations} from "../../services/LocationService";
import {InputComponent} from "../inputComponent/InputComponent";
import {LocateEventComponent} from "../locateEventComponent/LocateEventComponent";
import {CheckSliderComponent} from "../checkSliderComponent/CheckSliderComponent";


export const FormEventComponent = ({
    isOpen,
    event=false,
    isIPhone,
    clickClose,
    data,
    setData,
    onClick = () => {},
    className='',
    closeDropDown,
    titleText,
    suggests,
    setSuggests,
    addressFocus=false,
    setAddressFocus = () => {},
    user,
}) => {
    const [id, setId] = useState(false);
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [city, setCity] = useState(false);
    const [point, setPoint] = useState(false);
    const [count, setCount] = useState(false);
    const [notice, setNotice] = useState('');
    const [format, setFormat] = useState('');
    const [isPlayer, setIsPlayer] = useState(false);
    const [incorrectDate, setIncorrectDate] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [countPlayers, setCountPlayers] = useState([]);
    const refDate = useRef();
    const refTime = useRef();
    const refAddress = useRef();
    const refNotice = useRef();
    const refAddressInput = useRef();

    const closeWindow = () => {
        setId(false);
        setName(false);
        setDate(false);
        setTime(false);
        setAddress(false);
        setCount(1);
        setIsPlayer(false);
        setNotice('');
        clickClose();
    }

    useEffect(() => {
        if (event) {
            setId(event.id);
            setName(event.name);
            if (event.date && event.date.length) setDate(`${event.date.slice(8, 10)}.${event.date.slice(5, 7)}.${event.date.slice(0, 4)}`);
            if (event.time_begin) setTime(event.time_begin.slice(0, 5));
            if (event.address) setAddress(event.address);
            setPoint(event.geo_point);
            if (event.city) setCity(event.city.name);
            setCount(event.count_players);
            if (event && event.is_player) setIsPlayer(true);
            setNotice(event.notice);
        }
        let array = [];
        for (let i=4; i<15; i++) {
            array.push(i);
        }
        setCountPlayers(array);
    }, [event, isOpen])

    useEffect(() => {
        setNameError(false);
        setDateError(false);
        setTimeError(false);
        setAddressError(false);
        let newDate;
        if (date) {
            let match = date.match(/\d{2}[.]\d{2}[.]\d{4}/);
            if (match !== null) {
                newDate = `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
            } else {
                newDate = date;
            }
        }
        let bodyFormData = {
            'id': id,
            'name': name,
            'date': newDate,
            'time_begin': time,
            'address': address,
            'count_players': count,
            'is_player': isPlayer,
            'notice': notice,
            'city': city,
            'geo_point': point,
        };
        setData(bodyFormData);
    }, [name, date, time, address, count, isPlayer, notice, point, city]);

    useEffect(() => {
        if (refDate.current) refDate.current.setState({inputValue: ''});
    }, [incorrectDate])

    const renderDay = (props, currentDate, selectedDate) => {
        let date = new Date(currentDate.format("YYYY-MM-DD"));
        if (date.setDate(date.getDate() + 1) < Date.now()) {
            props.className = "calendar-day inactive";
        } else {
            props.className = "calendar-day";
        }

        return <td {...props}>{currentDate.date()}</td>;
    }

    const inputName = (value) => {
        return  value.slice(0, 20);
    }

    const inputNotice = (e) => {
        let rows = e.target.value.split('\n');
        if (rows.length > 4) e.target.value = rows.slice(0, 4).join('\n');
        setNotice(e.target.value);
    }

    const getAddress = (e) => {
        setAddress(e.target.value);
        setCity(false);
        setPoint(false);
        if (e.target.value && e.target.value.length > 6) {
            getLocations(e.target.value).then((response) => {
                if (response.status === 200) {
                    let geoObjects = response.data.results;
                    let array = [];
                    geoObjects.map((item) => {
                        if (item.components.city) array.push(item);
                    })
                    setSuggests(array);
                }
            })
        } else {
            setSuggests([]);
        }
    }

    const sendForm = async () => {
        if (name && date && time && address && city && point) {
            onClick(data);
        }
        if (!name) setNameError("Заполните поле!");
        if (!date) setDateError("Заполните поле!");
        if (!time) setTimeError("Заполните поле!");
        if (!address || !city || !point) setAddressError("Заполните поле!");
    }

    const choiceAddress = (e) => {
        let suggest = suggests[e.target.id];
        let components = suggest.components;
        let point = `${suggest.geometry.lat} ${suggest.geometry.lng}`;
        let city = suggest.components.city;
        let newAddress = {
            "country": components.country,
            "city": components.city,
        };
        if (components.region) newAddress["region"] = components.region;
        if (components.state) newAddress["state"] = components.state;
        if (components.road) newAddress["street"] = components.road;
        if (components.house_number) newAddress["house_number"] = components.house_number;
        setAddress(newAddress);
        setCity(city);
        setPoint(point);
        setSuggests([]);
    }

    const onFocusAddress = () => {
        setAddressFocus(true);
    }

    const openMap = () => {
        setIsOpenMap(true);
    }

    const changeIsPlayer = () => {
        if (event && event.count_players === event.event_player.length && !isPlayer) {
            setIsPlayer(false);
        }
    }


    return (
        <div className={`form-event-component scroll ${className}`}>
            <div className={"elem elem-1"}>
                <span>{titleText}</span>
                <div onClick={closeWindow} className={"btn-close"}></div>
            </div>
            <InputComponent className={"elem elem-2"} value={name ? name : ''} onChange={inputName}
                            placeholder={"Название *"} leftIcon={"ball-icon"} errorText={nameError} setValue={setName}/>
            <div className={`elem elem-3 div-input`} ref={refAddress}>
                <input className={`map-point-icon input-icon ${addressError ? 'error' : ''}`} type="text" placeholder={"Адрес проведения *"}
                       value={address ? `${address.country ? address.country : address}${address.city ? ', ' + address.city : ''}${address.street ? ', ' + address.street : ''}${address.house_number ? ', ' + address.house_number : ''}` : ''}
                       onChange={getAddress} ref={refAddressInput} onFocus={onFocusAddress}/>
                <div className={"map-paper-icon"} onClick={openMap}></div>
                <span className={`input-message ${addressError ? 'error' : ''}`}>{addressError}</span>
                <div className={`suggests scroll ${suggests.length ? '' : 'hidden'}`}>
                    {suggests.length !== 0 && suggests.map((item, key) => (
                        <span className={"suggest-item gray-400-12"} key={key} onClick={choiceAddress} id={key}>{item.formatted}</span>
                    ))}
                </div>
            </div>
            <InputComponent className={"elem elem-4"} value={format} setValue={setFormat} errorText={formatError}
                            leftIcon={"football-field-icon"} placeholder={"Формат площадки *"}/>
            <div className={"elem elem-5"}>
                {/*<div className={"datetime"}>*/}
                    <ReactDatetimeClass
                        className={`div-input date ${dateError ? 'error' : ''}`}
                        timeFormat={false}
                        dateFormat={"DD.MM.YYYY"}
                        closeOnSelect={true}
                        inputProps={{placeholder: 'Дата игры *'}}
                        onChange={(e) => choiceDate(e, setDate, refDate, setIncorrectDate, incorrectDate)}
                        ref={refDate}
                        value={date ? date : ''}
                        renderDay={renderDay}
                    />
                    <span className={`input-message date-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                    <ReactDatetimeClass
                        className={`div-input time ${timeError ? 'error' : ''}`}
                        timeFormat={"HH:mm"}
                        dateFormat={false}
                        closeOnSelect={true}
                        inputProps={{placeholder: 'Время начала *'}}
                        onChange={(e) => choiceTime(e, setTime, refTime)}
                        ref={refTime}
                        value={time ? time : ''}
                    />
                {/*</div>*/}
                <span className={`input-message time-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>

            </div>
            <span className={`elem input-message datetime-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
            <div className={"elem elem-6"}>
                <span>Максимальное кол. игроков *</span>
            </div>
            <DropDownComponent value={count} setValue={setCount} leftIcon={'foot-icon'} sizingClass={"elem elem-7"} flagClose={closeDropDown} id={1} content={countPlayers}/>
            {/*<div className={"elem elem-8"}>*/}
            {/*    <div className={`${isPlayer ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={changeIsPlayer}></div>*/}
            {/*    <span>Организатор события не играет</span>*/}
            {/*</div>*/}
            <CheckSliderComponent value={isPlayer} setValue={setIsPlayer} text={"Организатор события не играет"}
                                  sizingClass={"elem elem-8"} onClick={changeIsPlayer}/>
            <CheckSliderComponent value={isPaid} setValue={setIsPaid} text={"Участие платное"} sizingClass={"elem elem-9"}/>
            <InputComponent className={`elem elem-10 ${isPaid ? '' : 'hidden'}`} value={price}
                            setValue={setPrice} placeholder={"Количество голов"} onChange={() => {}} errorText={priceError}/>
            <div className={"elem elem-11"} ref={refNotice}>
                <textarea name="" id="" cols="30" rows="5" onChange={inputNotice} placeholder={"Комментарии"} value={notice ? notice : ''}></textarea>
                {/*<span className={`input-message ${noticeError ? 'error' : ''}`}>{noticeError}</span>*/}
            </div>
            <div className={`elem elem-12 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn btn-form-event"} onClick={sendForm}>Сохранить</button>
            </div>
            <LocateEventComponent className={`elem elem-13 ${isOpenMap ? '' : 'hidden'}`} city={user.city}
                                  setCity={setCity} setAddress={setAddress} setPoint={setPoint} setIsOpenMap={setIsOpenMap}
                                  address={address}/>
        </div>
    )
}