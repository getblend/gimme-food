import axios from "axios";
import { Container, Token } from "typedi";

import { Logger } from "./logger";
import { Secrets } from "./secrets";

import type { AxiosInstance } from "axios";

export type IWebMenuApi = AxiosInstance;
export const WebMenuApi = new Token<IWebMenuApi>();

export async function initializeWebMenuApi(): Promise<void> {
  const secrets = Container.get(Secrets);
  const logger = Container.get(Logger);
  const client = axios.create({
    baseURL: secrets["WEB_MENU_API_URL"],
    headers: {
      "Content-type": "application/json",
    },
  });
  if ((await client.get("/")).status === 200) {
    logger.info("Web menu API is available");
    Container.set(WebMenuApi, client);
  } else {
    logger.error("Web menu API is not available");
    throw new Error("Web menu API is not available");
  }
}
