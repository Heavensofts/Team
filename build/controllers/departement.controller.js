"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDepartement = exports.UpdateDepartement = exports.GetDepartementById = exports.GetDepartements = exports.AddDepartement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const departement_entity_1 = require("../entity/departement.entity");
const status_entity_1 = require("../entity/status.entity");
const AddDepartement = async (req, res) => {
    const { nom, departement_hierarchique, directeur, directeur_adjoint } = req.body;
    if (typeof nom === undefined ||
        nom === null ||
        !nom) {
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
    const checkDepartement = await departement_entity_1.DepartementEntity.findOne({ nom: nom.toUpperCase() });
    if (!checkDepartement) {
        const departement = new departement_entity_1.DepartementEntity({
            nom: nom.toUpperCase(),
            departement_hierarchique,
            directeur,
            directeur_adjoint,
            statut_deleted: checkStatut.nom
        });
        await departement
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
        return res.status(406).send({
            errorMessage: `Le département ${checkDepartement.nom} existe déjà!`,
        });
    }
};
exports.AddDepartement = AddDepartement;
const GetDepartements = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await departement_entity_1.DepartementEntity.find({ statut_deleted: checkStatut.nom })
        .then((departement) => {
        if (!departement) {
            return res.status(404).send({ errorMessage: "Aucun département trouvé" });
        }
        res.status(200).send(departement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDepartements = GetDepartements;
const GetDepartementById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await departement_entity_1.DepartementEntity.findById(id)
        .then((departement) => {
        if (!departement) {
            return res.status(404).send({ errorMessage: "Aucun département trouvé" });
        }
        res.status(200).send(departement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDepartementById = GetDepartementById;
const UpdateDepartement = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined || update.nom === null || !update.nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    await departement_entity_1.DepartementEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        departement: update.departement_hierarchique,
        directeur: update?.directeur,
        directeur_adjoint: update?.directeur_adjoint
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
exports.UpdateDepartement = UpdateDepartement;
const DeleteDepartement = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await departement_entity_1.DepartementEntity.findByIdAndRemove(id)
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
exports.DeleteDepartement = DeleteDepartement;
//# sourceMappingURL=departement.controller.js.map