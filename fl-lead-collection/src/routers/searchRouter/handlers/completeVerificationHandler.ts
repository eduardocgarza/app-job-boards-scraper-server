import { Request, Response } from "express";

export default async function completeVerificationHandler(req: Request, res: Response) {
  res.json({ received: true });
}
