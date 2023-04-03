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

searchRouter.post(createSearchRoute, createSearchHandler);
searchRouter.post(startJobsSearchRoute, startJobsSearchRouterHandler);
searchRouter.post(jobsSearchCompleteNextRoute, jobsSearchCompleteNextHandler);
searchRouter.post(startVerificationRoute, startVerificationHandler);
searchRouter.post(completeVerificationRoute, completeVerificationHandler);
searchRouter.post(verificationCompleteNextRoute, verificationCompleteNextHandler);
searchRouter.post(completePeopleSearchRoute, completePeopleSearchHandler);
searchRouter.post(startPeopleSelectionRoute, startPeopleSelectionHandler);
searchRouter.post(completePeopleSelectionRoute, completePeopleSelectionHandler);
searchRouter.post(peopleSelectionCompleteNextRoute, peopleSelectionCompleteNextHandler);

// Stage 7-8
searchRouter.post(startPeopleSearchRoute, startPeopleSearchHandler);

// Stage 13-14
searchRouter.post(startLeadsPreparationRoute, startLeadsPreparationHandler);

export default searchRouter;
