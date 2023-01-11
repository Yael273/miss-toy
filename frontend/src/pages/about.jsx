import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { AppMap } from "../cmps/app-map";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Loc1 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>
const Loc2 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>
const Loc3 = ({ text }) => <div style={{ fontSize: '2.5rem' }}>{text}</div>

export function About() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return <section className="about">
        <h1>About Us</h1>
        <h4>Our Locations</h4>
        <div className="map-container">
            <AppMap />
        </div>
    </section>
}