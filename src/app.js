import express from 'express'
import session from 'express-session'
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo'
import bodyParser from "body-parser";
import passport from "passport";

import path from "path";
import { fileURLToPath } from "url";

import { MONGO_DB_NAME, MONGO_URI } from "./config/config.js";
import { roleAccess, generateProducts, generateProductsMocking } from "./utils/utils.js";
import { ServerUp } from "./dto/persistanceFactory.js";
import initializePassport from "./config/passport.config.js";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import sessionRouter from "./routes/session.routes.js";
import loggerTest from "./routes/loggerTest.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(errorHandler)

const hbs = handlebars.create()
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            dbName: MONGO_DB_NAME
        }),
        secret: 'c0der',
        resave: true,
        saveUninitialized: true
    })
)

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/api/session/login");
};

app.use("/api/products", ensureAuthenticated, roleAccess, productsRouter);
app.use("/api/carts", ensureAuthenticated, roleAccess, cartsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/loggerTest", loggerTest);

generateProductsMocking();

generateProducts()

ServerUp(app);