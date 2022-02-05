"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const path_1 = __importDefault(require("path"));
const mercadopago_1 = __importDefault(require("mercadopago"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// request recongnition
(0, db_1.default)();
/* CORS */
exports.app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));
/* --------------- REQUEST RECOGNITION --------------- */
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
/* --------------- PAYMENTS --------------- */
mercadopago_1.default.configure({
    access_token: process.env.MERCADO_PAGO_TOKEN,
});
/* --------------- Routes --------------- */
//start
exports.app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
//Routes
exports.app.use('/api/products', productRoutes_1.default);
exports.app.use('/api/users', userRoutes_1.default);
exports.app.use('/api/orders', orderRoutes_1.default);
exports.app.use('/api/upload', uploadRoutes_1.default);
console.log(path_1.default.join(__dirname, '../../uploads'));
exports.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../../uploads')));
if (process.env.NODE_ENV === 'production') {
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
    exports.app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}
else {
    exports.app.get('/', (req, res) => {
        res.send('API is running');
    });
}
exports.app.use(errorMiddleware_1.errorHandler);
//Not found
exports.app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
/* --------------- LISTEN --------------- */
// const port = process.env.PORT || '4000';
exports.app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map