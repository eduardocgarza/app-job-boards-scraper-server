import express from "express";
import { dataRouterRoute, searchRouterRoute, testRouterRoute } from "../routes";
import dataRouter from "../dataRouter/dataRouter";
import searchRouter from "../searchRouter/searchRouter";
import testRouter from "../testRouter/testRouter";

const appRouter = express.Router();

appRouter.use(dataRouterRoute, dataRouter);
appRouter.use(searchRouterRoute, searchRouter);
appRouter.use(testRouterRoute, testRouter);

export default appRouter;
