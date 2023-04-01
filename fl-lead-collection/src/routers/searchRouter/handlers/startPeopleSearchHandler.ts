import { Request, Response } from "express";

export default async function startPeopleSearchHandler(req: Request, res: Response) {
  res.json({ received: true });
}
