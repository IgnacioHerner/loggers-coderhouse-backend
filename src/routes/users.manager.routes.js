import { Router } from "express";
import { isAdmin } from '../middleware/admin.middleware.js'
import userModel from "../dao/models/user.model.js"
import logger from '../utils/logger.js'
import { deleteAccountMailer } from "../utils/deleteMailer.js";

const router = Router()

router.get("/", isAdmin, async(req, res) => {
    const user = req.user;
    const users = await userModel.find().lean()

    logger.http(`/api/users${user.email}`)
    res.status(200).render("users-manager", {users})
})

router.get("/update-user-role/:userId", isAdmin, async (req, res) => {
    const userId = req.params.userId;
    const email = req.user.email;

    try {
        const user = await userModel.findById(userId).lean()

        if (!user) {
            return res.status(404).send("User not found")
        }
        if (email === user.email) {
            return res.status(403).send("You are not authorized to perfom this action ")
        }

        res.render("update-user-role-dashboard", user)
    } catch (err) {
        logger.error(`An error occurred while deleting inactive users. ${err.stack}`);
    }
})

router.post("/update-user-role/:userId", isAdmin, async (req, res) => {
    const userId = req.params.userId;
    const {newRole} = req.body

    try {
        const user = await userModel.findById(userId)
        
        if(!user) {
            return res.status(404).send("User not found")
        }

        user.role = newRole;
        
        await user.save()

        res.redirect(`/api/users/update-user-role${userId}`)
    } catch(err){
        logger.error(`An error occurred while updating user role. ${err.stack}`);
    }
})

router.post("/delete-inactive-users", isAdmin, async (req, res) => {
    const adminEmail = req.user.email;

    try {
        const twentyMinutesAgo = new Date()
        twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20)

        const usersToDelete = await userModel.find({
            last_login: {$lt: twentyMinutesAgo},
        })

        const deletedUserEmail = usersToDelete.map((user) => user.email)
        const deletedUser = await userModel.deleteMany({
            last_login: {$lt: twentyMinutesAgo}
        })

        logger.info(`Admin (${adminEmail}) deleted ${deletedUser.deletedCount} inactive users`)

        
        await Promise.all(
            deletedUserEmail.map(async(email) => {
                await deleteAccountMailer(email)
            })
        )

        res.status(200).redirect("/api/users")
    } catch (err) {
        logger.error(`An error ocurred while deleting inactive users ${err.stack}`)
        res.status(500).json({err: "An error ocurred while deleting inactive users"})
    }
})


export default router;