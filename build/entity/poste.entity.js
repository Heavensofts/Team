"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosteEntity = void 0;
const mongoose_1 = require("mongoose");
const PosteSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    superviseur: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        ref: 'Agent'
    },
    poste_hierarchique: {
        type: String,
        required: true
    },
    disponibilite_poste: {
        type: String,
        required: true
    },
    departement: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Departement'
    },
    job_description: {
        type: String,
        required: false
    },
    role: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Role'
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
});
exports.PosteEntity = (0, mongoose_1.model)('Poste', PosteSchema);
//# sourceMappingURL=poste.entity.js.map