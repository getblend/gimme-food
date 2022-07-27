import { Service, Inject } from "typedi";
import { make } from "../../../helpers/make";
import { MenuItem } from "../../schema";

import { CoreContext } from "../core.context";
import { store } from "./store.repository";

@Service()
export class MenuItemRepository {
    @Inject()
    coreContext: CoreContext;
   
    async getMenuItem(): Promise<MenuItem | undefined> {
        return menuItemDetails();
    }
}

export const menuItemDetails = (): MenuItem =>
    make(MenuItem, {
        id:"1234",
        name: "pizzaq",
        description:"description",
        price:100,
        store:store(),
        inStock:true,
        dietaryPreference:"veg",
        addon:[
            {   
                id:"1233",
                name:"extra onion",
                price:100,
                active:true,
            }
        ],
        variation:{
            id:"43211",
            name:"full",
            groupname:"quentity",
            price:300,
            active:true,
            packingCharges:10,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    



    
