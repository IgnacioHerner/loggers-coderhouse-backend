import {
    MONGO_DB_NAME,
    MONGO_URI,
    PERSISTANCE,
    MONGO_DB_TEST_NAME,
    PORT,
} from '../config/config.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'

export const ServerUp = async (app) => {
    try {
        if(!MONGO_URI || !MONGO_DB_NAME || !MONGO_DB_TEST_NAME || !PORT || !PERSISTANCE){
            throw new Error("Environment variables are not properly configured")
        }

        switch(PERSISTANCE) {
            case "DEV":
                await mongoose.connect(MONGO_URI, {
                    dbName: MONGO_DB_NAME
                })
                logger.debug("DB Development connected")
                break;
            case "PROD": 
                await mongoose.connect(MONGO_URI, {
                    dbName: MONGO_DB_TEST_NAME
                })
                logger.debug("DB Production connected")
                break
            default: 
                throw new Error("Invalid PERSISTANCE value.")
        }
        const port = PORT
        app.listen(port, () => {
            logger.info(`Server Up on http://localhost:${port}/api/products\n`)
        })
    }catch (err) {
        logger.fatal("Error when trying to start the server. \n", err);
    }
}
