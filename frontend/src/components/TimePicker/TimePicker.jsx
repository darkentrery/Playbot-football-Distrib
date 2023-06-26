import './TimePicker.scss';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import format from 'date-fns/format';

export const TimePicker = ({className = '', setValue = () => {}, value = undefined}) => {


    const handleDateChange = (date) => {
        setValue(date)
    };

    return (
        <div className={"time-picker " + (className ? className : '')}>
            <input type="text" placeholder='время' />
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