"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartementEntity = void 0;
const mongoose_1 = require("mongoose");
const DepartementSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true
    },
    directeur: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'Agent'
    },
    directeur_adjoint: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'Agent'
    },
    departement_hierarchique: {
        type: String,
        required: false
    },
});
exports.DepartementEntity = (0, mongoose_1.model)('Departement', DepartementSchema);
//# sourceMappingURL=departement.entity.js.map