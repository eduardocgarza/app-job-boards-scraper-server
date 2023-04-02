import getApolloData from "@/integrations/apollo/actions/getApolloData";
import { Request, Response } from "express";
import { apolloSchema } from "../../integrations/apollo/config/apolloValidation";
import { IRawApolloObject } from "../../integrations/apollo/config/apolloInterfaces";

function createApolloObject(body: IRawApolloObject): IRawApolloObject {
  return {
    domains: body.domains,
    titles: body.titles,
    page: body.page,
  };
}

export default async function getApolloDataHandler(req: Request, res: Response) {
  const { error } = apolloSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const rawApolloObject = createApolloObject(req.body);
  const data = await getApolloData(rawApolloObject);
  res.json({ data });
}
