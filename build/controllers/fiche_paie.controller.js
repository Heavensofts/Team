"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFichePaie = exports.UpdateFichePaie = exports.GetFichePaieById = exports.GetFichePaies = exports.AddFichePaie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fiche_paie_entity_1 = require("../entity/fiche_paie.entity");
const agent_entity_1 = require("../entity/agent.entity");
const AddFichePaie = async (req, res) => {
    const { salaire_brut, salaire_net, cession_salaire, saisie_salaire, acompte, heure_supplementaire, remboursement, agent, prime, allocation_familiale, nombre_enfants, loyer, impot, cotisation_sociale, } = req.body;
    if (typeof salaire_brut === undefined || !salaire_brut
        || typeof salaire_net === undefined || !salaire_net
        || typeof cession_salaire === undefined || !cession_salaire
        || typeof saisie_salaire === undefined || !saisie_salaire
        || typeof acompte === undefined || !acompte
        || typeof heure_supplementaire === undefined || !heure_supplementaire
        || typeof remboursement === undefined || !remboursement
        || typeof prime === undefined || !prime
        || typeof allocation_familiale === undefined || allocation_familiale === null || !allocation_familiale
        || typeof agent === undefined || agent === null || !agent) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champs requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(agent)) {
        return res.status(400).send({ errorMessage: "Id agent non valide" });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findById(agent);
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    const fichePaie = new fiche_paie_entity_1.FichePaieEntity({
        salaire_brut,
        salaire_net,
        cession_salaire,
        saisie_salaire,
        acompte,
        heure_supplementaire,
        remboursement,
        prime,
        agent: checkMatriculeAgent._id,
        allocation_familiale,
        nombre_enfants,
        loyer,
        impot,
        cotisation_sociale,
    });
    await fichePaie
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
exports.AddFichePaie = AddFichePaie;
const GetFichePaies = async (req, res) => {
    await fiche_paie_entity_1.FichePaieEntity.find()
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((fichePaie) => {
        if (!fichePaie) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune fiche de paie trouvée" });
        }
        res.status(200).send(fichePaie);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetFichePaies = GetFichePaies;
const GetFichePaieById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await fiche_paie_entity_1.FichePaieEntity.findById(id)
        .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
        .then((fichePaie) => {
        if (!fichePaie) {
            return res
                .status(404)
                .send({ errorMessage: "Aucune fiche de paie trouvée" });
        }
        res.status(200).send(fichePaie);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetFichePaieById = GetFichePaieById;
const UpdateFichePaie = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.salaire_brut === undefined ||
        !update.salaire_brut ||
        typeof update.agent === undefined ||
        update.agent === null ||
        !update.agent ||
        typeof update.salaire_net === undefined ||
        !update.salaire_net ||
        typeof update.cession_salaire === undefined ||
        !update.cession_salaire ||
        typeof update.saisie_salaire === undefined ||
        !update.saisie_salaire ||
        typeof update.acompte === undefined ||
        !update.acompte ||
        typeof update.heure_supplementaire === undefined ||
        !update.heure_supplementaire ||
        typeof update.remboursement === undefined ||
        !update.remboursement ||
        typeof update.prime === undefined ||
        !update.prime ||
        typeof update.allocation_familiale === undefined ||
        update.allocation_familiale === null ||
        !update.allocation_familiale) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.agent)) {
        return res.status(400).send({ errorMessage: "Id agent non valide" });
    }
    const checkMatriculeAgent = await agent_entity_1.AgentEntity.findById(update.agent);
    if (!checkMatriculeAgent) {
        return res.status(404).send({
            errorMessage: "Aucun agent correspondant",
        });
    }
    await fiche_paie_entity_1.FichePaieEntity.findByIdAndUpdate(id, {
        salaire_brut: update.salaire_brut,
        salaire_net: update.salaire_net,
        cession_salaire: update.cession_salaire,
        saisie_salaire: update.saisie_salaire,
        acompte: update.acompte,
        heure_supplementaire: update.heure_supplementaire,
        remboursement: update.remboursement,
        prime: update.prime,
        agent: checkMatriculeAgent._id,
        allocation_familiale: update.allocation_familiale,
        nombre_enfants: update.nombre_enfants,
        loyer: update.loyer,
        impot: update.impot,
        cotisation_sociale: update.cotisation_sociale
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
exports.UpdateFichePaie = UpdateFichePaie;
const DeleteFichePaie = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id Invalid" });
    }
    await fiche_paie_entity_1.FichePaieEntity.findByIdAndRemove(id)
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
exports.DeleteFichePaie = DeleteFichePaie;
//# sourceMappingURL=fiche_paie.controller.js.map