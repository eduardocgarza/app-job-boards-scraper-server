import { Request, Response } from "express";
import { IRawSnovioObject } from "@/integrations/snovio/config/snovioInterfaces";
import { snovioSchema } from "@/integrations/snovio/config/snovioValidation";
import getSnovioData from "@/integrations/snovio/actions/getSnovioData";
import authenticateSnovio from "@/integrations/snovio/actions/authenticateSnovio";

function createSnovioObject(body: IRawSnovioObject): IRawSnovioObject {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    domain: body.domain,
  };
}

export default async function getSnovioDataHandler(req: Request, res: Response) {
  const accessToken = await authenticateSnovio();
  console.log(`accessToken: ${accessToken}\n\n`);
  const { error } = snovioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const rawSnovioObject = createSnovioObject(req.body);
  console.log(rawSnovioObject);
  console.log();
  const data = await getSnovioData(accessToken, rawSnovioObject);
  res.json({ data });
}
