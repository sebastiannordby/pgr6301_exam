import { Router } from "express";

const CUSTOMERS_COLLECTION = "customers";

export function CustomerAPI(mongoDatabase) {
  const router = new Router();

  router.post("/login", async (req, res) => {
    console.log("Hmmm: ");

    const { username, password } = req.body;
    const customers = await mongoDatabase
      .collection(CUSTOMERS_COLLECTION)
      .find({ username: username, password: password })
      .toArray();

    if (customers.length > 0) {
      const customer = customers[0];

      res.json({
        cookie: customer._id.toString(),
      });
    } else {
      res.sendStatus(404);
    }
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
