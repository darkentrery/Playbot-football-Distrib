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

export {getMonth, getWeekDay}