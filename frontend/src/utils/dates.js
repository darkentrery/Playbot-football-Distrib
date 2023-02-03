const monthsNames = [
   'января',
   'февраля',
   'марта',
   'апреля',
   'мая',
   'июня',
   'июля',
   'августа',
   'сентября',
   'октября',
   'ноября',
   'декабря',
];

const weekDay = [
    "воскресенье",
    "понеделльник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
]

const getMonth = (date) => {
  return monthsNames[date.getMonth()];
}

const getWeekDay = (date) => {
  return weekDay[date.getDay()];
}

const replaceAt = (val, i) => {
    val = val.substring(0, i) + '' + val.substring(i + 1);
    return val;
}

const choiceDate =(e, setDate, refDate, setIncorrectDate, incorrectDate) => {
    if (typeof e == "string") {
        let val = e.replace(/\D/g, '');
        val = val.slice(0, 8);
        if (Number(val.slice(0, 1)) > 3) val = replaceAt(val, 0);
        if (Number(val.slice(0, 2)) > 31) val = replaceAt(val, 1);
        if (Number(val.slice(2, 3)) > 1) val = replaceAt(val, 2);
        if (Number(val.slice(2, 4)) > 12) val = replaceAt(val, 3);
        let formatVal = val;
        if (val.length > 2 && val.length < 5) {
            formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}`;
        } else if (val.length > 4) {
            formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4, 8)}`;
        }
        if (val.length === 8) {
            setDate(formatVal);
        } else {
            setDate(false);
        }
        refDate.current.setState({inputValue: formatVal})
    } else {
        let date = new Date(e.format("YYYY-MM-DD"));
        if (date.setDate(date.getDate() + 1) < Date.now()) {
            refDate.current.setState({open: true});
            setDate(false);
            setIncorrectDate(!incorrectDate);
        } else {
            setDate(e.format("YYYY-MM-DD"));
        }
    }
}

const choiceTime = (e, setTime, refTime) => {
    if (typeof e == "string") {
        let val = e.replace(/\D/g, '');
        val = val.slice(0, 4);
        if (Number(val.slice(0, 1)) > 2) val = replaceAt(val, 0);
        if (Number(val.slice(0, 2)) > 24) val = replaceAt(val, 1);
        if (Number(val.slice(2, 3)) > 6) val = replaceAt(val, 2);
        if (Number(val.slice(2, 4)) > 60) val = replaceAt(val, 3);
        let formatVal = val;
        if (val.length > 2 && val.length < 5) {
            formatVal = `${val.slice(0, 2)}:${val.slice(2, 4)}`;
        }
        if (val.length === 4) {
            setTime(formatVal);
        } else {
            setTime(false);
        }
        refTime.current.setState({inputValue: formatVal})
    } else {
        setTime(e.format("HH:mm"));
    }
}

const choiceBirthDate =(e, setDate, refDate) => {
    if (typeof e == "string") {
        let val = e.replace(/\D/g, '');
        val = val.slice(0, 8);
        if (Number(val.slice(0, 1)) > 3) val = replaceAt(val, 0);
        if (Number(val.slice(0, 2)) > 31) val = replaceAt(val, 1);
        if (Number(val.slice(2, 3)) > 1) val = replaceAt(val, 2);
        if (Number(val.slice(2, 4)) > 12) val = replaceAt(val, 3);
        let formatVal = val;
        if (val.length > 2 && val.length < 5) {
            formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}`;
        } else if (val.length > 4) {
            formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4, 8)}`;
        }
        if (val.length === 8) {
            setDate(formatVal);
        } else {
            setDate(false);
        }
        refDate.current.setState({inputValue: formatVal})
    } else {
        setDate(e.format("YYYY-MM-DD"));
    }
}

const getMinutesStr = (value) => {
    let label = "минут";
    if (value.slice(value.length - 1) === "1" && !value.includes("11")) {
        label = "минута";
    } else if (["2", "3", "4"].includes(value.slice(value.length - 1)) && !value.includes("12") && !value.includes("13") && !value.includes("14")) {
        label = "минуты";
    }
    return label;
}

const getStringDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear().toString().slice(2,4)}`;
}

export {getMonth, getWeekDay, choiceDate, choiceTime, getMinutesStr, choiceBirthDate, getStringDate};