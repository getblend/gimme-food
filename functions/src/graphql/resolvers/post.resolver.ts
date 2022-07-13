import { GraphQLHSLA } from "graphql-scalars";
import { Query, Resolver } from "type-graphql";
import { PostList } from "../schema/models/post";
import { ImagePost } from "../schema/models/post/imagePost";
import { User } from "../schema/models/user";

@Resolver()
export class PostResolver {
  @Query((returns) => PostList)
  posts(): PostList {
    return {
      nodes: [createImage(1), createImage(2)],
      pageInfo: {
        startCursor: undefined,
        endCursor: undefined,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      total: 0,
    };
  }
}

const createUser = () => {
  const user = new User();
  user.id = "1";
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.email = "a@b.xyz";
  user.bio = "";
  user.firstName = "";
  user.lastName = "";
  user.phoneNumber = "+1234351234";
  user.profileImage = new URL("https://robohash.org/23.238.193.4.png");
  user.userName = "";
  return user;
};

const createImage = (id = 0) => {
  const image = new ImagePost();
  image.id = `${id}`;
  image.blurHash = "";
  image.color = "" as any;
  image.createdAt = new Date();
  image.updatedAt = new Date();
  image.creator = createUser();
  image.downloadUrl = new URL("https://robohash.org/23.238.193.4.png");
  image.height = 0;
  image.likes = 0;
  image.previewUrl = new URL("https://robohash.org/23.238.193.4.png");
  image.tags = [];
  image.width = 0;
  image.description = "";
  image.title = "";
  return image;
};
