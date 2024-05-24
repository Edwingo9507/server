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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const producto_1 = __importDefault(require("../routes/producto"));
const conexiondb_1 = __importDefault(require("../db/conexiondb"));
const user_1 = __importDefault(require("../routes/user"));
class server {
    constructor() {
        console.log(process.env.PORT);
        this.app = (0, express_1.default)();
        this.port = "3001";
        this.lister();
        this.midlewares();
        this.routes();
        this.dbConect();
        this.app2 = (0, express_1.default)();
    }
    lister() {
        this.app.listen(this.port, () => {
            console.log(`corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ msg: 'Api is OK' });
        });
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/users', user_1.default);
    }
    midlewares() {
        //parseamos el body
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexiondb_1.default.authenticate();
            try {
                console.log('base de datos conectada');
            }
            catch (_a) {
                console.log('Error al conectar');
            }
        });
    }
}
exports.default = server;
