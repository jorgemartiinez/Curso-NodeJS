const axios = require('axios');

const getLugarLatLng = async (dir) => {
    const encodedDireccion = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedDireccion}`,
        headers: { 'X-RapidAPI-Key': '959ad0e766mshb9a69286ad3440ep14023fjsn0a8810d748cf' }
    })

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${ dir }`)
    }

    const data      = resp.data.Results[0];
    const direccion = data.name;
    const lat       = data.lat;
    const lng       = data.lon;

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}