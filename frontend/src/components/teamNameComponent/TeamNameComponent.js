import React, {useState} from "react";


export const TeamNameComponent = ({
    className='',
    value,
    setValue,
}) => {
    const [isInput, setIsInput] = useState(false);

    const changeValue = (e) => {
        setValue(e.target.value);
    }

    const clickPencil = () => {
        setIsInput(!isInput);
    }

    return (
        <div className={`team-name-component ${className}`}>
            <span className={`black-700-13 ${isInput ? 'hidden' : ''}`}>{value}</span>
            <input className={`input ${isInput ? '' : 'hidden'}`} type="text" value={value} onChange={changeValue}/>
            <div className={"pencil-icon"} onClick={clickPencil}></div>
        </div>
    )
}