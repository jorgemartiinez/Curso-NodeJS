import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `SELECT * FROM heroes`;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {

        if (err) return res.status(400).json({
            err: true,
            error: err
        });

        return res.json({
            ok: true,
            heroes
        });

    });

});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    const query = `SELECT * FROM heroes WHERE id=${id}`;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object) => {

        if (err) return res.status(400).json({
            err: true,
            error: err
        });

        return res.json({
            ok: true,
            heroe
        });

    });
});



export default router;