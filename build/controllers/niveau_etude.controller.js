"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNiveauEtude = exports.UpdateNiveauEtude = exports.GetNiveauById = exports.GetNiveauEtudes = exports.AddNiveauEtude = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const niveau_etude_entity_1 = require("../entity/niveau_etude.entity");
const status_entity_1 = require("../entity/status.entity");
const AddNiveauEtude = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
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
    const checkNiveauEtudeExist = await niveau_etude_entity_1.NiveauEtudeEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checkNiveauEtudeExist) {
        const niveauEtude = new niveau_etude_entity_1.NiveauEtudeEntity({
            nom: nom.toUpperCase(),
            description,
            statut_deleted: checkStatut.nom
        });
        await niveauEtude
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
        return res.status(406).send({ errorMessage: "Ce niveau d'étude a déjà été enregistré!" });
    }
};
exports.AddNiveauEtude = AddNiveauEtude;
const GetNiveauEtudes = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await niveau_etude_entity_1.NiveauEtudeEntity.find({ statut_deleted: checkStatut.nom })
        .then((niveau_etude) => {
        if (!niveau_etude) {
            return res.status(404).send({ errorMessage: "Aucun niveau d'étude trouvé" });
        }
        res.status(200).send(niveau_etude);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetNiveauEtudes = GetNiveauEtudes;
const GetNiveauById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await niveau_etude_entity_1.NiveauEtudeEntity.findById(id)
        .then((sexe) => {
        if (!sexe) {
            return res.status(404).send({ errorMessage: "Aucun niveau d'étude trouvé" });
        }
        res.status(200).send(sexe);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetNiveauById = GetNiveauById;
const UpdateNiveauEtude = async (req, res) => {
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
    await niveau_etude_entity_1.NiveauEtudeEntity.findByIdAndUpdate(id, {
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
exports.UpdateNiveauEtude = UpdateNiveauEtude;
const DeleteNiveauEtude = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await niveau_etude_entity_1.NiveauEtudeEntity.findByIdAndRemove(id)
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
exports.DeleteNiveauEtude = DeleteNiveauEtude;
//# sourceMappingURL=niveau_etude.controller.js.map