import userRoutes from './usuario.routes';
import { Router } from 'express';

const mainRouter = Router();

mainRouter.use('/user', userRoutes);

export default mainRouter;