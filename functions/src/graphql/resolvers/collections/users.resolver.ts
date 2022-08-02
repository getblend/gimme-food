import { Service, Inject } from "typedi";
import { Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../schema";
import { IContext, withBoilerplate } from "../../../services/core";
import { UserLoader } from "../../../services/data";

@Service()
@Resolver()
export class UsersResolver extends withBoilerplate("UsersResolver") {
  @Inject()
  private userLoader: UserLoader;

  @Query(() => User, {
    description: "Returns the details of the current authenticated user",
    nullable: true,
  })
  public async currentUser(
    @Ctx() { auth }: IContext
  ): Promise<User | undefined> {
    const currentUserId = auth?.id;
    this.logger.info(`Fetching authentication for user: ${currentUserId}`);
    if (!currentUserId) {
      return undefined;
    }
    return this.userLoader.find(currentUserId);
  }

  protected onInit(): void {
    return;
  }
}
