"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTypeConge = exports.UpdateTypeConge = exports.GetTypeCongeById = exports.GetTypeConges = exports.AddTypeConge = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_conge_entity_1 = require("../entity/type_conge.entity");
const AddTypeConge = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checTypeCongeExist = await type_conge_entity_1.TypeCongeEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checTypeCongeExist) {
        const typeTache = new type_conge_entity_1.TypeCongeEntity({
            nom: nom.toUpperCase(),
            description
        });
        await typeTache
            .save()
            .then((result) => {
            res.status(200).send({ data: result, message: "Success" });
        })
            .catch((error) => {
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    else {
        return res.status(406).send({ errorMessage: "Ce type congé a déjà été enregistré!" });
    }
};
exports.AddTypeConge = AddTypeConge;
const GetTypeConges = async (req, res) => {
    await type_conge_entity_1.TypeCongeEntity.find()
        .then((typeConge) => {
        if (!typeConge) {
            return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
        }
        res.status(200).send(typeConge);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeConges = GetTypeConges;
const GetTypeCongeById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await type_conge_entity_1.TypeCongeEntity.findById(id)
        .then((typeconge) => {
        if (!typeconge) {
            return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
        }
        res.status(200).send(typeconge);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeCongeById = GetTypeCongeById;
const UpdateTypeConge = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom.toUpperCase() === undefined ||
        update.nom.toUpperCase() === null ||
        !update.nom.toUpperCase()) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir le champ requis" });
    }
    await type_conge_entity_1.TypeCongeEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        description: update.description,
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
exports.UpdateTypeConge = UpdateTypeConge;
const DeleteTypeConge = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await type_conge_entity_1.TypeCongeEntity.findByIdAndRemove(id)
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
exports.DeleteTypeConge = DeleteTypeConge;
//# sourceMappingURL=type_conge.controller.js.map