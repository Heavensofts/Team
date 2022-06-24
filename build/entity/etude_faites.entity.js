"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtudeFaitesEntity = void 0;
const mongoose_1 = require("mongoose");
const EtudeFaitesSchema = new mongoose_1.Schema({
    annee_debut: {
        type: Date,
        required: true
    },
    annee_fin: {
        type: Date,
        required: true
    },
    etablissement: {
        type: String,
        required: true
    },
    filiale: {
        type: String,
        required: true
    },
    diplome_obtenu: {
        type: String,
        required: true
    },
});
exports.EtudeFaitesEntity = (0, mongoose_1.model)('EtudeFaites', EtudeFaitesSchema);
//# sourceMappingURL=etude_faites.entity.js.map