import express from "express";
import resetDatabaseHandler from "./resetDatabaseHandler";
import getJobPostingsHandler from "./getJobPostingsHandler";
import createAirtableHandler from "./createAirtableHandler";
import {
  createAirtableRoute,
  getApolloDataRoute,
  getJobPostingsRoute,
  getSnovioDataRoute,
  resetDatabaseRoute,
} from "../routes";
import getApolloDataHandler from "./getApolloDataHandler";
import getSnovioDataHandler from "./getSnovioDataHandler";

const testRouter = express.Router();

testRouter.get(resetDatabaseRoute, resetDatabaseHandler);
testRouter.get(createAirtableRoute, createAirtableHandler);
testRouter.post(getJobPostingsRoute, getJobPostingsHandler);
testRouter.post(getApolloDataRoute, getApolloDataHandler);
testRouter.post(getSnovioDataRoute, getSnovioDataHandler);

export default testRouter;
