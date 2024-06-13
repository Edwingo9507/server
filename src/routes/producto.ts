import { Router } from 'express';
import { deleteproducto, getproducto, getproductos, postproducto, updateproducto } from '../controllers/producto';

const router = Router();

router.get('/', getproductos);
router.get('/:id', getproducto);
router.delete('/:id', deleteproducto);
router.post('/', postproducto);
router.put('/:id', updateproducto);

export default router; 