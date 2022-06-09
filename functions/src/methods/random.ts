import { guard } from "../helpers/guard";
import { downloadRandom } from "../helpers/unsplash";
import { createPosts } from "../models/post";

export const random = guard("POST", async (_, response) => {
  const posts = await downloadRandom();
  await createPosts(posts);
  response.status(201).json({ nodes: posts.length });
});
