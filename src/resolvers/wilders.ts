import datasource from "../utils";
import { Wilder } from "../entities/Wilder";
import { Query, Arg, Mutation, ID } from "type-graphql";

export class WilderResolver {
  @Mutation(() => Wilder)
  async createWilder(
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save({ name, city });
  }

  @Mutation(() => Wilder, { nullable: true })
  async deleteWilder(@Arg("id", () => ID) id: number): Promise<Wilder | null> {
    const wilder = await datasource
      .getRepository(Wilder)
      .findOne({ where: { id } });

    if (wilder === null) {
      return null;
    }

    return await datasource.getRepository(Wilder).remove(wilder);
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("city", { nullable: true }) city: string
  ): Promise<Wilder | null> {
    const wilderUpdate = await datasource
      .getRepository(Wilder)
      .findOneBy({ id: Number(id) });
    if (wilderUpdate != null) {
      if (name != null && city != null) {
        wilderUpdate.name = name;
        wilderUpdate.city = city;
      } else if (name !== "" && city == null) {
        wilderUpdate.name = name;
      } else if (city !== "" && name == null) {
        wilderUpdate.city = city;
      }
      await datasource.getRepository(Wilder).save(wilderUpdate);
    }
    return wilderUpdate;
  }

  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    return await datasource
      .getRepository(Wilder)
      .find({ relations: ["upvotes", "upvotes.skill"] });
  }

  @Query(() => Wilder, { nullable: true })
  async wilder(@Arg("id") id: number): Promise<Wilder | null> {
    return await datasource
      .getRepository(Wilder)
      .findOne({ where: { id }, relations: ["upvotes", "upvotes.skill"] });
  }

  // create: async (req: Request, res: Response): Promise<void> => {
  //   const newWilder = await datasource.getRepository(Wilder).save(req.body);
  //   res.json(newWilder);
  // },

  // get: async (req: Request, res: Response): Promise<void> => {
  //   const AllWilders = await datasource
  //     .getRepository(Wilder)
  //     .find({ relations: ["upvotes", "upvotes.skill"] });
  //   res.json(AllWilders);
  // },

  // update: async (req: Request, res: Response): Promise<void> => {
  //   const wilderUpdate = await datasource
  //     .getRepository(Wilder)
  //     .findOneBy({ id: Number(req.params.wilderId) });
  //   if (wilderUpdate != null) {
  //     Object.assign(wilderUpdate, req.body);
  //     // wilderUpdate.name = req.body.name;
  //     await datasource.getRepository(Wilder).save(wilderUpdate);
  //     res.json(wilderUpdate);
  //   }
  // },
  // delete: async (req: Request, res: Response): Promise<void> => {
  //   const wilderToDelete = await datasource
  //     .getRepository(Wilder)
  //     .query("DELETE FROM wilder WHERE wilder.id = " + req.params.wilderId);
  //   res.json(wilderToDelete);
  // },
}
