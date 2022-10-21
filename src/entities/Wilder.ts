import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Length } from "class-validator";
@Entity()
@ObjectType()
export class Wilder {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  city: string;

  @OneToMany(() => Upvote, "wilder")
  @Field((type) => [Upvote])
  upvotes: Upvote[];
}

@Entity()
@InputType()
export class WilderInput {
  @Field()
  @Length(2, 30)
  name: string;

  @Field()
  @Length(2, 30)
  city: string;
}
