"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCongeEntity = void 0;
const mongoose_1 = require("mongoose");
const TypecongeSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: false
    },
    date_deleted: {
        type: Date,
        required: false
    },
    statut_deleted: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: "Status",
    }
}, { timestamps: true });
exports.TypeCongeEntity = (0, mongoose_1.model)('TypeConge', TypecongeSchema);
//# sourceMappingURL=type_conge.entity.js.map