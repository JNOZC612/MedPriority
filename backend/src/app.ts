import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import serverConfig from "./config/server.config";
import cors from "cors";

const app: Application = express();
app.use(cors({
  origin: serverConfig.cors.allowedOrigins,
  methods: serverConfig.cors.methods,
  allowedHeaders: serverConfig.cors.allowedHeaders,
}));
app.use(express.json());
//Manejo de errores
app.use(errorMiddleware);
export default app;


/* import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Backend está en línea!');
});
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

export default app;
 */