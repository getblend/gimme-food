import { Context, DataContext } from "../interface";
import { PostRepository } from "./post.repository";

export const createDataContext = (context: Context): DataContext => ({
  post: new PostRepository(context),
});
