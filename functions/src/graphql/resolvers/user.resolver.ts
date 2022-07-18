import { Ctx, Query, Resolver } from "type-graphql";

import { Context } from "../context";
import { User } from "../schema";

@Resolver()
export class UserResolver {
  @Query(() => User, {
    nullable: true,
    description: "Returns the details of the current authenticated user",
  })
  public currentUser(@Ctx() context: Context): Promise<User | undefined> {
    const currentUserId = context.auth.user.id;
    context.core.logger.info(
      `Fetching authentication for user: ${currentUserId}`
    );
    return context.data.user.find(currentUserId);
  }
}
