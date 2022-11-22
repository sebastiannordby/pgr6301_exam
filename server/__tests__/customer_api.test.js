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

const testCustomer = {
  name: "Test",
  username: "Test",
  password: "test",
};

let testCustomerId = null;

beforeAll(async () => {
  const { client, database } = await configureMongoDb();
  mongoClient = client;
  mongoDb = database;
  app.use("/api/customer", CustomerAPI(database));
  await database.collection("customers").deleteMany((x) => x);
  const customer = await database
    .collection("customers")
    .insertOne(testCustomer);

  testCustomerId = customer.insertedId.toString();
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

  it("SignedOn", async () => {
    await request(app).get("/api/customer/signed-on").expect(403);
  }, 5000);

  it("SignedOn with cookie", async () => {
    await request(app)
      .get("/api/customer/signed-on")
      .set("Cookie", `customer=${testCustomerId}`)
      .expect(200);
  }, 5000);

  it("SignedOn with wrong cookie", async () => {
    await request(app)
      .get("/api/customer/signed-on")
      .set("Cookie", `customer=637b56944d00754a3bbd1201`)
      .expect(404);
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

  it("Login Wrong Credentials Fail", async () => {
    await request(app)
      .post("/api/customer/login")
      .send({
        username: "NotExisting",
        password: "NotExisting",
      })
      .expect(404);
  }, 5000);
});
