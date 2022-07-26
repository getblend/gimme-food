import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";



// addongroupid and addonitemid  store to id like this (id=(addongroupid-addongroupid))

@ObjectType({
  description: "A details of the addon",
})
export class Addon extends withObjectTracking("Addon"){
 
  @Field({
    description: "name of the addon",
  })
  public name: string; 

  @Field(()=>Int,{
    description: "price of the addon",
  })
  public price: number; 

  @Field({
    description: "status of the addon",
  })
  public status: boolean; 
}