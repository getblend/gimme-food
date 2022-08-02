import { Inject, Service } from "typedi";

import { make } from "../../helpers/make";
import { withBoilerplate } from "../core";

import { MenuItem, DietaryPreference } from "../../graphql/schema";

import { WebMenuItemLoader } from "../webMenu";

import type {
  Variation,
  Tax,
  AddOn,
  MenuItemCategory,
} from "../../graphql/schema";
import type {
  WebMenuItem,
  WebMenuItemTax,
  WebMenuItemCategory,
} from "../webMenu";

@Service()
export class MenuItemLoader extends withBoilerplate("MenuItemLoader") {
  @Inject()
  private webMenuItemLoader: WebMenuItemLoader;

  public static createMockMenuItem(seed: string): MenuItem {
    return make(MenuItem, {
      addons: [],
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

  public static fromWebMenuItem(webMenuItem: WebMenuItem): MenuItem {
    return make(MenuItem, {
      addons: convertFromAddOns(webMenuItem.subitem),
      createdAt: new Date(webMenuItem.createdate),
      description: webMenuItem.description,
      dietaryPreferences: convertFromFoodType(webMenuItem.foodtype),
      id: webMenuItem.itemid,
      isInStock: webMenuItem.active,
      name: webMenuItem.name,
      price: webMenuItem.price,
      taxes: convertFromWebMenuTaxes(webMenuItem.taxes),
      updatedAt: new Date(webMenuItem.createdate),
      variations: convertFromWebMenuVariations(webMenuItem.variation),
    });
  }

  public static fromWebMenuItemCategory(
    category: WebMenuItemCategory
  ): MenuItemCategory {
    return {
      createdAt: new Date(category.createdate),
      description: category.description,
      id: category.categoryid,
      name: category.name,
      updatedAt: new Date(category.createdate),
    };
  }

  public async getMenuItem(menuItemId: string): Promise<MenuItem> {
    const webMenuItem = await this.webMenuItemLoader.getItem(menuItemId);
    return MenuItemLoader.fromWebMenuItem(webMenuItem);
  }

  public async getMenuItems(storeId: string): Promise<MenuItem> {
    const webMenuItems = await this.webMenuItemLoader.getItem(storeId);
    return MenuItemLoader.fromWebMenuItem(webMenuItems);
  }

  public async loadCategory(menuItemId: string): Promise<MenuItemCategory> {
    const webMenuItem = await this.webMenuItemLoader.getItem(menuItemId);
    const category = await this.webMenuItemLoader.getCategory(
      webMenuItem.categoryid
    );
    return MenuItemLoader.fromWebMenuItemCategory(category);
  }

  protected onInit(): void {
    return;
  }
}

function convertFromFoodType(foodtype: string): DietaryPreference[] {
  switch (foodtype) {
    case "vegetarian":
      return [DietaryPreference.Vegetarian];

    case "non-vegetarian":
      return [DietaryPreference.NonVegetarian];

    case "eggetarian":
      return [DietaryPreference.Eggetarian];

    default:
      return [];
  }
}

function convertFromWebMenuTaxes(taxes: WebMenuItemTax[] = []): Tax[] {
  return taxes.map((tax) => ({
    createdAt: new Date(),
    id: tax.taxid,
    name: tax.taxname,
    percentage: tax.tax,
    updatedAt: new Date(),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertFromWebMenuVariations(variations: any[]): Variation[] {
  return variations.map((variation) => ({
    createdAt: new Date(),
    id: variation.id,
    isInStock: variation.active,
    name: variation.name,
    packingCharges: variation.item_packingcharges,
    price: variation.price,
    title: variation.groupname,
    updatedAt: new Date(),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertFromAddOns(subitems: any[]): AddOn[] {
  return subitems.map((subitem) => ({
    createdAt: new Date(),
    id: subitem.addonitemid,
    isInStock: subitem.status,
    name: subitem.description,
    price: subitem.price,
    updatedAt: new Date(),
  }));
}
