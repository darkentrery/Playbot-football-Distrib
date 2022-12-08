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

}) => {

    const onChangeValue = (e) => {
        let value = onChange(e.target.value);
        setValue(value);
    }

    const hiddenPassword = () => {

    }

    return (
        <div className={`input-component ${className}`}>
            <input className={`${leftIcon} ${errorText ? 'error' : ''}`} type={password ? 'password' : 'text'}
                   placeholder={placeholder} value={value} onChange={onChangeValue}/>
            <span className={`input-message ${errorText ? 'error' : ''}`}>{errorText}</span>
            <div className={`right-input-icon ${rightIcon}`} onClick={hiddenPassword}></div>
        </div>
    )
}