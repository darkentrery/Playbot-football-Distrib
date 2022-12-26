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
    placeholder=null,
}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const refLabel = useRef();
    const refRightIcon = useRef();
    // let firstValue = value ? value : content[0];
    let firstValue = content[0];
    if (!value && placeholder) {
        firstValue = placeholder;
    } else if (!value && !placeholder) {
        firstValue = content[0];
    } else if (value) {
        firstValue = value;
    }

    const openDropdown = () => {
        if (isDropdown) {
            refRightIcon.current.className = `right-icon ` + rightFirstIcon;
        } else {
            refRightIcon.current.className = `right-icon ` + rightSecondIcon;
        }
        setIsDropdown(!isDropdown);
    }

    const closeDropdown = () => {
        setIsDropdown(false);
        refRightIcon.current.className = `right-icon ` + rightFirstIcon;
        // setErrorText(false);
    }

    const choiceElement = (e) => {
        refLabel.current.innerHTML = e.target.innerHTML;
        refRightIcon.current.className = `right-icon ` + rightFirstIcon;
        setIsDropdown(!isDropdown);
        setValue(e.target.innerHTML);
        setErrorText(false);
    }

    useEffect(() => {
        if (flagClose != id) closeDropdown();
    }, [flagClose])

    return (
        <div className={`dropdown-component ${sizingClass}`}>
            <div className={`dropdown`}>
                <div className={`left-icon ${leftIcon}`}></div>
                <span className={`dropdown-label ${errorText ? 'error' : ''}`} ref={refLabel} onClick={openDropdown} id={id}>{firstValue}</span>
                <div className={`right-icon ${rightFirstIcon}`} ref={refRightIcon}></div>
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