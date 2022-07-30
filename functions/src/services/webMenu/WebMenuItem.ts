import { Service } from "typedi";

import { withBoilerplate } from "../core";

export interface WebMenuItem {
  __v: number;
  _id: string;
  active: boolean;
  categoryid: string;
  createdate: string;
  description: string;
  foodtype: string;
  healthoptions: string[];
  instock: boolean;
  itemid: string;
  itemimg: string;
  name: string;
  packingcharges: number;
  partnerid: string;
  price: number;
  specialtags: string;
  subitem: any[];
  tax: number;
  taxes: WebMenuItemTax[];
  variation: any[];
  vat: number;
}

export interface WebMenuItemTax {
  _id: string;
  active: string;
  tax: number;
  tax_ordertype: string;
  tax_taxtype: string;
  taxid: string;
  taxname: string;
  taxtype: string;
}

export interface WebMenuItemCategory {
  __v: number;
  _id: string;
  categoryid: string;
  createdate: string;
  delivery: boolean;
  description: string;
  dinein: boolean;
  name: string;
  partnerid: string;
  status: boolean;
  takeaway: boolean;
}

@Service()
export class WebMenuItemLoader extends withBoilerplate("WebMenuItemLoader") {
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

  protected onInit(): void {
    return;
  }
}
