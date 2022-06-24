"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLangue = exports.UpdateLangue = exports.GetLangueById = exports.GetLangues = exports.AddLangue = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const langue_entity_1 = require("../entity/langue.entity");
const AddLangue = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || typeof nom == null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    const checkLangue = await langue_entity_1.LangueEntity.findOne({ nom: nom.toUpperCase() });
    if (!checkLangue) {
        const langue = new langue_entity_1.LangueEntity({
            nom: nom.toUpperCase(),
            description
        });
        await langue
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
    }
    else {
        return res.status(400).send({
            errorMessage: "Cette langue existe déjà!",
        });
    }
};
exports.AddLangue = AddLangue;
const GetLangues = async (req, res) => {
    await langue_entity_1.LangueEntity.find()
        .then((langue) => {
        if (!langue) {
            return res.status(404).send({ errorMessage: "Aucune langue trouvée" });
        }
        res.status(200).send(langue);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetLangues = GetLangues;
const GetLangueById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await langue_entity_1.LangueEntity.findById(id)
        .then((langue) => {
        if (!langue) {
            return res.status(404).send({ errorMessage: "Aucune langue trouvée" });
        }
        res.status(200).send(langue);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetLangueById = GetLangueById;
const UpdateLangue = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined || typeof update.nom == null || !update.nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    const checkLangue = await langue_entity_1.LangueEntity.findOne({ nom: update.nom.toUpperCase() });
    if (!checkLangue) {
        await langue_entity_1.LangueEntity.findByIdAndUpdate(id, {
            nom: update.nom,
            description: update?.description
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
    }
    else {
        return res.status(400).send({
            errorMessage: "Cette langue existe déjà!",
        });
    }
};
exports.UpdateLangue = UpdateLangue;
const DeleteLangue = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await langue_entity_1.LangueEntity.findByIdAndRemove(id)
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
exports.DeleteLangue = DeleteLangue;
//# sourceMappingURL=langue.controller.js.map