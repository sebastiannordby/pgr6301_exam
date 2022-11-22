import request from "supertest";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { DishesAPI } from "../apis/dishes_api.js";
let app = configureExpress();
let mongoClient;
const testCustomer = {
  name: "Test",
  username: "Test",
  password: "test",
};

const testAdmin = {
  username: "Test",
  password: "Test",
};

let testCustomerId = null;
let testAdminId = null;
beforeAll(async () => {
  const { client, database } = await configureMongoDb();
  mongoClient = client;
  app.use("/api/dish", DishesAPI(database));
  await database.collection("customers").deleteMany((x) => x);
  const customer = await database
    .collection("customers")
    .insertOne(testCustomer);

  testCustomerId = customer.insertedId.toString();

  await database.collection("admins").deleteMany((x) => x);
  const admin = await database.collection("admins").insertOne(testAdmin);

  testAdminId = admin.insertedId.toString();
});

afterAll(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe("DishAPI", () => {
  it("Fetch dishes", async () => {
    await request(app).get("/api/dish").expect(200);
  }, 5000);

  it("Update dish", async () => {
    await request(app).put("/api/dish").send({}).expect(403);
  }, 5000);

  it("Update dish with cookie", async () => {
    await request(app)
      .put("/api/dish")
      .set("Cookie", `admin=${testAdminId}`)
      .send({})
      .expect(200);
  }, 5000);

  it("Insert Dish", async () => {
    await request(app).post("/api/dish").send({}).expect(403);
  }, 5000);

  it("Insert Dish with cookie", async () => {
    await request(app)
      .post("/api/dish")
      .set("Cookie", `admin=${testAdminId}`)
      .send({})
      .expect(200);
  }, 5000);

  it("Delete dish", async () => {
    await request(app).delete("/api/dish").send({ id: "238383" }).expect(403);
  }, 5000);

  it("Delete dish without id", async () => {
    await request(app).delete("/api/dish").send({}).expect(404);
  }, 5000);
});
