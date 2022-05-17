import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { TypeDemandeEntity } from "../entity/type_demande.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddTypeDemande: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  if (!checkStatut) {
    return res.status(404).send({
      errorMessage: "Aucun statut correspondant"
    });
  }

  const checTypeDemandeExist = await TypeDemandeEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checTypeDemandeExist) {
    const typeContrat = new TypeDemandeEntity({
      nom: nom.toUpperCase(),
      description,
      statut_deleted: checkStatut.nom
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
  } else {
    return res.status(406).send({ errorMessage: "Ce type demande a déjà été enregistré!" });
  }

  
};

export const GetTypeDemandes: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await TypeDemandeEntity.find({statut_deleted: checkStatut.nom})
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

export const GetTypeDemandeById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await TypeDemandeEntity.findById(id)
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

export const UpdateTypeDemande: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.nom.toUpperCase() === undefined ||
    update.nom.toUpperCase() === null ||
    !update.nom.toUpperCase()
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir le champ requis" });
  }

  await TypeDemandeEntity.findByIdAndUpdate(id, {
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

export const DeleteTypeDemande: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  const checkStatut = await StatusEntity.findOne({nom: 'No-displayed'});

  await TypeDemandeEntity.findByIdAndUpdate(id, { statut_deleted: checkStatut.nom, date_deleted: Date.now() })
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