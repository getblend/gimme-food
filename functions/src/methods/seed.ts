import { guard } from "../helpers/guard";
import { searchPosts } from "../helpers/unsplash";
import { createPosts } from "../models/post";

export const seed = guard("POST", async (_, response) => {
  const posts = await searchPosts("Food");
  await createPosts(posts);
  response.status(201).json({ nodes: posts.length });
});
