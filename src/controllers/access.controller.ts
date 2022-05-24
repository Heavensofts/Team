import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { AccessEntity } from "../entity/access.entity";
import { StatusEntity } from "../entity/status.entity";
import { TypeAccessEntity } from "../entity/type_access.entity";

export const AddAccess: Handler = async (req: Request, res: Response) => {
  const { type_access, composants, actions } = req.body;

  if (
    typeof type_access === undefined ||
    type_access === null ||
    !type_access ||
    typeof composants === undefined ||
    composants === null ||
    !composants ||
    typeof actions === undefined ||
    actions === null ||
    !actions
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

  const checkTypeAccess = await TypeAccessEntity.findOne({...type_access});
  console.log("My check access: ", checkTypeAccess)

  if (!checkTypeAccess) {
    return res.status(404).send({
      errorMessage: "Aucun type d'accès correspondant",
    });
  }

  const access = new AccessEntity({
    type_access,
    composants,
    actions,
    statut_deleted: checkStatut.nom,
  });

  await access
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

export const GetAccess: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await AccessEntity.find({statut_deleted: checkStatut.nom})
    .then((access) => {
      if (!access) {
        return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
      }
      res.status(200).send(access);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetAccessById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await AccessEntity.findById(id)
    .then((typeDemande) => {
      if (!typeDemande) {
        return res.status(404).send({ errorMessage: "Aucun access trouvé" });
      }
      res.status(200).send(typeDemande);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateAccess: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.type_access === undefined ||
    update.type_access === null ||
    !update.type_access ||
    typeof update.composants === undefined ||
    update.composants === null ||
    !update.composants ||
    typeof update.actions === undefined ||
    update.actions === null ||
    !update.actions
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkTypeAccess = await TypeAccessEntity.findOne({...update.type_access})
  console.log("My check access: ", checkTypeAccess)

  if (!checkTypeAccess) {
    return res.status(404).send({
      errorMessage: "Aucun type d'accès correspondant",
    });
  }

  await AccessEntity.findByIdAndUpdate(id, update)
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

export const DeleteAccess: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await AccessEntity.findByIdAndRemove(id)
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