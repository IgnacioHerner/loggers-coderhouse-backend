import dotenv from 'dotenv'

dotenv.config()

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const MONGO_URI = process.env.MONGO_URI;
export const ATLAS_DB_NAME = process.env.ATLAS_DB_NAME;
export const ATLAS_URI = process.env.ATLAS_URI;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const PORT = process.env.PORT;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PW = process.env.ADMIN_PW;
export const PERSISTANCE = process.env.PERSISTANCE;
export const MONGO_DB_TEST_NAME = process.env.MONGO_DB_TEST_NAME;
export const GMAIL_CONFIG = process.env.GMAIL_CONFIG;
