import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'


export const LocateEventComponent = ({
    className='',
    userAddress,
    setField,
    setIsOpenMap,
    address,
    fields,
}) => {
    const [position, setPosition] = useState(null);

    const icon = L.icon({
        iconRetinaUrl:iconRetina,
        iconUrl: iconMarker,
        shadowUrl: iconShadow
    });

    useEffect(() => {
        if (!!userAddress && !className.includes("hidden")) {
            if (!!address) {
                setPosition({lat: address.lat, lng: address.lng});
            } else {
                console.log(userAddress)
                if (userAddress.lat && userAddress.lng) {
                    setPosition({lat: userAddress.lat, lng: userAddress.lng});
                }
                // getLocationsGoogle(userAddress.city).then((response) => {
                //     console.log(response.data)
                //     if (response.data.results.length) setPosition(response.data.results[0].geometry.location);
                //     console.log(position)
                // })
            }
        }
    }, [userAddress, className])

    const MapBody = () => {
        return !position ? null : (
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fields.map((field, key) => (
                    <Marker position={[field.address.lat, field.address.lng]} key={key} icon={icon}>
                        <Popup>
                            {field.name} <br/>
                            Адрес: {field.address.c_s_h_string} <br/>
                            Формат: {field.format.name} <br/>
                            Тип: {field.type_field.name} <br/>
                            Покрытие: {field.coverage.name} <br/>
                            Душевые: {field.shower_room ? 'Есть' : 'Нет'} <br/>
                            Раздевалки: {field.dressing_room ? 'Есть' : 'Нет'} <br/>
                            Освещение: {field.lighting ? 'Есть' : 'Нет'} <br/>
                            Трибуны: {field.tribune ? 'Есть' : 'Нет'} <br/>
                            <span className={"btn"} onClick={() => setField(field)}>Выбрать</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
    }

    const closeLocate = () => {
        setIsOpenMap(false);
    }

    return (
        <div className={`locate-event-component ${className}`}>
            <div className={"locate-menu"}>
                <span>{address ? address.city : ''}</span>
                <span className={"btn"} onClick={closeLocate}>Ok</span>
            </div>
            <MapBody/>
        </div>
    )
}