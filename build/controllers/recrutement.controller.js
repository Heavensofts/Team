"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecrutement = exports.UpdateRecrutement = exports.GetRecrutementById = exports.GetRecrutements = exports.AddRecrutement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recrutement_entity_1 = require("../entity/recrutement.entity");
const agent_entity_1 = require("../entity/agent.entity");
const status_entity_1 = require("../entity/status.entity");
const candidat_entity_1 = require("../entity/candidat.entity");
const poste_entity_1 = require("../entity/poste.entity");
const type_contrat_entity_1 = require("../entity/type_contrat.entity");
const AddRecrutement = async (req, res) => {
    const { job_description, type_contrat, candidat, debut_recrutement, fin_recrutement, poste, recruteur, nombre_poste, } = req.body;
    if (typeof job_description === undefined ||
        typeof job_description == null ||
        !job_description ||
        typeof type_contrat === undefined ||
        typeof type_contrat == null ||
        !type_contrat ||
        typeof candidat === undefined ||
        typeof candidat == null ||
        !candidat ||
        typeof debut_recrutement === undefined ||
        typeof debut_recrutement == null ||
        !debut_recrutement ||
        typeof fin_recrutement === undefined ||
        fin_recrutement === null ||
        !fin_recrutement ||
        typeof poste === undefined ||
        poste === null ||
        !poste ||
        typeof recruteur === undefined ||
        recruteur === null ||
        !recruteur ||
        typeof nombre_poste === undefined) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
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
    var myCand = [];
    candidat.map(async (c) => {
        let cand = await candidat_entity_1.CandidatEntity.findById(c);
        if (!cand) {
            return res.status(404).send({
                errorMessage: "Aucun candidat correspondant",
            });
        }
        myCand.push(cand._id);
    });
    if (myCand.length === 0) {
        return res.status(404).send({
            errorMessage: "Aucun candidat correspondant",
        });
    }
    let myRecruteur = [];
    recruteur.map(async (r) => {
        let recru = await agent_entity_1.AgentEntity.findById(r);
        if (!recru) {
            return res.status(404).send({
                errorMessage: "Aucun recruteur correspondant",
            });
        }
        myRecruteur.push(recru._id);
    });
    if (myRecruteur.length === 0) {
        return res.status(404).send({
            errorMessage: "Aucun recruteur correspondant",
        });
    }
    let myTypeContrat = [];
    type_contrat.map(async (con) => {
        let type_con = await type_contrat_entity_1.TypeContratEntity.findById(con);
        console.log("My type contrat: ", type_con);
        if (!type_con) {
            return res.status(404).send({
                errorMessage: "Aucun type contrat correspondant",
            });
        }
        myTypeContrat.push(type_con._id);
    });
    if (myTypeContrat.length === 0) {
        return res.status(404).send({
            errorMessage: "Aucun type contrat correspondant",
        });
    }
    const checkPoste = await poste_entity_1.PosteEntity.findOne({
        nom: poste.toUpperCase(),
    });
    if (!checkPoste) {
        return res.status(404).send({
            errorMessage: "poste non correspondant",
        });
    }
    const recrutement = new recrutement_entity_1.RecrutementEntity({
        job_description,
        debut_recrutement,
        fin_recrutement,
        nombre_poste,
        poste: checkPoste.nom,
        type_contrat: myTypeContrat,
        candidat: myCand,
        recruteur: myRecruteur,
        statut_deleted: checkStatut.nom
    });
    await recrutement
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
exports.AddRecrutement = AddRecrutement;
const GetRecrutements = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: "Displayed" });
    await recrutement_entity_1.RecrutementEntity.find({ statut_deleted: checkStatut.nom })
        .then((recrutement) => {
        if (!recrutement) {
            return res.status(404).send({ errorMessage: "Aucun recrutement trouvé" });
        }
        res.status(200).send(recrutement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetRecrutements = GetRecrutements;
const GetRecrutementById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await recrutement_entity_1.RecrutementEntity.findById(id)
        .then((recrutement) => {
        if (!recrutement) {
            return res.status(404).send({ errorMessage: "Aucun recrutement trouvé" });
        }
        res.status(200).send(recrutement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetRecrutementById = GetRecrutementById;
const UpdateRecrutement = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.job_description === undefined ||
        typeof update.job_description == null ||
        !update.job_description ||
        typeof update.type_contrat === undefined ||
        typeof update.type_contrat == null ||
        !update.type_contrat ||
        typeof update.candidat === undefined ||
        typeof update.candidat == null ||
        !update.candidat ||
        typeof update.debut_recrutement === undefined ||
        typeof update.debut_recrutement == null ||
        !update.debut_recrutement ||
        typeof update.fin_recrutement === undefined ||
        update.fin_recrutement === null ||
        !update.fin_recrutement ||
        typeof update.poste === undefined ||
        update.poste === null ||
        !update.poste ||
        typeof update.recruteur === undefined ||
        update.recruteur === null ||
        !update.recruteur ||
        typeof update.nombre_poste === undefined) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    var myCand = [];
    update.candidat.map(async (c) => {
        let cand = await candidat_entity_1.CandidatEntity.findById(c);
        if (!cand) {
            return res.status(404).send({
                errorMessage: "Aucun candidat correspondant",
            });
        }
        myCand.push(cand._id);
    });
    let myRecruteur = [];
    update.recruteur.map(async (r) => {
        let recru = await agent_entity_1.AgentEntity.findById(r);
        if (!recru) {
            return res.status(404).send({
                errorMessage: "Aucun recruteur correspondant",
            });
        }
        myRecruteur.push(recru._id);
    });
    let myTypeContrat = [];
    update.type_contrat.map(async (con) => {
        let type_con = await agent_entity_1.AgentEntity.findById(con);
        if (!type_con) {
            return res.status(404).send({
                errorMessage: "Aucun type contrat correspondant",
            });
        }
        myTypeContrat.push(type_con._id);
    });
    const checkPoste = await poste_entity_1.PosteEntity.findOne({
        nom: update.poste.toUpperCase(),
    });
    if (!checkPoste) {
        return res.status(404).send({
            errorMessage: "poste non correspondant",
        });
    }
    await recrutement_entity_1.RecrutementEntity.findByIdAndUpdate(id, {
        job_description: update.job_description,
        debut_recrutement: update.debut_recrutement,
        fin_recrutement: update.fin_recrutement,
        nombre_poste: update.nombre_poste,
        poste: checkPoste.nom,
        type_contrat: myTypeContrat,
        candidat: myCand,
        recruteur: myRecruteur
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
exports.UpdateRecrutement = UpdateRecrutement;
const DeleteRecrutement = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await recrutement_entity_1.RecrutementEntity.findByIdAndRemove(id)
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
exports.DeleteRecrutement = DeleteRecrutement;
//# sourceMappingURL=recrutement.controller.js.map