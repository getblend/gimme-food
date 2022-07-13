import * as admin from "firebase-admin";
import { PageInfo } from "../graphql/schema/models/pagination";

// Converts the snapshot path to a base64 string
const encodeCursor = (
  snapshot:
    | admin.firestore.DocumentSnapshot
    | admin.firestore.QueryDocumentSnapshot
) => Buffer.from(snapshot.ref.path).toString("base64");

// Parses the snapshot path from a base64 string
const decodeCursor = (cursor: string) =>
  Buffer.from(cursor, "base64").toString("utf8");

/**
 * Relay style pagination template
 */
export type Connection<T> = {
  nodes: T[];
  pageInfo: PageInfo;
  total: number;
};

/**
 * Wrap a query with a paginatior and generate a cursor
 * @param query The query to filter the results with
 * @param cursor The cursor from which position to get the information
 * @param limit The number of records to fetch, defaults to 11.
 * @returns The list of records paginated using cursors.
 */
export async function paginateFirestore<T, TOutput = T>(
  query: admin.firestore.Query,
  cursor: string | null = null,
  limit: number = 11,
  creator: (data: T) => TOutput
): Promise<Connection<TOutput>> {
  // get one more item for hasNextPage
  let q = query.limit(limit + 1);

  if (cursor) {
    // If a cursor is passed, convert it to a path and get a snapshot of the document
    const path = decodeCursor(cursor);
    const snap = await admin.firestore().doc(path).get();

    // If the snapshot exists then start from the snapshot,
    // Else start from scratch.
    if (snap.exists) {
      q = q.startAfter(snap);
    }
  }

  const snapshot = await q.get();
  const hasNextPage = snapshot.size > limit;

  // make the path of the last document a cursor
  const endCursor = hasNextPage
    ? encodeCursor(snapshot.docs[snapshot.docs.length - 1])
    : undefined;

  const data = snapshot.docs.map((doc) => creator(doc.data() as T));

  const pageInfo = new PageInfo();
  pageInfo.endCursor = endCursor;
  pageInfo.hasNextPage = hasNextPage;
  pageInfo.hasPreviousPage = false;
  pageInfo.startCursor = undefined;

  return {
    nodes: data,
    pageInfo,
    total: snapshot.size,
  };
}
