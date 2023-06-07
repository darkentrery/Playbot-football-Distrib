import './RangeTwoPointInput.scss'
import { useState, useEffect } from 'react'


const RangeTwoPointInput = ({
        minValue = 0,
        maxValue = 100,
        output = () => {},
        classes = '',
    }) => {
    const [value1, setValue1] = useState(minValue)
    const [value2, setValue2] = useState(maxValue)

    useEffect(() => {
        output([+value1, +value2])
    }, [value1, value2])

    return (
        <>
            <div className={"rangeTwoPointInput " + classes}>
                <div className='range-input__slider'>
                    <div className='range-input__slider-progress' style={{left: `${(value1 / maxValue) * 100}%`, right: `${100 - (value2 / maxValue) * 100}%`}}>

                    </div>
                </div>
                <div className="range-input__inputs">
                    <input type="range" value={value1} onChange={(e) => {setValue1(e.currentTarget.value)}} className='range-input__inputs-max' min={minValue} max={maxValue}/>
                    <input type="range" value={value2} onChange={(e) => {setValue2(e.currentTarget.value)}} className='range-input__inputs-min' min={minValue} max={maxValue}/>
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