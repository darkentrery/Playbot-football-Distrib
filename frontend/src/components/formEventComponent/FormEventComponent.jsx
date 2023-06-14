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
import { CheckboxComponent } from "../checkboxComponent/CheckboxComponent";
import RangeTwoPointInput from "../RangeInputs/RangeTwoPointInput/RangeTwoPointInput";
import { AccordionWrapper } from "../AccordionWrapper/AccordionWrapper";
import InputFromToComponent from "../InputFromToComponent/InputFromToComponent";
import LineDateTimePicker from "../LineDateTimePicker/LineDateTimePicker";
import {telegramService} from "../../services/TelegramService";


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
    onDeleteEventClick = () => {},
    user,
    isEdit=false,
    buttonText='Создать'
}) => {
    const [id, setId] = useState(false);
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [count, setCount] = useState(false);
    const [notice, setNotice] = useState('');
    const [format, setFormat] = useState(false);
    const [isNotPlayer, setIsNotPlayer] = useState(false);
    const [incorrectDate, setIncorrectDate] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [fieldError, setFieldError] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(false);
    const [currency, setCurrency] = useState('RUB');
    const [priceError, setPriceError] = useState(false);
    const [countPlayers, setCountPlayers] = useState([]);
    const [countError, setCountError] = useState(false);
    const [fields, setFields] = useState([]);
    const [fieldsView, setFieldsView] = useState([]);
    const [field, setField] = useState(false);
    const [anonseLentaCheck, setAnonseLentaCheck] = useState(true); 
    const [anonseTgCheck, setAnonseTgCheck] = useState(false);
    const [isDelayedAnonse, setIsDelayedAnonse] = useState(false)
    const [allowMale, setAllowMale] = useState(true);
    const [allowFemale, setAllowFemale] = useState(true);
    const [publicInChannel, setPublicInChannel] = useState(null);
    const [publicInChannelError, setPublicInChannelError] = useState(false);
    const [channels, setChannels] = useState([]);
    const [genders, setGenders] = useState([1, 2]);
    const [delayedTimeError, setDelayedTimeError] = useState(false);

    // need backend -->

    const [ratingLimit, setRatingLimit] = useState([0, 5000]); // [0, 25] min
    // const [anonseList, setAnonseList] = useState(['Lenta']) // anonse list - может быть пустым [] или с данными куда пост выкатить ['Lenta', 'Telegram']
    const [delayedTime, setDelayedTime] = useState({'date': false, 'time': false}); // date - 01.03.2022  time - 17:01 UTC
    const [matchDuration, setMatchDuration] = useState(false); // в минутах 30, 60 и тд, если false то без времени
    const [ageLimit, setAgeLimit] = useState([0, 0]); // [0, 100], может быть [18, false] - это от 18 лет или [false, 30] - до 30 лет

    const refDate = useRef(); 
    const refTime = useRef();
    const refNotice = useRef();
    const currencies = ["RUB", "KZT", "UAH", "AZN", "GEL", "AMD"];

    const closeWindow = () => {
        setId(false);
        setName(false);
        setDate(false);
        setTime(false);
        setAddress(false);
        setCount(false);
        setIsNotPlayer(false);
        setNotice('');
        setFormat(false);
        setIsPaid(false);
        setPrice(false);
        setCurrency('RUB');
        setAllowFemale(true);
        setAllowMale(true);
        setRatingLimit([0, 5000]);
        setDelayedTime({'date': false, 'time': false});
        setMatchDuration(false);
        setAgeLimit([0, 0]);
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
            setNotice(event.notice);
            setCurrency(event.currency);
            if (event && event.is_paid) setIsPaid(event.is_paid);
            if (event.duration_opt) setMatchDuration(event.duration_opt);
            setPrice(event.price);
            setAnonseLentaCheck(event.is_news_line);
            setAnonseTgCheck(!!event.public_in_channel);
            setIsDelayedAnonse(event.is_delay_publish);
            setAgeLimit([event.min_age, event.max_age]);
            setRatingLimit([event.min_players_rank, event.max_players_rank]);
            let genderIds = event.genders.map(g => g.id);
            setAllowMale(genderIds.includes(1));
            setAllowFemale(genderIds.includes(2));
            if (event.public_in_channel) {
                setPublicInChannel(event.public_in_channel.name);
            }
            if (event.publish_time) {
                setDelayedTime({date: event.publish_time.slice(0, 10), time: getLocalTime(event.publish_time.slice(11, 16))});
            }
        }
        let array = [];
        for (let i=4; i<51; i++) {
            array.push(i);
        }
        setCountPlayers(array);
        blockBodyScroll(isOpen);

        cityService.getFields().then((response) => {
            setFields(response.data);
            let array = response.data.map((field) => {
                return `${field.name} - ${field.address.s_h_string}`;
            })
            setFieldsView(array);
        })
        telegramService.getChannelsByAdmin(user.id.toString()).then((response) => {
            if (response.status === 200) {
                setChannels(response.data);
            }
        })
    }, [event, isOpen])
    useEffect(() => {
        setNameError(false);
        setDateError(false);
        setTimeError(false);
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
        let newMatchDuration;
        if (isNaN(parseInt(matchDuration))) {
            newMatchDuration = null;
        } else {
            newMatchDuration = parseInt(matchDuration)
        }
        let allowGenders = [];
        if (allowMale) allowGenders.push(1);
        if (allowFemale) allowGenders.push(2);
        let bodyFormData = {
            'id': id,
            'name': name,
            'date': newDate,
            'time_begin': time ? getUTCTime(time) : time,
            'field': newField,
            'count_players': count,
            'notice': notice,
            'is_paid': price > 0 ? true : false,
            'price': price,
            'currency': currency,
            'genders': allowGenders,
            'min_age': ageLimit[0] ? ageLimit[0] : 0,
            'max_age': ageLimit[1] ? ageLimit[1] : 0,
            'min_players_rank': ratingLimit[0],
            'max_players_rank': ratingLimit[1],
            'public_in_channel': anonseTgCheck && publicInChannel ? publicInChannel : null,
            'duration_opt': newMatchDuration,
            'is_news_line': anonseLentaCheck,
            'publish_time': null,
        };
        if (isDelayedAnonse && delayedTime.date && delayedTime.time) {
            bodyFormData.publish_time = `${delayedTime.date}T${delayedTime.time ? getUTCTime(delayedTime.time) : delayedTime.time}`;
        }
        console.log(bodyFormData)
        setData(bodyFormData);
    }, [name, date, time, field, count, isNotPlayer, notice, isPaid, price, format, currency, ratingLimit,
        delayedTime, matchDuration, allowMale, allowFemale, ageLimit, anonseLentaCheck, publicInChannel, fields,
        isDelayedAnonse, anonseTgCheck]);

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

    const changeCount = (value) => {
        if (isEdit && event.count_current_players >= value) {
           return;
        } else {
            setCount(value);
        }
    }

    const sendForm = async () => {
        if (name && date && time && field && count && (publicInChannel || !anonseTgCheck) && ((delayedTime.date && delayedTime.time) || !isDelayedAnonse)) {
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
        if (!count) setCountError("Заполните поле!");
        if (!publicInChannel && anonseTgCheck) setPublicInChannelError("Заполните поле!");
        if (isDelayedAnonse && (delayedTime.date || delayedTime.time)) setDelayedTimeError("Заполните поле!");
    }

    const inputDigit = (value) => {
        setPriceError('');
        value = value.replace(/\D/g, '');
        if (value.length >= 1 && value[0] === '0') value = value.slice(1,);
        return value;
    }

    return (
        <div className={`form-event-component scroll ${className}`}>
            <div onClick={closeWindow} className={"btn-close"}></div>
            <div className={"elem elem-1"}>
                <span className="form-event-title">{titleText}</span>
            </div>
            <div className={"form-event-body"}>
                <div className="form-event-body-top">
                    <InputComponent maxLength={20} className={"elem elem-2"} value={name ? name : ''} onChange={isEdit? () => {return name;} : inputName}
                                    placeholder={"Название события *"} leftIcon={"ball-icon"} errorText={nameError} setValue={setName}/>
                    <DropDownComponent
                        value={field} setValue={setField} leftIcon={'map-point-icon'} sizingClass={"elem elem-3"}
                        content={fieldsView} errorText={fieldError} setErrorText={setFieldError}
                        placeholder={"Площадка *"}
                    />
                    <div className={"elem elem-5 min-content"}>
                        <div className="formEvent__date-time-input">
                            <ReactDatetimeClass
                                className={`div-input elem-5-select-date date ${dateError ? 'error' : ''}`}
                                timeFormat={false}
                                dateFormat={"DD.MM.YYYY"}
                                closeOnSelect={true}
                                inputProps={{placeholder: 'Дата *'}}
                                onChange={(e) => choiceDate(e, setDate, refDate, setIncorrectDate, incorrectDate)}
                                ref={refDate}
                                value={date ? date : ''}
                                renderDay={renderDay}
                            />
                            {(dateError || timeError) ? <span className={`input-message date-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span> : null}
                        </div>
                        <div className="formEvent__date-time-input">
                            <ReactDatetimeClass
                                className={`div-input elem-select-time time ${timeError ? 'error' : ''}`}
                                timeFormat={"HH:mm"}
                                dateFormat={false}
                                closeOnSelect={true}
                                inputProps={{placeholder: 'Время *'}}
                                onChange={(e) => choiceTime(e, setTime, refTime)}
                                ref={refTime}
                                value={time ? time : ''}
                            />
                            {(dateError || timeError) ? <span className={`input-message time-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span> : null}
                        </div>
                        {/*<div className={`confirm-time black-plus-icon ${isTimeOpen ? '' : 'hidden'}`} onClick={() => setIsTimeOpen(false)}></div>*/}
                    </div>
                    <span className={`elem input-message datetime-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                    <DropDownComponent
                        value={matchDuration} setValue={setMatchDuration} leftIcon={'duration-icon'} sizingClass={"elem elem-3 elem-96"}
                        content={['без времени','30 мин', '60 мин', '90 мин', '120 мин']} errorText={fieldError} setErrorText={setFieldError}
                        placeholder={"Продолжительность"}
                    />
                    <DropDownComponent value={count} setValue={changeCount} leftIcon={'foot-icon'} sizingClass={"elem elem-7"} content={countPlayers}
                    placeholder={"Количество слотов *"} errorText={countError} setErrorText={setCountError}/>
                    <div className={`elem elem-10`}>
                        <InputComponent value={price} setValue={setPrice} placeholder={"Стоимость"} onChange={isEdit? () => {return price;} : inputDigit}
                                        errorText={priceError} className={"price"} leftIcon={"gray-wallet-icon"}/>
                        <DropDownComponent value={currency} setValue={isEdit ? () => {} : setCurrency} leftIcon={""} sizingClass={"currency-dropdown"} content={currencies}/>
                    </div>
                    <div className="formEvent__placement">
                        <p>Плейсмент *</p>
                        <div className="formEvent__placement-checkboxes">
                            <CheckboxComponent checked={anonseLentaCheck} setChecked={setAnonseLentaCheck} text="Лента"/>
                            <CheckboxComponent checked={anonseTgCheck} setChecked={setAnonseTgCheck}  text="TG чат"/>
                        </div>
                    </div>
                    {anonseTgCheck && 
                        <DropDownComponent
                            value={publicInChannel} setValue={setPublicInChannel} leftIcon={'chat-icon'} sizingClass={"elem elem-3 formEvent__placement-select"}
                            content={[...channels.map(c => c.name)]} errorText={publicInChannelError} setErrorText={setPublicInChannelError}
                            placeholder={"Выберите чат *"}
                        />
                    }
                    <div className="formEvent__delayed-post">
                        <CheckSliderComponent value={isDelayedAnonse} setValue={setIsDelayedAnonse} text={"Отложенная публикация"}/>
                        {isDelayedAnonse && <LineDateTimePicker output={setDelayedTime} value={delayedTime}/>}
                    </div>
                </div>
            </div>
            <AccordionWrapper wrapperClasses="formEvent__accordion" defaultValue={true}>
                <div className="formEvent__gender-and-age">
                    <div className="formEvent__age-limit">
                        <span className="text-footnote">Пол</span>
                        <div className="formEvent__gender-limit">
                            <CheckboxComponent checked={allowMale} setChecked={setAllowMale} text="М"/>
                            <CheckboxComponent checked={allowFemale} setChecked={setAllowFemale} text="Ж"/>
                        </div>
                    </div>
                    <div className="formEvent__age-limit">
                        <span className="text-footnote">Возраст</span>
                        <InputFromToComponent output={setAgeLimit} classes={'formEvent__age-limit-input'}/>
                    </div>
                </div>
                <div className="formEvent__rating-range">
                    <div className="formEvent__rating-range-text">
                        Рейтинг игроков
                        <span>
                            {`${ratingLimit[0]}-${ratingLimit[1]}`}
                        </span>
                    </div>
                    <RangeTwoPointInput
                        step={25} minValue={0} maxValue={5000} output={setRatingLimit} classes={"formEvent__rating-range-width"}
                        defaultValue1={ratingLimit[0]} defaultValue2={ratingLimit[1]}
                    />
                </div>
            </AccordionWrapper>
            <div className={"elem elem-11"} ref={refNotice}>
                <textarea name="" id="" cols="30" rows="5" onChange={inputNotice} placeholder={"Комментарий"} value={notice ? notice : ''}></textarea>
            </div>
            <div className={`elem elem-12 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn btn-form-event"} onClick={sendForm}>{buttonText}</button>
            </div>
            <div className="red-bucket-icon red-400-14 event-form-delete" onClick={onDeleteEventClick}>
                Отменить событие
            </div>
            <LocateEventComponent className={`elem-13 ${isOpenMap ? '' : 'hidden'}`} userAddress={user.address ? user.address : null}
                setField={setField} setIsOpenMap={setIsOpenMap} address={address} fields={fields}
            />
        </div>
    )
}