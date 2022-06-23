import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { AgentEntity } from "../entity/agent.entity";
import { EtatCivilEntity } from "../entity/etat_civil.entity";
import { GenreEntity } from "../entity/genre.entity";
import { NiveauEtudeEntity } from "../entity/niveau_etude.entity";
import { PaysEntity } from "../entity/pays.entity";
import { PosteEntity } from "../entity/poste.entity";
import { StatusEntity } from "../entity/status.entity";
import bcryptjs from "bcryptjs";

export const AddAgent: Handler = async (req: Request, res: Response) => {
  const {
    matricule,
    nom,
    postnom,
    prenom,
    date_naissance,
    lieu_naissance,
    telephone,
    nationalite,
    poste,
    etat_civil,
    status_syndical,
    sexe,
    niveau_etude,
    avatar,
    email,
    adresse,
    password
  } = req.body;

  if (
    typeof matricule === undefined ||
    matricule === null ||
    !matricule ||
    typeof nom === undefined ||
    nom === null ||
    !nom ||
    typeof prenom === undefined ||
    prenom === null ||
    !prenom ||
    typeof date_naissance === undefined ||
    date_naissance === null ||
    !date_naissance ||
    typeof lieu_naissance === undefined ||
    lieu_naissance === null ||
    !lieu_naissance ||
    typeof telephone === undefined ||
    telephone === null ||
    !telephone ||
    typeof nationalite === undefined ||
    nationalite === null ||
    !nationalite ||
    typeof poste === undefined ||
    poste === null ||
    !poste ||
    typeof etat_civil === undefined ||
    etat_civil === null ||
    !etat_civil ||
    typeof status_syndical === undefined ||
    status_syndical === null ||
    !status_syndical ||
    typeof sexe === undefined ||
    sexe === null ||
    !sexe ||
    typeof niveau_etude === undefined ||
    niveau_etude === null ||
    !niveau_etude ||
    typeof email === undefined ||
    email === null ||
    !email ||
    typeof password === undefined ||
    password === null ||
    !password ||
    !adresse
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(etat_civil)) {
    return res.status(400).send({ errorMessage: "Id Etat  civil non valide" });
  }

  const checkEtatCivil = await EtatCivilEntity.findById(etat_civil);

  if (!checkEtatCivil) {
    return res.status(404).send({
      errorMessage: "Aucun etat-civil correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(nationalite)) {
    return res.status(400).send({ errorMessage: "Id nationalité non valide" });
  }

  const checkPays = await PaysEntity.findById(nationalite);

  if (!checkPays) {
    return res.status(404).send({
      errorMessage: "Aucun pays correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(poste)) {
    return res.status(400).send({ errorMessage: "Id poste non valide" });
  }

  const checkPoste = await PosteEntity.findById(poste);

  if (!checkPoste) {
    return res.status(404).send({
      errorMessage: "Aucun poste correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(sexe)) {
    return res.status(400).send({ errorMessage: "Id sexe non valide" });
  }

  const checkSexe = await GenreEntity.findById(sexe);

  if (!checkSexe) {
    return res.status(404).send({
      errorMessage: "Aucun sexe correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(niveau_etude)) {
    return res.status(400).send({ errorMessage: "Id sexe non valide" });
  }

  const checkNiveauEtude = await NiveauEtudeEntity.findById(niveau_etude);

  if (!checkNiveauEtude) {
    return res.status(404).send({
      errorMessage: "Aucun niveau d'étude correspondant",
    });
  }

  const checkAgentExiste = await AgentEntity.findOne({
    matricule,
    nom,
    prenom,
    date_naissance,
  });

  const pass = await bcryptjs.hash(password, 12);

  if (!checkAgentExiste) {
    const agent = new AgentEntity({
      matricule,
      nom,
      postnom,
      prenom,
      date_naissance,
      lieu_naissance,
      telephone,
      nationalite: checkPays._id,
      poste: checkPoste._id,
      etat_civil: checkEtatCivil._id,
      status_syndical,
      sexe: checkSexe._id,
      niveau_etude: checkNiveauEtude._id,
      email,
      adresse,
      password: pass
    });

    await agent
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
  } else {
    return res.status(406).send({
      errorMessage: `L'agent ${checkAgentExiste.nom} existe déjà!`,
    });
  }
};

export const GetAgents: Handler = async (req: Request, res: Response) => {

  await AgentEntity.find()
    .populate({ path: "nationalite", select: "nom -_id" })
    .populate({ path: "poste", select: "nom -_id" })
    .populate({ path: "etat_civil", select: "nom -_id" })
    .populate({ path: "sexe", select: "nom -_id" })
    .populate({ path: "niveau_etude", select: "nom -_id" })
    .then((agent) => {
      if (!agent) {
        return res.status(404).send({ errorMessage: "Aucun angent trouvé" });
      }
      res.status(200).send(agent);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetAgentById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await AgentEntity.findById(id)
  .populate({ path: "nationalite", select: "nom -_id" })
  .populate({ path: "poste", select: "nom -_id" })
  .populate({ path: "etat_civil", select: "nom -_id" })
  .populate({ path: "sexe", select: "nom -_id" })
  .populate({ path: "niveau_etude", select: "nom -_id" })
    .then((agent) => {
      if (!agent) {
        return res.status(404).send({ errorMessage: "Aucun angent trouvé" });
      }
      res.status(200).send(agent);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateAgent: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.matricule === undefined ||
    update.matricule === null ||
    !update.matricule ||
    typeof update.nom === undefined ||
    update.nom === null ||
    !update.nom ||
    typeof update.prenom === undefined ||
    update.prenom === null ||
    !update.prenom ||
    typeof update.date_naissance === undefined ||
    update.date_naissance === null ||
    !update.date_naissance ||
    typeof update.lieu_naissance === undefined ||
    update.lieu_naissance === null ||
    !update.lieu_naissance ||
    typeof update.telephone === undefined ||
    update.telephone === null ||
    !update.telephone ||
    typeof update.nationalite === undefined ||
    update.nationalite === null ||
    !update.nationalite ||
    typeof update.poste === undefined ||
    update.poste === null ||
    !update.poste ||
    typeof update.etat_civil === undefined ||
    update.etat_civil === null ||
    !update.etat_civil ||
    typeof update.status_syndical === undefined ||
    update.status_syndical === null ||
    !update.status_syndical ||
    typeof update.sexe === undefined ||
    update.sexe === null ||
    !update.sexe ||
    typeof update.niveau_etude === undefined ||
    update.niveau_etude === null ||
    !update.niveau_etude ||
    typeof update.email === undefined ||
    update.email === null ||
    !update.email ||
    !update.adresse
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(update.etat_civil)) {
    return res.status(400).send({ errorMessage: "Id Etat-civil non valide" });
  }

  const checkEtatCivil = await EtatCivilEntity.findById(update.etat_civil);

  if (!checkEtatCivil) {
    return res.status(404).send({
      errorMessage: "Aucun etat-civil correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.nationalite)) {
    return res.status(400).send({ errorMessage: "Id nationalité non valide" });
  }

  const checkPays = await PaysEntity.findById(update.nationalite);

  if (!checkPays) {
    return res.status(404).send({
      errorMessage: "Aucun pays correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.poste)) {
    return res.status(400).send({ errorMessage: "Id poste non valide" });
  }

  const checkPoste = await PosteEntity.findById(update.poste);

  if (!checkPoste) {
    return res.status(404).send({
      errorMessage: "Aucun poste correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.sexe)) {
    return res.status(400).send({ errorMessage: "Id sexe non valide" });
  }

  const checkSexe = await GenreEntity.findById(update.sexe);

  if (!checkSexe) {
    return res.status(404).send({
      errorMessage: "Aucun sexe correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.niveau_etude)) {
    return res.status(400).send({ errorMessage: "Id niveau d'étude non valide" });
  }

  const checkNiveauEtude = await NiveauEtudeEntity.findById(update.niveau_etude);

  if (!checkNiveauEtude) {
    return res.status(404).send({
      errorMessage: "Aucun niveau d'étude correspondant",
    });
  }

  await AgentEntity.findByIdAndUpdate(id, {
    matricule: update.matricule,
    nom: update.nom,
    postnom: update.postnom,
    prenom: update.prenom,
    date_naissance: update.date_naissance,
    lieu_naissance: update.lieu_naissance,
    telephone: update.telephone,
    nationalite: checkPays._id,
    poste: checkPoste._id,
    etat_civil: checkEtatCivil._id,
    status_syndical: update.status_syndical,
    sexe: checkSexe._id,
    niveau_etude: checkNiveauEtude._id,
    email: update.email,
    adresse: update.adresse,
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

export const DeleteAgent: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  await AgentEntity.findByIdAndRemove(id)
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
