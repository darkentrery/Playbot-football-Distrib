import './RangeTwoPointInput.scss'
import { useState, useEffect } from 'react'


const RangeTwoPointInput = ({
        minValue = 0,
        maxValue = 100,
        step = null,
        output = () => {},
        classes = '',
        defaultValue1=0,
        defaultValue2=5000,
    }) => {
    const [value1, setValue1] = useState(defaultValue1);
    const [value2, setValue2] = useState(defaultValue2);

    useEffect(() => {
        output([+value1, +value2])
    }, [value1, value2])

    useEffect(() => {
        setValue1(defaultValue1);
        setValue2(defaultValue2);
    }, [defaultValue1, defaultValue2])

    return (
        <>
            <div className={"rangeTwoPointInput " + classes}>
                <div className='range-input__slider'>
                    <div className='range-input__slider-progress' style={{left: `${(value1 / maxValue) * 100}%`, right: `${100 - (value2 / maxValue) * 100}%`}}>

                    </div>
                </div>
                <div className="range-input__inputs">
                    <input type="range" value={value1} step={step && step} onChange={(e) => {+e.currentTarget.value < value2 && setValue1(e.currentTarget.value)}} className='range-input__inputs-max' min={minValue} max={maxValue}/>
                    <input type="range" value={value2} step={step && step} onChange={(e) => {+e.currentTarget.value > value1 && setValue2(e.currentTarget.value)}} className='range-input__inputs-min' min={minValue} max={maxValue}/>
                    <div className="range-input__numbers">
                        <div className='range-input__number-1' style={{left: `${(value1 / maxValue) * 96}%`}}>{value1}</div>
                        <div className='range-input__number-2' style={{right: `${96 - (value2 / maxValue) * 96}%`}}>{value2}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RangeTwoPointInput