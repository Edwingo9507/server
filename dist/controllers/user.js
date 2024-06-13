"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loguin = exports.nuevoUsuario = exports.obtenerUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield users_1.User.findAll();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuarios',
            error
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const nuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreusuario, contrasena, correo, role } = req.body;
    //validacion de usuario duplicado
    const user = yield users_1.User.findOne({ where: { nombreusuario: nombreusuario } });
    if (user) {
        return res.status(400).json({
            msg: 'ya existe nombre de usuario'
        });
    }
    const hashpassword = yield bcrypt_1.default.hash(contrasena, 10);
    try {
        yield users_1.User.create({
            nombreusuario: nombreusuario,
            contrasena: hashpassword,
            role: role,
            correo: correo
        });
        res.json({
            msg: `usuario ${nombreusuario} creado exitosamente`,
        });
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            msg: 'error al crear usuario'
        });
    }
});
exports.nuevoUsuario = nuevoUsuario;
const loguin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreusuario, contrasena } = req.body;
    const user = yield users_1.User.findOne({ where: { nombreusuario: nombreusuario } });
    if (!user) {
        return res.status(400).json({
            msg: `no existe usuario con el nombre ${nombreusuario} en la base de datos `
        });
    }
    const contrasenavalidada = yield bcrypt_1.default.compare(contrasena, user.contrasena);
    if (!contrasenavalidada) {
        return res.status(400).json({
            msg: `contraseña erronea`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        nombreusuario: nombreusuario
    }, process.env.SECRETKEY || 'contraseña123');
    res.json({ token, user });
});
exports.loguin = loguin;
