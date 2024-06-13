import { Router } from "express";
import { loguin, nuevoUsuario, obtenerUsuarios } from "../controllers/user";


const router = Router();

router.get("/", obtenerUsuarios)
router.post("/", nuevoUsuario)
router.post("/login", loguin)


export default router;

