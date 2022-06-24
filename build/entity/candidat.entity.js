"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatEntity = void 0;
const mongoose_1 = require("mongoose");
const CandidatSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        index: true
    },
    postnom: {
        type: String,
        required: false,
    },
    prenom: {
        type: String,
        required: true,
        index: true
    },
    date_naissance: {
        type: Date,
        required: true,
    },
    lieu_naissance: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    nationalite: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Pays",
    },
    etat_civil: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "EtatCivil",
    },
    sexe: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Sexe",
    },
    avatar: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    etudes_faites: [{
            date_debut: {
                type: Date,
                required: true,
            },
            date_fin: {
                type: Date,
                required: true,
            },
            etablissement: {
                type: String,
                required: true,
            },
            filiale: {
                type: String,
                required: true,
            },
            diplome_obtenu: {
                type: String,
                required: true,
            },
        }],
    experience_professionnelle: [{
            date_debut: {
                type: Date,
                required: true,
            },
            date_fin: {
                type: Date,
                required: true,
            },
            poste: {
                type: String,
                required: true,
            },
            entreprise: {
                type: String,
                required: true,
            },
            reference: [{
                    nom: {
                        type: String,
                        required: true
                    },
                    telephone: {
                        type: String,
                        required: true
                    }
                }],
        }],
    competences: [{
            type: String,
            required: true
        }],
    documents_joints: [{
            type: String,
            required: false
        }],
    motivation: {
        type: String,
        required: true
    },
    langue: [{
            nom: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: 'Langue'
            },
            parlee: {
                type: String,
                required: true,
                enum: ["Maternelle", "Intermediaire", "Moyen", "Avancé"]
            },
            ecrit: {
                type: String,
                required: true,
                enum: ["Bon", "Intermediaire", "Moyen", "Avancé"]
            }
        }],
});
exports.CandidatEntity = (0, mongoose_1.model)('Candidat', CandidatSchema);
//# sourceMappingURL=candidat.entity.js.map