import {Router} from "express";
import { loguin, nuevoUsuario } from "../controllers/user";


const router = Router();

router.post("/",nuevoUsuario)
router.post("/login",loguin)
export default router;

