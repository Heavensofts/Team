import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { TypeContratEntity } from "../entity/type_contrat.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddTypeContrat: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checTypeContratExist = await TypeContratEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checTypeContratExist) {
    const typeContrat = new TypeContratEntity({
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
  } else {
    return res.status(406).send({ errorMessage: "Ce type contrat a déjà été enregistré!" });
  }
};

export const GetTypeContrats: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await TypeContratEntity.find({statut_deleted: checkStatut.nom})
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

export const GetTypeContratById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await TypeContratEntity.findById(id)
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

export const UpdateTypeContrat: Handler = async (req: Request, res: Response) => {
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

  await TypeContratEntity.findByIdAndUpdate(id, {
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

export const DeleteTypeContrat: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await TypeContratEntity.findByIdAndRemove(id)
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