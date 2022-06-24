"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeEntity = void 0;
const mongoose_1 = require("mongoose");
const DemandeSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true
    },
    agent: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Agent'
    },
    type_demande: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'TypeDemande'
    },
    description: {
        type: String,
        required: true
    },
    documents: [{
            type: String,
            required: false
        }],
});
exports.DemandeEntity = (0, mongoose_1.model)('Demande', DemandeSchema);
//# sourceMappingURL=demande.entity.js.map