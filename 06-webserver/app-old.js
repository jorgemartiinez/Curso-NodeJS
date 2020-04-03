const http = require('http');


http.createServer((req, res) => { // creamos servidor http

    res.writeHead(200, { 'Content-Type': 'applicaction/json' });

    let salida = {
        nombre: 'Jorge',
        edad: 20,
        url: req.url
    }

    // res.write('Hola Mundo'); // enviamos la res
    res.write(JSON.stringify(salida));
    res.end(); // la terminamos

}).listen(8080); // escuchamos el puerto 8080

console.log('Escuchando el puerto 8080'); 