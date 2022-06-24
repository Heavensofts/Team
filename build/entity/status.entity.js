"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEntity = void 0;
const mongoose_1 = require("mongoose");
const StatusSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    type_statut: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });
exports.StatusEntity = (0, mongoose_1.model)("Status", StatusSchema);
//# sourceMappingURL=status.entity.js.map