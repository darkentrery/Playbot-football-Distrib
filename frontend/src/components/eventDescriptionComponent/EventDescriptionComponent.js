import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import {eventService} from "../../services/EventService";


export default function EventDescriptionComponent ({event, user, hiddenMap, funcs, className=''}) {
    const [position, setPosition] = useState(false);
    const [address, setAddress] = useState(false);
    const [isTooltip, setIsTooltip] = useState(false);
    const markerRef = useRef(false);

    useEffect(() => {
        if (event && event.field) {
            let point = {
                lat: event.field.address.lat,
                lng: event.field.address.lng,
            }
            setPosition(point);
            setAddress(event.field.address.c_c_s_h_string);
        }
    }, [event])

    const LocationMarker = () => {
        const map = useMapEvents({});
        map.flyTo(position, map.getZoom(), {animate: false});

        useEffect(() => {
            if (markerRef.current) {
                $('.leaflet-marker-icon').attr('src', 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png');
                $('.leaflet-marker-shadow').attr('src', 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png');
            }
        }, [markerRef, event])

        return !position ? null : (
            <Marker position={position} ref={markerRef}></Marker>
        )
    }

    const MapBody = () => {
        return !position ? null : (
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
            </MapContainer>
        )
    }

    const copyLink = () => {
        // window.navigator.clipboard.writeText(`https://www.google.com/maps/@${event.address.lat},${event.address.lng},12z`);
        window.navigator.clipboard.writeText(event.field ? event.field.address.google_link : '');
        if (!isTooltip) {
            setIsTooltip(true);
            setTimeout(() => {
                setIsTooltip(false);
            }, 1000)
        }
    }

    const editEvent = () => {
        if (event && user.isAuth && eventService.isOrganizer(event, user.user)) {
            funcs.openEditEvent();
        } else {
            funcs.openLogin();
        }
        funcs.removeMap();
    }

    return (
        <div className={`event-description-component ${className}`}>
            {user.isAuth && event && eventService.isOrganizer(event, user.user) && !event.is_end && !event.cancel && event.event_step.length <= 1 &&
            <div className={"elem-1280 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={editEvent}>Редактировать игру</span>
            </div>}
            <span className={"elem-1280 elem-2 black-700-20"}>Информация</span>
            {event.notice && <span className={"elem-1280 elem-3 dark-gray-comment-icon"}>{event.notice}</span>}
            <div className={"elem-1280 elem-4"}>
                <span className={"el el-1 black-400-13"}>Адрес:</span>
                <span className={"el el-2 black-400-13"}>Организатор:</span>
            </div>
            <div className={"elem-1280 elem-5"}>
                <span className={"el el-1 black-600-18"}>{address}<span className={"el gray-copy-icon link"} onClick={copyLink}></span></span>
                <span className={"el el-2 black-600-18"}>{eventService.getOrganizerUsername(event)}</span>
            </div>
            <div className={`elem-1280 elem-8 ${hiddenMap ? 'hidden' : ''}`}>
                <MapBody/>
            </div>

            <div className={"elem-376 elem-1"}>
                <span className={"el el-1 black-700-16"}>Информация</span>
            </div>
            {event.notice && <span className={"elem-376 elem-2 dark-gray-comment-icon black-400-16"}>{event.notice}</span>}
            <span className={"elem-376 elem-3 black-400-13"}>Организатор:</span>
            <span className={"elem-376 elem-4 black-600-16"}>{eventService.getOrganizerUsername(event)}</span>
            <span className={"elem-376 elem-5 black-400-13"}>Адрес:</span>
            <div className={"elem-376 elem-6"}>
                <span className={"el black-600-16"}>{address}</span>
                <span className={"el gray-copy-icon link"} onClick={copyLink}></span>
            </div>
            {/*<span className={"elem-376 elem-7 black-400-13"}>Формат площадки:</span>*/}
            {/*<span className={"elem-376 elem-8 black-600-16"}>{event ? event.format_label : ''}</span>*/}
            <div className={`elem-376 elem-9 ${hiddenMap ? 'hidden' : ''}`}>
                <MapBody/>
            </div>
            <span className={`tooltip ${isTooltip ? '' : 'hidden'}`}>Ссылка успешно скопирована!</span>
        </div>
    )
}