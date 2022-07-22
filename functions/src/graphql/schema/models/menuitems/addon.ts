import { Field, Int, ObjectType } from "type-graphql";


@ObjectType({
  description: "A details of the addon",
})
export class Addon {
  @Field({
    description: "addongroupid of the addon",
  })
  public addongroupid: string; 

  @Field({
    description: "addonitemid of the addon",
  })
  public addonitemid: string; 

  @Field({
    description: "description of the addon",
  })
  public description: string; 

  @Field(()=>Int,{
    description: "price of the addon",
  })
  public price: number; 

  @Field({
    description: "status of the addon",
  })
  public status: boolean; 
}