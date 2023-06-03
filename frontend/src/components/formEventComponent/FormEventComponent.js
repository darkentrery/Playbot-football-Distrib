import ReactDatetimeClass from "react-datetime";
import DropDownComponent from "../dropDownComponent/DropDownComponent";
import React, {useEffect, useRef, useState} from "react";
import {choiceDate, choiceTime, getLocalTime, getUTCTime} from "../../utils/dates";
import {InputComponent} from "../inputComponent/InputComponent";
import {LocateEventComponent} from "../locateEventComponent/LocateEventComponent";
import {CheckSliderComponent} from "../checkSliderComponent/CheckSliderComponent";
import "react-datetime/css/react-datetime.css";
import {blockBodyScroll} from "../../utils/manageElements";
import {cityService} from "../../services/CityService";


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
    isEdit=false,
}) => {
    const [id, setId] = useState(false);
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [count, setCount] = useState(4);
    const [notice, setNotice] = useState('');
    const [format, setFormat] = useState(false);
    const [isNotPlayer, setIsNotPlayer] = useState(false);
    const [incorrectDate, setIncorrectDate] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [fieldError, setFieldError] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(false);
    const [currency, setCurrency] = useState('RUB');
    const [priceError, setPriceError] = useState(false);
    const [countPlayers, setCountPlayers] = useState([]);
    const [fields, setFields] = useState([]);
    const [fieldsView, setFieldsView] = useState([]);
    const [field, setField] = useState(false);
    const refDate = useRef();
    const refTime = useRef();
    const refAddress = useRef();
    const refNotice = useRef();
    const refAddressInput = useRef();
    const currencies = ["RUB", "KZT", "UAH", "AZN", "GEL", "AMD"]
    const formats = ["2x2", "3x3", "4x4", "5x5", "6x6", "7x7", "8x8", "9x9", "10x10", "11x11",];

    const closeWindow = () => {
        setId(false);
        setName(false);
        setDate(false);
        setTime(false);
        setAddress(false);
        setCount(4);
        setIsNotPlayer(false);
        setNotice('');
        setFormat(false);
        setIsPaid(false);
        setPrice(false);
        setCurrency('RUB')
        clickClose();
    }

    useEffect(() => {
        console.log(event)
        if (event && isOpen) {
            setId(event.id);
            setName(event.name);
            if (event.date && event.date.length) setDate(`${event.date.slice(8, 10)}.${event.date.slice(5, 7)}.${event.date.slice(0, 4)}`);
            if (event.time_begin) setTime(getLocalTime(event.time_begin.slice(0, 5)));
            setCount(event.count_players);
            if (event.field) setField(`${event.field.name} - ${event.field.address.s_h_string}`);
            if (event) setIsNotPlayer(!event.is_player);
            setNotice(event.notice);
            setFormat(event.format_label);
            setCurrency(event.currency);
            if (event && event.is_paid) setIsPaid(event.is_paid);
            setPrice(event.price);
        }
        let array = [];
        for (let i=4; i<51; i++) {
            array.push(i);
        }
        setCountPlayers(array);
        blockBodyScroll(isOpen);

        cityService.getFields().then((response) => {
            console.log(response.data)
            setFields(response.data);
            let array = response.data.map((field) => {
                return `${field.name} - ${field.address.s_h_string}`;
            })
            setFieldsView(array);
        })
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
        let newField;
        if (field) {
            for (let obj of fields) {
                if (`${obj.name} - ${obj.address.s_h_string}` === field) {
                    newField = obj.id;
                    break;
                }
            }
        }
        let bodyFormData = {
            'id': id,
            'name': name,
            'date': newDate,
            'time_begin': time ? getUTCTime(time) : time,
            'field': newField,
            'count_players': count,
            'is_player': !isNotPlayer,
            'notice': notice,
            'is_paid': isPaid,
            'price': price,
            'format_label': format,
            'currency': currency,
        };
        console.log(bodyFormData)
        setData(bodyFormData);
    }, [name, date, time, field, count, isNotPlayer, notice, isPaid, price, format, currency]);

    useEffect(() => {
        if (refDate.current) refDate.current.setState({inputValue: ''});
    }, [incorrectDate])

    const renderDay = (props, currentDate, selectedDate) => {
        let date = new Date(currentDate.format("YYYY-MM-DD"));
        let now = new Date();
        now.setHours(date.getHours());
        now.setMinutes(date.getMinutes());
        now.setSeconds(date.getSeconds());
        now.setMilliseconds(date.getMilliseconds());
        let nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        if (date < now || date > nextMonth) {
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
        // if (isEdit) {
        //
        // } else {
        //     setAddress(e.target.value);
        //     setCity(false);
        //     setPoint(false);
        //     if (e.target.value && e.target.value.length > 6) {
        //         getLocationsArrayGoogle(e.target.value).then((array) => {
        //             setSuggests(array);
        //         })
        //     } else {
        //         setSuggests([]);
        //     }
        // }
    }

    const changeCount = (value) => {
        if (isEdit && event.count_current_players >= value) {
           return;
        } else {
            setCount(value);
        }
    }

    const sendForm = async () => {
        if (name && date && time && field && (!isPaid || (isPaid && price)) && format) {
            if (new Date(`${data.date}T${getLocalTime(data.time_begin)}`) > new Date()) {
                onClick(data);
            } else {
                setDateError("Выберите правильное время!");
                setTimeError("Выберите правильное время!");
            }
        }
        if (!name) setNameError("Заполните поле!");
        if (!date) setDateError("Заполните поле!");
        if (!time) setTimeError("Заполните поле!");
        if (!field) setFieldError("Заполните поле!");
        if (isPaid && !price) setPriceError("Заполните поле!");
        if (!format) setFormatError("Заполните поле!");
    }

    const choiceAddress = (e) => {
        let suggest = suggests[e.target.id];
        setAddress(suggest);
        setSuggests([]);
    }

    const onFocusAddress = () => {
        setAddressFocus(true);
    }

    const openMap = () => {
        setIsOpenMap(true);
    }

    const inputDigit = (value) => {
        setPriceError('');
        value = value.replace(/\D/g, '');
        if (value.length >= 1 && value[0] === '0') value = value.slice(1,);
        return value;
    }

    const changeIsPlayer = () => {
        if (event && event.count_players === event.count_current_players) {
            setIsNotPlayer(isNotPlayer);
        }
    }

    const changeIsPaid = () => {
        if (!isEdit) setPrice(false);
    }

    return (
        <div className={`form-event-component ${className}`}>
            <div onClick={closeWindow} className={"btn-close"}></div>
            <div className={"elem elem-1"}>
                <span>{titleText}</span>
            </div>
            <div className={"form-event-body scroll"}>
                <InputComponent className={"elem elem-2"} value={name ? name : ''} onChange={isEdit? () => {return name;} : inputName}
                                placeholder={"Название *"} leftIcon={"ball-icon"} errorText={nameError} setValue={setName}/>
                {/*<div className={`elem elem-3 div-input`} ref={refAddress}>*/}
                {/*    <input className={`map-point-icon input-icon ${addressError ? 'error' : ''}`} type="text" placeholder={"Адрес проведения *"}*/}
                {/*           value={address ? getAddressStringFormat(address) : ''}*/}
                {/*           onChange={getAddress} ref={refAddressInput} onFocus={onFocusAddress}/>*/}
                {/*    <div className={"map-paper-icon"} onClick={isEdit ? () => {} : openMap}></div>*/}
                {/*    <span className={`input-message ${addressError ? 'error' : ''}`}>{addressError}</span>*/}
                {/*    <div className={`suggests scroll ${suggests.length ? '' : 'hidden'}`}>*/}
                {/*        {suggests.length !== 0 && suggests.map((item, key) => (*/}
                {/*            <span className={"suggest-item gray-400-12"} key={key} onClick={choiceAddress} id={key}>{item.formatted}</span>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <DropDownComponent
                    value={field} setValue={setField} leftIcon={'map-point-icon'} sizingClass={"elem elem-3"}
                    content={fieldsView} errorText={fieldError} setErrorText={setFieldError}
                    placeholder={"Площадка проведения *"}
                />
                <DropDownComponent
                    value={format} setValue={setFormat} leftIcon={'football-field-icon'} sizingClass={"elem elem-4"}
                    content={formats} errorText={formatError} setErrorText={setFormatError}
                    placeholder={"Формат площадки*"}
                />
                <div className={"elem elem-5"}>
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
                    <span className={`input-message time-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                    {/*<div className={`confirm-time black-plus-icon ${isTimeOpen ? '' : 'hidden'}`} onClick={() => setIsTimeOpen(false)}></div>*/}
                </div>
                <span className={`elem input-message datetime-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                <div className={"elem elem-6"}>
                    <span>Максимальное кол. игроков *</span>
                </div>
                <DropDownComponent value={count} setValue={changeCount} leftIcon={'foot-icon'} sizingClass={"elem elem-7"} content={countPlayers}/>
                <CheckSliderComponent value={isNotPlayer} setValue={setIsNotPlayer} text={"Организатор события не играет"}
                                      sizingClass={"elem elem-8"} onClick={changeIsPlayer}/>
                <CheckSliderComponent value={isPaid} setValue={isEdit ? () => {} : setIsPaid} text={"Участие платное"} sizingClass={"elem elem-9"} onClick={changeIsPaid}/>
                <div className={`elem elem-10 ${isPaid ? '' : 'hidden'}`}>
                    <InputComponent value={price} setValue={setPrice} placeholder={"Стоимость участия *"} onChange={isEdit? () => {return price;} : inputDigit}
                                    errorText={priceError} className={"price"} leftIcon={"gray-wallet-icon"}/>
                    <DropDownComponent value={currency} setValue={isEdit ? () => {} : setCurrency} leftIcon={""} sizingClass={"currency-dropdown"} content={currencies}/>
                </div>

                <div className={"elem elem-11"} ref={refNotice}>
                    <textarea name="" id="" cols="30" rows="5" onChange={inputNotice} placeholder={"Комментарии"} value={notice ? notice : ''}></textarea>
                </div>
            </div>

            <div className={`elem elem-12 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn btn-form-event"} onClick={sendForm}>Сохранить</button>
            </div>
            <LocateEventComponent className={`elem-13 ${isOpenMap ? '' : 'hidden'}`} userAddress={user.address ? user.address : null}
                                  setField={setField} setIsOpenMap={setIsOpenMap} address={address} fields={fields}/>
        </div>
    )
}