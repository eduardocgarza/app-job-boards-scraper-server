import { Request, Response } from "express";

/**
 * @Input Triggered when you complete the manual verification.
 * @Output
 *  Uses Airtable to get the selected job postings and companies
 *  Uses Snovio/Apollo to get the decision-makers data
 *
 */
export default async function executePeoplePopulateRouterHandler(
  req: Request,
  res: Response,
) {
  res.json({ received: true });
}
