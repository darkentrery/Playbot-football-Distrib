import DropDownComponent from "../dropDownComponent/DropDownComponent";
import React, { useEffect, useRef, useState } from "react";
import { getLocalTime, getUTCTime } from "../../utils/dates";
import { InputComponent } from "../inputComponent/InputComponent";
import { LocateEventComponent } from "../locateEventComponent/LocateEventComponent";
import { CheckSliderComponent } from "../checkSliderComponent/CheckSliderComponent";
import "react-datetime/css/react-datetime.css";
import { blockBodyScroll } from "../../utils/manageElements";
import { cityService } from "../../services/CityService";
import { CheckboxComponent } from "../checkboxComponent/CheckboxComponent";
import RangeTwoPointInput from "../RangeInputs/RangeTwoPointInput/RangeTwoPointInput";
import { AccordionWrapper } from "../AccordionWrapper/AccordionWrapper";
import InputFromToComponent from "../InputFromToComponent/InputFromToComponent";
import LineDateTimePicker from "../LineDateTimePicker/LineDateTimePicker";
import { telegramService } from "../../services/TelegramService";
import TimePicker from "../TimePicker/TimePicker";
import DatePicker from "../DatePicker/DatePicker";
import { format as formatfns } from 'date-fns';


export const FormEventComponent = ({
    isOpen,
    event = false,
    isIPhone,
    clickClose,
    data,
    setData,
    onClick = () => { },
    className = '',
    closeDropDown,
    titleText,
    suggests,
    setSuggests,
    addressFocus = false,
    setAddressFocus = () => { },
    onDeleteEventClick = () => { },
    user,
    isEdit = false,
    buttonText = 'Создать'
}) => {
    const [id, setId] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [count, setCount] = useState(false);
    const [notice, setNotice] = useState('');
    const [format, setFormat] = useState(false);
    const [isNotPlayer, setIsNotPlayer] = useState(false);
    const [incorrectDate, setIncorrectDate] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [fieldError, setFieldError] = useState(false);
    const [genderError, setGenderError] = useState(false);
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
    const [delayedTimeError, setDelayedTimeError] = useState(false);
    const [ageLimitError, setAgeLimitError] = useState(false);
    const [anonseError, setAnonseError] = useState(false);

    // need backend -->

    const [ratingLimit, setRatingLimit] = useState([0, 5000]);
    const [delayedTime, setDelayedTime] = useState({ 'date': false, 'time': false });
    const [matchDuration, setMatchDuration] = useState(false);
    const [ageLimit, setAgeLimit] = useState([0, 0]);

    const refDate = useRef();
    const refNotice = useRef();
    const currencies = ["RUB", "KZT", "UAH", "AZN", "GEL", "AMD"];

    const closeWindow = () => {
        setId(false);
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
        setDelayedTime({ 'date': false, 'time': false });
        setMatchDuration(false);
        setAgeLimit([0, 0]);
        clickClose();
    }

    useEffect(() => {
        console.log(event)
        if (event && isOpen) {
            setId(event.id);
            if (event.date && event.date.length) setDate(`${event.date.slice(8, 10)}.${event.date.slice(5, 7)}.${event.date.slice(0, 4)}`);
            if (event.time_begin) setTime(getLocalTime(event.time_begin.slice(0, 5)));

            setCount(event.count_players);
            if (event.field) setField(`${event.field.name} - ${event.field.address.s_h_string}`);
            setNotice(event.notice);
            setCurrency(event.currency);
            if (event && event.is_paid) setIsPaid(event.is_paid);
            if (event.duration_opt?.duration) setMatchDuration(event.duration_opt.duration);
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
                setDelayedTime({ date: event.publish_time.slice(0, 10), time: getLocalTime(event.publish_time.slice(11, 16)) });
            }
        }
        let array = [];
        for (let i = 4; i < 51; i++) {
            array.push(i);
        }
        setCountPlayers(array);
        blockBodyScroll(isOpen);

        cityService.getFields().then((response) => {
            setFields(response.data);
            let array = response.data.map((field) => {
                return `${field.name}`;
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
        // setNameError(false);
        setDateError(false);
        setTimeError(false);
        if ((allowFemale || allowMale) && genderError) setGenderError(false);
        if (isDelayedAnonse && delayedTime.date && delayedTime.time) setDelayedTimeError(false);
        if (ageLimit[0] <= ageLimit[1]) setAgeLimitError(false);
        if (anonseLentaCheck || anonseTgCheck) setAnonseError(false);
        let newDate;
        if (date) {
            if (typeof date === 'object') {
                newDate = formatfns(date, 'yyyy-MM-dd');

            } else if (date.includes('.')) {
                let parts = date.split(".");
                newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
            }
            else {
                newDate = date;
            }
        }
        let newField;
        if (field) {
            for (let obj of fields) {
                if (`${obj.name}` === field) {
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
            'date': newDate,
            'time_begin': time ? getUTCTime(time) : time,
            'field': newField,
            'count_players': count,
            'notice': notice,
            'is_paid': price > 0,
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
        setData(bodyFormData);
    }, [date, time, field, count, isNotPlayer, notice, isPaid, price, format, currency, ratingLimit,
        delayedTime, matchDuration, allowMale, allowFemale, ageLimit, anonseLentaCheck, publicInChannel, fields,
        isDelayedAnonse, anonseTgCheck]);

    useEffect(() => {
        if (refDate.current) refDate.current.setState({ inputValue: '' });
    }, [incorrectDate])

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
        if (date && time && field && count && (publicInChannel || !anonseTgCheck) && (allowMale || allowFemale) && ((delayedTime.date && delayedTime.time) || !isDelayedAnonse)) {
            if (new Date(`${data.date}T${getLocalTime(data.time_begin)}`) > new Date()) {
                onClick(data);
            } else {
                setDateError("Заполните поле!");
                setTimeError("Заполните поле!");
            }
        }
        if (!date) setDateError("Заполните поле!");
        if (!time) setTimeError("Заполните поле!");
        if (!field) setFieldError("Заполните поле!");
        if (!count) setCountError("Заполните поле!");
        if (ageLimit[0] > ageLimit[1] && ageLimit[1] !== false) setAgeLimitError(true);
        if (!allowMale && !allowFemale) setGenderError("Заполните поле!");
        if (!publicInChannel && anonseTgCheck) setPublicInChannelError("Заполните поле!");
        if (isDelayedAnonse && (!delayedTime.date || !delayedTime.time)) setDelayedTimeError(true);
        if (!anonseLentaCheck && !anonseTgCheck) setAnonseError(true);
    }

    const inputDigit = (value) => {
        setPriceError('');
        value = value.replace(/\D/g, '');
        if (value.length >= 1 && value[0] === '0') value = value.slice(1,);
        return value;
    }

    const handleDateChange = (date) => {
        console.log("new time21:", date)
        setTime(date);
    }

    const accordionIsOpen = (genderError || ageLimitError) ? true : false;
    return (
        <div className={`form-event-component scroll ${className}`}>
            <div onClick={closeWindow} className={"btn-close"}></div>
            <div className={"elem elem-1"}>
                <span className="form-event-title">{titleText}</span>
            </div>
            <div className={"form-event-body"}>
                <div className="form-event-body-top">
                    <DropDownComponent
                        value={field} setValue={setField} leftIcon={'map-point-icon'} sizingClass={"elem elem-3"}
                        content={fieldsView} errorText={fieldError} setErrorText={setFieldError}
                        placeholder={"Площадка *"}
                    />
                    <div className={"elem elem-5 min-content"}>
                        <div className="formEvent__date-time-input">
                            <DatePicker value={date} setValue={setDate} className={`div-input elem-5-select-date date ${dateError ? 'error' : ''}`} />
                            <span className={`input-message date-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                        </div>
                        <div className="formEvent__date-time-input">
                            <TimePicker setValue={handleDateChange} value={time} className={`div-input elem-select-time time ${timeError ? 'error' : ''}`} />
                            <span className={`input-message time-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                        </div>
                    </div>
                    <span className={`elem input-message datetime-message ${dateError || timeError ? 'error' : ''}`}>{dateError || timeError}</span>
                    <DropDownComponent
                        value={matchDuration} setValue={setMatchDuration} leftIcon={'duration-icon'} sizingClass={"elem elem-3 elem-96"}
                        content={['без времени', '30 мин', '60 мин', '90 мин', '120 мин']} errorText={fieldError} setErrorText={setFieldError}
                        placeholder={"Продолжительность"}
                    />
                    <DropDownComponent value={count} setValue={changeCount} leftIcon={'foot-icon'} sizingClass={"elem elem-7"} content={countPlayers}
                        placeholder={"Количество слотов *"} errorText={countError} setErrorText={setCountError} />
                    <div className={`elem elem-10`}>
                        <InputComponent value={price} setValue={setPrice} placeholder={"Стоимость"} onChange={isEdit ? () => { return price; } : inputDigit}
                            errorText={priceError} className={"price"} leftIcon={"gray-wallet-icon"} />
                        <DropDownComponent value={currency} setValue={isEdit ? () => { } : setCurrency} leftIcon={""} sizingClass={"currency-dropdown"} content={currencies} />
                    </div>
                    <div className="formEvent__placement">
                        <p>Плейсмент *</p>
                        <div className={"formEvent__placement-checkboxes" + (anonseError ? " FormEvent__placement-checkboxes--error" : '')}>
                            <CheckboxComponent checked={anonseLentaCheck} setChecked={setAnonseLentaCheck} text="Лента" />
                            <CheckboxComponent checked={anonseTgCheck} setChecked={setAnonseTgCheck} text="TG чат" />
                            <div className="formEvent__placement-error error">{anonseError ? "Выберите хотя-бы 1 вариант" : ''}</div>
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
                        <CheckSliderComponent value={isDelayedAnonse} setValue={setIsDelayedAnonse} text={"Отложенная публикация"} />
                        {isDelayedAnonse && <LineDateTimePicker isError={delayedTimeError} output={setDelayedTime} value={delayedTime} />}
                    </div>
                </div>
            </div>
            <AccordionWrapper wrapperClasses="formEvent__accordion" defaultValue={false} isError={accordionIsOpen}>
                <div className="formEvent__gender-and-age">
                    <div className={"formEvent__age-limit" + (genderError ? " formEvent__gender-error" : "")}>
                        <span className="text-footnote">Пол</span>
                        <div className="formEvent__gender-limit">
                            <div className="formEvent__gender-limit__inner">
                                <CheckboxComponent checked={allowMale} setChecked={setAllowMale} text="М" />
                                <CheckboxComponent checked={allowFemale} setChecked={setAllowFemale} text="Ж" />
                            </div>
                            <span class="input-message error">{genderError}</span>
                        </div>
                    </div>
                    <div className="formEvent__age-limit">
                        <span className="text-footnote">Возраст</span>
                        <InputFromToComponent isError={ageLimitError} setValue={setAgeLimit} value1={event.min_age ? event.min_age : 0} value2={event.max_age ? event.max_age : 0} classes={'formEvent__age-limit-input'} />
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
            {isEdit &&
                <div className="red-bucket-icon red-400-14 event-form-delete" onClick={onDeleteEventClick}>
                    Отменить событие
                </div>}
            <LocateEventComponent className={`elem-13 ${isOpenMap ? '' : 'hidden'}`} userAddress={user.address ? user.address : null}
                setField={setField} setIsOpenMap={setIsOpenMap} address={address} fields={fields}
            />
        </div>
    )
}