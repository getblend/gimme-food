import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";


@ObjectType({
  description: "Details of the variation",
})
export class Variation extends withObjectTracking("Variation"){
 
  @Field({
    description: "Name of the variation",
  })
  public name: string; 

  @Field({
    description: "Category Name of the variation. E.g., variations can be grouped under 'Size', 'Quantity', etc.",
  })
  public groupname: string; 

  @Field(()=>Int,{
    description: "New dish price due to variation",
  })
  public price: number; 

  @Field({
    description: "Flag to indicate whether this variation is available for dish",
  })
  public active: boolean; 

  @Field(()=>Int,{
    description: "Packing charges of the dish corresponding to its variation",
  })
  public packingCharges: number;  
}