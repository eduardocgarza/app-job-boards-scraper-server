import express from "express";
import searchRouteHandler from "./searchRouteHandler";

const searchRouter = express.Router();

searchRouter.post("/", searchRouteHandler);

export default searchRouter;
