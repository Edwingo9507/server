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
exports.updateproducto = exports.postproducto = exports.deleteproducto = exports.getproducto = exports.getproductos = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const getproductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaproductos = yield producto_1.default.findAll();
    res.json(listaproductos);
});
exports.getproductos = getproductos;
const getproducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (producto) {
        res.json(producto);
    }
    else {
        res.status(404).json({
            msg: `no existe producto con el id ${id} `
        });
    }
});
exports.getproducto = getproducto;
const deleteproducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (!producto) {
        res.status(404).json({
            msg: `no existe producto con el id ${id} `
        });
    }
    else {
        yield producto.destroy();
        res.json({
            msg: `El producto fue elimunado con exito`
        });
    }
});
exports.deleteproducto = deleteproducto;
const postproducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        res.json({
            msg: `El producto fue agregado con exito`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `ups error al crear producto`
        });
    }
    yield producto_1.default.create(body);
});
exports.postproducto = postproducto;
const updateproducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const producto = yield producto_1.default.findByPk(id);
        if (producto) {
            yield producto.update(body);
            res.json({
                msg: `El producto fue actualizado con excito`
            });
        }
        else {
            res.status(404).json({
                msg: `no existe producto con el id ${id} `
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `ups error al crear producto`
        });
    }
});
exports.updateproducto = updateproducto;
