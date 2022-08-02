import { Inject, Service } from "typedi";

import { withBoilerplate } from "../core";
import { WebMenuOrderLoader } from "../webMenu";
import { make, makeCollection } from "../../helpers/make";

import { Order, OrderStatus, StoreHoursScope } from "../../graphql/schema";

import type {
  Cart,
  RazorPayTransaction,
  Store,
  Tracking,
  User,
} from "../../graphql/schema";

@Service()
export class OrderLoader extends withBoilerplate("OrderLoader") {
  @Inject()
  // private webMenuOrderLoader: WebMenuOrderLoader;
  public static createMockOrder(webMenuorder: string): Order {
    return make(Order, {
      id: "dsadsad",
      createdAt: new Date(),
      updatedAt: new Date(),
      cancellationReason: "",
      cancelledAt: new Date(),
      cart: convertFromCart(),
      deliveredAt: new Date(),
      status: OrderStatus.Received,
      store: convertFromstore(webMenuorder),
      tracking: convertFromtTracking(),
      transaction: covertFromTransaction(),
      user: convertFromUser(),
    });
  }

  public async getOrder(orderId: string): Promise<Order> {
    // const webMenuorder = await this.webMenuOrderLoader.getOrder(orderId);
    return OrderLoader.createMockOrder(orderId);
  }

  protected onInit(): void {
    return;
  }
}

function convertFromCart(): Cart {
  return {
    id: "122",
    createdAt: new Date(),
    updatedAt: new Date(),
    isAbandoned: 122,
    items: [],
    packingTotal: 10,
    shippingAddress: {
      building: "123",
      city: "New York",
      country: "USA",
      geoLocation: {
        latitude: "40.7128",
        longitude: "-74.0060",
        plusCode: "+4GQ+2X",
      },
      landmark: "Main St",
      postalCode: "10001",
      street: "123 Main St",
    },
    shippingTotal: 100,
    store: convertFromstore("sdasdd"),
    subTotal: 300,
    total: 500,
    totalDiscount: 20,
    totalItems: 5,
    totalTax: 1,
    totalUniqueItems: 1,
    user: convertFromUser(),
  };
}

function convertFromstore(seed: string): Store {
  return {
    address: {
      building: "123",
      city: "New York",
      country: "USA",
      geoLocation: {
        latitude: "40.7128",
        longitude: "-74.0060",
        plusCode: "+4GQ+2X",
      },
      landmark: "Main St",
      postalCode: "10001",
      street: "123 Main St",
    },
    createdAt: new Date(),
    hours: [
      {
        closesAt: new Date(),
        createdAt: new Date(),
        description: "Weekday hours",
        id: `Hours ${seed}`,
        opensAt: new Date(),
        scope: StoreHoursScope.Weekdays,
        updatedAt: new Date(),
      },
    ],
    id: seed,
    name: `Store ${seed}`,
    updatedAt: new Date(),
  };
}

function convertFromtTracking(): Tracking {
  return {
    id: "111",
    createdAt: new Date(),
    updatedAt: new Date(),
    agentName: "sdasd",
    agentPhoneNumber: "31232133213",
    location: {
      latitude: "40.7128",
      longitude: "-74.0060",
      plusCode: "+4GQ+2X",
    },
  };
}

function covertFromTransaction(): RazorPayTransaction {
  return {
    id: "asdsad",
    createdAt: new Date(),
    updatedAt: new Date(),
    payment: "2222",
    signature: "3333",
  };
}

function convertFromUser(): User {
  return {
    createdAt: new Date(),
    email: "jane.doe@somewhere.com",
    firstName: "Jane",
    id: "seed",
    lastName: "Doe",
    phoneNumber: "+1234351234",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    updatedAt: new Date(),
    userName: "janedoe",
  };
}
