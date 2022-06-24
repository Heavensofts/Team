"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCandidat = exports.UpdateCandidat = exports.GetCandidatById = exports.GetCandidats = exports.AddCandidat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const genre_entity_1 = require("../entity/genre.entity");
const candidat_entity_1 = require("../entity/candidat.entity");
const status_entity_1 = require("../entity/status.entity");
const pays_entity_1 = require("../entity/pays.entity");
const etat_civil_entity_1 = require("../entity/etat_civil.entity");
const AddCandidat = async (req, res) => {
    const { nom, postnom, prenom, date_naissance, lieu_naissance, telephone, nationalite, etat_civil, sexe, avatar, email, date_debut_etude, date_fin_etude, etablissement, filiale, diplome_obtenu, date_debut_exp, date_fin_exp, poste, entreprise, reference, competences, motivation, langue, parlee, ecrit, nom_ref, telephone_ref } = req.body;
    if (typeof nom === undefined ||
        typeof nom == null ||
        !nom ||
        typeof prenom === undefined ||
        typeof prenom == null ||
        !prenom ||
        typeof date_naissance === undefined ||
        typeof date_naissance == null ||
        !date_naissance ||
        typeof lieu_naissance === undefined ||
        typeof lieu_naissance == null ||
        !lieu_naissance ||
        typeof telephone === undefined ||
        telephone === null ||
        !telephone ||
        typeof nationalite === undefined ||
        nationalite === null ||
        !nationalite ||
        typeof etat_civil === undefined ||
        etat_civil === null ||
        !etat_civil ||
        typeof sexe === undefined ||
        sexe === null ||
        !sexe ||
        typeof email === undefined ||
        email === null ||
        !email ||
        typeof date_debut_etude === undefined ||
        date_debut_etude === null ||
        !date_debut_etude ||
        typeof date_fin_etude === undefined ||
        date_fin_etude === null ||
        !date_fin_etude ||
        typeof etablissement === undefined ||
        etablissement === null ||
        !etablissement ||
        typeof filiale === undefined ||
        filiale === null ||
        !filiale ||
        typeof diplome_obtenu === undefined ||
        diplome_obtenu === null ||
        !diplome_obtenu ||
        typeof date_debut_exp === undefined ||
        date_debut_exp === null ||
        !date_debut_exp ||
        typeof date_fin_exp === undefined ||
        date_fin_exp === null ||
        !date_fin_exp ||
        typeof poste === undefined ||
        poste === null ||
        !poste ||
        typeof entreprise === undefined ||
        entreprise === null ||
        !entreprise ||
        typeof competences === undefined ||
        competences === null ||
        !competences ||
        typeof motivation === undefined ||
        motivation === null ||
        !motivation ||
        typeof langue === undefined ||
        langue === null ||
        !langue ||
        typeof parlee === undefined ||
        parlee === null ||
        !parlee ||
        typeof ecrit === undefined ||
        ecrit === null ||
        !ecrit ||
        typeof nom_ref === undefined ||
        nom_ref === null ||
        !nom_ref ||
        typeof telephone_ref === undefined ||
        telephone_ref === null ||
        !telephone_ref) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(etat_civil)) {
        return res.status(400).send({ errorMessage: "Id Etat-civil non valide" });
    }
    const checkEtatCivil = await etat_civil_entity_1.EtatCivilEntity.findById(etat_civil);
    if (!checkEtatCivil) {
        return res.status(404).send({
            errorMessage: "Aucun etat-civil correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(nationalite)) {
        return res.status(400).send({ errorMessage: "Id nationalité non valide" });
    }
    const checkPays = await pays_entity_1.PaysEntity.findById(nationalite);
    if (!checkPays) {
        return res.status(404).send({
            errorMessage: "Aucun pays correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(sexe)) {
        return res.status(400).send({ errorMessage: "Id sexe non valide" });
    }
    const checkSexe = await genre_entity_1.GenreEntity.findById(sexe);
    if (!checkSexe) {
        return res.status(404).send({
            errorMessage: "Aucun sexe correspondant",
        });
    }
    const maLangue = [{
            nom: langue,
            parlee,
            ecrit
        }];
    const mesReference = [{
            nom: nom_ref,
            telephone: telephone_ref
        }];
    const monExperience = [{
            date_debut: date_debut_exp,
            date_fin: date_fin_exp,
            poste,
            entreprise,
            reference: mesReference
        }];
    const mesEtudes = [{
            date_debut: date_debut_etude,
            date_fin: date_fin_etude,
            etablissement,
            filiale,
            diplome_obtenu
        }];
    const candidat = new candidat_entity_1.CandidatEntity({
        nom,
        postnom,
        prenom,
        date_naissance,
        lieu_naissance,
        telephone,
        nationalite: checkPays._id,
        etat_civil: checkEtatCivil._id,
        sexe: checkSexe._id,
        email,
        etudes_faites: mesEtudes,
        experience_professionnelle: monExperience,
        competences,
        motivation,
        langue: maLangue,
    });
    await candidat
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
exports.AddCandidat = AddCandidat;
const GetCandidats = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await candidat_entity_1.CandidatEntity.find({ statut_deleted: checkStatut.nom })
        .then((candidat) => {
        if (!candidat) {
            return res.status(404).send({ errorMessage: "Aucun candidat trouvé" });
        }
        res.status(200).send(candidat);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetCandidats = GetCandidats;
const GetCandidatById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await candidat_entity_1.CandidatEntity.findById(id)
        .then((candidat) => {
        if (!candidat) {
            return res.status(404).send({ errorMessage: "Aucun congé trouvé" });
        }
        res.status(200).send(candidat);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetCandidatById = GetCandidatById;
const UpdateCandidat = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined ||
        typeof update.nom == null ||
        !update.nom ||
        typeof update.prenom === undefined ||
        typeof update.prenom == null ||
        !update.prenom ||
        typeof update.date_naissance === undefined ||
        typeof update.date_naissance == null ||
        !update.date_naissance ||
        typeof update.lieu_naissance === undefined ||
        typeof update.lieu_naissance == null ||
        !update.lieu_naissance ||
        typeof update.telephone === undefined ||
        update.telephone === null ||
        !update.telephone ||
        typeof update.nationalite === undefined ||
        update.nationalite === null ||
        !update.nationalite ||
        typeof update.etat_civil === undefined ||
        update.etat_civil === null ||
        !update.etat_civil ||
        typeof update.sexe === undefined ||
        update.sexe === null ||
        !update.sexe ||
        typeof update.email === undefined ||
        update.email === null ||
        !update.email ||
        typeof update.date_debut_etude === undefined ||
        update.date_debut_etude === null ||
        !update.date_debut_etude ||
        typeof update.date_fin_etude === undefined ||
        update.date_fin_etude === null ||
        !update.date_fin_etude ||
        typeof update.etablissement === undefined ||
        update.etablissement === null ||
        !update.etablissement ||
        typeof update.filiale === undefined ||
        update.filiale === null ||
        !update.filiale ||
        typeof update.diplome_obtenu === undefined ||
        update.diplome_obtenu === null ||
        !update.diplome_obtenu ||
        typeof update.date_debut_exp === undefined ||
        update.date_debut_exp === null ||
        !update.date_debut_exp ||
        typeof update.date_fin_exp === undefined ||
        update.date_fin_exp === null ||
        !update.date_fin_exp ||
        typeof update.poste === undefined ||
        update.poste === null ||
        !update.poste ||
        typeof update.entreprise === undefined ||
        update.entreprise === null ||
        !update.entreprise ||
        typeof update.competences === undefined ||
        update.competences === null ||
        !update.competences ||
        typeof update.motivation === undefined ||
        update.motivation === null ||
        !update.motivation ||
        typeof update.langue === undefined ||
        update.langue === null ||
        !update.langue ||
        typeof update.parlee === undefined ||
        update.parlee === null ||
        !update.parlee ||
        typeof update.ecrit === undefined ||
        update.ecrit === null ||
        !update.ecrit ||
        typeof update.nom_ref === undefined ||
        update.nom_ref === null ||
        !update.nom_ref ||
        typeof update.telephone_ref === undefined ||
        update.telephone_ref === null ||
        !update.telephone_ref) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.etat_civil)) {
        return res.status(400).send({ errorMessage: "Id Etat  civil non valide" });
    }
    const checkEtatCivil = await etat_civil_entity_1.EtatCivilEntity.findById(update.etat_civil);
    if (!checkEtatCivil) {
        return res.status(404).send({
            errorMessage: "Aucun etat-civil correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.nationalite)) {
        return res.status(400).send({ errorMessage: "Id nationalité non valide" });
    }
    const checkPays = await pays_entity_1.PaysEntity.findById(update.nationalite);
    if (!checkPays) {
        return res.status(404).send({
            errorMessage: "Aucun pays correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.sexe)) {
        return res.status(400).send({ errorMessage: "Id sexe non valide" });
    }
    const checkSexe = await genre_entity_1.GenreEntity.findById(update.sexe);
    if (!checkSexe) {
        return res.status(404).send({
            errorMessage: "Aucun sexe correspondant",
        });
    }
    const maLangue = [{
            nom: update.langue,
            parlee: update.parlee,
            ecrit: update.ecrit
        }];
    const mesReference = [{
            nom: update.nom_ref,
            telephone: update.telephone_ref
        }];
    const monExperience = [{
            date_debut: update.date_debut_exp,
            date_fin: update.date_fin_exp,
            poste: update.poste,
            entreprise: update.entreprise,
            reference: mesReference
        }];
    const mesEtudes = [{
            date_debut: update.date_debut_etude,
            date_fin: update.date_fin_etude,
            etablissement: update.etablissement,
            filiale: update.filiale,
            diplome_obtenu: update.diplome_obtenu
        }];
    await candidat_entity_1.CandidatEntity.findByIdAndUpdate(id, {
        nom: update.nom,
        postnom: update.postnom,
        prenom: update.prenom,
        date_naissance: update.date_naissance,
        lieu_naissance: update.lieu_naissance,
        telephone: update.telephone,
        nationalite: checkPays._id,
        etat_civil: checkEtatCivil._id,
        sexe: checkSexe._id,
        email: update.email,
        etudes_faites: mesEtudes,
        experience_professionnelle: monExperience,
        competences: update.competences,
        motivation: update.motivation,
        langue: maLangue
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
exports.UpdateCandidat = UpdateCandidat;
const DeleteCandidat = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await candidat_entity_1.CandidatEntity.findByIdAndRemove(id)
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
exports.DeleteCandidat = DeleteCandidat;
//# sourceMappingURL=candidat.controller.js.map