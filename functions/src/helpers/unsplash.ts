import axios from "axios";
import { transformPosts } from "./transform";
import * as functions from "firebase-functions";

export const downloadPosts = async (size = 20) => {
  functions.logger.info(`Downloading ${size} posts.`);

  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
    params: {
      query: "Food",
      page: 1,
      per_page: size,
      order_by: "latest",
      content_filter: "high",
      orientation: "portrait",
    },
  });

  if (!response?.data?.results) {
    functions.logger.error(`Failed to download posts.`, {
      status: response.status,
    });
    throw new Error("Something went wrong when fetching information");
  }

  functions.logger.info(`Downloaded ${size} posts.`);
  return transformPosts(response.data.results);
};

export const downloadRandom = async () => {
  functions.logger.info(`Downloading 30 random posts.`);

  const response = await axios.get("https://api.unsplash.com/photos/random", {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
    params: {
      topics: "Food",
      order_by: "latest",
      content_filter: "high",
      orientation: "portrait",
      count: 30,
    },
  });

  if (!response?.data) {
    functions.logger.error(`Failed to download posts.`, {
      status: response.status,
    });
    throw new Error("Something went wrong when fetching information");
  }

  functions.logger.info(`Downloaded ${30} random posts.`);
  return transformPosts(response.data.results);
};
