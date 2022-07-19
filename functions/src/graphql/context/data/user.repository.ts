import { Service, Inject } from "typedi";

import { make } from "../../../helpers/make";
import { BlendPost } from "../../../models/outputTypes";
import { User } from "../../schema";
import { CoreContext } from "../core.context";

@Service()
export class UserRepository {
  @Inject()
  coreContext: CoreContext;

  async find(id: string): Promise<User | undefined> {
    const query = this.coreContext.db.collection("users").doc(id);
    const doc = await query.get();
    if (!doc.exists) {
      return undefined;
    }
    return createUser(doc.data() as BlendPost["user"]);
  }
}

export const createUser = (data: BlendPost["user"]): User =>
  make(User, {
    firstName: data.name,
    lastName: data.name,
    phoneNumber: "+1234351234",
    profileImage: new URL(data.profile_image),
    userName: data.username,
    id: data.username,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "a@b.xyz",
  });
