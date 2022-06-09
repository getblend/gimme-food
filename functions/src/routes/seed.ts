import { Request, Response } from "express";
import { downloadPosts } from "../helpers/unsplash";
import { createPosts } from "../models/post";

export const seed = async (_: Request, response: Response) => {
  const size = parseInt((_.query.size as string) ?? "50");
  const posts = await downloadPosts(isNaN(size) ? 50 : size);
  await createPosts(posts);
  response.status(201);
};
