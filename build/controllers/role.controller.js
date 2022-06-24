"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRole = exports.UpdateRole = exports.GetRoleById = exports.GetRoles = exports.AddRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const access_entity_1 = require("../entity/access.entity");
const role_entity_1 = require("../entity/role.entity");
const status_entity_1 = require("../entity/status.entity");
const AddRole = async (req, res) => {
    const { nom, description, access } = req.body;
    if (typeof nom === undefined ||
        nom === null ||
        !nom ||
        typeof access === undefined ||
        access === null ||
        !access) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(access)) {
        return res.status(400).send({ errorMessage: "Id access non valide" });
    }
    const checkAccess = await access_entity_1.AccessEntity.findById(access);
    if (!checkAccess) {
        return res.status(404).send({
            errorMessage: "Aucun access correspondant",
        });
    }
    const checkRole = await role_entity_1.RoleEntity.findOne({ nom: nom.toUpperCase() });
    if (!checkRole) {
        const role = new role_entity_1.RoleEntity({
            nom: nom.toUpperCase(),
            description,
            access: checkAccess._id,
        });
        await role
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
            errorMessage: `Le role ${checkRole.nom} existe déjà!`,
        });
    }
};
exports.AddRole = AddRole;
const GetRoles = async (req, res) => {
    const checkStatut = await status_entity_1.StatusEntity.findOne({ nom: 'Displayed' });
    await role_entity_1.RoleEntity.find({ statut_deleted: checkStatut.nom })
        .then((role) => {
        if (!role) {
            return res.status(404).send({ errorMessage: "Aucun role trouvé" });
        }
        res.status(200).send(role);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetRoles = GetRoles;
const GetRoleById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await role_entity_1.RoleEntity.findById(id)
        .then((role) => {
        if (!role) {
            return res.status(404).send({ errorMessage: "Aucun role trouvé" });
        }
        res.status(200).send(role);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetRoleById = GetRoleById;
const UpdateRole = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined || update.nom === null || !update.nom
        || typeof update.access === undefined ||
        update.access === null || !update.access) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update.access)) {
        return res.status(400).send({ errorMessage: "Id access non valide" });
    }
    const checkAccess = await access_entity_1.AccessEntity.findById(update.access);
    if (!checkAccess) {
        return res.status(404).send({
            errorMessage: "Aucun access correspondant",
        });
    }
    await role_entity_1.RoleEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        description: update.description,
        access: checkAccess._id
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
exports.UpdateRole = UpdateRole;
const DeleteRole = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await role_entity_1.RoleEntity.findByIdAndRemove(id)
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
exports.DeleteRole = DeleteRole;
//# sourceMappingURL=role.controller.js.map