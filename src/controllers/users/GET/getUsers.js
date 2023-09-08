import { getUserService } from "../../../services/users.service.js";
import logger from "../../../utils/logger.js";

export const getUser = async (req, res) => {
    const user = req.user;

    try {
        if (!user || typeof user !== 'object' || !user.email || !user.first_name || !user.last_name || !user.role) {
            return res.status(400).json({ error: "Invalid user data" });
        }
        const userData = await getUserService(user)

        logger.http("GET /api/users")

        res.render("users", userData)
    }catch (err) {
        logger.error(`An error occurred while getting user data. ${err.stack}`);
        res.status(500).json({ err: "An error occurred while getting user data" });
    }
}