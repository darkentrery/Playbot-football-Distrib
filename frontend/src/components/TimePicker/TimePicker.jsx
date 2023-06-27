import './TimePicker.scss';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';

export const TimePicker = ({className = '', setValue = () => {}, value = undefined}) => {


    const handleDateChange = (date) => {
        setValue(format(date, "HH:mm"))
    };

    let inputValue = value

    if (typeof value === "string") {
        const [hours, minutes] = value.split(':');
        value = new Date()
        value.setHours(hours)
        value.setMinutes(minutes);
    }

    return (
        <div className={"time-picker " + (className ? className : '')}>
            <input type="text" className="form-control" placeholder='время' value={inputValue ? inputValue : ''}/>
            <DatePicker
                selected={value}
                onChange={handleDateChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat='HH:mm'
                timeCaption='время'
            />
        </div>
    )
}

export default TimePicker