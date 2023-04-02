import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import apiRoutes from "./routers/appRouter/appRouter";
import { apiBaseRoute } from "./routers/routes";

const SERVER_PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(apiBaseRoute, apiRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});
