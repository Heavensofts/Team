"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTypeContrat = exports.UpdateTypeContrat = exports.GetTypeContratById = exports.GetTypeContrats = exports.AddTypeContrat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_contrat_entity_1 = require("../entity/type_contrat.entity");
const status_entity_1 = require("../entity/status.entity");
const AddTypeContrat = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checTypeContratExist = await type_contrat_entity_1.TypeContratEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checTypeContratExist) {
        const typeContrat = new type_contrat_entity_1.TypeContratEntity({
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
        return res.status(406).send({ errorMessage: "Ce type contrat a déjà été enregistré!" });
    }
};
exports.AddTypeContrat = AddTypeContrat;
const GetTypeContrats = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await type_contrat_entity_1.TypeContratEntity.find({ statut_deleted: checkStatut.nom })
        .then((typeContrat) => {
        if (!typeContrat) {
            return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
        }
        res.status(200).send(typeContrat);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeContrats = GetTypeContrats;
const GetTypeContratById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await type_contrat_entity_1.TypeContratEntity.findById(id)
        .then((typeContrat) => {
        if (!typeContrat) {
            return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
        }
        res.status(200).send(typeContrat);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeContratById = GetTypeContratById;
const UpdateTypeContrat = async (req, res) => {
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
    await type_contrat_entity_1.TypeContratEntity.findByIdAndUpdate(id, {
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
exports.UpdateTypeContrat = UpdateTypeContrat;
const DeleteTypeContrat = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await type_contrat_entity_1.TypeContratEntity.findByIdAndRemove(id)
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
exports.DeleteTypeContrat = DeleteTypeContrat;
//# sourceMappingURL=type_contrat.controller.js.map