import express from "express";
import createSearchHandler from "./handlers/createSearchHandler";
import jobsSearchCompleteNextHandler from "./handlers/jobsSearchCompleteNextHandler";
import startVerificationHandler from "./handlers/startVerificationHandler";
import completeVerificationHandler from "./handlers/completeVerificationHandler";
import verificationCompleteNextHandler from "./handlers/verificationCompleteNextHandler";
import startPeopleSearchHandler from "./handlers/startPeopleSearchHandler";
import startPeopleSelectionHandler from "./handlers/startPeopleSelectionHandler";
import completePeopleSelectionHandler from "./handlers/completePeopleSelectionHandler";
import peopleSelectionCompleteNextHandler from "./handlers/peopleSelectionCompleteNextHandler";
import startLeadsPreparationHandler from "./handlers/startLeadsPreparationHandler";
import completePeopleSearchHandler from "./handlers/completePeopleSearchHandler";
import startJobsSearchRouterHandler from "./handlers/executeSearches/startJobsSearchRouterHandler";
import {
  createSearchRoute,
  startJobsSearchRoute,
  jobsSearchCompleteNextRoute,
  startVerificationRoute,
  completeVerificationRoute,
  verificationCompleteNextRoute,
  startPeopleSearchRoute,
  completePeopleSearchRoute,
  startPeopleSelectionRoute,
  completePeopleSelectionRoute,
  peopleSelectionCompleteNextRoute,
  startLeadsPreparationRoute,
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

searchRouter.post(createSearchRoute, createSearchHandler);
searchRouter.post(startJobsSearchRoute, startJobsSearchRouterHandler);
searchRouter.post(jobsSearchCompleteNextRoute, jobsSearchCompleteNextHandler);

searchRouter.post(startVerificationRoute, startVerificationHandler);
searchRouter.post(completeVerificationRoute, completeVerificationHandler);
searchRouter.post(verificationCompleteNextRoute, verificationCompleteNextHandler);

searchRouter.post(startPeopleSearchRoute, startPeopleSearchHandler);
searchRouter.post(completePeopleSearchRoute, completePeopleSearchHandler);

searchRouter.post(startPeopleSelectionRoute, startPeopleSelectionHandler);
searchRouter.post(completePeopleSelectionRoute, completePeopleSelectionHandler);
searchRouter.post(peopleSelectionCompleteNextRoute, peopleSelectionCompleteNextHandler);

searchRouter.post(startLeadsPreparationRoute, startLeadsPreparationHandler);

export default searchRouter;
