import { Service, Inject } from "typedi";
import { Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../schema";
import { CoreContext, RequestContext, UserRepository } from "../../context";

@Service()
@Resolver()
export class UserResolver {
  @Inject()
  private coreContext: CoreContext;

  @Inject()
  private userRepository: UserRepository;

  @Query(() => User, {
    description: "Returns the details of the current authenticated user",
    nullable: true,
  })
  public async currentUser(
    @Ctx() context: RequestContext
  ): Promise<User | undefined> {
    const currentUserId = context.user?.id;
    this.coreContext.logger.info(
      `Fetching authentication for user: ${currentUserId}`
    );
    if (!currentUserId) {
      return undefined;
    }
    return this.userRepository.find(currentUserId);
  }
}
