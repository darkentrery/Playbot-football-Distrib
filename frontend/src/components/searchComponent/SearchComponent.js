import React from "react";


export const SearchComponent = ({
    className='',
    arrayFirst=[],
    setArraySecond,
    icon='search-icon',
    placeholder='Поиск',
}) => {

    const search = (e) => {
        let array = [];
        let val = e.target.value;
        arrayFirst.map((item, key) => {
            if (item.toLowerCase().includes(val.toLowerCase())) array.push(item);
        })
        setArraySecond(array);
    }

    return (
        <div className={`search-component ${className}`}>
            <input type="text" placeholder={placeholder} onChange={search}/>
            <div className={`icon ${icon}`}></div>
        </div>
    )
}