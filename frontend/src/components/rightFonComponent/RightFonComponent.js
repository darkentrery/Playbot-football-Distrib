import React, {useEffect, useState} from "react";


export const RightFonComponent = ({
    className='',
    imageClasses=[],
    close = () => {},
    contents=[],
    slider=false,

}) => {
    const [contentNumber, setContentNumber] = useState(0);
    const [transform, setTransform] = useState(false);

    useEffect(() => {
        if (slider) {
            const interval = setInterval(() => {
                if (contentNumber === contents.length - 1) {
                    setContentNumber(0);
                } else {
                    setContentNumber(contentNumber + 1);
                }
                setTransform(!transform);
            }, 5000)
            return () => clearInterval(interval);
        }
    })

    return (
        <div className={`right-fon-component ${className} ${imageClasses[contentNumber]}`}>
            <div onClick={close} className={"btn-close"}></div>
            <div className={"points"}>
                {contents.map((content, i) => (
                    <div className={`point point-icon ${i === contentNumber ? 'point-big' : ''}`}></div>
                ))}
            </div>
            <span className={`elem-3 black-600-24 ${transform ? 'move' : ''}`}>{contents[contentNumber]}</span>
        </div>
    )
}