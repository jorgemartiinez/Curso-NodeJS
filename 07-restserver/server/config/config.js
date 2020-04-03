// ===========================
//          Puerto
// ===========================
process.env.PORT = process.env.PORT || 3000; // variable global en el objeto process


// ===========================
//          Entorno
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; // si estamos en produccion o si no la llamamos dev

// ===========================
//        Base de Datos
// ===========================
let urlDB;

if (process.env.NODE_ENV === 'dev') { // si estamos en desarrollo usa db local
    urlDB = 'mongodb://localhost:27017/cafe';
} else { // si no, db online
    // urlDB = 'mongodb+srv://jorgemartiinez19:9988776655t@cluster0-vjrxz.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB; // creamos una variable de entorno para almacenar la url

// ===========================
//  Fecha vencimiento token
// ===========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '24h';

// ===========================
//  SEED de autenticación
// ===========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===========================
//  GOOGLE CLIENT ID
// ===========================

process.env.CLIENT_ID = '1007934075719-75lojjhvb2g23vlul1qje87b4eqn3trh.apps.googleusercontent.com';