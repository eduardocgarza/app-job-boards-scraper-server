import express from "express";
import { getLocationsRoute, getRolesRoute } from "../routes";
import getRolesHandler from "./getLocationsHandler";
import getLocationsHandler from "./getLocationsHandler";

const dataRouter = express.Router();

dataRouter.get(getRolesRoute, getRolesHandler);
dataRouter.get(getLocationsRoute, getLocationsHandler);

export default dataRouter;
