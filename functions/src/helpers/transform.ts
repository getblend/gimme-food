import { Post } from "../models/inputTypes";
import { BlendPost } from "../models/outputTypes";

export const transformPosts = (posts: Post[] = []): BlendPost[] =>
  posts.map(transformPost);

/**
 * Convert the incoming information into something that's compatible with our systems
 */
const transformPost = (post: Post): BlendPost => ({
  alt_description: post.alt_description,
  color: post.color,
  created_at: new Date(post.created_at),
  description: post.description,
  height: post.height,
  id: post.id,
  likes: post.likes,
  tags: transformTags(post.tags),
  urls: transformUrls(post),
  user: transformUser(post.user),
  width: post.width,
});

/**
 * Converts a bunch of tags into a simplified version
 */
const transformTags = (tags: Post["tags"] = []): BlendPost["tags"] =>
  tags.reduce((acc, tag) => {
    if (!tag.source) return acc;

    const simpleTag: BlendPost["tags"][0] = {
      unique: tag.title,
      title: tag.source.title,
      description: tag.source.description,
    };

    acc.push(simpleTag);
    return acc;
  }, [] as BlendPost["tags"]);

/**
 * Extract URLs for the image using the post information
 */
const transformUrls = (post: Post): BlendPost["urls"] => ({
  blur_hash: post.blur_hash,
  download: post.links.download,
  regular: post.urls.regular,
  small_s3: post.urls.small_s3,
});

/**
 * Given a user, extract the user information
 */
const transformUser = (user: Post["user"]): BlendPost["user"] => ({
  bio: user.bio,
  first_name: user.first_name,
  id: user.id,
  last_name: user.last_name,
  location: user.location,
  name: user.name,
  profile_image: user.profile_image.large,
  social: {
    instagram_username: user.instagram_username,
    paypal_email: user.social?.paypal_email,
    portfolio_url: user.portfolio_url,
    twitter_username: user.twitter_username,
  },
  updated_at: new Date(user.updated_at),
  username: user.username,
});
