import type { ExpressContext } from "apollo-server-express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { PostRepository } from "./data/post.repository";

export interface AuthContext {
  user: AuthenticatedUser;
  apiKey: string;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
  roles: string[];
  featureFlags: string[];
  experiments: string[];
}

export interface CoreContext {
  app: admin.app.App;
  db: admin.firestore.Firestore;
  debugMode: boolean;
  env: {
    clientEmail: string;
    projectId: string;
    privateKey: string;
    blendApiKey: string;
    databaseURL: string;
  };
  logger: typeof functions.logger;
}

export interface DataContext {
  post: PostRepository;
}

export type Context = {
  core: CoreContext;
  data: DataContext;
  auth: AuthContext;
  request: ExpressContext;
};
