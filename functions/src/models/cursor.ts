import * as admin from "firebase-admin";

// base64 encode the snapshot's path
const encodeCursor = (
  snapshot:
    | admin.firestore.DocumentSnapshot
    | admin.firestore.QueryDocumentSnapshot
) => {
  return Buffer.from(snapshot.ref.path).toString("base64");
};

const decodeCursor = (cursor: string) => {
  return Buffer.from(cursor, "base64").toString("utf8");
};

type Connection<T> = {
  nodes: T[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | null;
    count: number;
  };
};

export async function paginateFirestore<T>(
  query: admin.firestore.Query,
  cursor: string | null = null,
  limit: number = 2
): Promise<Connection<T>> {
  // get one more item for hasNextPage
  let q = query.limit(limit + 1);

  if (cursor) {
    // If a cursor is passed, convert it to a path and get a snapshot of the document
    const path = decodeCursor(cursor);
    const snap = await admin.firestore().doc(path).get();

    if (!snap.exists) {
      return {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          count: 0,
        },
      };
    }

    // pass to startAfter
    q = q.startAfter(snap);
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
