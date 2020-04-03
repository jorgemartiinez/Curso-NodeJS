const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    }

    listadoPorHacer.push({ descripcion, completado: false });
    guardarDB();
    return porHacer;
};


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err, callback) => {
        if (err) return console.log('error al guardar el archivo');
        console.log('DB guardada correctamente');
    })
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json'); // leer arch
    } catch (error) {
        listadoPorHacer = []; // si falla la carga (esta vacío el archivo), la lista será un arreglo vacío
    }
}

const borrar = (descripcion) => {
    cargarDB();

    try {
        listadoPorHacer = listadoPorHacer.filter(lista => lista.descripcion != descripcion);
        guardarDB();
        return true;
    } catch (err) {
        return false;
    }
}

const filtrar = (completado) => {
    cargarDB();

    let listaFiltrada = listadoPorHacer.filter(lista => lista.completado === completado);
    return listaFiltrada;
}

module.exports = {
    crear,
    getListado,
    guardarDB,
    actualizar,
    borrar,
    filtrar
}