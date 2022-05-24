"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteFraisEntity = void 0;
const mongoose_1 = require("mongoose");
const NoteFraisSchema = new mongoose_1.Schema({
    intitule_mission: {
        type: String,
        required: true
    },
    agent: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Agent'
    },
    date_debut_mission: {
        type: Date,
        required: true
    },
    date_fin_mission: {
        type: Date,
        required: true
    },
    frais_mission: {
        type: Number,
        required: true,
        default: 0
    },
    devise: {
        type: String,
        required: true
    },
    document_mission: [{
            type: String,
            required: false
        }],
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
exports.NoteFraisEntity = (0, mongoose_1.model)('NoteFrais', NoteFraisSchema);
//# sourceMappingURL=note_frais.entity.js.map