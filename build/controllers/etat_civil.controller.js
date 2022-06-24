"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEtatCivil = exports.UpdateEtatCivil = exports.GetEtatCivilById = exports.GetEtatCivils = exports.AddEtatCivil = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const etat_civil_entity_1 = require("../entity/etat_civil.entity");
const AddEtatCivil = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checEtatCivilExist = await etat_civil_entity_1.EtatCivilEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checEtatCivilExist) {
        const etatCivil = new etat_civil_entity_1.EtatCivilEntity({
            nom: nom.toUpperCase(),
            description
        });
        await etatCivil
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
        return res.status(406).send({ errorMessage: "Ce etat-civil a déjà été enregistré!" });
    }
};
exports.AddEtatCivil = AddEtatCivil;
const GetEtatCivils = async (req, res) => {
    await etat_civil_entity_1.EtatCivilEntity.find()
        .then((etat_civil) => {
        if (!etat_civil) {
            return res.status(404).send({ errorMessage: "Aucun état-civil trouvé" });
        }
        res.status(200).send(etat_civil);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetEtatCivils = GetEtatCivils;
const GetEtatCivilById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await etat_civil_entity_1.EtatCivilEntity.findById(id)
        .then((etatCivil) => {
        if (!etatCivil) {
            return res.status(404).send({ errorMessage: "Aucun etat civil trouvé" });
        }
        res.status(200).send(etatCivil);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetEtatCivilById = GetEtatCivilById;
const UpdateEtatCivil = async (req, res) => {
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
    await etat_civil_entity_1.EtatCivilEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        description: update?.description,
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
exports.UpdateEtatCivil = UpdateEtatCivil;
const DeleteEtatCivil = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await etat_civil_entity_1.EtatCivilEntity.findByIdAndRemove(id)
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
exports.DeleteEtatCivil = DeleteEtatCivil;
//# sourceMappingURL=etat_civil.controller.js.map