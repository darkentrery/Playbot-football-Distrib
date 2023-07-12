import './DatePicker.scss';
import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { format, startOfDay } from 'date-fns';

export const DateInputPicker = ({className = '', value = undefined, setValue = () => {}}) => {

    const handleDateChange = (date) => {
        setValue(date);
    };
    let inputDate;

    if (typeof value === 'string') {
        inputDate = value
    } else if (typeof value === 'object') {
        inputDate = format(value, 'dd.MM.yyyy')
    }

    if (typeof value === 'string') {
        let [year, month, day] = ''
        if (value.includes('.')) {
            [day, month, year] = value.split('.');
        } else {
            [year, month, day] = value.split('-');
        }

        value = new Date()
        value.setFullYear(year)
        value.setMonth(month - 1)
        value.setDate(day)
    }
    const today = new Date()
    const isDateDisabled = (date) => {
        return date < startOfDay(today);
    }; 

    return (
        <div className={'DateInputPicker ' + (className ? className : '')}>
            <input type="text" className="form-control" placeholder='Дата *' value={inputDate ? inputDate : ''}/>
            <DatePicker
                locale={ru}
                selected={value}
                onChange={handleDateChange}
                dateFormat="dd MMMM yyyy"
                dayClassName={(date) => (isDateDisabled(date) ? 'disabled' : '')}
            />
        </div>
    )
}

export default DateInputPicker