import { Router } from "express";
import { userController } from '../controllers/users/user.controller.js'

const router = Router()

router.get("/", userController.getUser)

router.post("/roles", userController.changeRole)

export default router