import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import serverConfig from "./config/server.config";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes";
import pacienteRoutes from "./routes/paciente.routes";
import movimientoRoutes from "./routes/movimientos.routes";
import areasRoutes from "./routes/area.routes";
import camillasRoutes from "./routes/camilla.routes";

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
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/movimiento", movimientoRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/camillas", camillasRoutes)
export default app;
