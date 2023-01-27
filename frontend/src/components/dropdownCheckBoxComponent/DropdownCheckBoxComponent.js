import {useEffect, useRef, useState} from "react";
import {SearchComponent} from "../searchComponent/SearchComponent";
import $ from "jquery";


export const DropdownCheckBoxComponent = ({
    data,
    setOutData,
    outputData=[],
    className='',
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentData, setCurrentData] = useState(data);
    const refLabelFull = useRef();
    const refLabel = useRef();
    const refCount = useRef();
    const refArrow = useRef();

    useEffect(() => {
        setCurrentData(data);
    }, [data])

    const clickDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    const clickItem = (item) => {
        let array = [];
        if (outputData.includes(item)) {
            outputData.map((el) => {
                if (item !== el) array.push(el);
            })
        } else {
            outputData.map((el) => {
                array.push(el);
            })
            array.push(item);
        }
        setOutData(array);
    }

    document.addEventListener('click', (e) => {
        if (isOpen) {
            if (![refLabelFull.current, refLabel.current, refCount.current, refArrow.current].includes(e.target)
                && !$(e.target).closest('.dropdown-checkbox-component').length) {
                setIsOpen(false);
            }
        }
    })

    return (
        <div className={`dropdown-checkbox-component ${className}`}>
            <div className={`dropdown-checkbox-label`} onClick={clickDropdown} ref={refLabelFull}>
                <span className={"elem-1 black-400-14"} ref={refLabel}>{label}</span>
                <span className={"elem-2 gray-400-14"} ref={refCount}>{data.length}</span>
                <div className={`elem-3 ${isOpen ? 'up-arrow-icon' : 'down-arrow-icon'}`} ref={refArrow}></div>
            </div>
            <div className={`dropdown-body ${isOpen ? '' : 'hidden'}`}>
                <SearchComponent className={"search"} arrayFirst={data} setArraySecond={setCurrentData} icon={'search-black-icon'} placeholder={"Введите название..."}/>
                <div className={"dropdown-list scroll"}>
                    {currentData.map((item, key) => (
                        <div className={"dropdown-item"} key={key} onClick={() => clickItem(item)}>
                            <div className={`checkbox orange-checkbox-icon ${outputData.includes(item) ? 'selected' : ''}`}></div>
                            <span className={"black-400-16"}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}