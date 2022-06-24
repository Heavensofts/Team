"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGenre = exports.UpdateGenre = exports.GetGenreById = exports.GetGenres = exports.AddGenre = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const genre_entity_1 = require("../entity/genre.entity");
const AddGenre = async (req, res) => {
    const { nom, description } = req.body;
    if (typeof nom === undefined || nom === null || !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    const checkSexeExist = await genre_entity_1.GenreEntity.findOne({
        nom: nom.toUpperCase(),
    });
    if (!checkSexeExist) {
        const sexe = new genre_entity_1.GenreEntity({
            nom: nom.toUpperCase(),
            description,
        });
        await sexe
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
        return res.status(406).send({ errorMessage: "Ce genre a déjà été enregistré!" });
    }
};
exports.AddGenre = AddGenre;
const GetGenres = async (req, res) => {
    await genre_entity_1.GenreEntity.find()
        .then((genre) => {
        if (!genre) {
            return res.status(404).send({ errorMessage: "Aucun genre trouvé" });
        }
        res.status(200).send(genre);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetGenres = GetGenres;
const GetGenreById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await genre_entity_1.GenreEntity.findById(id)
        .then((sexe) => {
        if (!sexe) {
            return res.status(404).send({ errorMessage: "Aucun genre trouvé" });
        }
        res.status(200).send(sexe);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetGenreById = GetGenreById;
const UpdateGenre = async (req, res) => {
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
    await genre_entity_1.GenreEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        description: update?.description,
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
exports.UpdateGenre = UpdateGenre;
const DeleteGenre = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await genre_entity_1.GenreEntity.findByIdAndRemove(id)
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
exports.DeleteGenre = DeleteGenre;
//# sourceMappingURL=genre.controller.js.map