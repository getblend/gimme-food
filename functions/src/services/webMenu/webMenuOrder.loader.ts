import { Service } from "typedi";

import { withBoilerplate } from "../core";

export interface WebMenuOrder {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subitem: any[];
  tax: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variation: any[];
  vat: number;
}

@Service()
export class WebMenuOrderLoader extends withBoilerplate("WebMenuOrderLoader") {
  public async getOrder(orderid: string): Promise<WebMenuOrder> {
    try {
      const { data } = await this.webMenuApi.get<WebMenuOrder>(
        `/order/${orderid}`
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error while fetching order:${orderid} from web menu api`,
        error
      );
      throw new Error(
        `Error while fetching order:${orderid} from web menu api`
      );
    }
  }

  protected onInit(): void {
    return;
  }
}
