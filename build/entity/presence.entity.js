"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceEntity = void 0;
const mongoose_1 = require("mongoose");
const PresenceSchema = new mongoose_1.Schema({
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        ref: 'Status'
    },
    date_heure_arriver: {
        type: Date,
        required: false
    },
    date_heure_depart: {
        type: Date,
        required: false
    },
    agent: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Agent'
    },
}, { timestamps: true });
exports.PresenceEntity = (0, mongoose_1.model)('Presence', PresenceSchema);
//# sourceMappingURL=presence.entity.js.map