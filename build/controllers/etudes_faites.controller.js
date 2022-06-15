"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEtudeFaites = exports.UpdateEtudeFaites = exports.GetEtudeFaitesById = exports.GetEtudeFaites = exports.AddEtudeFaites = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const etude_faites_entity_1 = require("../entity/etude_faites.entity");
const status_entity_1 = require("../entity/status.entity");
const AddEtudeFaites = async (req, res) => {
    const { annee_debut, annee_fin, etablissement, filiale, diplome_obtenu } = req.body;
    if (typeof annee_debut === undefined ||
        annee_debut === null ||
        !annee_debut ||
        typeof annee_fin === undefined ||
        annee_fin === null ||
        !annee_fin ||
        typeof etablissement === undefined ||
        etablissement === null ||
        !etablissement ||
        typeof filiale === undefined ||
        filiale === null ||
        !filiale ||
        typeof diplome_obtenu === undefined ||
        diplome_obtenu === null ||
        !diplome_obtenu) {
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
    const etudeFaites = new etude_faites_entity_1.EtudeFaitesEntity({
        annee_debut: annee_debut,
        annee_fin: annee_fin,
        etablissement,
        filiale,
        diplome_obtenu,
        statut_deleted: checkStatut.nom,
    });
    await etudeFaites
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
exports.AddEtudeFaites = AddEtudeFaites;
const GetEtudeFaites = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await etude_faites_entity_1.EtudeFaitesEntity.find({ statut_deleted: checkStatut.nom })
        .then((etudeFaites) => {
        if (!etudeFaites) {
            return res.status(404).send({ errorMessage: "Aucune étude faites trouvé" });
        }
        res.status(200).send(etudeFaites);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetEtudeFaites = GetEtudeFaites;
const GetEtudeFaitesById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await etude_faites_entity_1.EtudeFaitesEntity.findById(id)
        .then((etudeFaites) => {
        if (!etudeFaites) {
            return res.status(404).send({ errorMessage: "Aucune étude faites trouvée" });
        }
        res.status(200).send(etudeFaites);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetEtudeFaitesById = GetEtudeFaitesById;
const UpdateEtudeFaites = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.annee_debut === undefined ||
        update.annee_debut === null ||
        !update.annee_debut ||
        typeof update.annee_fin === undefined ||
        update.annee_fin === null ||
        !update.annee_fin ||
        typeof update.etablissement === undefined ||
        update.etablissement === null ||
        !update.etablissement ||
        typeof update.filiale === undefined ||
        update.filiale === null ||
        !update.filiale ||
        typeof update.diplome_obtenu === undefined ||
        update.diplome_obtenu === null ||
        !update.diplome_obtenu) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    await etude_faites_entity_1.EtudeFaitesEntity.findByIdAndUpdate(id, {
        annee_debut: new Date(update.annee_debut).getFullYear(),
        annee_fin: new Date(update.annee_fin).getFullYear(),
        etablissement: update.etablissement,
        filiale: update.filiale,
        diplome_obtenu: update.diplome_obtenu
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
exports.UpdateEtudeFaites = UpdateEtudeFaites;
const DeleteEtudeFaites = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await etude_faites_entity_1.EtudeFaitesEntity.findByIdAndRemove(id)
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
exports.DeleteEtudeFaites = DeleteEtudeFaites;
//# sourceMappingURL=etudes_faites.controller.js.map