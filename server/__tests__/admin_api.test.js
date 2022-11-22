import request from "supertest";
import { CustomerAPI } from "../apis/customer_api.js";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import { AdminAPI } from "../apis/admin_api.js";

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
  app.use("/api/admin", AdminAPI(database));
  await database.collection("admins").deleteMany((x) => x);
  const admin = await database.collection("admins").insertOne(testAdmin);

  testAdminId = admin.insertedId.toString();
});

afterAll(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe("AdminAPI", () => {
  it("Login", async () => {
    await request(app).post("/api/admin/login").expect(404);
  }, 5000);

  it("Login with credentials", async () => {
    await request(app).post("/api/admin/login").send(testAdmin).expect(200);
  }, 5000);

  it("Login with empty credentials", async () => {
    await request(app)
      .post("/api/admin/login")
      .send({ username: "", password: "" })
      .expect(404);
  }, 5000);

  it("GetSignedOnAdmin", async () => {
    await request(app).get("/api/admin").expect(403);
  }, 5000);

  it("GetSignedOnAdmin", async () => {
    await request(app)
      .get("/api/admin")
      .set("Cookie", `admin=${testAdminId}`)
      .expect(200);
  }, 10000);
});
