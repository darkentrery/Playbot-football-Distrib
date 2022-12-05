import React from "react";
import $ from "jquery";



export default function EventDescriptionComponent ({event, openEditEvent}) {

    const copyLink = () => {
        window.navigator.clipboard.writeText(window.location.href);
        if ($('.tooltip').hasClass('hidden')) {
            $('.tooltip').removeClass('hidden');
            setTimeout(() => {
                $('.tooltip').addClass('hidden');
            }, 1000)
        }
    }

    return (
        <div className={"event-description-component"}>
            <div className={"elem-1280 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={openEditEvent}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}>Копировать ссылку</span>
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
                <span className={"el el-2"}>{event ? event.organizer.username : ''}</span>
            </div>
            <div className={"elem-1280 elem-6"}>

            </div>

            <div className={"elem-744 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={openEditEvent}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}></span>
            </div>
            <span className={"elem-744 elem-2"}>Информация</span>
            <span className={"elem-744 elem-3 dark-gray-comment-icon"}>Всем привет! После игры просьба не расходиться, будет фотосессия.</span>
            <span className={"elem-744 elem-4"}>Организатор:</span>
            <span className={"elem-744 elem-5"}>{event ? event.organizer.username : ''}</span>
            <span className={"elem-744 elem-6"}>Адрес:</span>
            <span className={"elem-744 elem-7"}>{event.address}</span>
            <div className={"elem-744 elem-8"}></div>

            <div className={"elem-376 elem-1"}>
                <span className={"el el-1"}>Информация</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}></span>
            </div>
            <span className={"elem-376 elem-2 dark-gray-comment-icon"}>Всем привет! После игры просьба не расходиться, будет фотосессия.</span>
            <span className={"elem-376 elem-3"}>Организатор:</span>
            <span className={"elem-376 elem-4"}>{event ? event.organizer.username : ''}</span>
            <span className={"elem-376 elem-5"}>Адрес:</span>
            <span className={"elem-376 elem-6"}>{event.address}</span>
            <div className={"elem-376 elem-7"}></div>
            <span className={"tooltip hidden"}>Ссылка успешно скопирована!</span>
        </div>
    )
}