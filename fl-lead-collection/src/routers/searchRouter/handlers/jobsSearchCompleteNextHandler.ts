import { Request, Response } from "express";

export default async function jobsSearchCompleteNextHandler(req: Request, res: Response) {
  res.json({ received: true });
}
