import TempEventImage from '../../assets/icon/temp-event-image.png';
import HangerIcon from '../../assets/icon/hanger.svg';
import LightingIcon from '../../assets/icon/lighting.svg';
import FieldMaterialIcon from '../../assets/icon/field-material.svg';
import FootballFieldIcon from '../../assets/icon/football-field.svg';
import ShowerRoomIcon from '../../assets/icon/shower-room.svg';
import FlagIcon from '../../assets/icon/flag.svg';
import AirplaneIcon from '../../assets/icon/airplane.svg';
import MapMarkerIcon from '../../assets/icon/map-marker.svg';


import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import EventInfoSlider from '../EventInfoSlider/EventInfoSlider';
import EventInfoAddressCopyText from '../EventInfoAddressCopyText/EventInfoAddressCopyText';

export const EventInfo = ({ event }) => {
    const [position, setPosition] = useState(false);

    const markerRef = useRef(false);

    const fieldName = event.field.name
    const fieldAddress = `${event.field.address.city}, ${event.field.address.street}, ${event.field.address.house_number}`
    const isDressingRoom = event.field.dressing_room
    const isLighting = event.field.lighting
    const fieldCoverage = event.field.coverage.name.toLowerCase();
    const fieldFormat = event.field.format.name
    const isShowerRoom = event.field.shower_room
    const isTribune = event.field.tribune
    const fieldType = event.field.type_field.name.toLowerCase();

    useEffect(() => {
        if (event && event.field) {
            let point = {
                lat: event.field.address.lat,
                lng: event.field.address.lng,
            }
            setPosition(point);
        }
    }, [event])

    const LocationMarker = () => {
        const map = useMapEvents({});
        map.flyTo(position, map.getZoom(), { animate: false });

        useEffect(() => {
            if (markerRef.current) {
                $('.leaflet-marker-icon').attr('src', MapMarkerIcon);
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
                <LocationMarker />
            </MapContainer>
        )
    }


    const DressingRoomItem = ({ active = true }) => {
        return (
            <div className={"event-info-field-assets-item" + (active ? "" : " event-info-item-strikethrough")}>
                <img src={HangerIcon} alt="item hanger" />
                <div className="event-info-field-assets-item-text">раздевалки</div>
            </div>
        )
    }

    const LightingItem = ({ active = true }) => {
        return (
            <div className={"event-info-field-assets-item" + (active ? "" : " event-info-item-strikethrough")}>
                <img src={LightingIcon} alt="ligting" />
                <div className="event-info-field-assets-item-text">освещение</div>
            </div>
        )
    }

    const ShowerRoomItem = ({ active = true }) => {
        return (
            <div className={"event-info-field-assets-item" + (active ? "" : " event-info-item-strikethrough")}>
                <img src={ShowerRoomIcon} alt="shower rooms" />
                <div className="event-info-field-assets-item-text">душевые</div>
            </div>
        )
    }

    const TribuneItem = ({ active = true }) => {
        return (
            <div className={"event-info-field-assets-item" + (active ? "" : " event-info-item-strikethrough")}>
                <img src={FlagIcon} alt="stands" />
                <div className="event-info-field-assets-item-text">трибуны</div>
            </div>
        )
    }

    return (
        <div className="event-info">
            <div className="event-info-row">
                <div className="event-info-field-title">
                    {fieldName}
                </div>
                <div className="event-info-field-assets-list">
                    <div className="event-info-field-assets-item">
                        <img src={AirplaneIcon} alt="match place" />
                        <div className="event-info-field-assets-item-text">{fieldType}</div>
                    </div>
                    <div className="event-info-field-assets-item">
                        <img src={FieldMaterialIcon} alt="field material" />
                        <div className="event-info-field-assets-item-text">{fieldCoverage}</div>
                    </div>
                    <div className="event-info-field-assets-item">
                        <img src={FootballFieldIcon} alt="field format" />
                        <div className="event-info-field-assets-item-text">{fieldFormat}</div>
                    </div>

                    {isDressingRoom && <DressingRoomItem />}
                    {isLighting && <LightingItem />}
                    {isShowerRoom && <ShowerRoomItem />}
                    {isTribune && <TribuneItem />}

                    {!isDressingRoom && <DressingRoomItem active={false} />}
                    {!isLighting && <LightingItem active={false} />}
                    {!isShowerRoom && <ShowerRoomItem active={false} />}
                    {!isTribune && <TribuneItem active={false} />}

                </div>
                <div className="event-info-map">
                    <div className="event-info-map-inner">
                        <EventInfoAddressCopyText copyText={fieldAddress} className={"event-info-address-tooltip"} />
                        <MapBody />
                    </div>
                    {event.field.field_photos.length !== 0 &&
                        <EventInfoSlider className="event-info-max-1279" images={event.field.field_photos} />
                    }
                </div>
            </div>
            {event.field.field_photos.length !== 0 &&
                <EventInfoSlider className="event-info-min-1279" images={event.field.field_photos} />}
        </div>
    )
}

export default EventInfo