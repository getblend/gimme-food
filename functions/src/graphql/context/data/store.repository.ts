import { Service, Inject } from "typedi";
import { make } from "../../../helpers/make";
import { Store } from "../../schema";
import { CoreContext } from "../core.context";

@Service()
export class StoreRepository {
    @Inject()
    coreContext: CoreContext;

    async getStore(): Promise<Store | undefined> {
        return store();
    }
}

export const store = (): Store =>
    make(Store, {
        id:"1234",
        name: "blend",
        address:{
            building:"safina",
            landmark:"hub",
            street:"shivaginagara",
            city:"banglore",
            country:"india",
            postalCode:"577453",
            geoLocation:{
                latitude:"344234234",
                longitude:"424234324",
                plusCode:"string"
            }
        },
        hours:[
            {
                id:"aaaaa",
                // open: "12:30",
                // close: "24:20",
                days:"sunday",
                description:"string",
                createdAt:new Date(),
                updatedAt:new Date()
            },
        ],
        distance: new Date(),
        deliveryTime:new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    