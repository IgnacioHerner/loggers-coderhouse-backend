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
    switch (PERSISTANCE) {
      case "DEV":
        try {
          await mongoose.connect(MONGO_URI, {
            dbName: MONGO_DB_NAME,
          });
          logger.debug("DB development connected!");
          app.listen(PORT, () =>
            logger.info(`Server Up on http://localhost:${PORT}/api/products\n`)
          );
        } catch (err) {
          logger.fatal("Error when trying to start the server.\n", err)
        }
        break;
  
      case "PROD":
        try {
          await mongoose.connect(MONGO_URI, {
            dbName: MONGO_DB_TEST_NAME,
          });
          logger.debug("DB production connected!");
          app.listen(PORT, () =>
            logger.info(`Server Up on http://localhost:${PORT}/api/products\n`)
          );
        } catch (err) {
          logger.fatal("Error when trying to start the server.\n", err)
        }
        break;
    }
};
