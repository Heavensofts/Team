"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExperience = exports.UpdateExperience = exports.GetExperienceById = exports.GetExperiences = exports.AddExperience = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const experience_professionnelle_entity_1 = require("../entity/experience_professionnelle.entity");
const AddExperience = async (req, res) => {
    const { date_debut, date_fin, poste, entreprise, reference, taches } = req.body;
    if (typeof date_debut === undefined ||
        date_debut === null ||
        !date_debut ||
        typeof date_fin === undefined ||
        date_fin === null ||
        !date_fin ||
        typeof poste === undefined ||
        poste === null ||
        !poste ||
        typeof entreprise === undefined ||
        entreprise === null ||
        !entreprise ||
        typeof reference === undefined ||
        reference === null ||
        !reference ||
        typeof taches === undefined ||
        taches === null ||
        !taches) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const experience = new experience_professionnelle_entity_1.ExperienceProfessionnelleEntity({
        date_debut,
        date_fin,
        poste,
        entreprise,
        reference,
        taches,
    });
    await experience
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
exports.AddExperience = AddExperience;
const GetExperiences = async (req, res) => {
    await experience_professionnelle_entity_1.ExperienceProfessionnelleEntity.find()
        .then((experience) => {
        if (!experience) {
            return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
        }
        res.status(200).send(experience);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetExperiences = GetExperiences;
const GetExperienceById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await experience_professionnelle_entity_1.ExperienceProfessionnelleEntity.findById(id)
        .then((experience) => {
        if (!experience) {
            return res.status(404).send({ errorMessage: "Aucune expérience trouvée" });
        }
        res.status(200).send(experience);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetExperienceById = GetExperienceById;
const UpdateExperience = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.date_debut === undefined ||
        update.date_debut === null ||
        !update.date_debut ||
        typeof update.date_fin === undefined ||
        update.date_fin === null ||
        !update.date_fin ||
        typeof update.poste === undefined ||
        update.poste === null ||
        !update.poste ||
        typeof update.entreprise === undefined ||
        update.entreprise === null ||
        !update.entreprise ||
        typeof update.reference === undefined ||
        update.reference === null ||
        !update.reference ||
        typeof update.taches === undefined ||
        update.taches === null ||
        !update.taches) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    await experience_professionnelle_entity_1.ExperienceProfessionnelleEntity.findByIdAndUpdate(id, update)
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
exports.UpdateExperience = UpdateExperience;
const DeleteExperience = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await experience_professionnelle_entity_1.ExperienceProfessionnelleEntity.findByIdAndRemove(id)
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
exports.DeleteExperience = DeleteExperience;
//# sourceMappingURL=experience_professionnelle.controller.js.map