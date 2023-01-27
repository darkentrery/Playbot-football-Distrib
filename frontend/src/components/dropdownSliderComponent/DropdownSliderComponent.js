import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {Slider} from "@mui/material";


export const DropdownSliderComponent = ({
    data,
    setOutData,
    outputData=[],
    className='',
    label,

}) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [currentData, setCurrentData] = useState(data);
    const refLabelFull = useRef();
    const refLabel = useRef();
    const refCount = useRef();
    const refArrow = useRef();
    const minDistance = 1;

    // useEffect(() => {
    //     setCurrentData(data);
    // }, [data])

    const clickDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleChange = (e, newValue, activeThumb) => {
        console.log(e, newValue, activeThumb)
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setOutData([Math.min(newValue[0], outputData[1] - minDistance), outputData[1]]);
        } else {
            setOutData([outputData[0], Math.max(newValue[1], outputData[0] + minDistance)]);
        }
    }

    // document.addEventListener('click', (e) => {
    //     if (isOpen) {
    //         if (![refLabelFull.current, refLabel.current, refCount.current, refArrow.current].includes(e.target)
    //             && !$(e.target).closest('.dropdown-slider-component').length) {
    //             setIsOpen(false);
    //         }
    //     }
    // })

    return (
        <div className={`dropdown-slider-component ${className}`}>
            <div className={`dropdown-checkbox-label`} onClick={clickDropdown} ref={refLabelFull}>
                <span className={"elem-1 black-400-14"} ref={refLabel}>{label}</span>
                <span className={"elem-2 gray-400-14"} ref={refCount}>{outputData[0]}-{outputData[1]}</span>
                <div className={`elem-3 ${isOpen ? 'up-arrow-icon' : 'down-arrow-icon'}`} ref={refArrow}></div>
            </div>
            <div className={`dropdown-body ${isOpen ? '' : 'hidden'}`}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={outputData}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    disableSwap
                    min={data[0]}
                    max={data[1]}
                />
            </div>
        </div>
    )
}