import React, {useContext, useState} from "react";
import {OpenEditEventContext, OpenSuccessEditEventContext} from "../../context/EventContext";
import EditEventComponent from "../EditEventComponent";
import SuccessEditEventComponent from "../success/SuccessEditEventComponent";


export default function EventDescriptionComponent ({event}) {
    const [openEditEvent, setOpenEditEvent]= useState(false);
    const editEventWindow = { openEditEvent, setOpenEditEvent };
    const [openSuccessEditEvent, setOpenSuccessEditEvent]= useState(false);
    const successEditEventWindow = { openSuccessEditEvent, setOpenSuccessEditEvent };


    return (
        <div className={"event-description-component"}>
            <div className={"elem-1280 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={(e) => setOpenEditEvent(!openEditEvent)}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"}>Копировать ссылку</span>
            </div>
            <span className={"elem-1280 elem-2"}>Информация</span>
            <span className={"elem-1280 elem-3 dark-gray-comment-icon"}>Всем привет! После игры просьба не расходиться, будет фотосессия.</span>
            <div className={"elem-1280 elem-4"}>
                <span className={"el el-1"}>Адрес:</span>
                <span className={"el el-2"}>Организатор:</span>
            </div>
            <div className={"elem-1280 elem-5"}>
                {/*<span className={"el el-1"}>Москва, ЦАО, Тверской район, ул. Тверская, 22 стр. 1</span>*/}
                <span className={"el el-1"}>{event.address}</span>
                <span className={"el el-2"}>Андрей Иванов</span>
            </div>
            <div className={"elem-1280 elem-6"}>

            </div>

            <div className={"elem-744 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={(e) => setOpenEditEvent(!openEditEvent)}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"}></span>
            </div>
            <span className={"elem-744 elem-2"}>Информация</span>
            <span className={"elem-744 elem-3 dark-gray-comment-icon"}>Всем привет! После игры просьба не расходиться, будет фотосессия.</span>
            <span className={"elem-744 elem-4"}>Организатор:</span>
            <span className={"elem-744 elem-5"}>Андрей Иванов</span>
            <span className={"elem-744 elem-6"}>Адрес:</span>
            <span className={"elem-744 elem-7"}>{event.address}</span>
            <div className={"elem-744 elem-8"}></div>

            <div className={"elem-376 elem-1"}>
                <span className={"el el-1"}>Информация</span>
                <span className={"el gray-copy-icon link"}></span>
            </div>
            <span className={"elem-376 elem-2 dark-gray-comment-icon"}>Всем привет! После игры просьба не расходиться, будет фотосессия.</span>
            <span className={"elem-376 elem-3"}>Организатор:</span>
            <span className={"elem-376 elem-4"}>Андрей Иванов</span>
            <span className={"elem-376 elem-5"}>Адрес:</span>
            <span className={"elem-376 elem-6"}>{event.address}</span>
            <div className={"elem-376 elem-7"}></div>

            <OpenSuccessEditEventContext.Provider value={successEditEventWindow}>
                <OpenEditEventContext.Provider value={editEventWindow}>
                    <EditEventComponent event={event}/>
                </OpenEditEventContext.Provider>
            </OpenSuccessEditEventContext.Provider>

            <OpenSuccessEditEventContext.Provider value={successEditEventWindow}>
                <SuccessEditEventComponent id={event.id}/>
            </OpenSuccessEditEventContext.Provider>
        </div>
    )
}