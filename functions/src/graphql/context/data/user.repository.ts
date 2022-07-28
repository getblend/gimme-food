import { Service, Inject } from "typedi";

import { make } from "../../../helpers/make";

import { User } from "../../schema";
import { CoreContext } from "../core.context";

import type { BlendPost } from "../../../legacy/outputTypes";

@Service()
export class UserRepository {
  @Inject()
  private coreContext: CoreContext;

  public async find(id: string): Promise<User | undefined> {
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
    createdAt: new Date().toISOString(),
    email: "a@b.xyz",
    firstName: data.name,
    id: data.username,
    lastName: data.name,
    phoneNumber: "+1234351234",
    profileImage: data.profile_image,
    updatedAt: new Date().toISOString(),
    userName: data.username,
  });
