"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreEntity = void 0;
const mongoose_1 = require("mongoose");
const GenreSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });
exports.GenreEntity = (0, mongoose_1.model)('Genre', GenreSchema);
//# sourceMappingURL=genre.entity.js.map