import { Request, Response } from "express";

export default async function templateRouteHandler(req: Request, res: Response) {
  res.json({ received: true });
}
