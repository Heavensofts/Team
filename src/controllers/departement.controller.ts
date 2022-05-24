import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { DepartementEntity } from "../entity/departement.entity";
import { StatusEntity } from "../entity/status.entity";

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

  let checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  if (!checkStatut) {

    const myStatut = new StatusEntity({
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

  let checkStatut2 = await StatusEntity.findOne({nom: 'No-displayed'});
  if(!checkStatut2){
    const myStatut = new StatusEntity({
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

  const checkDepartement = await DepartementEntity.findOne({nom: nom.toUpperCase()})

  if(!checkDepartement){

    const departement = new DepartementEntity({
      nom: nom.toUpperCase(), 
      departement_hierarchique,
      directeur,
      directeur_adjoint,
      statut_deleted: checkStatut.nom
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
};

export const GetDepartementById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

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

  await DepartementEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    departement: update.departement_hierarchique,
    directeur: update?.directeur,
    directeur_adjoint: update?.directeur_adjoint
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