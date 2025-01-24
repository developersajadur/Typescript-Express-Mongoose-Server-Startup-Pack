"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleModel = void 0;
const mongoose_1 = require("mongoose");
const BicycleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});
// pre middleware
BicycleSchema.pre('save', function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const biCycle = this;
    biCycle.createdAt = new Date();
    biCycle.updatedAt = new Date();
    next();
});
exports.BicycleModel = (0, mongoose_1.model)('bicycle', BicycleSchema);
