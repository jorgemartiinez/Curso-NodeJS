const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const Usuario = require('./../models/usuario.model');
const Producto = require('./../models/producto.model');

const app = express();

// default options
app.use(fileUpload()); // middleware que transforma la subida en un archivo y lo almacena en un objeto files al que podemos acceder mediante req.files

app.put('/upload/:tipo/:id', (req, res) => { // con tipo obtenemos imagen de usuario o imagen de producto

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) { // no se ha subido un archivo
        return res.status(400).json({
            ok: false,
            err: { message: 'No files were uploaded.' }
        });
    }

    // validar tipo producto | usuario
    let tiposValidos = ['producto', 'usuario'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos válidos son ' + tiposValidos.join(', '),
                tipo: tipo
            }
        });
    }


    // un archivo ha sido subido
    let archivo = req.files.archivo; // el input del post tendrá el nombre de 'archivo'

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']; // extensiones permitidas
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    if (extensionesValidas.indexOf(extension) < 0) { // si la extension del archivo subido está en nuestro array de validas
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                extension: extension
            }
        });
    }

    // Cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`../uploads/${tipo}s/${nombreArchivo}`, function (err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Aquí, imagen cargada
        if (tipo === 'usuario') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    });

});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios'); // la imagen ya se subió, queremos borrarla
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borrarArchivo(nombreArchivo, 'usuarios'); // la imagen ya se subió, queremos borrarla
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        borrarArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo; // tenemos el usuario de la bd y le cambiamos su img

        usuarioDB.save((err, usuarioGuardado) => {
            return res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borrarArchivo(nombreArchivo, 'productos'); // la imagen ya se subió, queremos borrarla
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            borrarArchivo(nombreArchivo, 'productos'); // la imagen ya se subió, queremos borrarla
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        borrarArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo; // tenemos el usuario de la bd y le cambiamos su img

        productoDB.save((err, productoGuardado) => {
            return res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });
    });

}

function borrarArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`); // segmentos del path a construir, queremos ver si existe la img para borrarla y subir la nueva

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
module.exports = app;