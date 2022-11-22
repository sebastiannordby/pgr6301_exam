import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { CustomerAPI } from "../apis/customer_api.js";
import request from "supertest";
import { ChatAPI } from "../apis/chat_api.js";

let app = configureExpress();
let mongoClient, mongoDb;

beforeAll(async () => {
  const { client, database } = await configureMongoDb();
  mongoClient = client;
  mongoDb = database;
  app.use("/api/chat", ChatAPI(database));
});

afterAll(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe("ChatAPI", () => {
  it("Register", async () => {
    await request(app).get("/api/chat").expect(403);
  }, 5000);
});
