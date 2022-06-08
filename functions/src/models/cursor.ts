import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

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
type Connection<T> = {
  nodes: T[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | null;
    count: number;
  };
};

/**
 * Wrap a query with a paginatior and generate a cursor
 * @param query The query to filter the results with
 * @param cursor The cursor from which position to get the information
 * @param limit The number of records to fetch, defaults to 11.
 * @returns The list of records paginated using cursors.
 */
export async function paginateFirestore<T>(
  query: admin.firestore.Query,
  cursor: string | null = null,
  limit: number = 11
): Promise<Connection<T>> {
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
    : null;

  const data = snapshot.docs.map((doc) => doc.data() as T);

  return {
    nodes: data,
    pageInfo: {
      hasNextPage,
      endCursor,
      count: snapshot.size,
    },
  };
}
