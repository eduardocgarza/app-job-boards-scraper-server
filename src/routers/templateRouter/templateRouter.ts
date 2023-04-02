import express from "express";
import templateRouteHandler from "./templateRouteHandler";

const templateRouter = express.Router();

templateRouter.get("/", templateRouteHandler);

export default templateRouter;
