import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { DepartementEntity } from "../entity/departement.entity";
import { AgentEntity } from "../entity/agent.entity";


export const AddDepartement: Handler = async (req: Request, res: Response) => {
  const { nom, departement_hierarchique, directeur, directeur_adjoint} = req.body;

  if (
    typeof nom === undefined ||
    nom === null ||
    !nom
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(directeur)) {
    return res.status(400).send({ errorMessage: "Id directeur non valide" });
  }

  const checkDirecteur = await AgentEntity.findById(directeur);

  if (!checkDirecteur) {
    return res.status(404).send({
      errorMessage: "Aucun directeur correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(directeur_adjoint)) {
    return res.status(400).send({ errorMessage: "Id directeur adjoint non valide" });
  }

  const checkDirecteurAdjoint = await AgentEntity.findById(directeur_adjoint);

  if (!checkDirecteurAdjoint) {
    return res.status(404).send({
      errorMessage: "Aucun directeur adjoint correspondant",
    });
  }

  const checkDepartement = await DepartementEntity.findOne({nom: nom.toUpperCase()})

  if(!checkDepartement){

    const departement = new DepartementEntity({
      nom: nom.toUpperCase(), 
      departement_hierarchique,
      directeur: checkDirecteur._id,
      directeur_adjoint: checkDirecteurAdjoint._id
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

  }else{
    return res.status(406).send({
      errorMessage: `Le département ${checkDepartement.nom} existe déjà!`,
    });
  }
};

export const GetDepartements: Handler = async (req: Request, res: Response) => {

  const departement = DepartementEntity.aggregate([
    
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
    res.status(200).send(departement);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errorMessage: "Une erreur est survenue, veuillez réessayer" });
  }
  
};

export const GetDepartementById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  const departement = DepartementEntity.aggregate([

    {
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: id }],
        },
      },
    },
    
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
    res.status(200).send(departement);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errorMessage: "Une erreur est survenue, veuillez réessayer" });
  }

  
};

export const UpdateDepartement: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (typeof update.nom === undefined || update.nom === null || !update.nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(update.directeur)) {
    return res.status(400).send({ errorMessage: "Id directeur non valide" });
  }

  const checkDirecteur = await AgentEntity.findById(update.directeur);

  if (!checkDirecteur) {
    return res.status(404).send({
      errorMessage: "Aucun directeur correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.directeur_adjoint)) {
    return res.status(400).send({ errorMessage: "Id directeur adjoint non valide" });
  }

  const checkDirecteurAdjoint = await AgentEntity.findById(update.directeur_adjoint);

  if (!checkDirecteurAdjoint) {
    return res.status(404).send({
      errorMessage: "Aucun directeur adjoint correspondant",
    });
  }

  await DepartementEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    departement: update.departement_hierarchique,
    directeur: checkDirecteur._id,
    directeur_adjoint: checkDirecteurAdjoint._id
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

export const DeleteDepartement: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await DepartementEntity.findByIdAndRemove(id)
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

/*
  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await DepartementEntity.find({statut_deleted: checkStatut.nom})
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

*/

/*
    await DepartementEntity.findById(id)
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


*/

