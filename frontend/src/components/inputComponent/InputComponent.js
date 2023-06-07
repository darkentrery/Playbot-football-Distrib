import React from "react";


export const InputComponent = ({
    value='',
    setValue,
    className='',
    leftIcon='',
    rightIcon='',
    placeholder='',
    errorText='',
    password=false,
    onChange=(value) => {return value;},
    rightOnClick=() => {},
    onKeyUp=() => {},
}) => {

    const onChangeValue = (e) => {
        let value = onChange(e.target.value);
        setValue(value);
    }

    return (
        <div className={`input-component ${className}`}>
            <input className={`${leftIcon} ${errorText ? 'error' : ''}`} type={password ? 'password' : 'text'}
                   placeholder={placeholder} value={value ? value : ''} onChange={onChangeValue} onKeyUp={onKeyUp}/>
            {errorText && <span className={`input-message ${errorText ? 'error' : ''}`}>{errorText}</span>}
            <div className={`right-input-icon ${rightIcon}`} onClick={rightOnClick}></div>
        </div>
    )
}