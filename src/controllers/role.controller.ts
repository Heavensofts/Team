import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { AccessEntity } from "../entity/access.entity";
import { RoleEntity } from "../entity/role.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddRole: Handler = async (req: Request, res: Response) => {
  const { nom, description, access} = req.body;

  if (
    typeof nom === undefined ||
    nom === null ||
    !nom ||
    typeof access === undefined ||
    access === null ||
    !access
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

  const checkAccess = await AccessEntity.findById(access);

  if (!checkAccess) {
    return res.status(404).send({
      errorMessage: "Aucun access correspondant",
    });
  }

  const checkRole = await RoleEntity.findOne({nom: nom.toUpperCase()})

  if(!checkRole){

    const role = new RoleEntity({
      nom: nom.toUpperCase(), 
      description,
      access: checkAccess._id,
      statut_deleted: checkStatut.nom
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

  }else{
    return res.status(406).send({
      errorMessage: `Le role ${checkRole.nom} existe déjà!`,
    });
  }
};

export const GetRoles: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await RoleEntity.find({statut_deleted: checkStatut.nom})
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

export const GetRoleById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await RoleEntity.findById(id)
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

export const UpdateRole: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.nom === undefined || update.nom === null || !update.nom 
    || typeof update.access === undefined ||
    update.access === null || !update.access
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkAccess = await AccessEntity.findById(update.access);

  if (!checkAccess) {
    return res.status(404).send({
      errorMessage: "Aucun access correspondant",
    });
  }

  await RoleEntity.findByIdAndUpdate(id, {
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

export const DeleteRole: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }


  await RoleEntity.findByIdAndRemove(id)
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