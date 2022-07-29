import { logger } from "firebase-functions";
import { Container, Token } from "typedi";

export type ILogger = typeof logger;

const Logger = new Token<ILogger>("Logger");
Container.set(Logger, logger);

export { Logger };
