"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDepartement = exports.UpdateDepartement = exports.GetDepartementById = exports.GetDepartements = exports.AddDepartement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const departement_entity_1 = require("../entity/departement.entity");
const agent_entity_1 = require("../entity/agent.entity");
const AddDepartement = async (req, res) => {
    const { nom, departement_hierarchique, directeur, directeur_adjoint } = req.body;
    if (typeof nom === undefined ||
        nom === null ||
        !nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    // if (!mongoose.Types.ObjectId.isValid(directeur)) {
    //   return res.status(400).send({ errorMessage: "Id directeur non valide" });
    // }
    // const checkDirecteur = await AgentEntity.findById(directeur);
    // if (!checkDirecteur) {
    //   return res.status(404).send({
    //     errorMessage: "Aucun directeur correspondant",
    //   });
    // }
    // if (!mongoose.Types.ObjectId.isValid(directeur_adjoint)) {
    //   return res.status(400).send({ errorMessage: "Id directeur adjoint non valide" });
    // }
    // const checkDirecteurAdjoint = await AgentEntity.findById(directeur_adjoint);
    // if (!checkDirecteurAdjoint) {
    //   return res.status(404).send({
    //     errorMessage: "Aucun directeur adjoint correspondant",
    //   });
    // }
    const checkDepartement = await departement_entity_1.DepartementEntity.findOne({ nom: nom.toUpperCase() });
    if (!checkDepartement) {
        const departement = new departement_entity_1.DepartementEntity({
            nom: nom.toUpperCase(),
            departement_hierarchique,
            // directeur: checkDirecteur._id,
            // directeur_adjoint: checkDirecteurAdjoint._id
        });
        await departement
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
            errorMessage: `Le département ${checkDepartement.nom} existe déjà!`,
        });
    }
};
exports.AddDepartement = AddDepartement;
const GetDepartements = async (req, res) => {
    await departement_entity_1.DepartementEntity.find()
        .then((departement) => {
        if (!departement) {
            return res.status(404).send({ errorMessage: "Aucun département trouvé" });
        }
        res.status(200).send(departement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDepartements = GetDepartements;
const GetDepartementById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorMessage: "Id invalid" });
    }
    await departement_entity_1.DepartementEntity.findById(id)
        .then((departement) => {
        if (!departement) {
            return res.status(404).send({ errorMessage: "Aucun département trouvé" });
        }
        res.status(200).send(departement);
    })
        .catch((error) => {
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    });
};
exports.GetDepartementById = GetDepartementById;
const UpdateDepartement = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    if (typeof update.nom === undefined || update.nom === null || !update.nom) {
        return res
            .status(400)
            .send({ errorMessage: "Veuillez remplir les champ requis" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update?.directeur)) {
        return res.status(400).send({ errorMessage: "Id directeur non valide" });
    }
    const checkDirecteur = await agent_entity_1.AgentEntity.findById(update?.directeur);
    if (!checkDirecteur) {
        return res.status(404).send({
            errorMessage: "Aucun directeur correspondant",
        });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(update?.directeur_adjoint)) {
        return res.status(400).send({ errorMessage: "Id directeur adjoint non valide" });
    }
    const checkDirecteurAdjoint = await agent_entity_1.AgentEntity.findById(update?.directeur_adjoint);
    if (!checkDirecteurAdjoint) {
        return res.status(404).send({
            errorMessage: "Aucun directeur adjoint correspondant",
        });
    }
    await departement_entity_1.DepartementEntity.findByIdAndUpdate(id, {
        nom: update.nom.toUpperCase(),
        departement: update.departement_hierarchique,
        directeur: checkDirecteur?._id,
        directeur_adjoint: checkDirecteurAdjoint?._id
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
exports.UpdateDepartement = UpdateDepartement;
const DeleteDepartement = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .send({ errorMessage: "Id Invalid" });
    }
    await departement_entity_1.DepartementEntity.findByIdAndRemove(id)
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
exports.DeleteDepartement = DeleteDepartement;
/*

  

*/
/*
    


*/
/*

    const departement = await DepartementEntity.aggregate([
    
    {
      $lookup: {
        from: "agents",
        localField: "directeur",
        foreignField: "_id",
        as: "directeur",
      },
    },

    {
      $lookup: {
        from: "agents",
        localField: "directeur_adjoint",
        foreignField: "_id",
        as: "directeur_adjoint",
      },
    },

    {
      $lookup: {
        from: "postes",
        localField: "_id",
        foreignField: "departement",
        as: "poste",
      },
    },

    {
      $project:{
        _id: 1,
        nom: "$nom",
        directeur: "$directeur",
        directeur_adjoint: "$directeur_adjoint",
        departement_hierarchique: "$departement_hierarchique",
        postes: "$poste",
        numOfPostes: {
          $size:{
            $filter: {
              input: "$poste",
              as: "postes",
              cond: {
                $eq: [
                    "$$postes.departement",
                    { $toObjectId: "$_id"}
                ]
                  
              },
            },
          }
        }
      }
    }

  ])

  try {
    console.log("Mon département: ", departement)
    res.status(200).send(departement);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errorMessage: "Une erreur est survenue, veuillez réessayer" });
  }

*/
//# sourceMappingURL=departement.controller.js.map