import express from "express";
import { LOCATIONS, SEARCH_ROLES } from "../searches/Glassdoor/scripts/glassdoorConstants";

const dataRouter = express.Router();

dataRouter.get("/roles", async (_, res) => {
  console.log(":: In Roles");
  return res.json(SEARCH_ROLES);
});

dataRouter.get("/locations", async (_, res) => {
  console.log(":: In Locations");
  return res.json(LOCATIONS);
});

export default dataRouter;
