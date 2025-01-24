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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleService = void 0;
const bicycle_model_1 = require("./bicycle.model");
const createBicycleDb = (bicycle) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.BicycleModel.create(bicycle);
    return result;
});
const getAllBiCycle = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
    const result = yield bicycle_model_1.BicycleModel.find(filter);
    return result;
});
const getSingleBiCycleById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.BicycleModel.findOne({ _id });
    return result;
});
const updateBiCycleById = (_id, updatedBicycle) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.BicycleModel.findByIdAndUpdate(_id, Object.assign(Object.assign({}, updatedBicycle), { updatedAt: new Date() }), { new: true });
    return result;
});
const deleteBiCycleById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.BicycleModel.findByIdAndDelete(_id);
    return result;
});
exports.BicycleService = {
    createBicycleDb,
    getAllBiCycle,
    getSingleBiCycleById,
    updateBiCycleById,
    deleteBiCycleById,
};
