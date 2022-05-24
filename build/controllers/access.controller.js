"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccess = exports.UpdateAccess = exports.GetAccessById = exports.GetAccess = exports.AddAccess = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const access_entity_1 = require("../entity/access.entity");
const status_entity_1 = require("../entity/status.entity");
const type_access_entity_1 = require("../entity/type_access.entity");
const AddAccess = async (req, res) => {
    const { type_access, composants, actions } = req.body;
    if (typeof type_access === undefined ||
        type_access === null ||
        !type_access ||
        typeof composants === undefined ||
        composants === null ||
        !composants ||
        typeof actions === undefined ||
        actions === null ||
        !actions) {
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
    const checkTypeAccess = await type_access_entity_1.TypeAccessEntity.findOne({ ...type_access });
    console.log("My check access: ", checkTypeAccess);
    if (!checkTypeAccess) {
        return res.status(404).send({
            errorMessage: "Aucun type d'accès correspondant",
        });
    }
    const access = new access_entity_1.AccessEntity({
        type_access,
        composants,
        actions,
        statut_deleted: checkStatut.nom,
    });
    await access
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
exports.AddAccess = AddAccess;
const GetAccess = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await access_entity_1.AccessEntity.find({ statut_deleted: checkStatut.nom })
        .then((access) => {
        if (!access) {
            return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
        }
        res.status(200).send(access);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetAccess = GetAccess;
const GetAccessById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await access_entity_1.AccessEntity.findById(id)
        .then((typeDemande) => {
        if (!typeDemande) {
            return res.status(404).send({ errorMessage: "Aucun access trouvé" });
        }
        res.status(200).send(typeDemande);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetAccessById = GetAccessById;
const UpdateAccess = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.type_access === undefined ||
        update.type_access === null ||
        !update.type_access ||
        typeof update.composants === undefined ||
        update.composants === null ||
        !update.composants ||
        typeof update.actions === undefined ||
        update.actions === null ||
        !update.actions) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkTypeAccess = await type_access_entity_1.TypeAccessEntity.findOne({ ...update.type_access });
    console.log("My check access: ", checkTypeAccess);
    if (!checkTypeAccess) {
        return res.status(404).send({
            errorMessage: "Aucun type d'accès correspondant",
        });
    }
    await access_entity_1.AccessEntity.findByIdAndUpdate(id, update)
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
exports.UpdateAccess = UpdateAccess;
const DeleteAccess = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await access_entity_1.AccessEntity.findByIdAndRemove(id)
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
exports.DeleteAccess = DeleteAccess;
//# sourceMappingURL=access.controller.js.map