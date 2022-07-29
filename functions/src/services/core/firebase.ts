import * as admin from "firebase-admin";
import { Container, Token } from "typedi";

import { Secrets } from "./secrets";

export type IFirebase = admin.firestore.Firestore;
export const Firebase = new Token<IFirebase>();

export function initializeFirebase(): void {
  const secrets = Container.get(Secrets);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: secrets["BLEND_CLIENT_EMAIL"],
        // replace `\` and `n` character pairs w/ single `\n` character
        privateKey: secrets["BLEND_ADMIN_KEY"].replace(/\\n/g, "\n"),
        projectId: secrets["BLEND_PROJECT_ID"],
      }),
      databaseURL: secrets["DATABASE_URL"],
    });
  }
  const db = admin.firestore();
  Container.set(Firebase, db);
}
