import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";


@ObjectType({
  description: "A details of the variation",
})
export class Variation extends withObjectTracking("Variation"){
 
  @Field({
    description: "Name of the Variation",
  })
  public name: string; 

  @Field({
    description: "HroupName of the Variation",
  })
  public groupname: string; 

  @Field(()=>Int,{
    description: "Price of the Variation",
  })
  public price: number; 

  @Field({
    description: "Active of the Variation",
  })
  public active: boolean; 

  @Field(()=>Int,{
    description: "PackingCharges of the Variation",
  })
  public packingCharges: number;  
}