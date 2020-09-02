import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { LayerControll } from "./layers-controll";
import "mapbox-gl/dist/mapbox-gl.css";

const mapElementID = "map-element-id";
function App() {
    const [mode, setMode] = useState("user");
    const map = useRef();
    const controll = useRef();

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapElementID,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-94.63624739181586, 39.034489633830816], // starting position
            zoom: 14,
        });
        controll.current = new LayerControll();
        map.current.addControl(controll.current);
    }, []);

    return (
        <div className="App">
            <div className="test-panel">
                <button
                    onClick={() => setMode("admin")}
                    className={mode === "admin" ? "test-panel__button-active" : ""}
                >
                    ADMIN MODE
                </button>
                <button onClick={() => setMode("user")} className={mode === "user" ? "test-panel__button-active" : ""}>
                    USER MODE
                </button>
                <button
                    onClick={() => setMode("highlight")}
                    className={mode === "highlight" ? "test-panel__button-active" : ""}
                >
                    HIGHLIGHT ZONE
                </button>
            </div>
            <div id={mapElementID}></div>
        </div>
    );
}

export default App;
