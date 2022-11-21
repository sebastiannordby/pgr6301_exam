import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const TEST_DATABASE_NAME = "pg6103_exam_tests";

export function configureExpress() {
  dotenv.config();

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  return app;
}

export async function configureMongoDb() {
  let client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const database = client.db(TEST_DATABASE_NAME);
  await database.collection("customers").deleteMany({});

  return { client, database };
}
