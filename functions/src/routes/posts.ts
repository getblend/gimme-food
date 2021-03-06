import { paginateFirestore } from "../helpers/cursor";
import { db } from "../helpers/db";
import { guard } from "../helpers/guard";

import type { BlendPost } from "../legacy/outputTypes";

export const posts = guard(["GET"], async (request, response) => {
  const query = db().collection("posts").orderBy("created_at", "desc");
  const connection = paginateFirestore<BlendPost>(
    query,
    request.query.cursor as string,
    11,
    (data) => data
  );
  const data = await connection;
  response.status(200).json(data);
});
