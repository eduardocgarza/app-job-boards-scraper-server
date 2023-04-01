import express from "express";
import executeSearchRouterHandler from "./handlers/executeSearches/executeSearchRouterHandler";
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
import {
  createSearchRoute,
  executeSearchRoute,
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
import completePeopleSearchHandler from "./handlers/completePeopleSearchHandler";

const searchRouter = express.Router();

// 0 to 1. Create Search
searchRouter.post(createSearchRoute, createSearchHandler);

// 1 to 3. Initialize Jobs Search
// searchRouter.post(executeSearchRoute, executeSearchRouterHandler);

// 3 to 4. Mark "Next Stage" at 'Jobs Search Complete' to 'Start Verification'
searchRouter.post(jobsSearchCompleteNextRoute, jobsSearchCompleteNextHandler);

// 4. to 5. Start Verification Selection
searchRouter.post(startVerificationRoute, startVerificationHandler);

// 5 to 6. Complete Verification Selection
searchRouter.post(completeVerificationRoute, completeVerificationHandler);

// 6 to 7. Mark "Next Stage" at 'Verification Complete' to 'Start Decision Makers Search'
searchRouter.post(verificationCompleteNextRoute, verificationCompleteNextHandler);

// 8 to 9. Start Decision Makers Search
searchRouter.post(startPeopleSearchRoute, startPeopleSearchHandler);

// 9 to 10. Complete Decision Makers Search
searchRouter.post(completePeopleSearchRoute, completePeopleSearchHandler);

// 10 to 11. Start Decision Makers Selection
searchRouter.post(startPeopleSelectionRoute, startPeopleSelectionHandler);

// 11 to 12. Complete Decision Makers Selection
searchRouter.post(completePeopleSelectionRoute, completePeopleSelectionHandler);

// 12 to 13. Mark "Next Stage" at 'Decision Makers Selection Complete' to 'Start Leads Preparation'
searchRouter.post(peopleSelectionCompleteNextRoute, peopleSelectionCompleteNextHandler);

// 13 to 15. Start Leads Preparation
searchRouter.post(startLeadsPreparationRoute, startLeadsPreparationHandler);

export default searchRouter;
