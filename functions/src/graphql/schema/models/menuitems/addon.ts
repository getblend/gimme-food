import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";



/* id is represented by the concatenation of addongroupid and addonitemid
(which are mandatory fields for petpooja api-call) (id=(addongroupid-addongroupid))
*/

@ObjectType({
  description: "Details of the add-ons",
})
export class AddOn extends withObjectTracking("addOn"){
 
  @Field({
    description: "Name of the add-on",
  })
  public name: string; 

  @Field(()=>Int,{
    description: "Price of the add-on",
  })
  public price: number; 

  @Field({
    description: "Flag to indicate whether the add-on is available for the dish",
  })
  public active: boolean; 
}