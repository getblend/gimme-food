import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";

@ObjectType({
  description: "A details of the category of the menu item",
})
export class MenuItemCategory extends withObjectTracking("MenuItemCategory") {
  @Field({
    description: "Code of the category",
  })
  public code: string;

  @Field({
    description: "Description of the category",
  })
  public description: string;

  @Field({
    description: "Code of the category",
  })
  public name: string;
}
