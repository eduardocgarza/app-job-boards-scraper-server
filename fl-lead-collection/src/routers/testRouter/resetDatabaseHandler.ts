import { Request, Response } from "express";
import { resetTables } from "@/database/testDatabase/testCreateDatabase";

export default async function resetDatabaseHandler(_: Request, res: Response) {
  try {
    await resetTables();
    res.send("Tables reset successfully");
  } catch (e) {
    console.error("Error resetting tables:", e);
    res.status(500).send("Error resetting tables");
  }
}
