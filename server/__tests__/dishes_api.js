import request from "supertest";
import { configureExpress, configureMongoDb } from "../testing-utilities.js";
import {DishesAPI} from "../apis/dishes_api.js";
let app = configureExpress();
let mongoClient;

beforeAll(async () => {
    const { client, database } = await configureMongoDb();
    mongoClient = client;
    app.use("/api/dish", DishesAPI(database));
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

    it("Insert Dish", async () => {
        await request(app).post("/api/dish").send({}).expect(403);
    }, 5000);

    it("Delete dish", async () => {
        await request(app).delete("/api/dish").send({id: '238383'}).expect(403);
    }, 5000);
});
