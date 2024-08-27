import dotenv from "dotenv";
dotenv.config();
const serverConfig = {
    port: process.env.PORT || 3200,
    environmnet: process.env.NODE_ENV || 'development',
    cors: {
        allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || '*',
        methods: process.env.CORS_ALLOWED_METHODS?.split(',') || ['GET', 'POST'],
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') || ['Content-Type', 'Authorization'],
    },
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },
};
export default serverConfig;