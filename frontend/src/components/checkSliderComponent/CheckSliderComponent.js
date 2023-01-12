import React, {useState} from "react";


export const CheckSliderComponent = ({
    value=false,
    setValue = () => {},
    text,
    sizingClass='',
    textIcon='',
    onClick=() => {},
    tooltipText=false,
}) => {
    const [isTooltip, setIsTooltip] = useState(false);

    const clickCheck = () => {
        setValue(!value);
        onClick();
    }

    const onHoverRight = () => {
      if (tooltipText) setIsTooltip(true);
    }

    const onLeaveRight = () => {
        if (tooltipText) setIsTooltip(false);
    }

    return (
        <div className={`check-slider-component ${sizingClass}`}>
            <div className={`${value ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={clickCheck}></div>
            <span>{text}</span>
            <div className={`icon ${textIcon}`} onMouseOver={onHoverRight} onMouseLeave={onLeaveRight}></div>
            <span className={isTooltip ? 'tooltip-text' : 'tooltip-text hidden'}>{tooltipText}</span>
        </div>
    )
}