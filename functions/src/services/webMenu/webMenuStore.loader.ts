import { Service } from "typedi";

import { withBoilerplate } from "../core";

export interface WebMenuStore {
  _id: string;
  active: boolean;
  address: Address;
  createdate: string;
  openclosetime: WebMenuTime[];
  phonenumber: string;
  userid: string;
  username: string;
}

export interface WebMenuTime {
  _id: string;
  endtime: string;
  open: boolean;
  starttime: string;
  weekday: string;
  weekno: number;
}

export interface Address {
  address: string;
  area: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  pincode: string;
  state: string;
}

@Service()
export class WebMenuStoreLoader extends withBoilerplate("WebMenuStoreLoader") {
  public async getStore(storeId: string): Promise<WebMenuStore> {
    try {
      const { data } = await this.webMenuApi.get<WebMenuStore>(
        `/store/${storeId}`
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error while fetching store:${storeId} from web menu api`,
        error
      );
      throw new Error(
        `Error while fetching store:${storeId} from web menu api`
      );
    }
  }

  public async getStores(): Promise<WebMenuStore> {
    try {
      const { data } = await this.webMenuApi.get<WebMenuStore>("/store");
      return data;
    } catch (error) {
      this.logger.error("Error while fetching stores from web menu api", error);
      throw new Error("Error while fetching stores from web menu api");
    }
  }

  protected onInit(): void {
    return;
  }
}
