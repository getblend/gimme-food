import { Inject, Service } from "typedi";

import { Store, StoreHoursScope } from "../../graphql/schema";
import { make, makeCollection } from "../../helpers/make";
import { withBoilerplate } from "../core";
import { MenuItemLoader } from "./menuItem.loader";
import { WebMenuStoreLoader } from "../webMenu";

import type {
  ImagePost,
  MenuItem,
  StoreHours,
  StoreCollection,
} from "../../graphql/schema";

import type { WebMenuStore } from "../webMenu";

@Service()
export class StoreLoader extends withBoilerplate("StoreLoader") {
  @Inject()
  private webMenuStoreLoader: WebMenuStoreLoader;

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

  public static fromWebMenuStore(store: WebMenuStore): Store {
    return {
      address: {
        building: "123",
        city: store.address.city,
        country: store.address.country,
        geoLocation: {
          latitude: store.address.latitude,
          longitude: store.address.longitude,
          plusCode: "+4GQ+2X",
        },
        landmark: "Main St",
        postalCode: store.address.pincode,
        street: store.address.area,
      },
      createdAt: new Date(store.createdate),
      hours: convertFromWebMenuHours(store.openclosetime),
      id: store.userid,
      name: store.username,
      updatedAt: new Date(),
    };
  }

  public static fromWebMenuStores(stores: WebMenuStore[]): Store[] {
    return stores.map((store) => ({
      address: {
        building: "123",
        city: store.address.city == null ? "empty" : store.address.city,
        country:
          store.address.country == null ? "empty" : store.address.country,
        geoLocation: {
          latitude:
            store.address.latitude == null ? "empty" : store.address.latitude,
          longitude:
            store.address.longitude == null ? "empty" : store.address.longitude,
          plusCode: "+4GQ+2X",
        },
        landmark: "Main St",
        postalCode:
          store.address.pincode == null ? "empty" : store.address.pincode,
        street: store.address.area == null ? "empty" : store.address.area,
      },
      createdAt: new Date(),
      hours: convertFromWebMenuHours(store.openclosetime),
      id: store.userid,
      name: store.username,
      updatedAt: new Date(),
    }));
  }

  public async getMenuItemFromPost(post: ImagePost): Promise<MenuItem> {
    return MenuItemLoader.createMockMenuItem(post.id);
  }

  public async getStore(StoreId: string): Promise<Store> {
    const webMenuStore = await this.webMenuStoreLoader.getStore(StoreId);
    return StoreLoader.fromWebMenuStore(webMenuStore);
  }

  public async getStoreForPost(post: ImagePost): Promise<Store> {
    return StoreLoader.createMockStore(post.id);
  }

  public async getStores(): Promise<StoreCollection> {
    const webMenuStores = await this.webMenuStoreLoader.getStores();
    const stores = StoreLoader.fromWebMenuStores(webMenuStores);
    return makeCollection<StoreCollection>(stores);
  }

  protected onInit(): void {
    return;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertFromWebMenuHours(storeHours: any[]): StoreHours[] {
  return storeHours.map((storeHours) => ({
    // closesAt: new Date(storeHours.endtime),
    closesAt: new Date(),
    createdAt: new Date(),
    description: "Weekday hours",
    id: storeHours._id,
    opensAt: new Date(),
    scope: convertFromWeekDay(storeHours.weekday),
    updatedAt: new Date(),
  }));
}

function convertFromWeekDay(weekday: string): StoreHoursScope {
  switch (weekday) {
    case "sunday":
      return StoreHoursScope.Sunday;

    case "monday":
      return StoreHoursScope.Monday;

    case "tuesday":
      return StoreHoursScope.Thursday;

    case "Wednesday":
      return StoreHoursScope.Wednesday;

    case "thursday":
      return StoreHoursScope.Thursday;

    case "friday":
      return StoreHoursScope.Friday;

    case "saturday":
      return StoreHoursScope.Saturday;

    default:
      return StoreHoursScope.Weekdays;
  }
}
