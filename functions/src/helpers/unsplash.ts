import * as functions from "firebase-functions";
import { BlendPost } from "../models/outputTypes";
import { transformPosts } from "./transform";

export const downloadPosts = async (size = 20): Promise<BlendPost[]> => {
  functions.logger.debug(`Downloading food images from unsplash`);

  const params = new URLSearchParams({
    query: "Food",
    page: "1",
    per_page: `${size}`,
    order_by: "latest",
    content_filter: "high",
    orientation: "portrait",
  });

  const response = await fetch(
    `https://api.unsplash.com/search/photos?${params}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
      },
    }
  );

  if (response.status !== 200) {
    const error = `Failed to download posts, status:${response.status}`;
    functions.logger.error(error);
    throw new Error(error);
  }

  const data = await response.json();
  functions.logger.info(`Downloaded ${data?.results?.length ?? 0} posts`);
  return transformPosts(data?.results);
};

export const downloadRandom = async (): Promise<BlendPost[]> => {
  functions.logger.debug(`Downloading random posts`);

  const params = new URLSearchParams({
    topics: "Food",
    order_by: "latest",
    content_filter: "high",
    orientation: "portrait",
    count: "30",
  });

  const response = await fetch(
    `https://api.unsplash.com/photos/random?${params}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
      },
    }
  );

  if (response.status !== 200) {
    const error = `Failed to download posts, status:${response.status}`;
    functions.logger.error(error);
    throw new Error(error);
  }

  const data = await response.json();
  functions.logger.info(`Downloaded ${data?.length ?? 0} posts.`);
  return transformPosts(data);
};
