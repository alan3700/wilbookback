import { DataSource } from "typeorm";
import { Skill } from "./entities/Skill";
import { Wilder } from "./entities/Wilder";
import { Upvote } from "./entities/Upvote";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "supersecret",
  database: "postgres",
  synchronize: true,
  entities: [Skill, Wilder, Upvote],
  logging: ["query", "error"],
});

export default datasource;
