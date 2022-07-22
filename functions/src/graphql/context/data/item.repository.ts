import { Service, Inject } from "typedi";
import { make } from "../../../helpers/make";
import { Item } from "../../schema";

import { CoreContext } from "../core.context";

@Service()
export class ItemRepository {
    @Inject()
    coreContext: CoreContext;

    async getItem(): Promise<Item | undefined> {
        return itemDetails();
    }
}

export const itemDetails = (): Item =>
    make(Item, {
        id:"1234",
        partnerid:"34123213",
        categoryid:"3234324",
        itemName: "pizzaq",
        description:"description",
        itemPrice:100,
        packingcharges:10,
        instock:true,
        foodType:"veg",
        itemUrl:"url",
        addon:[
            {
                addongroupid:"11121",
                addonitemid:"22222",
                description:"extra onion",
                price:100,
                status:true
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    



    
