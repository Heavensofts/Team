"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.AuthenticatedUser = exports.Login = void 0;
const agent_entity_1 = require("../entity/agent.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (typeof email === undefined || email === null || !email
            || typeof password === undefined || password === null || !password) {
            return res
                .status(400)
                .send({ errorMessage: "Veuillez remplir le champ requis" });
        }
        const user = await agent_entity_1.AgentEntity.findOne({ email });
        if (!user) {
            return res.status(404).send({
                errorMessage: "cet email n'existe pas",
            });
        }
        if (!(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).send({ message: "Invalid password!" });
        }
        const token = (0, jsonwebtoken_1.sign)({
            id: user._id,
            ...user,
        }, "secret");
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        res.status(200).send({
            message: "Success",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "An error occurred", erreur: error.message });
    }
};
exports.Login = Login;
const AuthenticatedUser = async (req, res) => {
    res.send({ user: req['user'] });
};
exports.AuthenticatedUser = AuthenticatedUser;
const Logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.send({
            message: "deconnexion réussie",
        });
    }
    catch (error) {
        return res.status(401).send({ errorMessage: "Une erreur s'est produit veuillez réessayer" });
    }
};
exports.Logout = Logout;
//# sourceMappingURL=auth.controller.js.map