import axios from "axios";
import { transformPosts } from "./transform";

export const downloadPosts = async (size = 20) => {
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
    throw new Error("Something went wrong when fetching information");
  }

  return transformPosts(response.data.results);
};
