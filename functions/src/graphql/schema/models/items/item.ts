import { Field, Int, ObjectType } from "type-graphql";
import { GraphQLURL } from "graphql-scalars";
import { withObjectTracking } from "../../mixins";
import { Addon } from "./addon";

@ObjectType({
  description: "A details of the item",
})
export class Item extends withObjectTracking("Item") {
  @Field({
    description: "partnerid of the item",
  })
  public partnerid: string;

  @Field({
    description: "categoryid of the item",
  })
  public categoryid: string;
  
  @Field({
    description: "itemName of the item",
  })
  public itemName: string;

  @Field({
    description: "description of the item",
  })
  public description: string;

  @Field(() => Int, {
    description: "itemPrice of the item",
  })
  public itemPrice: number;

  @Field(() => Int, {
    description: "itemPrice of the item",
  })
  public packingcharges: number;

  @Field({
    description: "itemPrice of the item",
  })
  public instock: boolean;

  @Field({
    description: "itemPrice of the item",
  })
  public foodType: string;

  @Field({
    description: "The url to the preview of the image item",
  })
  public itemUrl: string

  @Field(() => [Addon], { description: "Addon the item" })
  public addon: Addon[];

}
