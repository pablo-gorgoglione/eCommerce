"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: 'Admin Pablo',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Pablo',
        email: 'pablo@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
    },
    {
        name: 'Juan',
        email: 'juan@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
    },
];
exports.default = users;
//# sourceMappingURL=users.js.map