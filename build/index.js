"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const mongoose_1 = __importDefault(require("mongoose"));
const swaggerOptions_1 = require("./swaggerOptions");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
const routes_1 = __importDefault(require("./routes/routes"));
// DB Config
const mongoURI_1 = require("./config/mongoURI");
// Connect to MongoDB
mongoose_1.default
    .connect(mongoURI_1.db)
    .then(() => {
    console.log("MongoDB Connected");
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: "*",
        credentials: true,
    }));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use((0, express_fileupload_1.default)());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.use(routes_1.default);
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.listen(PORT, async () => {
        console.log(`I'm alive on port: ${PORT}`);
    });
})
    .catch((err) => {
    console.log("Error on mongodb: ", err);
});
//# sourceMappingURL=index.js.map