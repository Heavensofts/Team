"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongeEntity = void 0;
const mongoose_1 = require("mongoose");
const CongeSchema = new mongoose_1.Schema({
    type_conge: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'TypeConge'
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Status'
    },
    agent: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Agent'
    },
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
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
exports.CongeEntity = (0, mongoose_1.model)('Conge', CongeSchema);
//# sourceMappingURL=conge.entity.js.map