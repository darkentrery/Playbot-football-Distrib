import './LineDateTimePicker.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru'; // Импорт русской локализации
import { format } from 'date-fns';
import {useEffect, useState} from 'react'
export const LineDateTimePicker = ({
    output = () => {},
    value,
}) => {
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState(0);

    useEffect(() => {
        console.log(value)
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
        return date <= today;
    };
    return (
        <>
            <div className="line-date__time-picker">
                <p>{selectedDate ? format(selectedDate, 'dd MMMM yyyy в HH:mm', { locale: ru }) : 'Выберите дату'}</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    locale={ru}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd MMMM yyyy, HH:mm"
                    dayClassName={(date) => (isDateDisabled(date) ? 'disabled' : '')}
                />
            </div>
        </>
    )
}

export default LineDateTimePicker