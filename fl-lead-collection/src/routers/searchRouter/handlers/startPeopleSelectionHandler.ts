import { Request, Response } from "express";

export default async function startPeopleSelectionHandler(req: Request, res: Response) {
  res.json({ received: true });
}
