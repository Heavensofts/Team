"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratEntity = void 0;
const mongoose_1 = require("mongoose");
const contratSchema = new mongoose_1.Schema({
    agent: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Agent'
    },
    type_contrat: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'TypeContrat'
    },
    description: {
        type: String,
        required: false
    },
    poste: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Poste'
    },
    salaire_base: {
        type: Number,
        required: true
    },
    volume_horaire: {
        type: Number,
        required: true
    },
    unite_horaire: {
        type: String,
        required: true
    },
    date_debut_contrat: {
        type: Date,
        required: true
    },
    date_fin_contrat: {
        type: Date,
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
});
exports.ContratEntity = (0, mongoose_1.model)('Contrat', contratSchema);
//# sourceMappingURL=contrat.entity.js.map