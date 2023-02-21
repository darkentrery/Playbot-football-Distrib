import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import React, {useEffect, useState} from "react";
import {getLocationsAddressByCoordsGoogle,
    getLocationsGoogle
} from "../../services/LocationService";
import "leaflet/dist/leaflet.css"


export const LocateEventComponent = ({
    className='',
    city,
    setCity,
    setAddress,
    setPoint,
    setIsOpenMap,
    address,
}) => {
    const [position, setPosition] = useState(null);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (city && !className.includes("hidden")) {
            if (!address) {
                getLocationsGoogle(city).then((response) => {
                    if (response.data.results.length) setPosition(response.data.results[0].geometry.location);
                    console.log(position)
                })
            } else {
                setPosition({lat: address.lat, lng: address.lng});
            }
        }
    }, [city, className])

    useEffect(() => {
        if (position) {
            getLocationsAddressByCoordsGoogle([position.lat, position.lng]).then((newAddress) => {
                setAddress(newAddress);
                setCity(newAddress.city);
                setPoint(`${position.lat} ${position.lng}`);
            })
        }
    }, [position])

    const LocationMarker = () => {
        const map = useMapEvents({});
        map.flyTo(position, map.getZoom(), {animate: false});
        const mapp = useMapEvents({
            dragend: (e) => {
                setPosition(e.target.getCenter());
                setZoom(e.target.getZoom());
            },
        });

        return null;
    }

    const MapBody = () => {
        return !position ? null : (
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
                <div className={"fake-marker"}></div>
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
                {/*<div className={"btn-close"} onClick={closeLocate}></div>*/}
                <span className={"btn"} onClick={closeLocate}>Ok</span>
            </div>
            <MapBody/>
        </div>
    )
}