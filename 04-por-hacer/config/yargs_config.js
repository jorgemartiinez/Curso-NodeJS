const descripcionOpts = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completadoOpts = {
    default: true,
    alias: 'c',
    desc: 'Marcar como pendiente o completada una tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una nueva tarea', {
        descripcion: descripcionOpts
    })
    .command('actualizar', 'Actualizar la descripción o el estado de una tarea', {
        descripcion: descripcionOpts,
        completado: completadoOpts
    })
    .command('borrar', 'Borrar una tarea', {
        descripcion: descripcionOpts,
    })
    .command('filtrar', 'Filtra una tarea por su estado', {
        completado: completadoOpts
    })
    .help()
    .argv;

module.exports = {
    argv
}