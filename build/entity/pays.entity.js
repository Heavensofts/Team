"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaysEntity = void 0;
const mongoose_1 = require("mongoose");
const PaysSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.PaysEntity = (0, mongoose_1.model)('Pays', PaysSchema);
//# sourceMappingURL=pays.entity.js.map