import express from "express";
import executeSearchRouterHandler from "./executeSearchRouterHandler";
import {
  executeLeadsPreparationRoute,
  executePeoplePopulateRoute,
  executeSearchRoute,
} from "../routes";
import executePeoplePopulateRouterHandler from "./executePeoplePopulateRouterHandler";
import executeLeadsPreparationRouterHandler from "./executeLeadsPreparationRouterHandler";

const searchRouter = express.Router();

searchRouter.post(executeSearchRoute, executeSearchRouterHandler);
searchRouter.post(executePeoplePopulateRoute, executePeoplePopulateRouterHandler);
searchRouter.post(executeLeadsPreparationRoute, executeLeadsPreparationRouterHandler);

export default searchRouter;
