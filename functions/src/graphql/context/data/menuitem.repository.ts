import { Service, Inject } from "typedi";
import { make } from "../../../helpers/make";
import { MenuItem } from "../../schema";
import {store} from "./store.repository"
import { CoreContext } from "../core.context";

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
        foodType:"veg",
        addon:[
            {   
                id:"1233",
                name:"extra onion",
                price:100,
                status:true,
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    



    
