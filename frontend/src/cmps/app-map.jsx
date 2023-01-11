import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Loc1 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>
const Loc2 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>
const Loc3 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>

export function AppMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return <section className="map">
            <div style={{ height: '70vh', width: '70%', margin: 'auto' }}>
                <GoogleMapReact
                    onClick={handleClick}
                    bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    {/* <AnyReactComponent
                        // lat={coordinates.lat}
                        // lng={coordinates.lng}
                        {...coordinates}
                        text="🍎"
                    /> */}
                    <Loc1
                        lat={31.1853}
                        lng={34.9999}
                        text="📍"
                    />
                    <Loc2
                        lat={32.2853}
                        lng={34.9818}
                        text="📍"
                    />
                    <Loc3
                        lat={32.1853}
                        lng={34.7818}
                        text="📍"
                    />
                </GoogleMapReact>
            </div>
    </section>
}