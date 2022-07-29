import { Inject, Service } from "typedi";

import { Firebase, IFirebase } from "./firebase";
import { ILogger, Logger } from "./logger";
import { ISecrets, Secrets } from "./secrets";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const withBoilerplate = (serviceName: string) => {
  @Service()
  abstract class BaseService {
    protected constructor(
      @Inject(Logger) protected logger: ILogger,
      @Inject(Firebase) protected firebase: IFirebase,
      @Inject(Secrets) protected secrets: ISecrets
    ) {
      this.logger.info(`${serviceName} service initialized`);
      this.onInit();
    }

    protected isDebugMode(): boolean {
      return !!this.secrets["FUNCTIONS_EMULATOR"];
    }

    protected abstract onInit(): void;
  }

  return BaseService;
};
