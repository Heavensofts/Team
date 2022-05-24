import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";
import { options } from "./swaggerOptions";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import path from "path";

const app: Application = express();
const PORT = process.env.PORT || 5000;
const specs = swaggerJSDoc(options);

import router from "./routes/routes";

// DB Config
import { db } from "./config/mongoURI";

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(fileUpload());

    app.use((req: Request, res: Response, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Accept"
      );

      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });

    app.use(router);
    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

    app.listen(PORT, async() => {
      console.log(`I'm alive on port: ${PORT}`);

    }); 

  })
  .catch((err) => {
    console.log("Error on mongodb: ", err);
  });

