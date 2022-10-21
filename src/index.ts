import datasource from "./utils";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { WilderResolver } from "./resolvers/wilders";
import { SkillResolver } from "./resolvers/Skills";
import { ApolloServer } from "apollo-server";
import { UpvotesResolver } from "./resolvers/Upvotes";

const PORT = 5000;

async function bootstrap(): Promise<void> {
  // ... Building schema here
  try {
    const schema = await buildSchema({
      resolvers: [WilderResolver, SkillResolver, UpvotesResolver], // add this
    });
    // Create the GraphQL server
    const server = new ApolloServer({
      schema,
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
    try {
      await datasource.initialize();
      console.log("Youpi!");
    } catch (err) {
      console.log("Dommage");
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
