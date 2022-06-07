import { Request, Response } from "express";
import { db } from "../db";
import { paginateFirestore } from "../models/cursor";
import { BlendPost } from "../models/outputTypes";

export const food = async (request: Request, response: Response) => {
  const query = db().collection("posts").orderBy("created_at", "desc");
  const connection = paginateFirestore<BlendPost>(
    query,
    request.query.cursor as string
  );
  const data = await connection;
  response.status(200).json(data);
};
