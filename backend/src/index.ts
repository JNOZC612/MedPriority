import app from "./app";
import { connectToDatabase } from "./config/database.config";
import serverConfig from "./config/server.config";
import dotenv from "dotenv";
dotenv.config();
const port = serverConfig.port;
connectToDatabase();
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});