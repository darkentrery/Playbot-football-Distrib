import React, {useRef, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {Box, TextField} from "@mui/material";



export const DateFilterComponent = ({
    setOutData,
    outputData=[],
    className='',
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const refLabelFull = useRef();
    const refLabel = useRef();
    const refCount = useRef();
    const refArrow = useRef();
    const now = new Date(Date.now());
    const date = new Date();
    const data = [
        {label: "1 день", begin: new Date(date.setDate(now.getDate() - 1)), end: now},
        {label: "7 дней", begin: new Date(date.setDate(now.getDate() - 7)), end: now},
        {label: "1 месяц", begin: new Date(date.setDate(now.getDate() - 30)), end: now},
        {label: "За всё время", begin: null, end: now},
    ]

    const clickDropdown = () => {
        setIsOpen(!isOpen);
    }

    const clickItem = (item) => {
        if (item.label !== outputData.label) {
            setOutData(item);
        }
    }

    const changeRange = (e) => {
        if (e[0].$d && e[1].$d) {
            setOutData({label: "Custom", begin: e[0].$d, end: e[1].$d});
        }
    }

    return (
        <div className={`date-filter-component ${className}`}>
            <div className={`dropdown-checkbox-label`} onClick={clickDropdown} ref={refLabelFull}>
                <span className={"elem-1 black-400-14"} ref={refLabel}>{label}</span>
                <span className={"elem-2 gray-400-14"} ref={refCount}>{data.length}</span>
                <div className={`elem-3 ${isOpen ? 'up-arrow-icon' : 'down-arrow-icon'}`} ref={refArrow}></div>
            </div>
            <div className={`dropdown-body ${isOpen ? '' : 'hidden'}`}>
                {data.map((item, key) => (
                    <div className={"dropdown-item"} key={key} onClick={() => clickItem(item)}>
                        <div className={outputData.label === item.label ? 'orange-check-icon' : 'hidden'}></div>
                        <span className={"black-400-16"}>{item.label}</span>
                    </div>
                ))}
                <div className={`choice-period`}>
                    <div className={"calendar-icon"}></div>
                    <span className={"black-400-14"}>Выбрать период</span>
                </div>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                >
                    <DateRangePicker
                        value={[outputData.begin, outputData.end]}
                        onChange={changeRange}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </div>
        </div>
    )
}