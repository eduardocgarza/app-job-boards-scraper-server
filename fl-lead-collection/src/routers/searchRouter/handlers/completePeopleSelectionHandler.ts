import { Request, Response } from "express";

export default async function completePeopleSelectionHandler(req: Request, res: Response) {
  res.json({ received: true });
}
