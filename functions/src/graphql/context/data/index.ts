import { Context, DataContext } from "../interface";
import { PostRepository } from "./post.repository";
import { UserRepository } from "./user.repository";

export const createDataContext = (context: Context): DataContext => ({
  post: new PostRepository(context),
  user: new UserRepository(context),
});
