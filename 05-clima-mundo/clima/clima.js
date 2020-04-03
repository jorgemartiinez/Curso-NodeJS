const axios = require('axios');
const appID = 'f369635965b00ad16ced5da4da4b9f3b';
const getClima = async (lat, lng) => {
    const resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appID}&units=metric`)

    return resp.data.main.temp;
}

module.exports = {
    getClima,
}