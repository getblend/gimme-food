import { Field, ObjectType } from "type-graphql";

@ObjectType({
    description: "A details of the StoreHours",
})
export class StoreHours {

    @Field({
        description: "Open time of the store",
    })
    public start: Date;

    @Field({
        description: "End time of the store",
    })
    public end: Date;

    @Field({
        description: "Days of the store",
    })
    public days: string;

    @Field({
        description: "description of the storehours",
    })
    public description: string;

    @Field({
        description: `Timestamp when the Storehours was created`,
      })
      public createdAt: Date;
  
      @Field({
        description: `Timestamp when the Storehours} was updated`,
      })
      public updatedAt: Date;
}