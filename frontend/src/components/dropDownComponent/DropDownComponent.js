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
    tooltipText=false,
}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [isTooltip, setIsTooltip] = useState(false);
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

    const openDropdown = (e) => {
        setIsDropdown(!isDropdown);
    }

    const closeDropdown = () => {
        setIsDropdown(false);
    }

    const choiceElement = (e) => {
        refLabel.current.innerHTML = e.target.innerHTML;
        setIsDropdown(!isDropdown);
        setValue(e.target.innerHTML);
        setErrorText(false);
    }

    document.addEventListener('click', function (e) {
        if (isDropdown) {
            if (e.target !== refLabel.current && e.target !== refRightIcon.current) {
                closeDropdown();
            }
        }
    })

    const onHoverRight = () => {
      if (tooltipText) setIsTooltip(true);
    }

    const onLeaveRight = () => {
        if (tooltipText) setIsTooltip(false);
    }

    return (
        <div className={`dropdown-component ${sizingClass}`}>
            <div className={`dropdown`}>
                <div className={`left-icon ${leftIcon}`}></div>
                <span className={`dropdown-label ${errorText ? 'error' : ''}`} ref={refLabel} onClick={openDropdown} id={id}>{firstValue}</span>
                <div className={`right-icon ${isDropdown ? rightSecondIcon : rightFirstIcon}`} ref={refRightIcon}
                     onClick={openDropdown} onMouseOver={onHoverRight} onMouseLeave={onLeaveRight}></div>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    {content && content.map((item, key) => (
                        <span className={"dropdown-elem"} onClick={choiceElement} key={key}>{item}</span>
                    ))}
                </div>
                <span className={isTooltip ? 'tooltip-text' : 'tooltip-text hidden'}>{tooltipText}</span>
            </div>
            <span className={`input-message ${errorText ? 'error' : ''}`}>{errorText}</span>
        </div>
    )
}

export default DropDownComponent