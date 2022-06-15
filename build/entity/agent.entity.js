"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentEntity = void 0;
const mongoose_1 = require("mongoose");
const AgentSchema = new mongoose_1.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    nom: {
        type: String,
        required: true,
        index: true
    },
    postnom: {
        type: String,
        required: false
    },
    prenom: {
        type: String,
        required: true,
        index: true
    },
    date_naissance: {
        type: Date,
        required: true
    },
    lieu_naissance: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nationalite: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Pays'
    },
    poste: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Poste'
    },
    etat_civil: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'EtatCivil'
    },
    status_syndical: {
        type: String,
        required: true,
        enum: ["Oui", "Non"]
    },
    sexe: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Genre'
    },
    niveau_etude: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'NiveauEtude'
    },
    avatar: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    adresse: {
        type: String,
        required: true
    }
});
exports.AgentEntity = (0, mongoose_1.model)('Agent', AgentSchema);
//# sourceMappingURL=agent.entity.js.map