"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePresence = exports.UpdatePresence = exports.GetPresenceById = exports.GetPresences = exports.AddPresence = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const presence_entity_1 = require("../entity/presence.entity");
const agent_entity_1 = require("../entity/agent.entity");
const status_entity_1 = require("../entity/status.entity");
const AddPresence = async (req, res) => {
    const { status, agent, date_heure_arriver, date_heure_depart } = req.body;
    if (typeof status === undefined || status === null || !status
        || typeof agent === undefined || agent === null || !agent) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    let checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    if (!checkStatut) {
        const myStatut = new status_entity_1.StatusEntity({
            nom: 'Displayed', description: "Le statut qui rend les éléments visibles", type_statut: 0
        });
        await myStatut.save().then((result) => {
            checkStatut = result;
        }).catch((error) => {
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    let checkStatut2 = await status_entity_1.StatusEntity.findOne({ nom: 'No-displayed' });
    if (!checkStatut2) {
        const myStatut = new status_entity_1.StatusEntity({
            nom: 'No-displayed',
            description: "Le statut qui rend les éléments invisibles",
            type_statut: 0
        });
        await myStatut.save().then((result) => {
            checkStatut = result;
        }).catch((error) => {
            console.log(error.message);
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    const checkStatusPresence = await status_entity_1.StatusEntity.findOne({ nom: status });
    if (!checkStatusPresence) {
        return res.status(404).send({
            errorMessage: "Aucun statut présence correspondant",
        });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findOne({ matricule: agent });
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    const presence = new presence_entity_1.PresenceEntity({
        status: checkStatusPresence.nom,
        agent: checkMatriculeAgent.matricule,
        date_heure_arriver,
        date_heure_depart,
        statut_deleted: checkStatut.nom,
    });
    await presence
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
exports.AddPresence = AddPresence;
const GetPresences = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await presence_entity_1.PresenceEntity.find({ statut_deleted: checkStatut.nom })
        .then((presence) => {
        if (!presence) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune présence trouvée" });
        }
        res.status(200).send(presence);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetPresences = GetPresences;
const GetPresenceById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await presence_entity_1.PresenceEntity.findById(id)
        .then((noteFrais) => {
        if (!noteFrais) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune présence trouvée" });
        }
        res.status(200).send(noteFrais);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetPresenceById = GetPresenceById;
const UpdatePresence = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.status === undefined || update.status === null || !update.status
        || typeof update.agent === undefined || update.agent === null || !update.agent) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    if (!checkStatut) {
        return res.status(404).send({
            errorMessage: "Aucun statut correspondant",
        });
    }
    const checkStatusPresence = await status_entity_1.StatusEntity.findOne({ nom: update.status });
    if (!checkStatusPresence) {
        return res.status(404).send({
            errorMessage: "Aucun statut présence correspondant",
        });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findOne({ matricule: update.agent });
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    await presence_entity_1.PresenceEntity.findByIdAndUpdate(id, {
        status: checkStatusPresence.nom,
        agent: checkMatriculeAgent.matricule,
        date_heure_arriver: update.date_heure_arriver,
        date_heure_depart: update.date_heure_depart
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
exports.UpdatePresence = UpdatePresence;
const DeletePresence = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await presence_entity_1.PresenceEntity.findByIdAndRemove(id)
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
exports.DeletePresence = DeletePresence;
//# sourceMappingURL=presence.controller.js.map