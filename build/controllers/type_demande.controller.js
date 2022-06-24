"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTypeDemande = exports.UpdateTypeDemande = exports.GetTypeDemandeById = exports.GetTypeDemandes = exports.AddTypeDemande = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_demande_entity_1 = require("../entity/type_demande.entity");
const status_entity_1 = require("../entity/status.entity");
const AddTypeDemande = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checTypeDemandeExist = await type_demande_entity_1.TypeDemandeEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checTypeDemandeExist) {
        const typeContrat = new type_demande_entity_1.TypeDemandeEntity({
            nom: nom.toUpperCase(),
            description,
        });
        await typeContrat
            .save()
            .then((result) => {
            res.status(200).send({ data: result, message: "Success" });
        })
            .catch((error) => {
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    else {
        return res.status(406).send({ errorMessage: "Ce type demande a déjà été enregistré!" });
    }
};
exports.AddTypeDemande = AddTypeDemande;
const GetTypeDemandes = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await type_demande_entity_1.TypeDemandeEntity.find({ statut_deleted: checkStatut.nom })
        .then((typeDemande) => {
        if (!typeDemande) {
            return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
        }
        res.status(200).send(typeDemande);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeDemandes = GetTypeDemandes;
const GetTypeDemandeById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await type_demande_entity_1.TypeDemandeEntity.findById(id)
        .then((typeDemande) => {
        if (!typeDemande) {
            return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
        }
        res.status(200).send(typeDemande);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeDemandeById = GetTypeDemandeById;
const UpdateTypeDemande = async (req, res) => {
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
    await type_demande_entity_1.TypeDemandeEntity.findByIdAndUpdate(id, {
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
exports.UpdateTypeDemande = UpdateTypeDemande;
const DeleteTypeDemande = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await type_demande_entity_1.TypeDemandeEntity.findByIdAndRemove(id)
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
exports.DeleteTypeDemande = DeleteTypeDemande;
//# sourceMappingURL=type_demande.controller.js.map