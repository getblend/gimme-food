import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";


@ObjectType({
  description: "A details of Texes",
})
export class Taxes extends withObjectTracking("Texes"){
 
  @Field({
    description: "Name of the Taxes",
  })
  public name: string; 

  @Field(()=>Float,{
    description: "Tax of the Taxes",
  })
  public tax: number; 
}