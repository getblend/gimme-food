import { Inject, Service } from "typedi";
import { make } from "../../../helpers/make";
import { Store, StoreCollection } from "../../schema/models/stores/store";
import { CoreContext } from "../core.context";
import axios from 'axios';

@Service()
export class StoreRepository {
  @Inject()
  private coreContext: CoreContext;

  public async getStores():Promise<Store>{

    console.log("storedata")
    const { data, status } = await axios.get<any>(
        'https://menuapi.theblend.co.in/item/6f2a6068-7c2e-4e56-b770-13bb227cf1b5',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log(JSON.stringify(data, null, 4));
      // const query = this.coreContext.db
     //  .collection("posts")
    //   .orderBy("created_at", "desc");

    return make(Store,{
      name:"burger",
      id:data.partnerid
    });
  }
}

