import './LineDateTimePicker.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru'; // Импорт русской локализации
import { format } from 'date-fns';
import {useEffect, useState} from 'react'
import { startOfDay } from 'date-fns';
export const LineDateTimePicker = ({
    output = () => {},
    value,
    isError = true,
}) => {
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState(0);

    useEffect(() => {
        if (value.date && value.time) {
            setSelectedDate(new Date(`${value.date}T${value.time}`));
        }
    }, [value])

    const handleDateChange = (date) => {
        setSelectedDate(date);
        let dateFormated = format(date, 'yyyy-MM-dd');
        let timeFormated = format(date, 'HH:mm');
        output({'date': dateFormated, 'time': timeFormated});
    };
    const isDateDisabled = (date) => {
        console.log(startOfDay(today))
        console.log(date)
        return date < startOfDay(today);
    }; 

    const isTimeDisabled = (time) => {
        return time < today.getTime()
    }
    return (
        <>
            <div className="line-date__time-picker">
                <p className={isError ? "line-date__time-picker--error" : ''}>{selectedDate ? format(selectedDate, 'dd MMMM yyyy в HH:mm', { locale: ru }) : 'Выберите дату'}</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    locale={ru}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption='время'
                    dateFormat="dd MMMM yyyy, HH:mm"
                    dayClassName={(date) => (isDateDisabled(date) ? 'disabled' : '')}
                    timeClassName={(time) => (isTimeDisabled(time) ? 'disabled' : '')}
                />
            </div>
        </>
    )
}

export default LineDateTimePicker