import {Request,Response} from 'express';
import Producto from '../models/producto';

export const getproductos = async (req:Request,res:Response) => {

    const listaproductos  = await Producto.findAll()

res.json(listaproductos)

}

export const getproducto = async (req:Request,res:Response) => {
  const {id} =req.params;
  const producto = await Producto.findByPk(id);

  if(producto)
    {res.json(producto)
    
    }else{

        res.status(404).json({
            msg: `no existe producto con el id ${id} ` 
        })
    }

    }


export const deleteproducto = async (req:Request,res:Response) => {


    const {id} =req.params;
    const producto = await Producto.findByPk(id);

    if(!producto){
        res.status(404).json({

            msg: `no existe producto con el id ${id} ` 
        })

    } else{

       await producto.destroy();
       res.json({

        msg:`El producto fue elimunado con exito`

       })
    }

}



    export const postproducto = async (req:Request,res:Response) => {

        const {body} =req;
        try {
            
            res.json({
            

                msg:`El producto fue agregado con exito`
            })

        } catch (error) {
            
console.log(error);

            res.json({

                msg:`ups error al crear producto`
            })

        }

        await Producto.create(body);

       
    }

        export const updateproducto = async (req:Request,res:Response) => {

            const {body} =req;
            const {id}= req.params;

            try {

                const producto = await Producto.findByPk(id);

            if(producto){
                

            await producto.update(body);
            res.json({

                msg:`El producto fue actualizado con excito`
            })

            }else{
                res.status(404).json({

                    msg: `no existe producto con el id ${id} ` 
                })
            }
        
        
        
                
            } catch (error) {
             
                console.log(error);

            res.json({

                msg:`ups error al crear producto`
            })
            }



            }