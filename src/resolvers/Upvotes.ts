import datasource from "../utils";
import { Upvote } from "../entities/Upvote";
import { Arg, Mutation } from "type-graphql";

export class UpvotesResolver {
  @Mutation(() => Upvote)
  async skillToWilder(
    @Arg("skillId") skillId: number,
    @Arg("wilderId") wilderId: number
  ): Promise<Upvote> {
    const exitingUpvote = await datasource.getRepository(Upvote).findOne({
      where: {
        skill: { id: skillId },
        wilder: { id: wilderId },
      },
    });
    if (exitingUpvote != null) {
      return exitingUpvote;
    } else {
      const upvote = await datasource.getRepository(Upvote).save({
        wilder: { id: wilderId },
        skill: { id: skillId },
      });

      return upvote;
    }
  }

  @Mutation(() => Upvote)
  async upvote(@Arg("id") id: number): Promise<void> {
    const exitingUpvote = await datasource.getRepository(Upvote).findOne({
      where: {
        id: Number(id),
      },
    });
    if (exitingUpvote != null) {
      exitingUpvote.upvote++;
      await datasource.getRepository(Upvote).save(exitingUpvote);
    }
  }

  // create: async (req: Request, res: Response): Promise<void> => {
  //   const repo = datasource.getRepository(Upvote);
  //   console.log(repo);
  //   const exitingUpvote = await repo.findOne({
  //     where: {
  //       skill: { id: req.body.skillId },
  //       wilder: { id: req.body.wilderId },
  //     },
  //   });

  //   if (exitingUpvote != null) {
  //     res.json(exitingUpvote);
  //   } else {
  //     const upvote = await repo.save({
  //       wilder: { id: req.body.wilderId },
  //       skill: { id: req.body.skillId },
  //     });
  //     res.json(upvote);
  //   }
  // },
  // upvote: async (req: Request, res: Response): Promise<void> => {
  //   const repository = datasource.getRepository(Upvote);

  //   const exitingUpvote = await repository.findOne({
  //     where: {
  //       id: Number(req.params.upvoteId),
  //     },
  //   });

  //   if (exitingUpvote != null) {
  //     exitingUpvote.upvote++;

  //     await repository.save(exitingUpvote);

  //     res.json(exitingUpvote);
  //   } else {
  //     throw new Error("Doest not exist");
  //   }
  // },
}
