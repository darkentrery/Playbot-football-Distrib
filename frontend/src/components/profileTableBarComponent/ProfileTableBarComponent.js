import React, {useState} from "react";
import $ from "jquery";


export const ProfileTableBarComponent = ({value, setValue, values=[], children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectItem = (e) => {
        setValue(e.target.innerHTML);
    }

    document.addEventListener('click', (e) => {
        if (isOpen && e.target.className !== "bar-label" && !$(e.target).closest('.bar-label').length) {
            setIsOpen(false);
        }
    })

    return (
        <div className={"profile-table-bar-component"}>
            <div className={"bar-label"} onClick={() => setIsOpen(!isOpen)}>
                <span className={"black-600-14"}>{value}</span>
                <div className={"gray-down-arrow-icon"}></div>
            </div>
            <div className={`table-bar-menu ${isOpen ? '' : 'hidden'}`}>
                {values.map((item, key) => (
                    <span className={"item-menu black-600-14"} key={key} onClick={selectItem}>{item}</span>
                ))}
            </div>
            {children}
        </div>
    )
}