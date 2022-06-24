"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessEntity = void 0;
const mongoose_1 = require("mongoose");
const AccessSchema = new mongoose_1.Schema({
    type_access: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'TypeAccess'
        }],
    composants: [{
            type: String,
            required: true
        }],
    actions: [{
            type: String,
            required: true
        }],
}, { timestamps: true });
exports.AccessEntity = (0, mongoose_1.model)('Access', AccessSchema);
//# sourceMappingURL=access.entity.js.map