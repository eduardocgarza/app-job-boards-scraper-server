import express from "express";
import dataRouter from "./dataRouter";
import searchRouter from "./search/searchRouter";
import testRouter from "./testRouter";

const appRouter = express.Router();

appRouter.use("/data", dataRouter);
appRouter.use("/search", searchRouter);
appRouter.use("/test", testRouter);

export default appRouter;
