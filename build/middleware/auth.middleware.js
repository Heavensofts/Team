"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const agent_entity_1 = require("../entity/agent.entity");
const AuthMiddleware = async (req, res, next) => {
    try {
        const jwt = req.cookies["jwt"];
        const payload = (0, jsonwebtoken_1.verify)(jwt, "secret");
        if (!payload) {
            return res.status(401).send({ message: "Unauthenticated" });
        }
        const user = await agent_entity_1.AgentEntity.findOne({ _id: payload.id });
        req["user"] = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ message: "token not provided" });
    }
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map