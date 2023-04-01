import { Request, Response } from "express";

export default async function startVerificationHandler(req: Request, res: Response) {
  res.json({ received: true });
}
