"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNoteFrais = exports.UpdateNoteFrais = exports.GetNoteFraisById = exports.GetNoteFrais = exports.AddNoteFrais = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_frais_entity_1 = require("../entity/note_frais.entity");
const agent_entity_1 = require("../entity/agent.entity");
const status_entity_1 = require("../entity/status.entity");
const AddNoteFrais = async (req, res) => {
    const { intitule_mission, agent, date_debut_mission, date_fin_mission, devise, frais_mission } = req.body;
    if (typeof intitule_mission === undefined ||
        intitule_mission === null ||
        !intitule_mission ||
        typeof agent === undefined ||
        agent === null ||
        !agent ||
        typeof date_debut_mission === undefined ||
        date_debut_mission === null ||
        !date_debut_mission ||
        typeof date_fin_mission === undefined ||
        date_fin_mission === null ||
        !date_fin_mission ||
        typeof frais_mission === undefined ||
        frais_mission === null ||
        !frais_mission ||
        typeof devise === undefined ||
        devise === null ||
        !devise) {
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
    if (!checkStatut) {
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
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findOne({ matricule: agent });
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    const noteFrais = new note_frais_entity_1.NoteFraisEntity({
        intitule_mission,
        agent: checkMatriculeAgent.matricule,
        date_debut_mission,
        date_fin_mission,
        devise,
        frais_mission,
        statut_deleted: checkStatut.nom,
    });
    await noteFrais
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
exports.AddNoteFrais = AddNoteFrais;
const GetNoteFrais = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await note_frais_entity_1.NoteFraisEntity.find({ statut_deleted: checkStatut.nom })
        .then((noteFrais) => {
        if (!noteFrais) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune note de frais trouvée" });
        }
        res.status(200).send(noteFrais);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetNoteFrais = GetNoteFrais;
const GetNoteFraisById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await note_frais_entity_1.NoteFraisEntity.findById(id)
        .then((noteFrais) => {
        if (!noteFrais) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune note de frais trouvée" });
        }
        res.status(200).send(noteFrais);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetNoteFraisById = GetNoteFraisById;
const UpdateNoteFrais = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.intitule_mission === undefined ||
        update.intitule_mission === null ||
        !update.intitule_mission ||
        typeof update.agent === undefined ||
        update.agent === null ||
        !update.agent ||
        typeof update.date_debut_mission === undefined ||
        update.date_debut_mission === null ||
        !update.date_debut_mission ||
        typeof update.date_fin_mission === undefined ||
        update.date_fin_mission === null ||
        !update.date_fin_mission ||
        typeof update.frais_mission === undefined ||
        update.frais_mission === null ||
        !update.frais_mission ||
        typeof update.devise === undefined ||
        update.devise === null ||
        !update.devise) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findOne({
        matricule: update.agent,
    });
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    await note_frais_entity_1.NoteFraisEntity.findByIdAndUpdate(id, {
        intitule_mission: update.intitule_mission,
        agent: checkMatriculeAgent.matricule,
        date_debut_mission: update.date_debut_mission,
        date_fin_mission: update.date_fin_mission,
        frais_mission: update.frais_mission,
        devise: update.devise,
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
exports.UpdateNoteFrais = UpdateNoteFrais;
const DeleteNoteFrais = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await note_frais_entity_1.NoteFraisEntity.findByIdAndRemove(id)
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
exports.DeleteNoteFrais = DeleteNoteFrais;
//# sourceMappingURL=note_frais.controller.js.map