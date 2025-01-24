"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bicycle_route_1 = require("./app/modules/Bicycle/bicycle.route");
const order_route_1 = require("./app/modules/Orders/order.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api', bicycle_route_1.biCycleRoute);
app.use('/api', order_route_1.OrderRoute);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bicycle Server Is Running',
    });
});
exports.default = app;
