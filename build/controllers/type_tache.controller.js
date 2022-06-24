"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTypeTache = exports.UpdateTypeTache = exports.GetTypeTacheById = exports.GetTypeTaches = exports.AddTypeTache = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_tache_entity_1 = require("../entity/type_tache.entity");
const status_entity_1 = require("../entity/status.entity");
const AddTypeTache = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checTypeTacheExist = await type_tache_entity_1.TypeTacheEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checTypeTacheExist) {
        const typeTache = new type_tache_entity_1.TypeTacheEntity({
            nom: nom.toUpperCase(),
            description,
        });
        await typeTache
            .save()
            .then((result) => {
            res.status(200).send({ data: result, message: "Success" });
        })
            .catch((error) => {
            console.log("error: ", error);
            return res.status(500).send({
                errorMessage: "Une erreur s'est produite, veuillez réessayer",
            });
        });
    }
    else {
        return res.status(406).send({ errorMessage: "Ce type tache a déjà été enregistré!" });
    }
};
exports.AddTypeTache = AddTypeTache;
const GetTypeTaches = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await type_tache_entity_1.TypeTacheEntity.find({ statut_deleted: checkStatut.nom })
        .then((typeTache) => {
        if (!typeTache) {
            return res.status(404).send({ errorMessage: "Aucun type tache trouvé" });
        }
        res.status(200).send(typeTache);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeTaches = GetTypeTaches;
const GetTypeTacheById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await type_tache_entity_1.TypeTacheEntity.findById(id)
        .then((typeTache) => {
        if (!typeTache) {
            return res.status(404).send({ errorMessage: "Aucun etat civil trouvé" });
        }
        res.status(200).send(typeTache);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetTypeTacheById = GetTypeTacheById;
const UpdateTypeTache = async (req, res) => {
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
    await type_tache_entity_1.TypeTacheEntity.findByIdAndUpdate(id, {
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
exports.UpdateTypeTache = UpdateTypeTache;
const DeleteTypeTache = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await type_tache_entity_1.TypeTacheEntity.findByIdAndRemove(id)
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
exports.DeleteTypeTache = DeleteTypeTache;
//# sourceMappingURL=type_tache.controller.js.map