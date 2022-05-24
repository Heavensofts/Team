"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePoste = exports.UpdatePoste = exports.GetPosteById = exports.GetPostes = exports.AddPoste = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const departement_entity_1 = require("../entity/departement.entity");
const poste_entity_1 = require("../entity/poste.entity");
const role_entity_1 = require("../entity/role.entity");
const status_entity_1 = require("../entity/status.entity");
const AddPoste = async (req, res) => {
    const { nom, poste_hierarchique, disponibilite_poste, departement, role } = req.body;
    if (typeof nom === undefined || nom === null || !nom ||
        typeof poste_hierarchique === undefined || poste_hierarchique === null ||
        !poste_hierarchique || typeof departement === undefined || departement === null ||
        !departement || typeof role === undefined || role === null || !role
        || typeof disponibilite_poste === undefined || disponibilite_poste === null || !disponibilite_poste) {
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
    const checkRole = await role_entity_1.RoleEntity.findOne({ nom: role.toUpperCase() });
    if (!checkRole) {
        return res.status(404).send({
            errorMessage: "Aucun role correspondant",
        });
    }
    const checkDepartement = await departement_entity_1.DepartementEntity.findOne({ nom: departement.toUpperCase() });
    if (!checkDepartement) {
        return res.status(404).send({
            errorMessage: "Aucun departement correspondant pour ce poste",
        });
    }
    const checkPoste = await poste_entity_1.PosteEntity.findOne({ nom: nom.toUpperCase() });
    if (!checkPoste) {
        const poste = new poste_entity_1.PosteEntity({
            nom: nom.toUpperCase(),
            poste_hierarchique,
            departement: checkDepartement.nom,
            role: checkRole.nom,
            disponibilite_poste,
            statut_deleted: checkStatut.nom
        });
        await poste
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
            errorMessage: `Le poste ${checkPoste.nom} existe déjà!`,
        });
    }
};
exports.AddPoste = AddPoste;
const GetPostes = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await poste_entity_1.PosteEntity.find({ statut_deleted: checkStatut.nom })
        .then((poste) => {
        if (!poste) {
            return res.status(404).send({ errorMessage: "Aucun poste trouvé" });
        }
        res.status(200).send(poste);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetPostes = GetPostes;
const GetPosteById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await poste_entity_1.PosteEntity.findById(id)
        .then((poste) => {
        if (!poste) {
            return res.status(404).send({ errorMessage: "Aucun poste trouvé" });
        }
        res.status(200).send(poste);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetPosteById = GetPosteById;
const UpdatePoste = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined || update.nom === null || !update.nom ||
        typeof update.poste_hierarchique === undefined || update.poste_hierarchique === null ||
        !update.poste_hierarchique || typeof update.departement === undefined || update.departement === null ||
        !update.departement || typeof update.role === undefined || update.role === null || !update.role
        || typeof update.disponibilite_poste === undefined || update.disponibilite_poste === null || !update.disponibilite_poste) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkRole = await role_entity_1.RoleEntity.findOne({ nom: update.role.toUpperCase() });
    if (!checkRole) {
        return res.status(404).send({
            errorMessage: "Aucun role correspondant",
        });
    }
    const checkDepartement = await departement_entity_1.DepartementEntity.findOne({ nom: update.departement.toUpperCase() });
    if (!checkDepartement) {
        return res.status(404).send({
            errorMessage: "Aucun departement correspondant pour ce poste",
        });
    }
    await poste_entity_1.PosteEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        poste_hierarchique: update.poste_hierarchique,
        role: checkRole.nom,
        departement: checkDepartement.nom,
        job_description: update?.job_description,
        disponibilite_poste: update.disponibilite_poste,
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
exports.UpdatePoste = UpdatePoste;
const DeletePoste = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await poste_entity_1.PosteEntity.findByIdAndRemove(id)
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
exports.DeletePoste = DeletePoste;
//# sourceMappingURL=poste.controller.js.map