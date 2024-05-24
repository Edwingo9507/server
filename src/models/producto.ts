
import sequelize from '../db/conexiondb';
import { DataType, DataTypes } from 'sequelize';

import db from '../db/conexiondb';





const Producto =db.define('producto',{

    nombre:{
        type:DataTypes.STRING
    },

    precio:{
        type:DataTypes.STRING
    },

    talla:{
        type:DataTypes.STRING
    },
    
    color:{
        type:DataTypes.STRING
    },

    cantidad:{
        type:DataTypes.STRING
    },


},{

    createdAt:false,
    updatedAt:false
});

export default Producto;