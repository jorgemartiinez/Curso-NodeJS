// Primero ponemos los requires
const { argv } = require('./config/yargs');
const colors = require('colors');

const { crearArchivo, listar } = require('./multiplicar/multiplicar');

let comando = argv._[0];

switch (comando) {
    case 'listar':
        console.log('Listar');
        listar(argv.base, argv.limite);
        break;
    case 'crear':
        console.log('Crear');
        crearArchivo(argv.base, argv.limite)
            .then((archivo) => console.log(`Archivo creado `+ colors.red(archivo.red)))
            .catch(err => console.log(err));
        break;
    default:
        console.log('Comando no reconocido');
        break;
}
