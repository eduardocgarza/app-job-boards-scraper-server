import { Request, Response } from "express";

export default async function peopleSelectionCompleteNextHandler(req: Request, res: Response) {
  res.json({ received: true });
}
