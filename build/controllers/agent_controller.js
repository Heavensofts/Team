"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAgent = exports.UpdateAgent = exports.GetAgentById = exports.GetAgents = exports.AddAgent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const agent_entity_1 = require("../entity/agent.entity");
const etat_civil_entity_1 = require("../entity/etat_civil.entity");
const genre_entity_1 = require("../entity/genre.entity");
const niveau_etude_entity_1 = require("../entity/niveau_etude.entity");
const pays_entity_1 = require("../entity/pays.entity");
const poste_entity_1 = require("../entity/poste.entity");
const status_entity_1 = require("../entity/status.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AddAgent = async (req, res) => {
    const { matricule, nom, postnom, prenom, date_naissance, lieu_naissance, telephone, nationalite, poste, etat_civil, status_syndical, sexe, niveau_etude, avatar, email, adresse, password } = req.body;
    if (typeof matricule === undefined ||
        matricule === null ||
        !matricule ||
        typeof nom === undefined ||
        nom === null ||
        !nom ||
        typeof prenom === undefined ||
        prenom === null ||
        !prenom ||
        typeof date_naissance === undefined ||
        date_naissance === null ||
        !date_naissance ||
        typeof lieu_naissance === undefined ||
        lieu_naissance === null ||
        !lieu_naissance ||
        typeof telephone === undefined ||
        telephone === null ||
        !telephone ||
        typeof nationalite === undefined ||
        nationalite === null ||
        !nationalite ||
        typeof poste === undefined ||
        poste === null ||
        !poste ||
        typeof etat_civil === undefined ||
        etat_civil === null ||
        !etat_civil ||
        typeof status_syndical === undefined ||
        status_syndical === null ||
        !status_syndical ||
        typeof sexe === undefined ||
        sexe === null ||
        !sexe ||
        typeof niveau_etude === undefined ||
        niveau_etude === null ||
        !niveau_etude ||
        typeof email === undefined ||
        email === null ||
        !email ||
        typeof password === undefined ||
        password === null ||
        !password ||
        !adresse) {
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
            console.log(error.message);
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
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    const checkEtatCivil = await etat_civil_entity_1.EtatCivilEntity.findOne({
        nom: etat_civil.toUpperCase(),
    });
    if (!checkEtatCivil) {
        return res.status(404).send({
            errorMessage: "Aucun etat-civil correspondant",
        });
    }
    const checkPays = await pays_entity_1.PaysEntity.findOne({ nom: nationalite });
    if (!checkPays) {
        return res.status(404).send({
            errorMessage: "Aucun pays correspondant",
        });
    }
    const checkPoste = await poste_entity_1.PosteEntity.findOne({ nom: poste.toUpperCase() });
    if (!checkPoste) {
        return res.status(404).send({
            errorMessage: "Aucun poste correspondant",
        });
    }
    const checkSexe = await genre_entity_1.GenreEntity.findOne({ nom: sexe.toUpperCase() });
    if (!checkSexe) {
        return res.status(404).send({
            errorMessage: "Aucun sexe correspondant",
        });
    }
    const checkNiveauEtude = await niveau_etude_entity_1.NiveauEtudeEntity.findOne({
        nom: niveau_etude.toUpperCase(),
    });
    if (!checkNiveauEtude) {
        return res.status(404).send({
            errorMessage: "Aucun niveau d'étude correspondant",
        });
    }
    const checkAgentExiste = await agent_entity_1.AgentEntity.findOne({
        matricule,
        nom,
        prenom,
        date_naissance,
    });
    const pass = await bcryptjs_1.default.hash(password, 12);
    if (!checkAgentExiste) {
        const agent = new agent_entity_1.AgentEntity({
            matricule,
            nom,
            postnom,
            prenom,
            date_naissance,
            lieu_naissance,
            telephone,
            nationalite: checkPays.nom,
            poste: checkPoste.nom,
            etat_civil: checkEtatCivil.nom,
            status_syndical,
            sexe: checkSexe.nom,
            niveau_etude: checkNiveauEtude.nom,
            email,
            adresse,
            password: pass,
            statut_deleted: checkStatut.nom,
        });
        await agent
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
            errorMessage: `L'agent ${checkAgentExiste.nom} existe déjà!`,
        });
    }
};
exports.AddAgent = AddAgent;
const GetAgents = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await agent_entity_1.AgentEntity.find({ statut_deleted: checkStatut.nom })
        .then((agent) => {
        if (!agent) {
            return res.status(404).send({ errorMessage: "Aucun angent trouvé" });
        }
        res.status(200).send(agent);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetAgents = GetAgents;
const GetAgentById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await agent_entity_1.AgentEntity.findById(id)
        .then((agent) => {
        if (!agent) {
            return res.status(404).send({ errorMessage: "Aucun angent trouvé" });
        }
        res.status(200).send(agent);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetAgentById = GetAgentById;
const UpdateAgent = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.matricule === undefined ||
        update.matricule === null ||
        !update.matricule ||
        typeof update.nom === undefined ||
        update.nom === null ||
        !update.nom ||
        typeof update.prenom === undefined ||
        update.prenom === null ||
        !update.prenom ||
        typeof update.date_naissance === undefined ||
        update.date_naissance === null ||
        !update.date_naissance ||
        typeof update.lieu_naissance === undefined ||
        update.lieu_naissance === null ||
        !update.lieu_naissance ||
        typeof update.telephone === undefined ||
        update.telephone === null ||
        !update.telephone ||
        typeof update.nationalite === undefined ||
        update.nationalite === null ||
        !update.nationalite ||
        typeof update.poste === undefined ||
        update.poste === null ||
        !update.poste ||
        typeof update.etat_civil === undefined ||
        update.etat_civil === null ||
        !update.etat_civil ||
        typeof update.status_syndical === undefined ||
        update.status_syndical === null ||
        !update.status_syndical ||
        typeof update.sexe === undefined ||
        update.sexe === null ||
        !update.sexe ||
        typeof update.niveau_etude === undefined ||
        update.niveau_etude === null ||
        !update.niveau_etude ||
        typeof update.email === undefined ||
        update.email === null ||
        !update.email ||
        !update.adresse) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkEtatCivil = await etat_civil_entity_1.EtatCivilEntity.findOne({
        nom: update.etat_civil.toUpperCase(),
    });
    if (!checkEtatCivil) {
        return res.status(404).send({
            errorMessage: "Aucun etat-civil correspondant",
        });
    }
    const checkPays = await pays_entity_1.PaysEntity.findOne({ nom: update.nationalite });
    if (!checkPays) {
        return res.status(404).send({
            errorMessage: "Aucun pays correspondant",
        });
    }
    const checkPoste = await poste_entity_1.PosteEntity.findOne({
        nom: update.poste.toUpperCase(),
    });
    if (!checkPoste) {
        return res.status(404).send({
            errorMessage: "Aucun poste correspondant",
        });
    }
    const checkSexe = await genre_entity_1.GenreEntity.findOne({
        nom: update.sexe.toUpperCase(),
    });
    if (!checkSexe) {
        return res.status(404).send({
            errorMessage: "Aucun sexe correspondant",
        });
    }
    const checkNiveauEtude = await niveau_etude_entity_1.NiveauEtudeEntity.findOne({
        nom: update.niveau_etude.toUpperCase(),
    });
    if (!checkNiveauEtude) {
        return res.status(404).send({
            errorMessage: "Aucun niveau d'étude correspondant",
        });
    }
    await agent_entity_1.AgentEntity.findByIdAndUpdate(id, {
        matricule: update.matricule,
        nom: update.nom,
        postnom: update.postnom,
        prenom: update.prenom,
        date_naissance: update.date_naissance,
        lieu_naissance: update.lieu_naissance,
        telephone: update.telephone,
        nationalite: checkPays.nom,
        poste: checkPoste.nom,
        etat_civil: checkEtatCivil.nom,
        status_syndical: update.status_syndical,
        sexe: checkSexe.nom,
        niveau_etude: checkNiveauEtude.nom,
        email: update.email,
        adresse: update.adresse,
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
exports.UpdateAgent = UpdateAgent;
const DeleteAgent = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await agent_entity_1.AgentEntity.findByIdAndRemove(id)
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
exports.DeleteAgent = DeleteAgent;
//# sourceMappingURL=agent_controller.js.map