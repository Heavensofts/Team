"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecrutementEntity = void 0;
const mongoose_1 = require("mongoose");
const RecrutementSchema = new mongoose_1.Schema({
    job_description: {
        type: String,
        required: true
    },
    type_contrat: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'TypeContrat'
        }],
    candidat: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'Candidat'
        }],
    poste: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Poste'
    },
    recruteur: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'Agent'
        }],
    nombre_poste: {
        type: Number,
        required: true
    },
    debut_recrutement: {
        type: Date,
        required: true
    },
    fin_recrutement: {
        type: Date,
        required: true
    },
});
exports.RecrutementEntity = (0, mongoose_1.model)('Recrutement', RecrutementSchema);
//# sourceMappingURL=recrutement.entity.js.map