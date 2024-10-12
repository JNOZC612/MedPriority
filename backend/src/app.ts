import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import serverConfig from "./config/server.config";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes";

const app: Application = express();
app.use(cors({
  origin: serverConfig.cors.allowedOrigins,
  methods: serverConfig.cors.methods,
  allowedHeaders: serverConfig.cors.allowedHeaders,
}));
app.use(express.json());
//Manejo de errores
app.use(errorMiddleware);
app.use("/api/doctores", doctorRoutes);
export default app;
