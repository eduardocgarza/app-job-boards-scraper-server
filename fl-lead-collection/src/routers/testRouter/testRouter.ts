import express from "express";
import resetDatabaseHandler from "./resetDatabaseHandler";
import getJobPostingsHandler from "./getJobPostingsHandler";
import createAirtableHandler from "./createAirtableHandler";
import { createAirtableRoute, getJobPostingsRoute, resetDatabaseRoute } from "../routes";

const testRouter = express.Router();

testRouter.get(resetDatabaseRoute, resetDatabaseHandler);
testRouter.post(getJobPostingsRoute, getJobPostingsHandler);
testRouter.get(createAirtableRoute, createAirtableHandler);

export default testRouter;
