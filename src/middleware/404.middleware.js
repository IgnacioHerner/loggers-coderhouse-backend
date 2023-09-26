import {Router} from 'express'

export const router = Router()

router.get('*', (req, res) => {
    res.status(404).render("loggers-coderhouse-backend-production.up.railway.app/api/session/login")
})

export default router;