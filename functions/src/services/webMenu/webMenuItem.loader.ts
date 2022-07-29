import { Inject, Service } from "typedi";

import { withBoilerplate } from "../core";

export interface WebMenuItem {
  active: boolean;
  instock: boolean;
  healthoptions: string[];
  _id: string;
  partnerid: string;
  categoryid: string;
  name: string;
  description: string;
  price: number;
  tax: number;
  vat: number;
  packingcharges: number;
  foodtype: string;
  specialtags: string;
  subitem: any[];
  itemimg: string;
  itemid: string;
  createdate: string;
  __v: number;
  taxes: WebMenuItemTax[];
  variation: any[];
}

export interface WebMenuItemTax {
  _id: string;
  taxid: string;
  taxname: string;
  tax: number;
  taxtype: string;
  tax_ordertype: string;
  active: string;
  tax_taxtype: string;
}

export interface WebMenuItemCategory {
  _id: string;
  partnerid: string;
  name: string;
  description: string;
  dinein: boolean;
  takeaway: boolean;
  delivery: boolean;
  status: boolean;
  categoryid: string;
  createdate: string;
  __v: number;
}

@Service()
export class WebMenuItemLoader extends withBoilerplate("WebMenuItemLoader") {
  public async getItem(itemId: string): Promise<WebMenuItem> {
    try {
      const { data } = await this.webMenuApi.get<WebMenuItem>(
        `/item/${itemId}`
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error while fetching item:${itemId} from web menu api`,
        error
      );
      throw new Error(`Error while fetching item:${itemId} from web menu api`);
    }
  }

  public async getCategory(categoryId: string): Promise<WebMenuItemCategory> {
    try {
      const { data } = await this.webMenuApi.get<WebMenuItemCategory>(
        `/category/${categoryId}`
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error while fetching category for item:${categoryId} from web menu api`,
        error
      );
      throw new Error(
        `Error while category for item:${categoryId} from web menu api`
      );
    }
  }

  protected onInit(): void {
    return;
  }
}
