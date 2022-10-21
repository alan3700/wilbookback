import datasource from "../utils";
import { Skill } from "../entities/Skill";
import { Query, Arg, Mutation } from "type-graphql";

export class SkillResolver {
  @Mutation(() => Skill)
  async createSkill(@Arg("name") name: string): Promise<Skill> {
    return await datasource.getRepository(Skill).save({ name });
  }

  @Mutation(() => Skill, { nullable: true })
  async deleteSkill(@Arg("id") id: number): Promise<Skill | null> {
    return await datasource
      .getRepository(Skill)
      .query(`DELETE FROM skill WHERE skill.id = ${id}`);
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Arg("id") id: number,
    @Arg("name") name: string
  ): Promise<Skill | null> {
    const skillUpdate = await datasource
      .getRepository(Skill)
      .findOneBy({ id: Number(id) });
    if (skillUpdate != null) {
      skillUpdate.name = name;
      return await datasource.getRepository(Skill).save(skillUpdate);
    }
    return skillUpdate;
  }
  // salutff

  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    return await datasource
      .getRepository(Skill)
      .find({ relations: ["upvotes", "upvotes.skill"] });
  }

  @Query(() => Skill, { nullable: true })
  async skill(@Arg("id") id: number): Promise<Skill | null> {
    return await datasource
      .getRepository(Skill)
      .findOne({ where: { id }, relations: ["upvotes", "upvotes.skill"] });
  }
  // create: async (req: Request, res: Response): Promise<void> => {
  //   const skillCreated = await datasource.getRepository(Skill).save(req.body);
  //   res.json(skillCreated);
  // },

  // get: async (req: Request, res: Response): Promise<void> => {
  //   const AllSkills = await datasource.getRepository(Skill).find();
  //   res.send(AllSkills);
  // },

  // update: async (req: Request, res: Response): Promise<void> => {
  //   const skillUpdate = await datasource
  //     .getRepository(Skill)
  //     .findOneBy({ id: Number(req.params.skillId) });
  //   if (skillUpdate != null) {
  //     skillUpdate.name = req.body.name;
  //     await datasource.getRepository(Skill).save(skillUpdate);
  //     res.send(skillUpdate);
  //   }
  // },
  // delete: async (req: Request, res: Response): Promise<void> => {
  //   const skillDeleted = await datasource
  //     .getRepository(Skill)
  //     .query("DELETE FROM skill WHERE wilder.id = " + req.params.skillId);
  //   res.json(skillDeleted);
  // },
}
