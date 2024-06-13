import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routeproductos from '../routes/producto';
import db from '../db/conexiondb';
import routesUsers from '../routes/user';

class server {


    private app: Application;
    private port: string;
    private app2: express.Application
    constructor() {
        console.log(process.env.PORT);
        this.app = express();

        this.port = "3001"
        this.lister();
        this.midlewares();
        this.routes();
        this.dbConect();
        this.app2 = express();
    }




    lister() {

        this.app.listen(this.port, () => {
            console.log(`corriendo en el puerto ${this.port}`)
        })




    }

    routes() {

        this.app.get('/', (req: Request, res: Response) => {

            res.json({ msg: 'Api is OK' })
        })


        this.app.use('/api/productos', routeproductos);
        this.app.use('/api/users', routesUsers);

    }

    midlewares() {

        //parseamos el body

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConect() {

        await db.authenticate()

        try { console.log('base de datos conectada') }
        catch {

            console.log('Error al conectar')
        }


    }

}

export default server;