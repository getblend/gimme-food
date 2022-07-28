import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../mixins";
import { MenuItem, Store } from "../models";

@ObjectType({
  description: "A details of the category",
})
export class Category extends withObjectTracking("Category") {
  @Field({
    description: "Code of the category",
  })
  public name: string;

  @Field({
    description: "Description of the category",
  })
  public description: string;

  @Field(() => Store, {
    description: "Store of the category",
  })
  public store: Store;

  @Field(() => MenuItem, {
    description: "MenuItem of the category",
  })
  public menuItem: MenuItem;
}
