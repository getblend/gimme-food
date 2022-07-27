import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";


@ObjectType({
  description: "Tax Details",
})
export class Taxes extends withObjectTracking("Tax"){
 
  @Field({
    description: "Type of Tax. E.g., SGST or CGST",
  })
  public name: string; 

  @Field(()=>Float,{
    description: "Tax percentage. E.g., 5%, 8%, etc.,",
  })
  public tax: number; 
}