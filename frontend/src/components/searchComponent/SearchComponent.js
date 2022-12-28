import React from "react";


export const SearchComponent = ({
    className='',
    arrayFirst=[],
    setArraySecond,
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
            <input className={"search-icon"} type="text" placeholder={"Поиск"} onChange={search}/>
        </div>
    )
}