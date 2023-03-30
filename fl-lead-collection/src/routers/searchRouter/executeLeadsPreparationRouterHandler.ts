import { Request, Response } from "express";

/**
 * @Input Triggered when you select your decision-makers
 * @Output
 *  Uses Airtable to get the selected decision-makers
 *  1. Enriches the People Data using Apollo/Snovio
 *  2. Verifies the contact data (email, phone, etc.) with Neverbounce
 *  3. Creates personalized sequences for each contact, and segmentation groups
 *  4. Stores the data in Airtable for final manual verification
 *
 */
export default async function executeLeadsPreparationRouterHandler(
  req: Request,
  res: Response,
) {
  res.json({ received: true });
}
