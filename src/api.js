import axios from "axios";

export const buildRoute = async (coordinates) => {
    try {
        const res = await axios.get(`https://router.project-osrm.org/route/v1/driving/${coordinates}?geometries=geojson`);
        // console.log(res.data);
        return await res.data;
    } catch (error) {
        console.error(error);
    }
}