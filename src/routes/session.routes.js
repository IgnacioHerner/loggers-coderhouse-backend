import { Router } from "express";
import passport from "passport";
import logger from '../utils/logger.js'

const router = Router()

router.get("/register", async (req, res) => {
    logger.http("GET /session/register")
    res.render("sessions/register")
})

router.post("/register", passport.authenticate("register", {
    failureRedirect: "/session/failureRegister"
}),
    async (req, res) => {
        logger.info("POST /session/register success")
        res.redirect("/api/session/login")
    }
);

router.get("/failureRegister", (req, res) => {
    res.send({error: "failed!"})
})


router.get("/login", async (req, res) => {
    res.render("sessions/login")
})

router.post(
    "/login",
    passport.authenticate("login", {failureRedirect: "/session/failLogin"}),
    async (req, res) => {
        if(!req.user) {
            return res.status(400).send({status:"error", error: "Invalid credentials"})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
        }

        logger.info("Login success")

        res.redirect("/api/products")
    }
)

router.get("failLogin", async (req, res) => {
    res.send({error: "Fail in Login"})
})

router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            logger.error("Error in logout\n", err)
            res.status(500).render("errors/base", {error: err})
        } else {
            logger.info("Logout success")
            res.redirect("/api/session/login")
        }
    })
})

router.get(
    "/github",
    passport.authenticate("github", {scope: ["user: email"]}),
    async (req, res) => {}
)

router.get(
    "/githubcallback",
    passport.authenticate("github", {failureRedirect: "/api/session/login"}),
    async (req, res) => {
        req.session.user = req.user;
        req.redirect("/api/products")
    }
)

export default router;