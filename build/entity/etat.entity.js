"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtatEntity = void 0;
const mongoose_1 = require("mongoose");
const EtatSchema = new mongoose_1.Schema({
    justification: {
        raison: {
            type: String,
            required: false
        }
    },
    documents: [{
            type: String,
            required: false
        }],
    status: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Status'
    }
}, { timestamps: true });
exports.EtatEntity = (0, mongoose_1.model)('Etat', EtatSchema);
//# sourceMappingURL=etat.entity.js.map