
import { DataTypes } from 'sequelize';

import db from '../db/conexiondb';





export const User = db.define('usuario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombreusuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,

    },

    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
     },


}, {

    createdAt: false,
    updatedAt: false
})
