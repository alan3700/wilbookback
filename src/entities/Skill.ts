import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Length } from "class-validator";

@Entity()
@ObjectType()
export class Skill {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Upvote, "skill")
  @Field((type) => [Upvote])
  upvotes: Upvote[];
}

@Entity()
@InputType()
export class SkillInput {
  @Field()
  @Length(2, 30)
  name: string;
}
