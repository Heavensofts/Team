"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConge = exports.UpdateConge = exports.GetCongeById = exports.GetConges = exports.AddConge = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conge_entity_1 = require("../entity/conge.entity");
const agent_entity_1 = require("../entity/agent.entity");
const status_entity_1 = require("../entity/status.entity");
const type_conge_entity_1 = require("../entity/type_conge.entity");
const AddConge = async (req, res) => {
    const { date_debut, date_fin, status, type_conge, agent } = req.body;
    if (typeof date_debut === undefined ||
        typeof date_debut == null ||
        !date_debut ||
        typeof date_fin === undefined ||
        typeof date_fin == null ||
        !date_fin ||
        typeof status === undefined ||
        typeof status == null ||
        !status ||
        typeof type_conge === undefined ||
        typeof type_conge == null ||
        !type_conge ||
        typeof agent === undefined ||
        agent === null ||
        !agent) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(agent)) {
        return res.status(400).send({ errorMessage: "Id agent non valide" });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findById(agent);
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(type_conge)) {
        return res.status(400).send({ errorMessage: "Id type congé non valide" });
    }
    const checkTypeConge = await type_conge_entity_1.TypeCongeEntity.findById(type_conge);
    if (!checkTypeConge) {
        return res.status(404).send({
            errorMessage: "Type congé non correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(status)) {
        return res.status(400).send({ errorMessage: "Id status congé non valide" });
    }
    const checkStatusConge = await status_entity_1.StatusEntity.findById(status);
    if (!checkStatusConge) {
        return res.status(404).send({
            errorMessage: "status congé non correspondant",
        });
    }
    const conge = new conge_entity_1.CongeEntity({
        date_debut,
        date_fin,
        status: checkStatusConge._id,
        type_conge: checkTypeConge._id,
        agent: checkMatriculeAgent._id,
    });
    await conge
        .save()
        .then((result) => {
        res.status(200).send({ data: result, message: "Success" });
    })
        .catch((error) => {
        console.log(error.message);
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.AddConge = AddConge;
const GetConges = async (req, res) => {
    await conge_entity_1.CongeEntity.find()
        .populate({ path: "status", select: "nom -_id" })
        .populate({ path: "type_conge", select: "nom -_id" })
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((conge) => {
        if (!conge) {
            return res.status(404).send({ errorMessage: "Aucun congé trouvé" });
        }
        res.status(200).send(conge);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetConges = GetConges;
const GetCongeById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await conge_entity_1.CongeEntity.findById(id)
        .populate({ path: "status", select: "nom -_id" })
        .populate({ path: "type_conge", select: "nom -_id" })
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((conge) => {
        if (!conge) {
            return res.status(404).send({ errorMessage: "Aucun congé trouvé" });
        }
        res.status(200).send(conge);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetCongeById = GetCongeById;
const UpdateConge = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.date_debut === undefined ||
        typeof update.date_debut == null ||
        !update.date_debut ||
        typeof update.date_fin === undefined ||
        typeof update.date_fin == null ||
        !update.date_fin ||
        typeof update.status === undefined ||
        typeof update.status == null ||
        !update.status ||
        typeof update.type_conge === undefined ||
        typeof update.type_conge == null ||
        !update.type_conge ||
        typeof update.agent === undefined ||
        update.agent === null ||
        !update.agent) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.agent)) {
        return res.status(400).send({ errorMessage: "Id agent non valide" });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findById(update.agent);
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.type_conge)) {
        return res.status(400).send({ errorMessage: "Id type congé non valide" });
    }
    const checkTypeConge = await type_conge_entity_1.TypeCongeEntity.findById(update.type_conge);
    if (!checkTypeConge) {
        return res.status(404).send({
            errorMessage: "Type congé non correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.status)) {
        return res.status(400).send({ errorMessage: "Id status congé non valide" });
    }
    const checkStatusConge = await status_entity_1.StatusEntity.findById(update.status);
    if (!checkStatusConge) {
        return res.status(404).send({
            errorMessage: "status congé non correspondant",
        });
    }
    await conge_entity_1.CongeEntity.findByIdAndUpdate(id, {
        date_debut: update.date_debut,
        date_fin: update.date_fin,
        status: checkStatusConge._id,
        type_conge: checkTypeConge._id,
        agent: checkMatriculeAgent._id,
    })
        .then((result) => {
        if (!result) {
            return res
                .status(400)
                .send({ errorMessage: "Mise à jour non aboutie" });
        }
        return res.status(200).send({ message: "Mise à jour effectué" });
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite lors de la mise à jour ",
        });
    });
};
exports.UpdateConge = UpdateConge;
const DeleteConge = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await conge_entity_1.CongeEntity.findByIdAndRemove(id)
        .then((result) => {
        if (!result) {
            return res
                .status(400)
                .send({ errorMessage: "Suppression non aboutie" });
        }
        return res.status(200).send({ message: "Suppression effectué" });
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite lors de la suppression",
        });
    });
};
exports.DeleteConge = DeleteConge;
//# sourceMappingURL=conge.controller.js.map