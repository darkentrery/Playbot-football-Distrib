import React, {useEffect, useRef, useState} from "react";


const DropDownComponent = ({
    value=false,
    setValue,
    rightFirstIcon='down-arrow-icon',
    rightSecondIcon='up-arrow-icon',
    leftIcon='foot-icon',
    content=[1, 2, 3, 4],
    sizingClass='dropdown-size',
    flagClose=true,
    id=1,
    errorText=false,
    setErrorText = () => {},
}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const refLabel = useRef();
    let firstValue = value ? value : content[0]

    const openDropdown = () => {
        if (isDropdown) {
            refLabel.current.className = `dropdown-label ${rightFirstIcon} ${errorText ? 'error' : ''}`;
        } else {
            refLabel.current.className = `dropdown-label ${rightSecondIcon} ${errorText ? 'error' : ''}`;
        }
        setIsDropdown(!isDropdown);
    }

    const closeDropdown = () => {
        setIsDropdown(false);
        refLabel.current.className = `dropdown-label ${rightFirstIcon} ${errorText ? 'error' : ''}`;
        setErrorText(false);
    }

    const choiceElement = (e) => {
        refLabel.current.innerHTML = e.target.innerHTML;
        refLabel.current.className = `dropdown-label ${rightFirstIcon} ${errorText ? 'error' : ''}`;
        setIsDropdown(!isDropdown);
        setValue(e.target.innerHTML);
        setErrorText(false);
    }

    useEffect(() => {
        if (flagClose != id) closeDropdown();
        console.log(errorText, flagClose)
    }, [flagClose])

    return (
        <div className={`dropdown-component ${sizingClass}`}>
            <div className={`dropdown`}>
                <div className={`left-icon ${leftIcon}`}></div>
                <span className={`dropdown-label ${rightFirstIcon} ${errorText ? 'error' : ''}`} ref={refLabel} onClick={openDropdown} id={id}>{firstValue}</span>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    {content && content.map((item, key) => {
                        return (<span className={"dropdown-elem"} onClick={choiceElement} key={key}>{item}</span>)
                    })}
                </div>
            </div>
            <span className={`input-message ${errorText ? 'error' : ''}`}>{errorText}</span>
        </div>
    )
}

export default DropDownComponent