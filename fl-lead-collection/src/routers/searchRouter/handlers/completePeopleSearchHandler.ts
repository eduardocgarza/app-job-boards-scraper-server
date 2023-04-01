import { Request, Response } from "express";

export default async function completePeopleSearchHandler(req: Request, res: Response) {
  res.json({ received: true });
}
