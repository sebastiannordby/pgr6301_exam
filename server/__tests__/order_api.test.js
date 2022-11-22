import request from "supertest";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { OrderAPI } from "../apis/order_api.js";

let app = configureExpress();
let mongoClient, mongoDb;
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
  mongoDb = database;
  app.use("/api/order", OrderAPI(database));
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

describe("OrderAPI", () => {
  it("RetrieveOrdersBySignedOnCustomer", async () => {
    await request(app).get("/api/order").expect(403);
  });

  it("RetrieveOrdersBySignedOnCustomer with cookie", async () => {
    await request(app)
      .get("/api/order")
      .set("Cookie", `customer=${testCustomerId}`)
      .expect(200);
  });

  it("Update Order", async () => {
    await request(app).put("/api/order").send({}).expect(403);
  }, 5000);

  it("UpdateOrder with cookie", async () => {
    await request(app)
      .put("/api/order")
      .set("Cookie", `customer=${testCustomerId}`)
      .send({})
      .expect(200);
  }, 5000);

  it("InsertOrder", async () => {
    await request(app).post("/api/order").send({}).expect(403);
  }, 5000);

  it("InsertOrder with cookie", async () => {
    await request(app)
      .post("/api/order")
      .set("Cookie", `customer=${testCustomerId}`)
      .send({})
      .expect(200);
  }, 5000);

  it("Retrieve Order By Id", async () => {
    await request(app).get("/api/order/283983838").expect(403);
  }, 5000);

  it("Retrieve Order with cookie", async () => {
    await request(app)
      .get("/api/order/" + testCustomerId)
      .set("Cookie", `customer=${testCustomerId}`)
      .expect(404);
  }, 10000);
});
