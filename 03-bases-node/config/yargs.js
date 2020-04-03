
const opcionesComandos = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        default: 10,
        alias: 'l'
    },
}

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', opcionesComandos)
    .command('crear', 'Crea un archivo .txt con la tabla de multiplicar', opcionesComandos)
    .help()
    .argv;

module.exports = {
    argv,
}