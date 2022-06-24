"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDemande = exports.UpdateDemande = exports.GetDemandeById = exports.GetDemandes = exports.AddDemande = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const demande_entity_1 = require("../entity/demande.entity");
const type_demande_entity_1 = require("../entity/type_demande.entity");
const status_entity_1 = require("../entity/status.entity");
const agent_entity_1 = require("../entity/agent.entity");
const AddDemande = async (req, res) => {
    const { nom, agent, type_demande, description, documents } = req.body;
    if (typeof nom === undefined ||
        nom === null ||
        !nom ||
        typeof agent === undefined ||
        agent === null ||
        !agent ||
        typeof type_demande === undefined ||
        type_demande === null ||
        !type_demande ||
        typeof description === undefined ||
        description === null ||
        !description) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
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
    if (!mongoose_1.default.Types.ObjectId.isValid(type_demande)) {
        return res.status(400).send({ errorMessage: "Id type demande non valide" });
    }
    const checkTypeDemande = await type_demande_entity_1.TypeDemandeEntity.findById(type_demande);
    if (!checkTypeDemande) {
        return res.status(404).send({
            errorMessage: "Aucun type demande correspondant",
        });
    }
    let myDocPath = [];
    const myUser = req['user'];
    const demande = new demande_entity_1.DemandeEntity({
        nom: nom.toUpperCase(),
        agent: checkMatriculeAgent._id,
        type_demande: checkTypeDemande._id,
        description
    });
    await demande
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
exports.AddDemande = AddDemande;
const GetDemandes = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await demande_entity_1.DemandeEntity.find({ statut_deleted: checkStatut.nom })
        .populate({ path: "type_demande", select: "nom -_id" })
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((demande) => {
        if (!demande) {
            return res.status(404).send({ errorMessage: "Aucune demande trouvée" });
        }
        res.status(200).send(demande);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDemandes = GetDemandes;
const GetDemandeById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await demande_entity_1.DemandeEntity.findById(id)
        .populate({ path: "type_demande", select: "nom -_id" })
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((demande) => {
        if (!demande) {
            return res.status(404).send({ errorMessage: "Aucune demande trouvée" });
        }
        res.status(200).send(demande);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDemandeById = GetDemandeById;
const UpdateDemande = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined ||
        update.nom === null || !update.nom ||
        typeof update.agent === undefined ||
        update.agent === null || !update.agent ||
        typeof update.type_demande === undefined ||
        update.type_demande === null || !update.type_demande ||
        typeof update.description === undefined ||
        update.description === null || !update.description) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
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
    if (!mongoose_1.default.Types.ObjectId.isValid(update.type_demande)) {
        return res.status(400).send({ errorMessage: "Id type demande non valide" });
    }
    const checkTypeDemande = await type_demande_entity_1.TypeDemandeEntity.findById(update.type_demande);
    if (!checkTypeDemande) {
        return res.status(404).send({
            errorMessage: "Aucun type demande correspondant",
        });
    }
    await demande_entity_1.DemandeEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        agent: checkMatriculeAgent._id,
        type_demande: checkTypeDemande._id,
        description: update.description
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
exports.UpdateDemande = UpdateDemande;
const DeleteDemande = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await demande_entity_1.DemandeEntity.findByIdAndRemove(id)
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
exports.DeleteDemande = DeleteDemande;
//# sourceMappingURL=demande.controller.js.map