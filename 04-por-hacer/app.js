const argv = require('./config/yargs_config').argv;
const colors = require('colors');

const porHacer = require('./to-do-tasks/todo');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log('Tarea creada ', tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();
        for (const tarea of listado) {
            console.log('==== POR HACER ===='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==================='.green);
        }
        break;

    case 'actualizar':
        let actualizada = porHacer.actualizar(argv.descripcion, argv.completado);
        break;

    case 'borrar':
        let borrada = porHacer.borrar(argv.descripcion);
        if (borrada) { return console.log('Tarea borrada correctamente'); } return console.log('se ha producido un error al borrar la tarea');
        break;
    case 'filtrar':
        let estado = argv.completado;
        let tareasFiltradas = porHacer.filtrar(estado);
        console.log('=========='.green);
        console.log('======= Tareas con el estado completado a', colors.blue(estado));
        if (tareasFiltradas.length > 0) {
            for (const tarea of tareasFiltradas) {
                console.log(tarea.descripcion);
            }
        }else{
            console.log('No hay tareas con este estado'.red);
        }
        console.log('=========='.green);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}
