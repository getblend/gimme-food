import { Service } from "typedi";

import { paginateFirestore } from "../../helpers/cursor";
import { make } from "../../helpers/make";

import { ImagePost, PostCollection } from "../../graphql/schema";
import { withBoilerplate } from "../core";
import { UserLoader } from "./user.loader";

import type { PageInfoArgs, PostType } from "../../graphql/schema";

import type { BlendPost } from "../../legacy/outputTypes";

@Service()
export class PostLoader extends withBoilerplate("PostLoader") {
  public static createMockPost(seed: string): typeof PostType {
    return make(ImagePost, {
      blurHash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
      color: "hsla(0, 0%, 0%, 0.5)",
      createdAt: new Date(),
      creator: UserLoader.createMockUser(seed),
      description: "See you in the next life",
      downloadUrl:
        "https://unsplash.com/photos/uF10l5V3bYs/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5MDU2MTc0&force=true",
      height: 100,
      id: seed,
      likes: 100,
      previewUrl:
        "https://images.unsplash.com/photo-1657299170237-2d4cd59b5156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      tags: [],
      title: undefined,
      updatedAt: new Date(),
      width: 100,
    });
  }

  public static fromBlendPost(post: BlendPost): typeof PostType {
    return createImagePost(post);
  }

  public async getPost(id: string): Promise<ImagePost> {
    return PostLoader.createMockPost(id);
  }

  public async getPosts(currentPage: PageInfoArgs): Promise<PostCollection> {
    const query = this.firebase
      .collection("posts")
      .orderBy("created_at", "desc");

    const data = await paginateFirestore(
      query,
      currentPage.after,
      currentPage.first,
      PostLoader.fromBlendPost
    );

    return make(PostCollection, {
      count: data.nodes.length,
      ...data,
    });
  }

  protected onInit(): void {
    return;
  }
}

const createImagePost = (data: BlendPost): ImagePost =>
  make(ImagePost, {
    blurHash: data.urls.blur_hash,
    color: data.color,
    createdAt: data.created_at,
    creator: UserLoader.fromBlendUser(data.user),
    description: data.description,
    downloadUrl: data.urls.download,
    height: data.height,
    id: data.id,
    likes: data.likes,
    previewUrl: data.urls.regular,
    tags: [],
    title: undefined,
    updatedAt: data.created_at,
    width: data.width,
  });
