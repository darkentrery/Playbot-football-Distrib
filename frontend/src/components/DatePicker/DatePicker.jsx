import './DatePicker.scss';
import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export const DateInputPicker = ({className = ''}) => {
    const [selectedDate, setSelectedDate] = useState(0);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("new data123", date)
    };
    return (
        <div className={'DateInputPicker ' + (className ? className : '')}>
            <input type="text" placeholder='Дата *'/>
            <DatePicker
                locale={ru}
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd MMMM yyyy"
            />
        </div>
    )
}

export default DateInputPicker