import data from './parcel.json';

export class LayerControll {
    constructor() {}

    onAdd(map) {
        this.map = map;
        this.container = document.createElement("div");
        map.on("load", this.init);
        return this.container;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = null;
    }

    init = () => {
        this.map.addSource("parcel", {
            type: 'geojson',
            data: data
        });
        this.map.addLayer({
            id: "parcel-fills",
            type: "fill",
            source: "parcel",
            layout: {},
            // "source-layer": "public.parcels_vt",
            // filter: ['==', '$type', 'Polygon'],
            paint: {
                "fill-color": "#088",
                "fill-opacity": ["match", ["get", "hover"], "false", 0.4, "true", 1, 0.4],
                "fill-outline-color": "#000000",
            },
        });
        this.map.addLayer(
            {
                id: "parcel-highlighted",
                type: "fill",
                source: "parcel",
                // "source-layer": "public.parcels_vt",
                paint: {
                    "fill-outline-color": "#37376e",
                    "fill-color": "#473567",
                    "fill-opacity": 0.75,
                },
                filter: ["in", "id", ""],
            },
            "settlement-label",
        );
    };
}
