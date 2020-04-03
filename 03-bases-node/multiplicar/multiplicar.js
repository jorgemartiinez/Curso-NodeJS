const fs = require('fs');
const colors = require('colors');

//

let listar = (base, limite = 10) => {
    console.log('=============='.green);
    console.log(`tabla del ${base}`.green);
    console.log('=============='.green);
    for(let i = 1; i<=limite; i++){
        console.log(`${base}*${limite}=${base*limite}`);
    }
}

let crearArchivo = (base, limite = 10) => { // para importarla
    let mssg = '';
    return new Promise((resolve, reject) => {

        if (!Number(base)) return reject('El valor introducido '+ base + ' no es un número!');

        for (let i = 1; i <= limite; i++) {
            mssg += `${base}*${i}=${base * i}\n`;
        }

        fs.writeFile(`tablas/tabla-del-${base}-al-${limite}.txt`, mssg, (err) => {
            if (err) reject(err)
            else
                resolve(`tabla-del-${base}-al-${limite}.txt`)
        });
    });
}



module.exports = {
    crearArchivo,
    listar
}