import { Request, Response } from "express";

export default async function verificationCompleteNextHandler(req: Request, res: Response) {
  res.json({ received: true });
}
