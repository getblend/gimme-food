import { Inject, Service } from "typedi";

import { Store, StoreHoursScope } from "../../graphql/schema";
import { make, makeCollection } from "../../helpers/make";
import { withBoilerplate } from "../core";
import { WebMenuItemLoader, WebMenuStoreLoader } from "../webMenu";
import { MenuItemLoader } from "./menuItem.loader";

import type {
  ImagePost,
  MenuItem,
  StoreCollection,
  StoreHours,
  MenuItemCollection,
  Address,
} from "../../graphql/schema";

import type { WebMenuStore } from "../webMenu";

@Service()
export class StoreLoader extends withBoilerplate("StoreLoader") {
  @Inject()
  private webMenuItemLoader: WebMenuItemLoader;

  @Inject()
  private webMenuStoreLoader: WebMenuStoreLoader;

  public static createMockStore(seed: string): Store {
    return make(Store, {
      address: createAddress(),
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
      address: createAddress(store.address),
      createdAt: new Date(store.createdate),
      hours: convertFromWebMenuHours(store.openclosetime),
      id: store.userid,
      name: store.username,
      updatedAt: new Date(),
    };
  }

  public static fromWebMenuStores(stores: WebMenuStore[]): Store[] {
    return stores.map(StoreLoader.fromWebMenuStore);
  }

  public async getMenuItemFromPost(post: ImagePost): Promise<MenuItem> {
    return MenuItemLoader.createMockMenuItem(post.id);
  }

  public async getMenuItems(storeId: string): Promise<MenuItemCollection> {
    const webMenuItems = await this.webMenuItemLoader.getItems(storeId);
    const menuItems = MenuItemLoader.fromWebMenuItems(webMenuItems);
    return makeCollection<MenuItemCollection>(menuItems);
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

function createAddress(address?: WebMenuStore["address"]): Address {
  return {
    building: "123",
    city: address?.city ?? "New York",
    country: address?.country ?? "USA",
    geoLocation: {
      latitude: address?.latitude ?? "40.7128",
      longitude: address?.longitude ?? "-74.0060",
      plusCode: "+4GQ+2X",
    },
    landmark: "Main St",
    postalCode: address?.pincode ?? "10001",
    street: address?.area ?? "Main St",
  };
}
