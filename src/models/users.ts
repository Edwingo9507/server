
import sequelize from '../db/conexiondb';
import { DataType, DataTypes } from 'sequelize';

import db from '../db/conexiondb';





 export const User =db.define('usuario',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },

    nombreusuario:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        
    },

    contrasena:{
        type:DataTypes.STRING,
        allowNull:false,

    },


    
}, {

    createdAt:false,
    updatedAt:false
} )
