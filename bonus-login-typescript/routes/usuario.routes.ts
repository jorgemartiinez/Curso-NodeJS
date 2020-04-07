import { Router } from "express";
import UsuarioController from '../controllers/usuario.controller';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

userRoutes.post('/login', UsuarioController.login);
userRoutes.post('/create', UsuarioController.create);
userRoutes.put('/update', verificaToken, UsuarioController.update);

export default userRoutes;
// module.exports = userRoutes (require)