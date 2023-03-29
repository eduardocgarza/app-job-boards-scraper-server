import express from "express";
import executeSearchRouterHandler from "./executeSearchRouterHandler";
import { executeSearchRoute } from "../routes";

const searchRouter = express.Router();

searchRouter.post(executeSearchRoute, executeSearchRouterHandler);

export default searchRouter;
