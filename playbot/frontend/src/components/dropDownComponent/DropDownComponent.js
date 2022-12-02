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
}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const refLabel = useRef();
    let firstValue = value ? value : content[0]


    const openDropdown = () => {
        if (isDropdown) {
            refLabel.current.className = `dropdown-label ${rightFirstIcon}`;
        } else {
            refLabel.current.className = `dropdown-label ${rightSecondIcon}`;
        }
        setIsDropdown(!isDropdown);
    }

    const closeDropdown = () => {
        setIsDropdown(false);
        refLabel.current.className = `dropdown-label ${rightFirstIcon}`;
    }

    const choiceElement = (e) => {
        refLabel.current.innerHTML = e.target.innerHTML;
        refLabel.current.className = `dropdown-label ${rightFirstIcon}`;
        setIsDropdown(!isDropdown);
        setValue(e.target.innerHTML);
    }

    useEffect(() => {
        if (flagClose != id) closeDropdown();
    }, [flagClose])

    return (
        <div className={`dropdown-component ${sizingClass}`}>
            <div className={`dropdown`}>
                <div className={`left-icon ${leftIcon}`}></div>
                <span className={`dropdown-label ${rightFirstIcon}`} ref={refLabel} onClick={openDropdown} id={id}>{firstValue}</span>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    {content && content.map((item, key) => {
                        return (<span className={"dropdown-elem"} onClick={choiceElement} key={key}>{item}</span>)
                    })}
                </div>
            </div>
            <span className={"input-message"}></span>
        </div>
    )
}

export default DropDownComponent