import { Request, Response } from "express";

export const root = (_: Request, res: Response) => {
  res.status(200).send("Hello there hungry person!");
};
