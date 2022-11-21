import request from "supertest";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { OrderAPI } from "../apis/order_api.js";

let app = configureExpress();
let mongoClient, mongoDb;

beforeAll(async () => {
  const { client, database } = await configureMongoDb();
  mongoClient = client;
  mongoDb = database;
  app.use("/api/order", OrderAPI(database));
});

afterAll(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe("OrderAPI", () => {
  it("Retrieve Orders BySigned On Customer", async () => {
    await request(app).get("/api/order").expect(403);
  }, 5000);

  it("Update Order", async () => {
    await request(app).put("/api/order").send({}).expect(403);
  }, 5000);

  it("Insert Order", async () => {
    await request(app).post("/api/order").send({}).expect(403);
  }, 5000);

  it("Retrieve Order By Id", async () => {
    await request(app).get("/api/order/283983838").expect(403);
  }, 5000);
});
