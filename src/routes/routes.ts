import {Router} from "express";
import { AddAccess, DeleteAccess, GetAccess, GetAccessById, UpdateAccess } from "../controllers/access.controller";
import { AddAgent, DeleteAgent, GetAgentById, GetAgents, UpdateAgent } from "../controllers/agent_controller";
import { AuthenticatedUser, Login } from "../controllers/auth.controller";
import { AddCandidat, DeleteCandidat, GetCandidatById, GetCandidats, UpdateCandidat } from "../controllers/candidat.controller";
import { AddConge, DeleteConge, GetCongeById, GetConges, UpdateConge } from "../controllers/conge.controller";
import { AddContrat, DeleteContrat, GetContratById, GetContrats, UpdateContrat } from "../controllers/contrat.controller";
import { AddDemande, DeleteDemande, GetDemandeById, GetDemandes, UpdateDemande } from "../controllers/demande.controller";
import { AddDepartement, DeleteDepartement, GetDepartementById, GetDepartements, UpdateDepartement } from "../controllers/departement.controller";
import { AddEtatCivil, DeleteEtatCivil, GetEtatCivilById, GetEtatCivils, UpdateEtatCivil } from "../controllers/etat_civil.controller";
import { AddEtudeFaites, DeleteEtudeFaites, GetEtudeFaites, GetEtudeFaitesById, UpdateEtudeFaites } from "../controllers/etudes_faites.controller";
import { AddExperience, DeleteExperience, GetExperienceById, GetExperiences, UpdateExperience } from "../controllers/experience_professionnelle.controller";
import { AddFichePaie, DeleteFichePaie, GetFichePaieById, GetFichePaies, UpdateFichePaie } from "../controllers/fiche_paie.controller";
import { AddGenre, DeleteGenre, GetGenreById, GetGenres, UpdateGenre } from "../controllers/genre.controller";
import { AddLangue, DeleteLangue, GetLangueById, GetLangues, UpdateLangue } from "../controllers/langue.controller";
import { AddNiveauEtude, DeleteNiveauEtude, GetNiveauById, GetNiveauEtudes, UpdateNiveauEtude } from "../controllers/niveau_etude.controller";
import { AddNoteFrais, DeleteNoteFrais, GetNoteFrais, GetNoteFraisById, UpdateNoteFrais } from "../controllers/note_frais.controller";
import { AddPays, GetPays } from "../controllers/pays.controller";
import { AddPoste, DeletePoste, GetPosteById, GetPostes, UpdatePoste } from "../controllers/poste.controller";
import { AddPresence, DeletePresence, GetPresenceById, GetPresences, UpdatePresence } from "../controllers/presence.controller";
import { AddRecrutement, DeleteRecrutement, GetRecrutementById, GetRecrutements, UpdateRecrutement } from "../controllers/recrutement.controller";
import { AddRole, DeleteRole, GetRoleById, GetRoles, UpdateRole } from "../controllers/role.controller";
import { AddStatut, DeleteStatut, GetStatutById, GetStatuts, UpdateStatut } from "../controllers/status.controller";
import { AddTypeAccess, DeleteTypeAccess, GetTypeAccess, GetTypeAccessById, UpdateTypeAccess } from "../controllers/type_access.controller";
import { AddTypeConge, DeleteTypeConge, GetTypeCongeById, GetTypeConges, UpdateTypeConge } from "../controllers/type_conge.controller";
import { AddTypeContrat, DeleteTypeContrat, GetTypeContratById, GetTypeContrats, UpdateTypeContrat } from "../controllers/type_contrat.controller";
import { AddTypeDemande, DeleteTypeDemande, GetTypeDemandeById, GetTypeDemandes, UpdateTypeDemande } from "../controllers/type_demande.controller";
import { AddTypeTache, DeleteTypeTache, GetTypeTacheById, GetTypeTaches, UpdateTypeTache } from "../controllers/type_tache.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
const router = Router();


// =============================== DEBUT ROUTES GENRE ===============================

// Genre routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Genre:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du sexe 
 *        description:
 *          type: string
 *          description: La description du sexe
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: homme
 *        description: Le sexe homme 
 *    GenreNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found genre
 *      example:
 *        msg: genre non trouvé
 *
 *  parameters:
 *    genreId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the dévise id
 */

/**
 * @swagger
 * tags:
 *  name: Genre
 *  description: Genre endpoint
 */

/**
 * @swagger
 * /api/genre:
 *  post:
 *    summary: create a new genre
 *    tags: [Genre]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: the genre was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/genre", AddGenre);


/**
 * @swagger
 * /api/genre:
 *  get:
 *    summary: Returns a list of genres
 *    tags: [Genre]
 *    responses:
 *      200:
 *        description: the list of genre
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Genre'
 *        404:
 *          description: the genre was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GenreNotFound'
 */

 router.get("/api/genre", GetGenres);

/**
 * @swagger
 * /api/genre/{id}:
 *  get:
 *    summary: get a genre by Id
 *    tags: [Genre]
 *    parameters:
 *      - $ref: '#/components/parameters/genreId'
 *    responses:
 *      200:
 *        description: The Found Genre
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Genre'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenreNotFound'
 */

 router.get("/api/genre/:id", GetGenreById);


 /**
 * @swagger
 * /api/genre/{id}:
 *  put:
 *    summary: Update a genre by id
 *    tags: [Genre]
 *    parameters:
 *      - $ref: '#/components/parameters/genreId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: The updated genre 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Genre'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenreNotFound'
 *
 */

  router.put("/api/genre/:id", UpdateGenre);

/**
 * @swagger
 * /api/genre/{id}:
 *  delete:
 *    summary: delete a genre by id
 *    tags: [Genre]
 *    parameters:
 *      - $ref: '#/components/parameters/genreId'
 *    responses:
 *      200:
 *        description: the genre was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Genre'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenreNotFound'
 *
 */

 router.delete("/api/genre/:id", DeleteGenre)

// =============================== FIN ROUTES GENRE ===============================


// =============================== DEBUT ROUTES STATUT ============================

// statut routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Statut:
 *      type: object
 *      properties:
 *        statut:
 *          type: string
 *          description: Le statut correspondant
 *        description:
 *          type: string
 *          description: La description du statut
 *  
 *      required:
 *        - statut
 *        
 *      example:
 *        statut: displayed
 *        description: Le statut qui rend les éléments visibles
 *    StatutNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found statut
 *      example:
 *        msg: Statut non trouvé
 *
 *  parameters:
 *    StatutId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the statut id
 */

/**
 * @swagger
 * tags:
 *  name: Statut
 *  description: Statut endpoint
 */

/**
 * @swagger
 * /api/statut:
 *  post:
 *    summary: create a new statut
 *    tags: [Statut]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Statut'
 *    responses:
 *      200:
 *        description: the statut was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Statut'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/statut",AddStatut);

/**
 * @swagger
 * /api/statut:
 *  get:
 *    summary: Returns a list of statuts
 *    tags: [Statut]
 *    responses:
 *      200:
 *        description: the list of statuts
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Statut'
 *        404:
 *          description: the statut was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StatutNotFound'
 */

 router.get("/api/statut",GetStatuts);

/**
 * @swagger
 * /api/statut/{id}:
 *  get:
 *    summary: get the statut by Id
 *    tags: [Statut]
 *    parameters:
 *      - $ref: '#/components/parameters/StatutId'
 *    responses:
 *      200:
 *        description: The Found statut
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Statut'
 *      404:
 *        description: the statut was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatutNotFound'
*/

router.get("/api/statut/:id",GetStatutById);

/**
 * @swagger
 * /api/statut/{id}:
 *  put:
 *    summary: Update a statut by id
 *    tags: [Statut]
 *    parameters:
 *      - $ref: '#/components/parameters/StatutId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Statut'
 *    responses:
 *      200:
 *        description: The updated statut 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Statut'
 *      404:
 *        description: the statut was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatutNotFound'
 *
*/

router.put("/api/statut/:id",UpdateStatut);

/**
 * @swagger
 * /api/statut/{id}:
 *  delete:
 *    summary: delete a statut by id
 *    tags: [Statut]
 *    parameters:
 *      - $ref: '#/components/parameters/StatutId'
 *    responses:
 *      200:
 *        description: the statut was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Statut'
 *      404:
 *        description: the statut was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatutNotFound'
 *
 */

 router.delete("/api/statut/:id",DeleteStatut)

// ========================== END Status Routes =========================

// =============================== DEBUT ROUTES NIVEAU ETUDE ===============================

// Niveau etude routes

/**
 * @swagger
 * components:
 *  schemas:
 *    NiveauEtude:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du sexe 
 *        description:
 *          type: string
 *          description: La description du sexe
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: licence
 *        description: Le diplome de licence est un niveau d'étude
 *    NiveauEtudeNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found niveau etude
 *      example:
 *        msg: niveau etude non trouvé
 *
 *  parameters:
 *    niveauEtudeId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the niveau etude id
 */

/**
 * @swagger
 * tags:
 *  name: NiveauEtude
 *  description: Niveau Etude endpoint
 */

/**
 * @swagger
 * /api/niveau-etude:
 *  post:
 *    summary: create a new niveau etude
 *    tags: [NiveauEtude]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NiveauEtude'
 *    responses:
 *      200:
 *        description: the niveau etude was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NiveauEtude'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/niveau-etude", AddNiveauEtude);


/**
 * @swagger
 * /api/niveau-etude:
 *  get:
 *    summary: Returns a list of niveaux etudes
 *    tags: [NiveauEtude]
 *    responses:
 *      200:
 *        description: the list of niveau etude
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/NiveauEtude'
 *        404:
 *          description: the niveau etude was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NiveauEtudeNotFound'
 */

 router.get("/api/niveau-etude", GetNiveauEtudes);

/**
 * @swagger
 * /api/niveau-etude/{id}:
 *  get:
 *    summary: get a niveau etude by Id
 *    tags: [NiveauEtude]
 *    parameters:
 *      - $ref: '#/components/parameters/niveauEtudeId'
 *    responses:
 *      200:
 *        description: The Found Genre
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NiveauEtude'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NiveauEtudeNotFound'
 */

 router.get("/api/niveau-etude/:id", GetNiveauById);


 /**
 * @swagger
 * /api/niveau-etude/{id}:
 *  put:
 *    summary: Update a niveau etude by id
 *    tags: [NiveauEtude]
 *    parameters:
 *      - $ref: '#/components/parameters/niveauEtudeId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NiveauEtude'
 *    responses:
 *      200:
 *        description: The updated niveau etude 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NiveauEtude'
 *      404:
 *        description: the niveau etude was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NiveauEtudeNotFound'
 *
 */

  router.put("/api/niveau-etude/:id", UpdateNiveauEtude);

/**
 * @swagger
 * /api/niveau-etude/{id}:
 *  delete:
 *    summary: delete a niveau etude by id
 *    tags: [NiveauEtude]
 *    parameters:
 *      - $ref: '#/components/parameters/niveauEtudeId'
 *    responses:
 *      200:
 *        description: the niveau étude was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NiveauEtude'
 *      404:
 *        description: the niveau etude was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NiveauEtudeNotFound'
 *
 */

 router.delete("/api/niveau-etude/:id", DeleteNiveauEtude)

// =============================== FIN ROUTES NIVEAU ETUDE =============================


// =============================== DEBUT ROUTES Etat CIVIL ===============================

// Etat-civil routes

/**
 * @swagger
 * components:
 *  schemas:
 *    EtatCivil:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom de l'état-civil
 *        description:
 *          type: string
 *          description: La description de l'état civil
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: marié(e)
 *        description: etat-civil marié(e)
 *    EtatCivilNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found niveau etude
 *      example:
 *        msg: etat civil non trouvé
 *
 *  parameters:
 *    etatCivilId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the etat civil id
 */

/**
 * @swagger
 * tags:
 *  name: EtatCivil
 *  description: Eta civil endpoint
 */

/**
 * @swagger
 * /api/etat-civil:
 *  post:
 *    summary: create a new etat civil
 *    tags: [EtatCivil]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EtatCivil'
 *    responses:
 *      200:
 *        description: the etat civil was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtatCivil'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/etat-civil", AddEtatCivil);


/**
 * @swagger
 * /api/etat-civil:
 *  get:
 *    summary: Returns a list of niveaux etat civils
 *    tags: [EtatCivil]
 *    responses:
 *      200:
 *        description: the list of etat civil
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/EtatCivil'
 *        404:
 *          description: the etat civil was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/EtatCivilNotFound'
 */

 router.get("/api/etat-civil", GetEtatCivils);

/**
 * @swagger
 * /api/etat-civil/{id}:
 *  get:
 *    summary: get an etat civil by Id
 *    tags: [EtatCivil]
 *    parameters:
 *      - $ref: '#/components/parameters/etatCivilId'
 *    responses:
 *      200:
 *        description: The Found Genre
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtatCivil'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtatCivilNotFound'
 */

 router.get("/api/etat-civil/:id", GetEtatCivilById);


 /**
 * @swagger
 * /api/etat-civil/{id}:
 *  put:
 *    summary: Update a etat civil by id
 *    tags: [EtatCivil]
 *    parameters:
 *      - $ref: '#/components/parameters/etatCivilId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EtatCivil'
 *    responses:
 *      200:
 *        description: The updated niveau etude 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtatCivil'
 *      404:
 *        description: the niveau etude was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtatCivilNotFound'
 *
 */

  router.put("/api/etat-civil/:id", UpdateEtatCivil);

/**
 * @swagger
 * /api/etat-civil/{id}:
 *  delete:
 *    summary: delete an etet civil by id
 *    tags: [EtatCivil]
 *    parameters:
 *      - $ref: '#/components/parameters/etatCivilId'
 *    responses:
 *      200:
 *        description: the genre was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtatCivil'
 *      404:
 *        description: the niveau etude was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtatCivilNotFound'
 *
 */

 router.delete("/api/etat-civil/:id", DeleteEtatCivil)

// =============================== FIN ROUTES ETAT CIVIL =============================


// =============================== DEBUT ROUTES TYPE TACHE ===============================

// TYPE TACHE routes

/**
 * @swagger
 * components:
 *  schemas:
 *    TypeTache:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du type tache
 *        description:
 *          type: string
 *          description: La description du type tache
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: Urgente
 *        description: La tache urgente
 *    TypeTacheNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found type tache
 *      example:
 *        msg: type tache non trouvé
 *
 *  parameters:
 *    typeTacheId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the type tache id
 */

/**
 * @swagger
 * tags:
 *  name: TypeTache
 *  description: Type tache endpoint
 */

/**
 * @swagger
 * /api/type-tache:
 *  post:
 *    summary: create a new Type tache
 *    tags: [TypeTache]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeTache'
 *    responses:
 *      200:
 *        description: the type tache was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeTache'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/type-tache", AddTypeTache);


/**
 * @swagger
 * /api/type-tache:
 *  get:
 *    summary: Returns a list of type taches
 *    tags: [TypeTache]
 *    responses:
 *      200:
 *        description: the list of type tache
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TypeTache'
 *        404:
 *          description: the type tache was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TypeTacheNotFound'
 */

 router.get("/api/type-tache", GetTypeTaches);

/**
 * @swagger
 * /api/type-tache/{id}:
 *  get:
 *    summary: get a type tache by Id
 *    tags: [TypeTache]
 *    parameters:
 *      - $ref: '#/components/parameters/typeTacheId'
 *    responses:
 *      200:
 *        description: The Found Genre
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeTache'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeTacheNotFound'
 */

 router.get("/api/type-tache/:id", GetTypeTacheById);


 /**
 * @swagger
 * /api/type-tache/{id}:
 *  put:
 *    summary: Update a type tache by id
 *    tags: [TypeTache]
 *    parameters:
 *      - $ref: '#/components/parameters/typeTacheId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeTache'
 *    responses:
 *      200:
 *        description: The updated type tache 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeTache'
 *      404:
 *        description: the type tache was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeTacheNotFound'
 *
 */

  router.put("/api/type-tache/:id", UpdateTypeTache);

/**
 * @swagger
 * /api/type-tache/{id}:
 *  delete:
 *    summary: delete a type tache by id
 *    tags: [TypeTache]
 *    parameters:
 *      - $ref: '#/components/parameters/typeTacheId'
 *    responses:
 *      200:
 *        description: the genre was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeTache'
 *      404:
 *        description: the type tache was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeTacheNotFound'
 *
 */

 router.delete("/api/type-tache/:id", DeleteTypeTache)

// =============================== FIN ROUTES TYPE TACHE =============================


// =============================== DEBUT ROUTES TYPE ACCESS ===============================

// TYPE ACCESS routes

/**
 * @swagger
 * components:
 *  schemas:
 *    TypeAccess:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du type access
 *        description:
 *          type: string
 *          description: La description du type access
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: Lecture
 *        description: L'access en lecture
 *    TypeAccessNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found type access
 *      example:
 *        msg: type access non trouvé
 *
 *  parameters:
 *    typeAccessId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the type access id
 */

/**
 * @swagger
 * tags:
 *  name: TypeAccess
 *  description: Type access endpoint
 */

/**
 * @swagger
 * /api/type-access:
 *  post:
 *    summary: create a new Type access
 *    tags: [TypeAccess]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeAccess'
 *    responses:
 *      200:
 *        description: the type access was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeAccess'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/type-access", AddTypeAccess);


/**
 * @swagger
 * /api/type-access:
 *  get:
 *    summary: Returns a list of type access
 *    tags: [TypeAccess]
 *    responses:
 *      200:
 *        description: the list of type access
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TypeAccess'
 *        404:
 *          description: the type access was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TypeAccessNotFound'
 */

 router.get("/api/type-access", GetTypeAccess);

/**
 * @swagger
 * /api/type-access/{id}:
 *  get:
 *    summary: get a type access by Id
 *    tags: [TypeAccess]
 *    parameters:
 *      - $ref: '#/components/parameters/typeAccessId'
 *    responses:
 *      200:
 *        description: The Found Type Access
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeAccess'
 *      404:
 *        description: the genre was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeAccessNotFound'
 */

 router.get("/api/type-access/:id", GetTypeAccessById);


 /**
 * @swagger
 * /api/type-access/{id}:
 *  put:
 *    summary: Update a type access by id
 *    tags: [TypeAccess]
 *    parameters:
 *      - $ref: '#/components/parameters/typeAccessId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeAccess'
 *    responses:
 *      200:
 *        description: The updated type access 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeAccess'
 *      404:
 *        description: the type access was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeAccessNotFound'
 *
 */

  router.put("/api/type-access/:id", UpdateTypeAccess);

/**
 * @swagger
 * /api/type-access/{id}:
 *  delete:
 *    summary: delete a type access by id
 *    tags: [TypeAccess]
 *    parameters:
 *      - $ref: '#/components/parameters/typeAccessId'
 *    responses:
 *      200:
 *        description: the type access was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeAccess'
 *      404:
 *        description: the type access was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeAccessNotFound'
 *
 */

 router.delete("/api/type-access/:id", DeleteTypeAccess)

// =============================== FIN ROUTES TYPE ACCESS =============================

// =============================== DEBUT ROUTES TYPE CONGE ===============================

// TYPE CONGE routes

/**
 * @swagger
 * components:
 *  schemas:
 *    TypeConge:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du type congé
 *        description:
 *          type: string
 *          description: La description du type congé
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: Annuel
 *        description: Le congé annuel
 *    TypeCongeNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found type congé
 *      example:
 *        msg: type congé non trouvé
 *
 *  parameters:
 *    typeCongeId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the type congé id
 */

/**
 * @swagger
 * tags:
 *  name: TypeConge
 *  description: Type congé endpoint
 */

/**
 * @swagger
 * /api/type-conge:
 *  post:
 *    summary: create a new Type congé
 *    tags: [TypeConge]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeConge'
 *    responses:
 *      200:
 *        description: the type congé was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeConge'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/type-conge", AddTypeConge);


/**
 * @swagger
 * /api/type-conge:
 *  get:
 *    summary: Returns a list of type conge
 *    tags: [TypeConge]
 *    responses:
 *      200:
 *        description: the list of type conge
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TypeConge'
 *        404:
 *          description: the type congé was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TypeCongeNotFound'
 */

 router.get("/api/type-conge", GetTypeConges);

/**
 * @swagger
 * /api/type-conge/{id}:
 *  get:
 *    summary: get a type congé by Id
 *    tags: [TypeConge]
 *    parameters:
 *      - $ref: '#/components/parameters/typeCongeId'
 *    responses:
 *      200:
 *        description: The Found Type Congé
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeConge'
 *      404:
 *        description: the type congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeCongeNotFound'
 */

 router.get("/api/type-conge/:id", GetTypeCongeById);


 /**
 * @swagger
 * /api/type-conge/{id}:
 *  put:
 *    summary: Update a type congé by id
 *    tags: [TypeConge]
 *    parameters:
 *      - $ref: '#/components/parameters/typeCongeId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeConge'
 *    responses:
 *      200:
 *        description: The updated type congé 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeConge'
 *      404:
 *        description: the type congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeCongeNotFound'
 *
 */

  router.put("/api/type-conge/:id", UpdateTypeConge);

/**
 * @swagger
 * /api/type-conge/{id}:
 *  delete:
 *    summary: delete a type congé by id
 *    tags: [TypeConge]
 *    parameters:
 *      - $ref: '#/components/parameters/typeCongeId'
 *    responses:
 *      200:
 *        description: the type congé was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeConge'
 *      404:
 *        description: the type congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeCongeNotFound'
 *
 */

 router.delete("/api/type-conge/:id", DeleteTypeConge)

// =============================== FIN ROUTES TYPE CONGE =============================

// =============================== DEBUT ROUTES TYPE CONTRAT ===============================

// TYPE CONTRAT routes

/**
 * @swagger
 * components:
 *  schemas:
 *    TypeContrat:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du type contrat
 *        description:
 *          type: string
 *          description: La description du type contrat
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: CD
 *        description: Le contrat à durée déterminer
 *    TypeContratNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found type contrat
 *      example:
 *        msg: type contrat non trouvé
 *
 *  parameters:
 *    typeContratId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the type contrat id
 */

/**
 * @swagger
 * tags:
 *  name: TypeContrat
 *  description: Type contrat endpoint
 */

/**
 * @swagger
 * /api/type-contrat:
 *  post:
 *    summary: create a new Type contrat
 *    tags: [TypeContrat]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeContrat'
 *    responses:
 *      200:
 *        description: the type congé was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeContrat'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/type-contrat", AddTypeContrat);


/**
 * @swagger
 * /api/type-contrat:
 *  get:
 *    summary: Returns a list of type contrat
 *    tags: [TypeContrat]
 *    responses:
 *      200:
 *        description: the list of type contrat
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TypeContrat'
 *        404:
 *          description: the type contrat was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TypeContratNotFound'
 */

 router.get("/api/type-contrat", GetTypeContrats);

/**
 * @swagger
 * /api/type-contrat/{id}:
 *  get:
 *    summary: get a type contrat by Id
 *    tags: [TypeContrat]
 *    parameters:
 *      - $ref: '#/components/parameters/typeContratId'
 *    responses:
 *      200:
 *        description: The Found Type Contrat
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeContrat'
 *      404:
 *        description: the type contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeContratNotFound'
 */

 router.get("/api/type-contrat/:id", GetTypeContratById);


 /**
 * @swagger
 * /api/type-contrat/{id}:
 *  put:
 *    summary: Update a type contrat by id
 *    tags: [TypeContrat]
 *    parameters:
 *      - $ref: '#/components/parameters/typeContratId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeContrat'
 *    responses:
 *      200:
 *        description: The updated type contrat 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeContrat'
 *      404:
 *        description: the type contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeContratNotFound'
 *
 */

  router.put("/api/type-contrat/:id", UpdateTypeContrat);

/**
 * @swagger
 * /api/type-contrat/{id}:
 *  delete:
 *    summary: delete a type contrat by id
 *    tags: [TypeContrat]
 *    parameters:
 *      - $ref: '#/components/parameters/typeContratId'
 *    responses:
 *      200:
 *        description: the type contrat was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeContrat'
 *      404:
 *        description: the type contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeContratNotFound'
 *
 */

 router.delete("/api/type-contrat/:id", DeleteTypeContrat)

// =============================== FIN ROUTES TYPE CONTRAT =============================

// =============================== DEBUT ROUTES TYPE DEMANDE ===============================

// TYPE DEMANDE routes

/**
 * @swagger
 * components:
 *  schemas:
 *    TypeDemande:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du type demande
 *        description:
 *          type: string
 *          description: La description du type demande
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *   
 *      required:
 *        - nom
 *        - statut_deleted
 *        
 *      example:
 *        nom: Demande de congé
 *        description: Une demande pour un congé
 *    TypeDemandeNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found type demande
 *      example:
 *        msg: type demande non trouvé
 *
 *  parameters:
 *    typeDemandeId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the type demande id
 */

/**
 * @swagger
 * tags:
 *  name: TypeDemande
 *  description: Type demande endpoint
 */

/**
 * @swagger
 * /api/type-demande:
 *  post:
 *    summary: create a new Type demande
 *    tags: [TypeDemande]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeDemande'
 *    responses:
 *      200:
 *        description: the type demande was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeDemande'
 *      500:
 *        description: Some server error
 *
 */

 router.post("/api/type-demande", AddTypeDemande);


/**
 * @swagger
 * /api/type-demande:
 *  get:
 *    summary: Returns a list of type demande
 *    tags: [TypeDemande]
 *    responses:
 *      200:
 *        description: the list of type demande
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TypeDemande'
 *        404:
 *          description: the type demande was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TypeDemandeNotFound'
 */

 router.get("/api/type-demande", GetTypeDemandes);

/**
 * @swagger
 * /api/type-demande/{id}:
 *  get:
 *    summary: get a type demande by Id
 *    tags: [TypeDemande]
 *    parameters:
 *      - $ref: '#/components/parameters/typeDemandeId'
 *    responses:
 *      200:
 *        description: The Found Type Demande
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeDemande'
 *      404:
 *        description: the type demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeDemandeNotFound'
 */

 router.get("/api/type-demande/:id", GetTypeDemandeById);


 /**
 * @swagger
 * /api/type-demande/{id}:
 *  put:
 *    summary: Update a type demande by id
 *    tags: [TypeDemande]
 *    parameters:
 *      - $ref: '#/components/parameters/typeDemandeId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TypeDemande'
 *    responses:
 *      200:
 *        description: The updated type demande 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeDemande'
 *      404:
 *        description: the type demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeDemandeNotFound'
 *
 */

  router.put("/api/type-demande/:id", UpdateTypeDemande);

/**
 * @swagger
 * /api/type-demande/{id}:
 *  delete:
 *    summary: delete a type demande by id
 *    tags: [TypeDemande]
 *    parameters:
 *      - $ref: '#/components/parameters/typeDemandeId'
 *    responses:
 *      200:
 *        description: the type demande was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/TypeDemande'
 *      404:
 *        description: the type demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeDemandeNotFound'
 *
 */

 router.delete("/api/type-demande/:id", DeleteTypeDemande)

// =============================== FIN ROUTES TYPE DEMANDE =============================

// =============================== DEBUT ROUTES Pays =========================

// pays routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Pays:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: le nom du pays
 *        code:
 *          type: string
 *          description: le code du pays
 *      required:
 *        - nom
 *        - code
 *    PaysNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found pays
 *      example:
 *        msg: Pays non correspondante
 *
 *  parameters:
 *    PaysId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the pays id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Pays
 *  description: Pays endpoint
*/


/**
 * @swagger
 * /api/pays:
 *  get:
 *    summary: Returns a list of pays
 *    tags: [Pays]
 *    responses:
 *      200:
 *        description: the list of pays
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Pays'
 *        404:
 *          description: the pays was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PaysNotFound'
 */

 router.get("/api/pays", GetPays);


router.post("/api/pays", AddPays);

// ======================== END Pays routes ===================================


// ================================= DEBUT ROUTES ACCESS =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Access:
 *      type: object
 *      properties:
 *        type_access:
 *          type: array
 *          items:
 *            type: string
 *          description: le type d'accès correspondant
 *        composants:
 *          type: array
 *          items:
 *            type: string
 *          description: le composant correspondant
 *        actions:
 *          type: array
 *          items:
 *            type: string
 *          description: les actions correspondantes
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - type_access
 *        - composants
 *        - actions
 *        - statut_deleted
 *        
 *      example:
 *        type_access: [Lecture, Ecriture]
 *        composants: [Contrat, Role, Recrutement]
 *        actions: [Creation, Lecture, Modification, Suppression]
 *    AccessNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found access
 *      example:
 *        msg: Access non correspondante
 *
 *  parameters:
 *    AccessId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the access id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Access
 *  description: Access endpoint
*/

/**
 * @swagger
 * /api/access:
 *  post:
 *    summary: create a new access
 *    tags: [Access]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Access'
 *    responses:
 *      200:
 *        description: the access was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Access'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/access", AddAccess);

/**
 * @swagger
 * /api/access:
 *  get:
 *    summary: Returns a list of access
 *    tags: [Access]
 *    responses:
 *      200:
 *        description: the list of access
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Access'
 *        404:
 *          description: the access was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AccessNotFound'
 */

 router.get("/api/access", GetAccess);

 /**
 * @swagger
 * /api/access/{id}:
 *  get:
 *    summary: get the access by Id
 *    tags: [Access]
 *    parameters:
 *      - $ref: '#/components/parameters/AccessId'
 *    responses:
 *      200:
 *        description: The Found access
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Access'
 *      404:
 *        description: the access was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccessNotFound'
*/

router.get("/api/access/:id", GetAccessById);

/**
 * @swagger
 * /api/access/{id}:
 *  put:
 *    summary: Update an access by id
 *    tags: [Access]
 *    parameters:
 *      - $ref: '#/components/parameters/AccessId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Access'
 *    responses:
 *      200:
 *        description: The updated access 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Access'
 *      404:
 *        description: the access was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccessNotFound'
 *
 */

 router.put("/api/access/:id", UpdateAccess);

 /**
 * @swagger
 * /api/access/{id}:
 *  delete:
 *    summary: delete an access by id
 *    tags: [Access]
 *    parameters:
 *      - $ref: '#/components/parameters/AccessId'
 *    responses:
 *      200:
 *        description: the access was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Access'
 *      404:
 *        description: the access was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccessNotFound'
 *
*/

router.delete("/api/access/:id", DeleteAccess);

// ================================= FIN ROUTES ACCESS =========================

// ================================= DEBUT ROUTES EXPERIENCE PROFESSIONNELLE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    ExperienceProfessionnelle:
 *      type: object
 *      properties:
 *        date_debut:
 *          type: Date
 *          description: date de debut de l'expérience professionnelle
 *        date_fin:
 *          type: Date
 *          description: date de fin de l'expérience professionnelle
 *        poste:
 *          type: string
 *          description: le poste occupé pour l'expérience
 *        entreprise:
 *          type: string
 *          description: l'entreprise de l'expérience
 *        reference:
 *          type: Object
 *          items:
 *            type: string
 *          description: la référence de l'expérience au sein de l'entreprise
 *        taches:
 *          type: array
 *          items:
 *            type: string
 *          description: les taches correspondantes au sein de l'entreprise
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - date_debut
 *        - date_fin
 *        - poste
 *        - entreprise
 *        - reference
 *        - taches
 *        - statut_deleted
 *        
 *      example:
 *        date_debut: 2016-10-19
 *        date_fin: 2016-12-19
 *        poste: Stagiaire
 *        entreprise: BCC
 *        reference: {nom: me, telephone: +243892378711}
 *        taches: [Portail Bcc, Gestion, etc...]
 *    ExperienceNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found experience
 *      example:
 *        msg: Experience non correspondante
 *
 *  parameters:
 *    ExperienceId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the experience id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: ExperienceProfessionnelle
 *  description: Experience Professionnelle endpoint
*/

/**
 * @swagger
 * /api/experience-professionnelle:
 *  post:
 *    summary: create a new Experience Professionnelle
 *    tags: [ExperienceProfessionnelle]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ExperienceProfessionnelle'
 *    responses:
 *      200:
 *        description: the Experience Professionnelle was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ExperienceProfessionnelle'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/experience-professionnelle", AddExperience);

/**
 * @swagger
 * /api/experience-professionnelle:
 *  get:
 *    summary: Returns a list of ExperienceProfessionnelle
 *    tags: [ExperienceProfessionnelle]
 *    responses:
 *      200:
 *        description: the list of Experience Professionnelle
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ExperienceProfessionnelle'
 *        404:
 *          description: the Experience Professionnelle was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ExperienceNotFound'
 */

 router.get("/api/experience-professionnelle", GetExperiences);

 /**
 * @swagger
 * /api/experience-professionnelle/{id}:
 *  get:
 *    summary: get the Experience Professionnelle by Id
 *    tags: [ExperienceProfessionnelle]
 *    parameters:
 *      - $ref: '#/components/parameters/ExperienceId'
 *    responses:
 *      200:
 *        description: The Found Experience Professionnelle
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ExperienceProfessionnelle'
 *      404:
 *        description: the Experience Professionnelle was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ExperienceNotFound'
*/

router.get("/api/experience-professionnelle/:id", GetExperienceById);

/**
 * @swagger
 * /api/experience-professionnelle/{id}:
 *  put:
 *    summary: Update an Experience Professionnelle by id
 *    tags: [ExperienceProfessionnelle]
 *    parameters:
 *      - $ref: '#/components/parameters/ExperienceId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ExperienceProfessionnelle'
 *    responses:
 *      200:
 *        description: The updated Experience Professionnelle 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ExperienceProfessionnelle'
 *      404:
 *        description: the Experience Professionnelle was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ExperienceNotFound'
 *
 */

 router.put("/api/experience-professionnelle/:id", UpdateExperience);

 /**
 * @swagger
 * /api/experience-professionnelle/{id}:
 *  delete:
 *    summary: delete an Experience Professionnelle by id
 *    tags: [ExperienceProfessionnelle]
 *    parameters:
 *      - $ref: '#/components/parameters/ExperienceId'
 *    responses:
 *      200:
 *        description: the Experience Professionnelle was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ExperienceProfessionnelle'
 *      404:
 *        description: the experience was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ExperienceNotFound'
 *
*/

router.delete("/api/experience-professionnelle/:id", DeleteExperience);

// ================================= FIN ROUTES EXPERIENCE PROFESSIONNELLE =========================

// ================================= DEBUT ROUTES ETUDE FAITES =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    EtudeFaites:
 *      type: object
 *      properties:
 *        annee_debut:
 *          type: Date
 *          description: année de debut des études faites
 *        annee_fin:
 *          type: Date
 *          description: année de fin des études faites
 *        etablissement:
 *          type: string
 *          description: l'etablissement fréquenter lors des études faites
 *        filiale:
 *          type: string
 *          description: La filiale choisie
 *        diplome_obtenu:
 *          type: string
 *          description: Le diplôme obtenu
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - annee_debut
 *        - annee_fin
 *        - etablissement
 *        - filiale
 *        - diplome_obtenu
 *        - statut_deleted
 *        
 *      example:
 *        annee_debut: 2017-10-15
 *        annee_fin: 2019-09-23
 *        etablissement: Université Franco-Américaine
 *        filiale: Génie Logiciel
 *        diplome_obtenu: Licence
 *    EtudeFaitesNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found étude faites
 *      example:
 *        msg: Etude faites non correspondante
 *
 *  parameters:
 *    EtudeFaitesId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the étude faites id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: EtudeFaites
 *  description: Etude faites endpoint
*/

/**
 * @swagger
 * /api/etude-faites:
 *  post:
 *    summary: create a new Etude faites
 *    tags: [EtudeFaites]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EtudeFaites'
 *    responses:
 *      200:
 *        description: the Etude faites was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtudeFaites'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/etude-faites", AddEtudeFaites);

/**
 * @swagger
 * /api/etude-faites:
 *  get:
 *    summary: Returns a list of Etude faites
 *    tags: [EtudeFaites]
 *    responses:
 *      200:
 *        description: the list of Etude faites
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/EtudeFaites'
 *        404:
 *          description: the Etude faites was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/EtudeFaitesNotFound'
 */

 router.get("/api/etude-faites", GetEtudeFaites);

 /**
 * @swagger
 * /api/etude-faites/{id}:
 *  get:
 *    summary: get the Etude faites by Id
 *    tags: [EtudeFaites]
 *    parameters:
 *      - $ref: '#/components/parameters/EtudeFaitesId'
 *    responses:
 *      200:
 *        description: The Found Etude faites
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtudeFaites'
 *      404:
 *        description: the Etude faites was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtudeFaitesNotFound'
*/

router.get("/api/etude-faites/:id", GetEtudeFaitesById);

/**
 * @swagger
 * /api/etude-faites/{id}:
 *  put:
 *    summary: Update an Etude faites by id
 *    tags: [EtudeFaites]
 *    parameters:
 *      - $ref: '#/components/parameters/EtudeFaitesId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EtudeFaites'
 *    responses:
 *      200:
 *        description: The updated Etude faites 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtudeFaites'
 *      404:
 *        description: the Etude faites was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtudeFaitesNotFound'
 *
 */

 router.put("/api/etude-faites/:id", UpdateEtudeFaites);

 /**
 * @swagger
 * /api/etude-faites/{id}:
 *  delete:
 *    summary: delete an Etude faites by id
 *    tags: [EtudeFaites]
 *    parameters:
 *      - $ref: '#/components/parameters/EtudeFaitesId'
 *    responses:
 *      200:
 *        description: the Etude faites was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/EtudeFaites'
 *      404:
 *        description: the étude faites was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EtudeFaitesNotFound'
 *
*/

router.delete("/api/etude-faites/:id", DeleteEtudeFaites);

// ================================= FIN ROUTES ETUDE FAITES =========================

// ================================= DEBUT ROUTES DEPARTEMENT =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Departement:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du département
 *        departement_hierarchique:
 *          type: string
 *          description: Le nom du département hiérarchique
 *        directeur:
 *          type: Agent
 *          description: Le directeur du département
 *        directeur_adjoint:
 *          type: Agent
 *          description: Le directeur adjoint du département
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - nom
 *        
 *      example:
 *        nom: Juridique
 *        departement_hierarchique: temp
 *    DepartementNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found département
 *      example:
 *        msg: Département non correspondant
 *
 *  parameters:
 *    DepartementId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the département id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Departement
 *  description: département endpoint
*/

/**
 * @swagger
 * /api/departement:
 *  post:
 *    summary: create a new departement
 *    tags: [Departement]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Departement'
 *    responses:
 *      200:
 *        description: the département was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Departement'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/departement", AddDepartement);

/**
 * @swagger
 * /api/departement:
 *  get:
 *    summary: Returns a list of departement
 *    tags: [Departement]
 *    responses:
 *      200:
 *        description: the list of Département
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Departement'
 *        404:
 *          description: the département was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DepartementNotFound'
 */

 router.get("/api/departement", GetDepartements);

 /**
 * @swagger
 * /api/departement/{id}:
 *  get:
 *    summary: get the département by Id
 *    tags: [Departement]
 *    parameters:
 *      - $ref: '#/components/parameters/DepartementId'
 *    responses:
 *      200:
 *        description: The Found departement
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Departement'
 *      404:
 *        description: the département was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DepartementNotFound'
*/

router.get("/api/departement/:id", GetDepartementById);

/**
 * @swagger
 * /api/departement/{id}:
 *  put:
 *    summary: Update a departement by id
 *    tags: [Departement]
 *    parameters:
 *      - $ref: '#/components/parameters/DepartementId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Departement'
 *    responses:
 *      200:
 *        description: The updated département 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Departement'
 *      404:
 *        description: the département was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DepartementNotFound'
 *
 */

 router.put("/api/departement/:id", UpdateDepartement);

 /**
 * @swagger
 * /api/departement/{id}:
 *  delete:
 *    summary: delete a departement by id
 *    tags: [Departement]
 *    parameters:
 *      - $ref: '#/components/parameters/DepartementId'
 *    responses:
 *      200:
 *        description: the département was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Departement'
 *      404:
 *        description: the département was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DepartementNotFound'
 *
*/

router.delete("/api/departement/:id", DeleteDepartement);

// ================================= FIN ROUTES DEPARTEMENT =========================

// ================================= DEBUT ROUTES POSTE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Poste:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du département
 *        superviseur:
 *          type: string
 *          description: Le superviseur du poste
 *        poste_hierarchique:
 *          type: string
 *          description: Le poste hiérarchique correspondant au poste
 *        disponibilite_poste:
 *          type: string
 *          description: La disponibilité du poste 
 *        departement:
 *          type: Departement
 *          description: Le département lié au poste
 *        job_description:
 *          type: string
 *          description: Le job description lié au poste
 *        role:
 *          type: Role
 *          description: Le rôle lié au poste
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - nom
 *        - poste_hierarchique
 *        - disponibilite_poste
 *        - departement
 *        
 *      example:
 *        nom: Assistant juridique
 *        poste_hierarchique: Avocat
 *        disponibilite_poste: Poste non vacant
 *        departement: Juridique
 *        role: Assistant juridique
 *    PosteNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found poste
 *      example:
 *        msg: Poste non correspondant
 *
 *  parameters:
 *    posteId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the poste id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Poste
 *  description: Poste endpoint
*/

/**
 * @swagger
 * /api/poste:
 *  post:
 *    summary: create a new poste
 *    tags: [Poste]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Poste'
 *    responses:
 *      200:
 *        description: the poste was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Poste'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/poste", AddPoste);

/**
 * @swagger
 * /api/poste:
 *  get:
 *    summary: Returns a list of poste
 *    tags: [Poste]
 *    responses:
 *      200:
 *        description: the list of Poste
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Poste'
 *        404:
 *          description: the poste was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PosteNotFound'
 */

 router.get("/api/poste", GetPostes);

 /**
 * @swagger
 * /api/poste/{id}:
 *  get:
 *    summary: get the poste by Id
 *    tags: [Poste]
 *    parameters:
 *      - $ref: '#/components/parameters/PosteId'
 *    responses:
 *      200:
 *        description: The Found poste
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Poste'
 *      404:
 *        description: the poste was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PosteNotFound'
*/

router.get("/api/poste/:id", GetPosteById);

/**
 * @swagger
 * /api/poste/{id}:
 *  put:
 *    summary: Update a poste by id
 *    tags: [Poste]
 *    parameters:
 *      - $ref: '#/components/parameters/PosteId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Poste'
 *    responses:
 *      200:
 *        description: The updated poste 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Poste'
 *      404:
 *        description: the poste was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PosteNotFound'
 *
 */

 router.put("/api/poste/:id", UpdatePoste);

 /**
 * @swagger
 * /api/poste/{id}:
 *  delete:
 *    summary: delete a poste by id
 *    tags: [Poste]
 *    parameters:
 *      - $ref: '#/components/parameters/PosteId'
 *    responses:
 *      200:
 *        description: the poste was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Poste'
 *      404:
 *        description: the poste was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PosteNotFound'
 *
*/

router.delete("/api/poste/:id", DeletePoste);

// ================================= FIN ROUTES POSTE =========================

// ================================= DEBUT ROUTES ROLE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du role
 *        description:
 *          type: string
 *          description: La description du role
 *        access:
 *          type: Access
 *          description: L'Id de l'access
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - nom
 *        - access
 *      example:
 *        nom: Assistant juridique
 *        description: Le role assistant juridique
 *        access: 626e3ec6b7e55a7a8598e188
 *    RoleNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found role
 *      example:
 *        msg: Role non correspondant
 *
 *  parameters:
 *    roleId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the role id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Role endpoint
*/

/**
 * @swagger
 * /api/role:
 *  post:
 *    summary: create a new role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: the role was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/role", AddRole);

/**
 * @swagger
 * /api/role:
 *  get:
 *    summary: Returns a list of role
 *    tags: [Role]
 *    responses:
 *      200:
 *        description: the list of Role
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Role'
 *        404:
 *          description: the role was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleNotFound'
 */

 router.get("/api/role", GetRoles);

 /**
 * @swagger
 * /api/role/{id}:
 *  get:
 *    summary: get the role by Id
 *    tags: [Role]
 *    parameters:
 *      - $ref: '#/components/parameters/RoleId'
 *    responses:
 *      200:
 *        description: The Found role
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Role'
 *      404:
 *        description: the role was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleNotFound'
*/

router.get("/api/role/:id", GetRoleById);

/**
 * @swagger
 * /api/role/{id}:
 *  put:
 *    summary: Update a role by id
 *    tags: [Role]
 *    parameters:
 *      - $ref: '#/components/parameters/RoleId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: The updated role 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Role'
 *      404:
 *        description: the role was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleNotFound'
 *
 */

 router.put("/api/role/:id", UpdateRole);

 /**
 * @swagger
 * /api/role/{id}:
 *  delete:
 *    summary: delete a role by id
 *    tags: [Role]
 *    parameters:
 *      - $ref: '#/components/parameters/RoleId'
 *    responses:
 *      200:
 *        description: the role was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Role'
 *      404:
 *        description: the role was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleNotFound'
 *
*/

router.delete("/api/role/:id", DeleteRole);

// ================================= FIN ROUTES ROLE =========================

// ================================= DEBUT ROUTES AGENT =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Agent:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom de l'agent
 *        postnom:
 *          type: string
 *          description: Le postnom de l'agent
 *        prenom:
 *          type: string
 *          description: Le prénom de l'agent
 *        date_naissance:
 *          type: Date
 *          description: La date de naissance de l'agent
 *        lieu_naissance:
 *          type: string
 *          description: Le lieu de naissance de l'agent
 *        telephone:
 *          type: string
 *          description: Le numéro de téléphone de l'agent
 *        nationalite:
 *          type: Pays
 *          description: La nationalité de l'agent
 *        poste:
 *          type: Poste
 *          description: Le poste de l'agent
 *        etat_civil:
 *          type: EtatCivil
 *          description: L'état-civil' de l'agent
 *        status_syndical:
 *          type: string
 *          description: Le statut syndical de l'agent
 *        sexe:
 *          type: Genre
 *          description: Le sexe de l'agent
 *        niveau_etude:
 *          type: NiveauEtude
 *          description: Le niveau d'étude de l'agent
 *        email:
 *          type: string
 *          description: L'email de l'agent
 *        password:
 *          type: string
 *          description: Le mot de passe de l'agent
 *        adresse:
 *          type: string
 *          description: L'adresse domicilaire de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - matricule
 *        - nom
 *        - prenom
 *        - date_naissance
 *        - lieu_naissance
 *        - telephone
 *        - nationalite
 *        - poste
 *        - etat_civil
 *        - sexe
 *        - niveau_etude
 *        - adresse
 *        - status_syndical
 *        - nationalite
 *        - email
 *        - password
 *      example:
 *        matricule: ag3214785
 *        nom: bakongo
 *        postnom: diamekaka
 *        prenom: hervé
 *        date_naissance: 1997-03-05
 *        lieu_naissance: Matadi
 *        telephone: +243892378711
 *        poste: ASSISTANT JURIDIQUE
 *        etat_civil: célibataire
 *        sexe: Homme
 *        niveau_etude: licence
 *        adresse: Miao n°5-Kinshasa/Lemba
 *        email: herdiebakongo@gmail.com
 *        password: hello
 *        status_syndical: Oui
 *        nationalite: Congo (Rép. dém.)
 *    AgentNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found agent
 *      example:
 *        msg: Agent non correspondant
 *
 *  parameters:
 *    agentId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the agent id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Agent
 *  description: Agent endpoint
*/

/**
 * @swagger
 * /api/agent:
 *  post:
 *    summary: create a new role
 *    tags: [Agent]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Agent'
 *    responses:
 *      200:
 *        description: the agent was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agent'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/agent", AddAgent);

/**
 * @swagger
 * /api/agent:
 *  get:
 *    summary: Returns a list of agents
 *    tags: [Agent]
 *    responses:
 *      200:
 *        description: the list of agent
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agent'
 *        404:
 *          description: the agent was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AgentNotFound'
 */

 router.get("/api/agent", GetAgents);

 /**
 * @swagger
 * /api/agent/{id}:
 *  get:
 *    summary: get the agent by Id
 *    tags: [Agent]
 *    parameters:
 *      - $ref: '#/components/parameters/agentId'
 *    responses:
 *      200:
 *        description: The Found agent
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Agent'
 *      404:
 *        description: the agent was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AgentNotFound'
*/

router.get("/api/agent/:id", GetAgentById);

/**
 * @swagger
 * /api/agent/{id}:
 *  put:
 *    summary: Update an agent by id
 *    tags: [Agent]
 *    parameters:
 *      - $ref: '#/components/parameters/agentId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Agent'
 *    responses:
 *      200:
 *        description: The updated agent 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Agent'
 *      404:
 *        description: the agent was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AgentNotFound'
 *
 */

 router.put("/api/agent/:id", UpdateAgent);

 /**
 * @swagger
 * /api/agent/{id}:
 *  delete:
 *    summary: delete a agent by id
 *    tags: [Agent]
 *    parameters:
 *      - $ref: '#/components/parameters/agentId'
 *    responses:
 *      200:
 *        description: the agent was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Agent'
 *      404:
 *        description: the agent was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AgentNotFound'
 *
*/

router.delete("/api/agent/:id", DeleteAgent);

// ================================= FIN ROUTES AGENT =========================

// ================================= DEBUT ROUTES DEMANDE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Demande:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom de la demande
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        description:
 *          type: string
 *          description: La description de la demande
 *        type_demande:
 *          type: TypeDemande
 *          description: Le type de la demande
 *        documents:
 *          type: Array
 *          items:
 *            type: string
 *          description: Le lieu de naissance de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - nom
 *        - agent
 *        - description
 *        - type_demande
 *      example:
 *        nom: Ma demande
 *        agent: AG3214785
 *        description: Ma demande est lié au congé
 *        type_demande: DEMANDE DE CONGÉ
 *    DemandeNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found demande
 *      example:
 *        msg: Demande non correspondant
 *
 *  parameters:
 *    demandeId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the demande id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Demande
 *  description: Demande endpoint
*/

/**
 * @swagger
 * /api/demande:
 *  post:
 *    summary: create a new demande
 *    tags: [Demande]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Demande'
 *    responses:
 *      200:
 *        description: the demande was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Demande'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/demande", AddDemande);

/**
 * @swagger
 * /api/demande:
 *  get:
 *    summary: Returns a list of demandes
 *    tags: [Demande]
 *    responses:
 *      200:
 *        description: the list of demande
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Demande'
 *        404:
 *          description: the demande was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DemandeNotFound'
 */

 router.get("/api/demande", GetDemandes);

 /**
 * @swagger
 * /api/demande/{id}:
 *  get:
 *    summary: get the demande by Id
 *    tags: [Demande]
 *    parameters:
 *      - $ref: '#/components/parameters/demandeId'
 *    responses:
 *      200:
 *        description: The Found demande
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Demande'
 *      404:
 *        description: the demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DemandeNotFound'
*/

router.get("/api/demande/:id", GetDemandeById);

/**
 * @swagger
 * /api/demande/{id}:
 *  put:
 *    summary: Update a demande by id
 *    tags: [Demande]
 *    parameters:
 *      - $ref: '#/components/parameters/demandeId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Demande'
 *    responses:
 *      200:
 *        description: The updated demande 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Demande'
 *      404:
 *        description: the demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DemandeNotFound'
 *
 */

 router.put("/api/demande/:id", UpdateDemande);

 /**
 * @swagger
 * /api/demande/{id}:
 *  delete:
 *    summary: delete a demande by id
 *    tags: [Demande]
 *    parameters:
 *      - $ref: '#/components/parameters/demandeId'
 *    responses:
 *      200:
 *        description: the demande was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Demande'
 *      404:
 *        description: the demande was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DemandeNotFound'
 *
*/

router.delete("/api/demande/:id", DeleteDemande);

// ================================= FIN ROUTES DEMANDE =========================

// ================================= DEBUT ROUTES NOTE DE FRAIS =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    NoteFrais:
 *      type: object
 *      properties:
 *        intitule_mission:
 *          type: string
 *          description: L'intitulé de la mission
 *        devise:
 *          type: string
 *          description: La dévise du frais de mission
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        date_debut_mission:
 *          type: Date
 *          description: La date du début de la mission
 *        date_fin_mission:
 *          type: Date
 *          description: La date de fin de la mission
 *        frais_mission:
 *          type: float
 *          description: Le frais de la mission
 *        document_mission:
 *          type: array
 *          items:
 *            type: string
 *          description: Le frais de la mission
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *  
 *      required:
 *        - intitule_mission
 *        - agent
 *        - date_debut_mission
 *        - date_fin_mission
 *        - frais_mission
 *        - devise
 *      example:
 *        intitule_mission: Ma mission de service
 *        agent: AG3214785
 *        date_debut_mission: 2022-05-06
 *        date_fin_mission: 2022-05-17
 *        frais_mission: 500
 *        devise: USD
 *    NoteFraisNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found note de frais
 *      example:
 *        msg: Note de frais non correspondant
 *
 *  parameters:
 *    noteFraisId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the note frais id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: NoteFrais
 *  description: NoteFrais endpoint
*/

/**
 * @swagger
 * /api/note-frais:
 *  post:
 *    summary: create a new note frais
 *    tags: [NoteFrais]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NoteFrais'
 *    responses:
 *      200:
 *        description: the note frais was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoteFrais'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/note-frais", AddNoteFrais);

/**
 * @swagger
 * /api/note-frais:
 *  get:
 *    summary: Returns a list of note frais
 *    tags: [NoteFrais]
 *    responses:
 *      200:
 *        description: the list of note frais
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/NoteFrais'
 *        404:
 *          description: the note frais was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NoteFraisNotFound'
 */

 router.get("/api/note-frais", GetNoteFrais);

 /**
 * @swagger
 * /api/note-frais/{id}:
 *  get:
 *    summary: get the note frais by Id
 *    tags: [NoteFrais]
 *    parameters:
 *      - $ref: '#/components/parameters/noteFraisId'
 *    responses:
 *      200:
 *        description: The Found note frais
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NoteFrais'
 *      404:
 *        description: the note frais was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoteFraisNotFound'
*/

router.get("/api/note-frais/:id", GetNoteFraisById);

/**
 * @swagger
 * /api/note-frais/{id}:
 *  put:
 *    summary: Update a note de frais by id
 *    tags: [NoteFrais]
 *    parameters:
 *      - $ref: '#/components/parameters/noteFraisId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NoteFrais'
 *    responses:
 *      200:
 *        description: The updated note frais 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NoteFrais'
 *      404:
 *        description: the note frais was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoteFraisNotFound'
 *
 */

 router.put("/api/note-frais/:id", UpdateNoteFrais);

 /**
 * @swagger
 * /api/note-frais/{id}:
 *  delete:
 *    summary: delete a note frais by id
 *    tags: [NoteFrais]
 *    parameters:
 *      - $ref: '#/components/parameters/noteFraisId'
 *    responses:
 *      200:
 *        description: the note frais was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/NoteFrais'
 *      404:
 *        description: the note frais was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoteFraisNotFound'
 *
*/

router.delete("/api/note-frais/:id", DeleteNoteFrais);

// ================================= FIN ROUTES NOTE DE FRAIS =========================

// ================================= DEBUT ROUTES PRESENCE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    Presence:
 *      type: object
 *      properties:
 *        status:
 *          type: Status
 *          description: Le status de la présence
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        date_heure_arriver:
 *          type: Date
 *          description: La date et l'heure d'arriver de l'agent
 *        date_heure_depart:
 *          type: Date
 *          description: La date et l'heure de départ de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - status
 *        - agent
 *      example:
 *        status: Présent
 *        agent: AG3214785
 *        date_heure_arriver: 2022-05-06T10:33
 *        date_heure_depart: 2022-05-17T18:33
 *    PresenceNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found présence
 *      example:
 *        msg: Présence non correspondante
 *
 *  parameters:
 *    presenceId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the présence id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Presence
 *  description: Presence endpoint
*/

/**
 * @swagger
 * /api/presence:
 *  post:
 *    summary: create a new présence
 *    tags: [Presence]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Presence'
 *    responses:
 *      200:
 *        description: the presence was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Presence'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/presence", AddPresence);

/**
 * @swagger
 * /api/presence:
 *  get:
 *    summary: Returns a list of présence
 *    tags: [Presence]
 *    responses:
 *      200:
 *        description: the list of présence
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Presence'
 *        404:
 *          description: the présence was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PresenceNotFound'
 */

 router.get("/api/presence", GetPresences);

 /**
 * @swagger
 * /api/presence/{id}:
 *  get:
 *    summary: get the presence by Id
 *    tags: [Presence]
 *    parameters:
 *      - $ref: '#/components/parameters/presenceId'
 *    responses:
 *      200:
 *        description: The Found presence
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Presence'
 *      404:
 *        description: the présence was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PresenceNotFound'
*/

router.get("/api/presence/:id", GetPresenceById);

/**
 * @swagger
 * /api/presence/{id}:
 *  put:
 *    summary: Update a presence by id
 *    tags: [Presence]
 *    parameters:
 *      - $ref: '#/components/parameters/presenceId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Presence'
 *    responses:
 *      200:
 *        description: The updated présence 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Presence'
 *      404:
 *        description: the présence was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PresenceNotFound'
 *
 */

 router.put("/api/presence/:id", UpdatePresence);

 /**
 * @swagger
 * /api/presence/{id}:
 *  delete:
 *    summary: delete a présence by id
 *    tags: [Presence]
 *    parameters:
 *      - $ref: '#/components/parameters/presenceId'
 *    responses:
 *      200:
 *        description: the présence was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Presence'
 *      404:
 *        description: the présence was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PresenceNotFound'
 *
*/

router.delete("/api/presence/:id", DeletePresence);

// ================================= FIN ROUTES PRESENCE =========================

// ================================= DEBUT ROUTES FICHE PAIE =======================

/**
 * @swagger
 * components:
 *  schemas:
 *    FichePaie:
 *      type: object
 *      properties:
 *        salaire_brut:
 *          type: number
 *          description: Le salaire brut
 *        salaire_net:
 *          type: number
 *          description: Le salaire net
 *        cession_salaire:
 *          type: number
 *          description: La cession sur salaire
 *        saisie_salaire:
 *          type: number
 *          description: La saisie sur salaire
 *        acompte:
 *          type: number
 *          description: L'acompte sur salaire
 *        heure_supplementaire:
 *          type: integer
 *          description: Le nombres d'heures supplémentaires
 *        remboursement:
 *          type: number
 *          description: Le remboursement d'un pret
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        prime:
 *          type: number
 *          description: La prime
 *        allocation_familiale:
 *          type: string
 *          description: L'allocation familiale de l'agent
 *        nombre_enfants:
 *          type: number
 *          description: Le nombre d'enfants de l'agent
 *        loyer:
 *          type: number
 *          description: Le loyer de l'agent
 *        impot:
 *          type: number
 *          description: L'impôt de l'agent
 *        cotisation_sociale:
 *          type: number
 *          description: La cotisation sociale de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - salaire_brut
 *        - salaire_net
 *        - cession_salaire
 *        - saisie_salaire
 *        - acompte
 *        - heure_supplementaire
 *        - remboursement
 *        - prime
 *        - allocation_familiale
 *        - agent
 *      example:
 *        salaire_brut: 30
 *        salaire_net: 30
 *        cession_salaire: 5
 *        saisie_salaire: 5
 *        acompte: 5
 *        heure_supplementaire: 3
 *        remboursement: 2
 *        prime: 10
 *        allocation_familiale: Non
 *        agent: AG3214785
 *    FichePaieNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found fiche de paie
 *      example:
 *        msg: Fiche de paie non correspondante
 *
 *  parameters:
 *    fichePaieId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the fiche paie id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: FichePaie
 *  description: Fiche paie endpoint
*/

/**
 * @swagger
 * /api/fiche-paie:
 *  post:
 *    summary: create a new fiche de paie
 *    tags: [FichePaie]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FichePaie'
 *    responses:
 *      200:
 *        description: the fiche paie was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FichePaie'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/fiche-paie", AddFichePaie);

/**
 * @swagger
 * /api/fiche-paie:
 *  get:
 *    summary: Returns a list of fiche paie
 *    tags: [FichePaie]
 *    responses:
 *      200:
 *        description: the list of fiche de paie
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/FichePaie'
 *        404:
 *          description: the fiche paie was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FichePaieNotFound'
 */

 router.get("/api/fiche-paie", GetFichePaies);

 /**
 * @swagger
 * /api/fiche-paie/{id}:
 *  get:
 *    summary: get the fiche paie by Id
 *    tags: [FichePaie]
 *    parameters:
 *      - $ref: '#/components/parameters/fichePaieId'
 *    responses:
 *      200:
 *        description: The Found fiche de paie
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/FichePaie'
 *      404:
 *        description: the fiche paie was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FichePaieNotFound'
*/

router.get("/api/fiche-paie/:id", GetFichePaieById);

/**
 * @swagger
 * /api/fiche-paie/{id}:
 *  put:
 *    summary: Update a fiche paie by id
 *    tags: [FichePaie]
 *    parameters:
 *      - $ref: '#/components/parameters/fichePaieId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FichePaie'
 *    responses:
 *      200:
 *        description: The updated fiche de paie 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/FichePaie'
 *      404:
 *        description: the fiche de paie was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FichePaieNotFound'
 *
 */

 router.put("/api/fiche-paie/:id", UpdateFichePaie);

 /**
 * @swagger
 * /api/fiche-paie/{id}:
 *  delete:
 *    summary: delete a fiche paie by id
 *    tags: [FichePaie]
 *    parameters:
 *      - $ref: '#/components/parameters/fichePaieId'
 *    responses:
 *      200:
 *        description: the fiche paie was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/FichePaie'
 *      404:
 *        description: the fiche paie was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FichePaieNotFound'
 *
*/

router.delete("/api/fiche-paie/:id", DeleteFichePaie);

// ================================= FIN ROUTES FICHE PAIE =========================

// ================================= DEBUT ROUTES CONTRAT ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Contrat:
 *      type: object
 *      properties:
 *        description:
 *          type: string
 *          description: La description du contrat de l'agent
 *        type_contrat:
 *          type: TypeContrat
 *          description: Le type de contrat de l'agent
 *        poste:
 *          type: Poste
 *          description: Le poste de l'agent
 *        salaire_base:
 *          type: number
 *          description: Le salaire de base de l'agent
 *        volume_horaire:
 *          type: number
 *          description: Le volume horaire de l'agent
 *        unite_horaire:
 *          type: string
 *          description: L'unité horaire de l'agent
 *        date_debut_contrat:
 *          type: Date
 *          description: La date du début de contrat de l'agent
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        date_fin_contrat:
 *          type: Date
 *          description: La date du fin de contrat de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - type_contrat
 *        - poste
 *        - salaire_base
 *        - volume_horaire
 *        - unite_horaire
 *        - date_debut_contrat
 *        - date_fin_contrat
 *        - agent
 *      example:
 *        type_contrat: CDD
 *        description: le contrat de l'agent est à durée indeterminer
 *        poste: ASSISTANT JURIDIQUE
 *        salaire_base: 300
 *        volume_horaire: 8
 *        unite_horaire: jour
 *        date_debut_contrat: 2022-05-11
 *        date_fin_contrat: 2035-05-11
 *        agent: AG3214785
 *    ContratNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found contrat
 *      example:
 *        msg: Contrat non correspondant
 *
 *  parameters:
 *    contratId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the contrat id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Contrat
 *  description: Contrat endpoint
*/

/**
 * @swagger
 * /api/contrat:
 *  post:
 *    summary: create a new contrat
 *    tags: [Contrat]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contrat'
 *    responses:
 *      200:
 *        description: the contrat was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contrat'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/contrat", AddContrat);

/**
 * @swagger
 * /api/contrat:
 *  get:
 *    summary: Returns a list of contrats
 *    tags: [Contrat]
 *    responses:
 *      200:
 *        description: the list of contrat
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Contrat'
 *        404:
 *          description: the contrat was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContratNotFound'
 */

 router.get("/api/contrat", GetContrats);

 /**
 * @swagger
 * /api/contrat/{id}:
 *  get:
 *    summary: get the contrat by Id
 *    tags: [Contrat]
 *    parameters:
 *      - $ref: '#/components/parameters/contratId'
 *    responses:
 *      200:
 *        description: The Found contrat
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Contrat'
 *      404:
 *        description: the contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ContratNotFound'
*/

router.get("/api/contrat/:id", GetContratById);

/**
 * @swagger
 * /api/contrat/{id}:
 *  put:
 *    summary: Update a contrat by id
 *    tags: [Contrat]
 *    parameters:
 *      - $ref: '#/components/parameters/contratId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contrat'
 *    responses:
 *      200:
 *        description: The updated contrat 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Contrat'
 *      404:
 *        description: the contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ContratNotFound'
 *
 */

 router.put("/api/contrat/:id", UpdateContrat);

 /**
 * @swagger
 * /api/contrat/{id}:
 *  delete:
 *    summary: delete a contrat by id
 *    tags: [Contrat]
 *    parameters:
 *      - $ref: '#/components/parameters/contratId'
 *    responses:
 *      200:
 *        description: the contrat was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Contrat'
 *      404:
 *        description: the contrat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ContratNotFound'
 *
*/

router.delete("/api/contrat/:id", DeleteContrat);

// ================================= FIN ROUTES CONTRAT =========================

// ================================= DEBUT ROUTES CONGE ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Conge:
 *      type: object
 *      properties:
 *        date_debut:
 *          type: Date
 *          description: La date du début de congé de l'agent
 *        date_fin:
 *          type: Date
 *          description: La date de fin de congé de l'agent
 *        status:
 *          type: Status
 *          description: Le status du congé de l'agent 
 *        type_conge:
 *          type: TypeConge
 *          description: Le type de congé de l'agent
 *        agent:
 *          type: string
 *          description: Le numéro matricule de l'agent
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - date_debut
 *        - date_fin
 *        - status
 *        - type_conge
 *        - agent
 *      example:
 *        date_debut: 2022-05-25
 *        date_fin: 2022-06-25
 *        status: Approuvé
 *        type_conge: Maladie
 *        agent: AG3214785
 *    CongeNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found congé
 *      example:
 *        msg: Congé non correspondant
 *
 *  parameters:
 *    congeId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the congé id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Conge
 *  description: Conge endpoint
*/

/**
 * @swagger
 * /api/conge:
 *  post:
 *    summary: create a new congé
 *    tags: [Conge]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Conge'
 *    responses:
 *      200:
 *        description: the congé was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Conge'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/conge", AddConge);

/**
 * @swagger
 * /api/conge:
 *  get:
 *    summary: Returns a list of congés
 *    tags: [Conge]
 *    responses:
 *      200:
 *        description: the list of congé
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Conge'
 *        404:
 *          description: the congé was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CongeNotFound'
 */

 router.get("/api/conge", GetConges);

 /**
 * @swagger
 * /api/conge/{id}:
 *  get:
 *    summary: get the congé by Id
 *    tags: [Conge]
 *    parameters:
 *      - $ref: '#/components/parameters/congeId'
 *    responses:
 *      200:
 *        description: The Found congé
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Conge'
 *      404:
 *        description: the congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CongeNotFound'
*/

router.get("/api/conge/:id", GetCongeById);

/**
 * @swagger
 * /api/conge/{id}:
 *  put:
 *    summary: Update a congé by id
 *    tags: [Conge]
 *    parameters:
 *      - $ref: '#/components/parameters/congeId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Conge'
 *    responses:
 *      200:
 *        description: The updated congé 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Conge'
 *      404:
 *        description: the congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CongeNotFound'
 *
 */

 router.put("/api/conge/:id", UpdateConge);

 /**
 * @swagger
 * /api/conge/{id}:
 *  delete:
 *    summary: delete a conge by id
 *    tags: [Conge]
 *    parameters:
 *      - $ref: '#/components/parameters/congeId'
 *    responses:
 *      200:
 *        description: the congé was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Conge'
 *      404:
 *        description: the congé was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CongeNotFound'
 *
*/

router.delete("/api/conge/:id", DeleteConge);

// ================================= FIN ROUTES CONGE =========================

// ================================= DEBUT ROUTES LANGUE ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Langue:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom de la langue
 *        description:
 *          type: string
 *          description: La description de la langue
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - nom
 *      example:
 *        nom: français
 *        description: La langue française
 *    LangueNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found langue
 *      example:
 *        msg: Langue non correspondante
 *
 *  parameters:
 *    langueId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the langue id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Langue
 *  description: Langue endpoint
*/

/**
 * @swagger
 * /api/langue:
 *  post:
 *    summary: create a new langue
 *    tags: [Langue]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Langue'
 *    responses:
 *      200:
 *        description: the langue was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Langue'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/langue", AddLangue);

/**
 * @swagger
 * /api/langue:
 *  get:
 *    summary: Returns a list of langues
 *    tags: [Langue]
 *    responses:
 *      200:
 *        description: the list of langues
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Langue'
 *        404:
 *          description: the langue was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LangueNotFound'
 */

 router.get("/api/langue", GetLangues);

 /**
 * @swagger
 * /api/langue/{id}:
 *  get:
 *    summary: get the langue by Id
 *    tags: [Langue]
 *    parameters:
 *      - $ref: '#/components/parameters/langueId'
 *    responses:
 *      200:
 *        description: The Found langue
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Langue'
 *      404:
 *        description: the langue was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LangueNotFound'
*/

router.get("/api/langue/:id", GetLangueById);

/**
 * @swagger
 * /api/langue/{id}:
 *  put:
 *    summary: Update a langue by id
 *    tags: [Langue]
 *    parameters:
 *      - $ref: '#/components/parameters/langueId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Langue'
 *    responses:
 *      200:
 *        description: The updated langue 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Langue'
 *      404:
 *        description: the langue was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LangueNotFound'
 *
 */

 router.put("/api/langue/:id", UpdateLangue);

 /**
 * @swagger
 * /api/langue/{id}:
 *  delete:
 *    summary: delete a langue by id
 *    tags: [Langue]
 *    parameters:
 *      - $ref: '#/components/parameters/langueId'
 *    responses:
 *      200:
 *        description: the langue was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Langue'
 *      404:
 *        description: the langue was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LangueNotFound'
 *
*/

router.delete("/api/langue/:id", DeleteLangue);

// ================================= FIN ROUTES LANGUE =========================


// ================================= DEBUT ROUTES CANDIDAT ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Candidat:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Le nom du candidat
 *        postnom:
 *          type: string
 *          description: Le postnom du candidat
 *        prenom:
 *          type: string
 *          description: Le prénom du candidat
 *        date_naissance:
 *          type: Date
 *          description: La date de naissance du candidat
 *        lieu_naissance:
 *          type: string
 *          description: Le lieu de naissance du candidat
 *        telephone:
 *          type: string
 *          description: Le numéro de téléphone du candidat
 *        nationalite:
 *          type: string
 *          description: La nationalité du candidat
 *        etat_civil:
 *          type: EtatCivil
 *          description: L'état-civil du candidat
 *        sexe:
 *          type: Genre
 *          description: Le sexe du candidat
 *        avatar:
 *          type: string
 *          description: Le chemin de la photo du candidat
 *        email:
 *          type: string
 *          description: L'adresse mail du candidat
 *        etudes_faites:
 *          type: array
 *          items:
 *            type: object
 *          description: Les informations liées aux études faites par le candidat
 *        date_debut_etude:
 *          type: Date
 *          description: La date du début des études faites par le candidat
 *        date_fin_etude:
 *          type: Date
 *          description: La date de fin des études faites par le candidat
 *        etablissement:
 *          type: string
 *          description: L'établissement des études faites par le candidat
 *        filiale:
 *          type: string
 *          description: La filiale des études faites par le candidat
 *        diplome_obtenu:
 *          type: string
 *          description: Le diplôme obtenu des études faites par le candidat
 *        experience_professionnelle:
 *          type: array
 *          items:
 *            type: object
 *          description: Les informations liées aux expériences professionnelles du candidat
 *        date_debut_exp:
 *          type: Date
 *          description: La date du début de l'expérience du candidat
 *        date_fin_exp:
 *          type: Date
 *          description: La date de fin de l'expérience du candidat
 *        poste:
 *          type: string
 *          description: Le poste de l'expérience du candidat
 *        entreprise:
 *          type: string
 *          description: L'entreprise de l'expérience du candidat
 *        reference:
 *          type: array
 *          items:
 *            type: string
 *          description: Les références de l'expérience du candidat
 *        competences:
 *          type: array
 *          items:
 *            type: string
 *          description: Les compétences du candidat
 *        motivation:
 *          type: string
 *          description: Les mots de motivations du candidat
 *        langue:
 *          type: Langue
 *          description: La langue du candidat
 *        parlee:
 *          type: string
 *          description: Le niveau diction de la langue parler par le candidat
 *        ecrit:
 *          type: string
 *          description: Le niveau écrit de la langue parler par le candidat
 *        nom_ref:
 *          type: string
 *          description: Le nom du réfrent du candidat
 *        telephone_ref:
 *          type: string
 *          description: Le téléphone du réfrent du candidat
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - nom
 *        - prenom
 *        - date_naissance
 *        - lieu_naissance
 *        - telephone
 *        - nationalite
 *        - etat_civil
 *        - sexe
 *        - email
 *        - date_debut_etude
 *        - date_fin_etude
 *        - etablissement
 *        - filiale
 *        - diplome_obtenu
 *        - date_debut_exp
 *        - date_fin_exp
 *        - poste
 *        - entreprise
 *        - nom_ref
 *        - telephone_ref
 *        - competences
 *        - motivation
 *        - langue
 *        - parlee
 *        - ecrit
 *      example:
 *        nom: BAKONGO
 *        postnom: DIAMEKAKA
 *        prenom: Hervé
 *        date_naissance: 1997-03-05
 *        lieu_naissance: Matadi
 *        telephone: +243892378711
 *        nationalite: Congo (Rép. dém.)
 *        etat_civil: Célibataire
 *        sexe: Homme
 *        email: herdiebakongo@gmail.com
 *        date_debut_etude: 2017-10-15
 *        date_fin_etude: 2019-09-26
 *        etablissement: UFA
 *        filiale: Génie Logiciel
 *        diplome_obtenu: Licence
 *        date_debut_exp: 2021-09-20
 *        date_fin_exp: 2024-01-10
 *        poste: Développeur javascript fullstack
 *        entreprise: Emergence
 *        nom_ref: Nandoy 
 *        telephone_ref: +243892378711
 *        competences: [Nodejs, Angular]
 *        motivation: Besoin d'être là
 *        langue: Français
 *        parlee: Maternelle
 *        ecrit: Avancé
 *    CandidatNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found candidat
 *      example:
 *        msg: Candidat non correspondant
 *
 *  parameters:
 *    candidatId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the candidat id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Candidat
 *  description: Candidat endpoint
*/

/**
 * @swagger
 * /api/candidat:
 *  post:
 *    summary: create a new candidat
 *    tags: [Candidat]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Candidat'
 *    responses:
 *      200:
 *        description: the candidat was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Candidat'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/candidat", AddCandidat);

/**
 * @swagger
 * /api/candidat:
 *  get:
 *    summary: Returns a list of candidats
 *    tags: [Candidat]
 *    responses:
 *      200:
 *        description: the list of candidats
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Candidat'
 *        404:
 *          description: the candidat was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CandidatNotFound'
 */

 router.get("/api/candidat", GetCandidats);

 /**
 * @swagger
 * /api/candidat/{id}:
 *  get:
 *    summary: get the candidat by Id
 *    tags: [Candidat]
 *    parameters:
 *      - $ref: '#/components/parameters/candidatId'
 *    responses:
 *      200:
 *        description: The Found candidat
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Candidat'
 *      404:
 *        description: the candidat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CandidatNotFound'
*/

router.get("/api/candidat/:id", GetCandidatById);

/**
 * @swagger
 * /api/candidat/{id}:
 *  put:
 *    summary: Update a candidat by id
 *    tags: [Candidat]
 *    parameters:
 *      - $ref: '#/components/parameters/candidatId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Candidat'
 *    responses:
 *      200:
 *        description: The updated candidat 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Candidat'
 *      404:
 *        description: the candidat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CandidatNotFound'
 *
 */

 router.put("/api/candidat/:id", UpdateCandidat);

 /**
 * @swagger
 * /api/candidat/{id}:
 *  delete:
 *    summary: delete a candidat by id
 *    tags: [Candidat]
 *    parameters:
 *      - $ref: '#/components/parameters/candidatId'
 *    responses:
 *      200:
 *        description: the candidat was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Candidat'
 *      404:
 *        description: the candidat was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CandidatNotFound'
 *
*/

router.delete("/api/candidat/:id", DeleteCandidat);

// ================================= FIN ROUTES CANDIDAT =========================

// ================================= DEBUT ROUTES RECRUTEMENT ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Recrutement:
 *      type: object
 *      properties:
 *        job_description:
 *          type: string
 *          description: Le job description du poste pourvu au recrutement
 *        type_contrat:
 *          type: array
 *          items:
 *            type: string
 *          description: Les types de contrat pour le recrutement
 *        candidat:
 *          type: array
 *          items:
 *            type: string
 *          description: Les candidats recrutés
 *        recruteur:
 *          type: array
 *          items:
 *            type: string
 *          description: Les recruteurs
 *        debut_recrutement:
 *          type: Date
 *          description: La date du debut de recrutement
 *        fin_recrutement:
 *          type: Date
 *          description: La date du fin de recrutement
 *        poste:
 *          type: string
 *          description: Le poste pourvu au recrutement
 *        nombre_poste:
 *          type: number
 *          description: Le nombre de poste pourvu au recrutement
 *        date_deleted:
 *          type: Date
 *          description: La date de suppression
 *        statut_deleted:
 *          type: Statut
 *          description: Le statut de suppression
 *      required:
 *        - job_description
 *        - type_contrat
 *        - candidat
 *        - debut_recrutement
 *        - fin_recrutement
 *        - poste
 *        - recruteur
 *        - nombre_poste
 *      example:
 *        job_description: Poste pour un assistant juridique 
 *        type_contrat: [626e25d79cc2db5a1b80494e, 626e25e59cc2db5a1b804952] 
 *        candidat: [627f4b0db00d06736ce5a34b] 
 *        debut_recrutement: 2022-03-05
 *        fin_recrutement: 2022-04-15
 *        poste: ASSISTANT JURIDIQUE
 *        recruteur: [62737e888ddd636338c924a5]
 *        nombre_poste: 3
 *    RecrutementNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found recrutement
 *      example:
 *        msg: Recrutement non correspondant
 *
 *  parameters:
 *    recrutementId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the recrutement id
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Recrutement
 *  description: Recrutement endpoint
*/

/**
 * @swagger
 * /api/recrutement:
 *  post:
 *    summary: create a new recrutement
 *    tags: [Recrutement]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recrutement'
 *    responses:
 *      200:
 *        description: the recrutement was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recrutement'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/recrutement", AddRecrutement);

/**
 * @swagger
 * /api/recrutement:
 *  get:
 *    summary: Returns a list of recrutements
 *    tags: [Recrutement]
 *    responses:
 *      200:
 *        description: the list of recrutements
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Recrutement'
 *        404:
 *          description: the recrutement was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecrutementNotFound'
 */

 router.get("/api/recrutement", GetRecrutements);

 /**
 * @swagger
 * /api/recrutement/{id}:
 *  get:
 *    summary: get the recrutement by Id
 *    tags: [Recrutement]
 *    parameters:
 *      - $ref: '#/components/parameters/recrutementId'
 *    responses:
 *      200:
 *        description: The Found recrutement
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Recrutement'
 *      404:
 *        description: the recrutement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecrutementNotFound'
*/

router.get("/api/recrutement/:id", GetRecrutementById);

/**
 * @swagger
 * /api/recrutement/{id}:
 *  put:
 *    summary: Update a recrutement by id
 *    tags: [Recrutement]
 *    parameters:
 *      - $ref: '#/components/parameters/recrutementId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recrutement'
 *    responses:
 *      200:
 *        description: The updated recrutement 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Recrutement'
 *      404:
 *        description: the recrutement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecrutementNotFound'
 *
 */

 router.put("/api/recrutement/:id", UpdateRecrutement);

 /**
 * @swagger
 * /api/recrutement/{id}:
 *  delete:
 *    summary: delete a recrutement by id
 *    tags: [Recrutement]
 *    parameters:
 *      - $ref: '#/components/parameters/recrutementId'
 *    responses:
 *      200:
 *        description: the recrutement was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Recrutement'
 *      404:
 *        description: the recrutement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecrutementNotFound'
 *
*/

router.delete("/api/recrutement/:id", DeleteRecrutement);

// ================================= FIN ROUTES RECRUTEMENT =========================

// ================================= DEBUT ROUTES RECRUTEMENT ==========================

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: L'email de l'agent
 *        password:
 *          type: string
 *          description: Le password de l'agent
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: hervediams@gmail.com 
 *        password: hello
 *    LoginNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not loginned user
 *      example:
 *        msg: User not loginned
 *
 *   
 */

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login endpoint
*/

/**
 * @swagger
 * /api/agent/login:
 *  post:
 *    summary: create a login
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Agent was successfully loginned
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      500:
 *        description: Some server error
 *
 */
 router.post("/api/agent/login", Login);

 /**
 * @swagger
 * /api/user:
 *  get:
 *    summary: Returns an authenticated user
 *    tags: [Login]
 *    responses:
 *      200:
 *        description: User authenticated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Login'
 *        404:
 *          description: the user is not authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginNotFound'
 */
  router.get("/api/user", AuthMiddleware, AuthenticatedUser);

// ================================= FIN ROUTES LOGIN =========================


export default router;