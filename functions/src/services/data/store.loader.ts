import { Service } from "typedi";

import { Store, StoreHoursScope } from "../../graphql/schema";
import { make } from "../../helpers/make";
import { withBoilerplate } from "../core";
import { MenuItemLoader } from "./menuItem.loader";

import type { ImagePost, MenuItem } from "../../graphql/schema";

@Service()
export class StoreLoader extends withBoilerplate("StoreLoader") {
  public static createMockStore(seed: string): Store {
    return make(Store, {
      address: {
        building: "123",
        city: "New York",
        country: "USA",
        geoLocation: {
          latitude: "40.7128",
          longitude: "-74.0060",
          plusCode: "+4GQ+2X",
        },
        landmark: "Main St",
        postalCode: "10001",
        street: "123 Main St",
      },
      createdAt: new Date(),
      hours: [
        {
          closesAt: new Date(),
          createdAt: new Date(),
          description: "Weekday hours",
          id: `Hours ${seed}`,
          opensAt: new Date(),
          scope: StoreHoursScope.Weekdays,
          updatedAt: new Date(),
        },
      ],
      id: seed,
      name: `Store ${seed}`,
      updatedAt: new Date(),
    });
  }

  public async getMenuItemFromPost(post: ImagePost): Promise<MenuItem> {
    // console.log("mongodbmenu")
    // mongoose.connect("mongodb://localhost:27017/theblend", (err: any) => {
    //   if (err) {
    //     console.log(err.message);
    //   } else {
    //     console.log("Successfully Connected!");
    //   }
    // });
    // //const ab = mongoose.Connection

    return MenuItemLoader.createMockMenuItem(post.id);
  }

  public async getStoreForPost(post: ImagePost): Promise<Store> {
    return StoreLoader.createMockStore(post.id);
  }

  protected onInit(): void {
    return;
  }
}
