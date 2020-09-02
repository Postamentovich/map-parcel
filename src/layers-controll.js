import data from "./parcel.json";
import { modes } from "./App";
export class LayerControll {
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

    applyFilter = (filter) => {
        this.map.setFilter("parcel-fills", filter);
    };

    setFilter(mode) {
        let filter = null;

        switch (mode) {
            case modes.Residential:
                filter = ["to-boolean", ["get", "Res_Sector"]];
                break;
            case modes.Commercial:
                filter = ["to-boolean", ["get", "Com_Sector"]];
                break;
            case modes.Industrial:
                filter = ["to-boolean", ["get", "Ind_QuickR"]];
                break;
            case modes.Transportation:
                filter = ["!", ["to-boolean", ["get", "lbcsactvty"]]];
                break;
            case modes.All:
                filter = null;
                break;
            default:
                break;
        }

        if (!this.map.isStyleLoaded()) {
            this.map.on("load", () => {
                this.applyFilter(filter);
            });
        } else {
            this.applyFilter(filter);
        }
    }

    init = () => {
        this.map.addSource("parcel", {
            type: "geojson",
            data: data,
        });
        this.map.addLayer({
            id: "parcel-fills",
            type: "fill",
            source: "parcel",
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
                paint: {
                    "fill-outline-color": "#37376e",
                    "fill-color": "#473567",
                    "fill-opacity": 0.75,
                },
                filter: ["in", "id", ""],
            },
            "settlement-label",
        );
        this.map.on("mousemove", "parcel-fills", (e) => {
            this.map.getCanvas().style.cursor = "pointer";
            const feature = e.features[0];
            this.map.setFilter("parcel-highlighted", ["in", "id", feature.properties.id]);
        });

        this.map.on("mouseleave", "parcel-fills", () => {
            this.map.getCanvas().style.cursor = "";
            this.map.setFilter("parcel-highlighted", ["in", "id", ""]);
        });
        this.map.on("click", "parcel-fills", (e) => {
            console.log(e);
        });
    };
}
