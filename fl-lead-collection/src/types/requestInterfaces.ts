import { Request } from "express";

export interface ISearchRequest extends Request {
  body: {
    searchId: string;
  };
}
