const argv = require('./config/yargs_config').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


const getInfo = async (direccion) => {
    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${coords.direccion}, es de ${temp} grados`;
    } catch (err) {
        return `No se pudo determinar el clima de ${temp}`;
    }
}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);
