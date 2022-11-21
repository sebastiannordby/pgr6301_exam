import request from "supertest";
import { CustomerAPI } from "../apis/customer_api.js";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";

const customers = [
  {
    name: "Test Customer 1",
    username: "Test1",
    password: "secret123",
  },
  {
    name: "Test Customer 2",
    username: "Test2",
    password: "secret123",
  },
];

let app = configureExpress();
let mongoClient, mongoDb;

beforeAll(async () => {
  const { client, database } = await configureMongoDb();
  mongoClient = client;
  mongoDb = database;
  app.use("/api/customer", CustomerAPI(database));
});

afterAll(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe("CustomerAPI", () => {
  it("Register", async () => {
    const customer = customers[0];

    await request(app)
      .post("/api/customer/register")
      .send(customer)
      .expect(200);
  }, 5000);

  it("Register Duplicate account", async () => {
    const customer = customers[1];

    await request(app)
      .post("/api/customer/register")
      .send(customer)
      .expect(200);

    await request(app)
      .post("/api/customer/register")
      .send(customer)
      .expect(500);
  }, 5000);

  it("Login", async () => {
    const customer = customers[0];

    await request(app)
      .post("/api/customer/login")
      .send({
        username: customer.username,
        password: customer.password,
      })
      .expect(200);
  }, 5000);
});
