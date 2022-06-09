import { guard } from "../helpers/guard";
import { searchPosts } from "../helpers/unsplash";

export const search = guard("GET", async (request, response) => {
  if (!request.query.search || !(typeof request.query.query === "string")) {
    response.status(400).send("Missing 'query' QSP.");
    return;
  }
  const posts = await searchPosts(request.query.search as string);
  response.status(200).json({ nodes: posts });
});
