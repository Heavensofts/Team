"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NiveauEtudeEntity = void 0;
const mongoose_1 = require("mongoose");
const NiveauEtudeSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });
exports.NiveauEtudeEntity = (0, mongoose_1.model)('NiveauEtude', NiveauEtudeSchema);
//# sourceMappingURL=niveau_etude.entity.js.map