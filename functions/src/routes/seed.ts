import { Request, Response } from "express";
import { createPosts } from "../models/post";
import { downloadPosts } from "../models/unsplash";

export const seed = async (_: Request, response: Response) => {
  const posts = await downloadPosts(50);
  await createPosts(posts);
  response.status(201);
};
