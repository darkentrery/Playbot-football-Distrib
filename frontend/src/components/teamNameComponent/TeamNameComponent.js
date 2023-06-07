import React, {useEffect, useRef, useState} from "react";


export const TeamNameComponent = ({
    className='',
    value,
    setValue,
}) => {
    const [isInput, setIsInput] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (isInput) {
            ref.current.querySelector('input').focus();
        }
    }, [isInput])

    const changeValue = (e) => {
        setValue(e.target.value.slice(0, 20));
    }

    const clickPencil = () => {
        setIsInput(!isInput);
    }

    document.addEventListener('click', (e) => {
        if (e.target !== ref.current && e.target.parentNode !== ref.current) {
            setIsInput(false);
        }
    })

    const clickEnter = (e) => {
        if (e.keyCode === 13) {
            setIsInput(false);
        }
    }

    return (
        <div className={`team-name-component ${className}`} ref={ref}>
            <span className={`black-600-16 ${isInput ? 'hidden' : ''}`}>{value}</span>
            <input className={`input ${isInput ? '' : 'hidden'}`} type="text" value={value} onChange={changeValue} onKeyUp={clickEnter}/>
            <div className={"pencil-icon"} onClick={clickPencil}></div>
        </div>
    )
}