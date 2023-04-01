import { Request, Response } from "express";

export default async function startLeadsPreparationHandler(req: Request, res: Response) {
  res.json({ received: true });
}
