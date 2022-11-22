import { Router } from "express";
import { ObjectID } from "mongodb";

const DISHES_COLLECTION = "dishes";
const SAMPLE_DISH = {
  name: "Tandori",
  price: 22.33,
  description: "Delight traditionally indian dish",
  includes: "Rice, Nan(Bread)",
  allergens: "Nuts, Peanuts, Seashell",
};

export function DishesAPI(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const todoItems = await mongoDatabase
      .collection(DISHES_COLLECTION)
      .find()
      .map(({ _id, name, price, description, allergens, includes }) => ({
        id: _id,
        name,
        price,
        description,
        allergens,
        includes,
      }))
      .toArray();

    res.json(todoItems);
  });

  router.post("/", async (req, res) => {
    if (!req.cookies.admin) {
      res.sendStatus(403);
      return;
    }

      const { name, price, description, includes, allergens } = req.body;

      const result = mongoDatabase.collection(DISHES_COLLECTION).insertOne({
        name,
        price,
        description,
        includes,
        allergens,
      });

      res.sendStatus(200);
  });

  router.put("/", async (req, res) => {
    if(!req.cookies.admin) {
      res.sendStatus(403);
      return;
    }

    const { id, name, price, description, includes, allergens } = req.body;

    mongoDatabase
        .collection(DISHES_COLLECTION)
        .updateOne(
            { _id: new ObjectID(id) },
            { $set: { name, price, description, includes, allergens } }
        );

    res.sendStatus(200);
  });

  router.delete("/", async (req, res) => {
    const { id } = req.body;

    if(!id) {
      res.sendStatus(404);
      return;
    }

    if(!req.cookies.admin) {
      res.sendStatus(403);
      return;
    }

    mongoDatabase
        .collection(DISHES_COLLECTION)
        .deleteMany({ _id: new ObjectID(id) });

    res.sendStatus(200);
  });

  return router;
}
