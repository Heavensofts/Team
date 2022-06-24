"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangueEntity = void 0;
const mongoose_1 = require("mongoose");
const LangueSchema = new mongoose_1.Schema({
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
exports.LangueEntity = (0, mongoose_1.model)('Langue', LangueSchema);
//# sourceMappingURL=langue.entity.js.map