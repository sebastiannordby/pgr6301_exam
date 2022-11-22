import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { CustomerAPI } from "../apis/customer_api.js";
import request from "supertest";
import { ChatAPI } from "../apis/chat_api.js";

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
  app.use("/api/chat", ChatAPI(database));
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

describe("ChatAPI", () => {
  it("GetOrCreateCustomerChat", async () => {
    await request(app).get("/api/chat").expect(403);
  }, 5000);

  it("GetOrCreateCustomerChat with cookie", async () => {
    await request(app)
      .get("/api/chat")
      .set("Cookie", `customer=${testCustomerId}`)
      .expect(200);
  }, 5000);

  it("ListChatsAdmin", async () => {
    await request(app).get("/api/chat/chats").expect(403);
  }, 5000);

  it("ListChatsAdmin with cookie", async () => {
    await request(app)
      .get("/api/chat/chats")
      .set("Cookie", `admin=${testAdminId}`)
      .expect(200);
  }, 5000);
});
