import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true]
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }

});


// Creamos un método en el Schema de usuario
usuarioSchema.method('compararPassword', function (password: string): boolean { // aqui es mejor usar una funcion por el this
    if (bcrypt.compareSync(password, this.password)) { // el password pasado lo comparamos con el de la base de datos
        return true;
    }
    return false;
});

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;

    compararPassword(password: string): boolean;
}


// la colección se llamará usuario
export const Usuario= model<IUsuario>('Usuario', usuarioSchema);