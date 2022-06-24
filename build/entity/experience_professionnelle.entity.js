"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceProfessionnelleEntity = void 0;
const mongoose_1 = require("mongoose");
const ExperienceProfessionnelleSchema = new mongoose_1.Schema({
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    entreprise: {
        type: String,
        required: true
    },
    reference: {
        nom: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        }
    },
    taches: [{
            type: String,
            required: true
        }],
});
exports.ExperienceProfessionnelleEntity = (0, mongoose_1.model)('ExperienceProfessionnelle', ExperienceProfessionnelleSchema);
//# sourceMappingURL=experience_professionnelle.entity.js.map