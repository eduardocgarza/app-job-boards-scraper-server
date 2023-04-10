import express from "express";
import nextStageSearchHandler from "./handlers/nextStageSearchHandler";
import createSearchHandler from "./handlers/createSearchHandler";
import startPeopleSearchHandler from "./handlers/startPeopleSearchHandler";
import startLeadsPreparationHandler from "./handlers/nextStageSearchHandler";
import startJobsSearchRouterHandler from "./handlers/executeSearches/startJobsSearchRouterHandler";
import {
  createSearchRoute,
  startJobsSearchRoute,
  startPeopleSearchRoute,
  startLeadsPreparationRoute,
  nextSearchStageRoute,
} from "../routes";

const searchRouter = express.Router();

/**
 *
 * @startJobsSearchRouterHandler
 *  Gets the job postings from job platforms and creates the Search Airtables
 *
 * @startPeopleSearchHandler
 *  Uses the 'verified' postings to get decision-makers from Apollo
 *    and creates the People Airtable
 *
 * @startLeadsPreparationHandler
 *  Uses the 'approved' decision-makers to get their emails from Snovio,
 *    to verify their information, create the sequences, segmentation, and
 *    and creates the Leads Airtable
 *
 */

searchRouter.post(startJobsSearchRoute, startJobsSearchRouterHandler);
searchRouter.post(startPeopleSearchRoute, startPeopleSearchHandler);
searchRouter.post(startLeadsPreparationRoute, startLeadsPreparationHandler);

searchRouter.post(createSearchRoute, createSearchHandler);
searchRouter.post(nextSearchStageRoute, nextStageSearchHandler);

export default searchRouter;
