"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = void 0;
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    access: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Access'
    },
}, { timestamps: true });
exports.RoleEntity = (0, mongoose_1.model)('Role', RoleSchema);
//# sourceMappingURL=role.entity.js.map