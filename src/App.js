import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { LayerControll } from "./layers-controll";
import "mapbox-gl/dist/mapbox-gl.css";

const mapElementID = "map-element-id";

export const modes = {
    Residential: "Residential",
    Commercial: "Commercial",
    Industrial: "Industrial",
    Transportation: "Transportation",
    All: "All",
};

function App() {
    const [mode, setMode] = useState(modes.All);
    const map = useRef();
    const controll = useRef();

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapElementID,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-94.63624739181586, 39.034489633830816],
            zoom: 14,
        });
        controll.current = new LayerControll(mode);
        map.current.addControl(controll.current);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        controll.current.setFilter(mode);
    }, [mode]);

    return (
        <div className="App">
            <div className="test-panel">
                <button
                    onClick={() => setMode(modes.All)}
                    className={mode === modes.All ? "test-panel__button-active" : ""}
                >
                    All
                </button>
                <button
                    onClick={() => setMode(modes.Residential)}
                    className={mode === modes.Residential ? "test-panel__button-active" : ""}
                >
                    Residential
                </button>
                <button
                    onClick={() => setMode(modes.Commercial)}
                    className={mode === modes.Commercial ? "test-panel__button-active" : ""}
                >
                    Commercial
                </button>
                <button
                    onClick={() => setMode(modes.Industrial)}
                    className={mode === modes.Industrial ? "test-panel__button-active" : ""}
                >
                    Industrial
                </button>
                <button
                    onClick={() => setMode(modes.Transportation)}
                    className={mode === modes.Transportation ? "test-panel__button-active" : ""}
                >
                    Transportation
                </button>
            </div>
            <div id={mapElementID}></div>
        </div>
    );
}

export default App;
