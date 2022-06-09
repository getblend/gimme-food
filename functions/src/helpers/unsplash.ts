import * as functions from "firebase-functions";
import { BlendPost } from "../models/outputTypes";
import { transformPosts } from "./transform";

/**
 * Base unsplash API
 */
const unsplash = async <T = any>(
  path: string,
  params: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(
    `https://api.unsplash.com${path}?${searchParams}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
      },
    }
  );

  if (response.status !== 200) {
    const error = `Failed to get data, status:${response.status}`;
    functions.logger.error(error);
    throw new Error(error);
  }

  const data = await response.json();
  return data as T;
};

/**
 * Implementation of the Unsplash search API
 * https://unsplash.com/documentation#search-photos
 */
export const searchPosts = async (search: string): Promise<BlendPost[]> => {
  functions.logger.debug(`Downloading food images from unsplash`);

  const data = await unsplash("/search/photos", {
    query: search,
    page: "1",
    per_page: "30",
    order_by: "latest",
    content_filter: "high",
    orientation: "portrait",
  });

  functions.logger.info(`Downloaded ${data?.results?.length ?? 0} posts`);
  return transformPosts(data?.results);
};

/**
 * Implementation of the Unsplash random API
 * https://unsplash.com/documentation#get-a-random-photo
 */
export const downloadRandom = async (): Promise<BlendPost[]> => {
  functions.logger.debug(`Downloading random posts`);

  const data = await unsplash("/photos/random", {
    topics: "Food",
    order_by: "latest",
    content_filter: "high",
    orientation: "portrait",
    count: "30",
  });

  functions.logger.info(`Downloaded ${data?.length ?? 0} posts.`);
  return transformPosts(data);
};
