"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDemandeEntity = void 0;
const mongoose_1 = require("mongoose");
const TypeDemandeSchema = new mongoose_1.Schema({
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
exports.TypeDemandeEntity = (0, mongoose_1.model)('TypeDemande', TypeDemandeSchema);
//# sourceMappingURL=type_demande.entity.js.map