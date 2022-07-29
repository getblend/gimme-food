import { Service } from "typedi";

import { make } from "../../helpers/make";
import { withBoilerplate } from "../core";

import { MenuItem } from "../../graphql/schema";

@Service()
export class MenuItemLoader extends withBoilerplate("MenuItemLoader") {
  public static createMockMenuItem(seed: string): MenuItem {
    return make(MenuItem, {
      addons: [],
      category: {
        code: "",
        createdAt: new Date(),
        description: "",
        id: `Category ${seed}`,
        name: `Category ${seed}`,
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      description: "",
      dietaryPreferences: [],
      id: seed,
      isInStock: false,
      name: `Menu Item ${seed}`,
      price: 0,
      taxes: [],
      updatedAt: new Date(),
      variations: [],
    });
  }

  protected onInit(): void {
    return;
  }
}
