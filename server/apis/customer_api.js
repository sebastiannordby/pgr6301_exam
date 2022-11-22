import { Router } from "express";
import { ObjectID } from "mongodb";

const CUSTOMERS_COLLECTION = "customers";

export function CustomerAPI(mongoDatabase) {
  const router = new Router();

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const customers = await mongoDatabase
      .collection(CUSTOMERS_COLLECTION)
      .find({ username: username, password: password })
      .toArray();

    if (customers.length > 0) {
      const customer = customers[0];

      res.json({
        cookie: customer._id.toString(),
        customer: customer,
      });
    } else {
      res.sendStatus(404);
    }
  });

  router.get("/signed-on", async (req, res) => {
    if (!req.cookies.customer || req.cookies.customer.length == 0) {
      res.sendStatus(403);
      return;
    }

    const customer = await mongoDatabase
      .collection(CUSTOMERS_COLLECTION)
      .findOne({ _id: new ObjectID(req.cookies.customer) });

    if (!customer) {
      res.sendStatus(404);
      return;
    }

    res.send(customer);
  });

  router.post("/register", async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || username.length == 0) {
      res.sendStatus(500);
      return;
    }

    if (!name || name.length == 0) {
      res.sendStatus(500);
      return;
    }

    if (!password || password.length == 0) {
      res.sendStatus(500);
      return;
    }

    const customers = await mongoDatabase
      .collection(CUSTOMERS_COLLECTION)
      .find({ username: username })
      .toArray();

    if (customers.length > 0) {
      res.sendStatus(500);
      return;
    }

    const result = mongoDatabase.collection(CUSTOMERS_COLLECTION).insertOne({
      name,
      username,
      password,
    });
    res.sendStatus(200);
  });

  return router;
}
