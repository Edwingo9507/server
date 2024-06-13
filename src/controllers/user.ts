
import { Request, Response, } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/users";
import jwt from "jsonwebtoken";





export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await User.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuarios',
            error
        });
    }
};



export const nuevoUsuario = async (req: Request, res: Response) => {

    const { nombreusuario, contrasena, correo, role } = req.body;

    //validacion de usuario duplicado

    const user = await User.findOne({ where: { nombreusuario: nombreusuario } })

    if (user) {

        return res.status(400).json({

            msg: 'ya existe nombre de usuario'
        })
    }

    const hashpassword = await bcrypt.hash(contrasena, 10);

    try {


        await User.create({
            nombreusuario: nombreusuario,
            contrasena: hashpassword,
            role: role,
            correo: correo

        })



        res.json({

            msg: `usuario ${nombreusuario} creado exitosamente`,

        })

    } catch (error) {
        console.error('Error al crear usuario:', error);

        res.status(500).json(
            {


                msg: 'error al crear usuario'

            }
        );


    }



}
export const loguin = async (req: Request, res: Response) => {

    const { nombreusuario, contrasena } = req.body;

    const user: any = await User.findOne({ where: { nombreusuario: nombreusuario } })


    if (!user) {

        return res.status(400).json({

            msg: `no existe usuario con el nombre ${nombreusuario} en la base de datos `
        })
    }


    const contrasenavalidada = await bcrypt.compare(contrasena, user.contrasena)
    if (!contrasenavalidada) {

        return res.status(400).json({
            msg: `contraseña erronea`
        })
    }



    const token = jwt.sign({
        nombreusuario: nombreusuario
    },
        process.env.SECRETKEY || 'contraseña123');

    res.json({ token, user });

}