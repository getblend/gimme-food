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
        instock:true,
        foodType:"veg",
        // addon:[
        //     {
        //         addongroupid:"11121",
        //         addonitemid:"22222",
        //         description:"extra onion",
        //         price:100,
        //         status:true
        //     }
        // ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    



    
