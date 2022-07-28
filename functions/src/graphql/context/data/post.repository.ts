import { Inject, Service } from "typedi";

import { paginateFirestore } from "../../../helpers/cursor";
import { make } from "../../../helpers/make";

import { ImagePost, PostCollection } from "../../schema";
import { CoreContext } from "../core.context";
import { createUser } from "./user.repository";

import type { PageInfoArgs, PostType } from "../../schema";

import type { BlendPost } from "../../../legacy/outputTypes";

@Service()
export class PostRepository {
  @Inject()
  private coreContext: CoreContext;

  public async getPosts(currentPage: PageInfoArgs): Promise<PostCollection> {
    const query = this.coreContext.db
      .collection("posts")
      .orderBy("created_at", "desc");

    const data = await paginateFirestore<BlendPost, typeof PostType>(
      query,
      currentPage.after,
      currentPage.first,
      createPost
    );

    return make(PostCollection, {
      count: data.nodes.length,
      ...data,
    });
  }
}

const createPost = (data: BlendPost): typeof PostType => createImagePost(data);

const createImagePost = (data: BlendPost): ImagePost =>
  make(ImagePost, {
    blurHash: data.urls.blur_hash,
    color: data.color,
    createdAt: data.created_at.toISOString(),
    creator: createUser(data.user),
    description: data.description,
    downloadUrl: data.urls.download,
    height: data.height,
    id: data.id,
    likes: data.likes,
    previewUrl: data.urls.regular,
    tags: [],
    title: undefined,
    updatedAt: data.created_at.toISOString(),
    width: data.width,
  });
