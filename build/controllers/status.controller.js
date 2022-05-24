"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStatut = exports.UpdateStatut = exports.GetStatutById = exports.GetStatuts = exports.AddStatut = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const status_entity_1 = require("../entity/status.entity");
const AddStatut = async (req, res) => {
    const { statut, description } = req.body;
    if (typeof statut === undefined || statut === null || !statut) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    let nom = statut.slice(1);
    nom = nom.toLowerCase();
    nom = statut.charAt(0).toUpperCase() + statut.slice(1).toLowerCase();
    const checkStatutExist = await status_entity_1.StatusEntity.findOne({ nom });
    if (!checkStatutExist) {
        const myStatut = new status_entity_1.StatusEntity({
            nom,
            description,
            type_statut: 1
        });
        await myStatut
            .save()
            .then((result) => {
            res.status(200).send({ data: result, message: "Success" });
        })
            .catch((error) => {
            console.log("error: ", error);
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    else {
        return res
            .status(406)
            .send({ errorMessage: "Ce status existe déjà!" });
    }
};
exports.AddStatut = AddStatut;
const GetStatuts = async (req, res) => {
    await status_entity_1.StatusEntity.find({ type_statut: 1 })
        .then((statut) => {
        if (!statut) {
            return res.status(404).send({ errorMessage: "Aucun statut trouvé" });
        }
        res.status(200).send(statut);
    })
        .catch((error) => {
        console.log("error: ", error);
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetStatuts = GetStatuts;
const GetStatutById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "ID Invalide" });
    }
    await status_entity_1.StatusEntity.findById(id)
        .then((statut) => {
        if (!statut) {
            return res.status(404).send({ errorMessage: "Aucun statut trouvé" });
        }
        res.status(200).send(statut);
    })
        .catch((error) => {
        console.log("error: ", error);
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetStatutById = GetStatutById;
const UpdateStatut = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Catégorie non correspondante" });
    }
    if (typeof update.statut === undefined ||
        update.statut === null ||
        !update.statut) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir le champ requis" });
    }
    let nom = update.statut.slice(1);
    nom = nom.toLowerCase();
    nom =
        update.statut.charAt(0).toUpperCase() +
            update.statut.slice(1).toLowerCase();
    update.statut = nom;
    await status_entity_1.StatusEntity.findByIdAndUpdate(id, {
        nom: update.statut,
        description: update.description,
    })
        .then((result) => {
        if (!result) {
            return res
                .status(400)
                .send({ errorMessage: "Mise à jour non aboutie" });
        }
        return res.status(200).send({ message: "Mise à jour effectuée" });
    })
        .catch((error) => {
        console.log(error);
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite lors de la mise à jour ",
        });
    });
};
exports.UpdateStatut = UpdateStatut;
const DeleteStatut = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await status_entity_1.StatusEntity.findByIdAndRemove(id)
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
exports.DeleteStatut = DeleteStatut;
//# sourceMappingURL=status.controller.js.map