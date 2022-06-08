import { CoverPhoto, Post } from "../models/inputTypes";
import { BlendPost } from "../models/outputTypes";

export const transformPosts = (posts: Post[]): BlendPost[] =>
  posts.flatMap(transformPost);

const transformPost = (post: Post): BlendPost[] => {
  const [tags, posts] = transformTags(post);
  return [
    {
      id: post.id,
      created_at: new Date(post.created_at),
      width: post.width,
      height: post.height,
      color: post.color,
      description: post.description,
      alt_description: post.alt_description,
      urls: transformUrls(post),
      likes: post.likes,
      user: transformUser(post.user),
      tags: tags,
    },
    ...posts,
  ];
};

const transformTags = (post: Post): [BlendPost["tags"], BlendPost[]] => {
  const { tags, posts } = post.tags.reduce(
    (acc, tag) => {
      if (!tag.source) return acc;

      const simpleTag: BlendPost["tags"][0] = {
        unique: tag.title,
        title: tag.source.title,
        description: tag.source.description,
      };

      acc.tags.push(simpleTag);

      if (!tag.source.cover_photo) {
        return acc;
      }

      const post: BlendPost = {
        id: tag.source.cover_photo.id,
        created_at: new Date(tag.source.cover_photo.created_at),
        width: tag.source.cover_photo.width,
        height: tag.source.cover_photo.height,
        color: tag.source.cover_photo.color,
        description: tag.source.cover_photo.description,
        alt_description: tag.source.cover_photo.alt_description,
        urls: transformUrls(tag.source.cover_photo),
        likes: tag.source.cover_photo.likes,
        user: transformUser(tag.source.cover_photo.user),
        tags: [simpleTag],
      };

      acc.posts.push(post);
      return acc;
    },
    { posts: [] as BlendPost[], tags: [] as BlendPost["tags"] }
  );
  return [tags, posts];
};

const transformUrls = (post: Post | CoverPhoto): BlendPost["urls"] => ({
  blur_hash: post.blur_hash,
  download: post.links.download,
  regular: post.urls.regular,
  small_s3: post.urls.small_s3,
});

const transformUser = (
  user: Post["user"] | CoverPhoto["user"]
): BlendPost["user"] => ({
  id: user.id,
  updated_at: new Date(user.updated_at),
  username: user.username,
  name: user.name,
  first_name: user.first_name,
  last_name: user.last_name,
  bio: user.bio,
  location: user.location,
  profile_image: user.profile_image.large,
  social: {
    twitter_username: user.twitter_username,
    instagram_username: user.instagram_username,
    paypal_email: user.social?.paypal_email,
    portfolio_url: user.portfolio_url,
  },
});
