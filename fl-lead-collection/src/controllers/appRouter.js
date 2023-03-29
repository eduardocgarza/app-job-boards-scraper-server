import express from "express"
import testRouter from "./testRouter.js";
import dataRouter from "./dataRouter.js";
import searchRouter from "./search/searchRouter.js";

const appRouter = express.Router();

appRouter.use("/data", dataRouter)
appRouter.use("/search", searchRouter)
appRouter.use("/test", testRouter)

export default appRouter;