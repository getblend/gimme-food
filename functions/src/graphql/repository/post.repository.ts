import { firestore } from "firebase-admin";
import { paginateFirestore } from "../../helpers/cursor";
import { db } from "../../helpers/db";
import { BlendPost } from "../../models/outputTypes";
import { PageInfoArgs } from "../schema/models/pagination";
import { PostList, Post } from "../schema/models/post";
import { ImagePost } from "../schema/models/post/imagePost";
import { User } from "../schema/models/user";

export class PostRepository {
  static __Instance: PostRepository;
  static create(): PostRepository {
    if (!PostRepository.__Instance) {
      PostRepository.__Instance = new PostRepository();
    }
    return PostRepository.__Instance;
  }

  constructor() {}

  async getPosts(currentPage: PageInfoArgs): Promise<PostList> {
    const query = db().collection("posts").orderBy("created_at", "desc");

    const connection = paginateFirestore<BlendPost, typeof Post>(
      query,
      currentPage.after,
      currentPage.first,
      createPost
    );

    const data = await connection;
    return data;
  }
}

const createPost = (data: BlendPost): typeof Post => {
  return createImagePost(data);
};

const createImagePost = (data: BlendPost): ImagePost => {
  const image = new ImagePost();
  image.id = data.id;
  image.blurHash = data.urls.blur_hash;
  image.color = data.color;
  image.createdAt = data.created_at;
  image.updatedAt = data.created_at;
  image.creator = createUser(data.user);
  image.downloadUrl = new URL(data.urls.download);
  image.height = data.height;
  image.likes = data.likes;
  image.previewUrl = new URL(data.urls.regular);
  image.tags = [];
  image.width = data.width;
  image.description = data.description;
  image.title = undefined;
  return image;
};

const createUser = (data: BlendPost["user"]) => {
  const user = new User();
  user.firstName = data.name;
  user.lastName = data.name;
  user.phoneNumber = "+1234351234";
  user.profileImage = new URL(data.profile_image);
  user.userName = data.username;
  user.id = data.username;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.email = "a@b.xyz";
  return user;
};
