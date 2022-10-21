import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";
import { ObjectType, Field, ID, Int } from "type-graphql";
@Entity()
@ObjectType()
export class Upvote {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ default: 0 })
  @Field((type) => Int)
  upvote: number;

  @ManyToOne(() => Skill, "upvotes")
  @Field((type) => Skill)
  skill: Skill;

  @ManyToOne(() => Wilder, "upvotes", { onDelete: "CASCADE" })
  @Field((type) => Wilder)
  wilder: Wilder;
}
