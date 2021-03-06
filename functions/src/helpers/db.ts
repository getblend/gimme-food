import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

let _db: admin.firestore.Firestore;

export const db = (): admin.firestore.Firestore => {
  if (!_db) {
    if (process.env.FUNCTIONS_EMULATOR) {
      process.env.FIRESTORE_EMULATOR_HOST = "localhost:9199";
      functions.logger.debug("Using local firestore instance");
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: process.env.BLEND_CLIENT_EMAIL,
          privateKey: process.env.BLEND_ADMIN_KEY?.replace(/\\n/g, "\n"),
          projectId: process.env.BLEND_PROJECT_ID,
          // replace `\` and `n` character pairs w/ single `\n` character
        }),
        databaseURL: process.env.DATABASE_URL,
      });
    }

    _db = admin.firestore();
  }

  return _db;
};
