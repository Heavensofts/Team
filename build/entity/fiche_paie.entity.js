"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichePaieEntity = void 0;
const mongoose_1 = require("mongoose");
const FichePaieSchema = new mongoose_1.Schema({
    salaire_brut: {
        type: Number,
        required: true,
        default: 0,
    },
    salaire_net: {
        type: Number,
        required: true,
        default: 0,
    },
    cession_salaire: {
        type: Number,
        required: true,
        default: 0,
    },
    saisie_salaire: {
        type: Number,
        required: true,
        default: 0,
    },
    acompte: {
        type: Number,
        required: true,
        default: 0,
    },
    heure_supplementaire: {
        type: Number,
        required: true,
        default: 0,
    },
    remboursement: {
        type: Number,
        required: true,
        default: 0,
    },
    agent: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Agent',
    },
    prime: {
        type: Number,
        required: true,
        default: 0,
    },
    allocation_familiale: {
        type: String,
        required: true,
        // enum: ["Oui", "Non"],
    },
    nombre_enfants: {
        type: Number,
        required: false,
        default: 0,
    },
    loyer: {
        type: Number,
        required: false,
        default: 0,
    },
    impot: {
        type: Number,
        required: false,
        default: 0,
    },
    cotisation_sociale: {
        type: Number,
        required: false,
        default: 0,
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
exports.FichePaieEntity = (0, mongoose_1.model)('FichePaie', FichePaieSchema);
//# sourceMappingURL=fiche_paie.entity.js.map