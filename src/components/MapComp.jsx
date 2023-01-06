import {MapContainer, Marker, Polyline, TileLayer, useMap} from "react-leaflet";
import {useSelector} from "react-redux";
import {getRoute, getSelectedRow} from "../store/selectors";
import {useEffect} from "react";
import L from "leaflet";

export const MapComp = () => {
    const selected = useSelector(getSelectedRow);
    const route = useSelector(getRoute);

    const positionStart = selected ? [selected.fromLat, selected.fromLng] : null
    const positionEnd = selected ? [selected.toLat, selected.toLng] : null

    const limeOptions = { color: 'red' }

    const group = L.featureGroup();

    function Bounds({ coords }) {
        const map = useMap();

        useEffect(() => {
            if (!map) return;

            group.clearLayers();
            coords.forEach((marker) => group.addLayer(L.marker(marker)));
            map.flyToBounds(group.getBounds(), {padding: [20, 20]});
        }, [map, coords]);

        return null;
    }

    return(
        <MapContainer className='map' center={ [59.9386300, 30.3141300]} zoomSnap={0.1} zoom={10}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positionStart && <Marker position={positionStart}></Marker>}
            {positionEnd && <Marker position={positionEnd}></Marker>}
            {route.length > 0 && <Polyline pathOptions={limeOptions} positions={route} />}
            {route.length > 0 && <Bounds coords={route} />}
        </MapContainer>
        )
};