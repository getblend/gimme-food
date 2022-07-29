import { Service } from "typedi";

import { User } from "../../graphql/schema";
import { withBoilerplate } from "../core";
import { make } from "../../helpers/make";

import type { BlendPost } from "../../legacy/outputTypes";

@Service()
export class UserLoader extends withBoilerplate("UserLoader") {
  public static createMockUser(seed: string): User {
    return make(User, {
      createdAt: new Date(),
      email: "jane.doe@somewhere.com",
      firstName: "Jane",
      id: seed,
      lastName: "Doe",
      phoneNumber: "+1234351234",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      updatedAt: new Date(),
      userName: "janedoe",
    });
  }

  public static fromBlendUser(data: BlendPost["user"]): User {
    return make(User, {
      createdAt: new Date(),
      email: "a@b.xyz",
      firstName: data.name,
      id: data.username,
      lastName: data.name,
      phoneNumber: "+1234351234",
      profileImage: data.profile_image,
      updatedAt: new Date(),
      userName: data.username,
    });
  }

  public async find(id: string): Promise<User | undefined> {
    const query = this.firebase.collection("users").doc(id);
    const doc = await query.get();
    if (!doc.exists) {
      return UserLoader.createMockUser(id);
    }
    return UserLoader.fromBlendUser(doc.data() as BlendPost["user"]);
  }

  protected onInit(): void {
    return;
  }
}
