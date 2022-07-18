import { paginateFirestore } from "../../../helpers/cursor";
import { make } from "../../../helpers/make";
import { BlendPost } from "../../../models/outputTypes";
import {
  ImagePost,
  PageInfoArgs,
  PostCollection,
  PostType,
} from "../../schema";
import { Context } from "../interface";
import { createUser } from "./user.repository";

export class PostRepository {
  constructor(private context: Context) {}

  async getPosts(currentPage: PageInfoArgs): Promise<PostCollection> {
    const query = this.context.core.db
      .collection("posts")
      .orderBy("created_at", "desc");

    const connection = paginateFirestore<BlendPost, typeof PostType>(
      query,
      currentPage.after,
      currentPage.first,
      createPost
    );

    const data = await connection;
    return data;
  }
}

const createPost = (data: BlendPost): typeof PostType => createImagePost(data);

const createImagePost = (data: BlendPost): ImagePost =>
  make(ImagePost, {
    id: data.id,
    blurHash: data.urls.blur_hash,
    color: data.color,
    createdAt: data.created_at,
    updatedAt: data.created_at,
    creator: createUser(data.user),
    downloadUrl: new URL(data.urls.download),
    height: data.height,
    likes: data.likes,
    previewUrl: new URL(data.urls.regular),
    tags: [],
    width: data.width,
    description: data.description,
    title: undefined,
  });
