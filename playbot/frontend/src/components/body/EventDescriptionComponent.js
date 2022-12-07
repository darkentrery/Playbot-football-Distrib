import React, {useCallback, useMemo, useRef, useState} from "react";
import $ from "jquery";
// import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'


const center = {
  lat: 51.505,
  lng: -0.09,
}

export default function EventDescriptionComponent ({event, user, funcs}) {

    const copyLink = () => {
        window.navigator.clipboard.writeText(window.location.href);
        if ($('.tooltip').hasClass('hidden')) {
            $('.tooltip').removeClass('hidden');
            setTimeout(() => {
                $('.tooltip').addClass('hidden');
            }, 1000)
        }
    }

    const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

    return (
        <div className={"event-description-component"}>
            <div className={"elem-1280 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={event && user.isAuth && event.organizer.id === user.user.id ? funcs.openEditEvent : funcs.openLogin}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}>Копировать ссылку</span>
            </div>
            <span className={"elem-1280 elem-2"}>Информация</span>
            <span className={"elem-1280 elem-3 dark-gray-comment-icon"}>{event.notice}</span>
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
                {/*<MapContainer center={center} zoom={13} scrollWheelZoom={false}>*/}
                {/*    <TileLayer*/}
                {/*      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                {/*      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                {/*    />*/}
                {/*    <Marker*/}
                {/*      draggable={draggable}*/}
                {/*      eventHandlers={eventHandlers}*/}
                {/*      position={position}*/}
                {/*      ref={markerRef}>*/}
                {/*      <Popup minWidth={90}>*/}
                {/*        <span onClick={toggleDraggable}>*/}
                {/*          {draggable*/}
                {/*            ? 'Marker is draggable'*/}
                {/*            : 'Click here to make marker draggable'}*/}
                {/*        </span>*/}
                {/*      </Popup>*/}
                {/*    </Marker>*/}
                {/*  </MapContainer>,*/}

            </div>

            <div className={"elem-744 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={event && user.isAuth && event.organizer.id === user.user.id ? funcs.openEditEvent : funcs.openLogin}>Редактировать игру</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}></span>
            </div>
            <span className={"elem-744 elem-2"}>Информация</span>
            <span className={"elem-744 elem-3 dark-gray-comment-icon"}>{event.notice}</span>
            <span className={"elem-744 elem-4"}>Организатор:</span>
            <span className={"elem-744 elem-5"}>{event ? event.organizer.username : ''}</span>
            <span className={"elem-744 elem-6"}>Адрес:</span>
            <span className={"elem-744 elem-7"}>{event.address}</span>
            <div className={"elem-744 elem-8"}></div>

            <div className={"elem-376 elem-1"}>
                <span className={"el el-1"}>Информация</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}></span>
            </div>
            <span className={"elem-376 elem-2 dark-gray-comment-icon"}>{event.notice}</span>
            <span className={"elem-376 elem-3"}>Организатор:</span>
            <span className={"elem-376 elem-4"}>{event ? event.organizer.username : ''}</span>
            <span className={"elem-376 elem-5"}>Адрес:</span>
            <span className={"elem-376 elem-6"}>{event.address}</span>
            <div className={"elem-376 elem-7"}></div>
            <span className={"tooltip hidden"}>Ссылка успешно скопирована!</span>
        </div>
    )
}