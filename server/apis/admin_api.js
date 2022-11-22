import { Router } from "express";
import { ObjectID } from "mongodb";

const ADMINS_COLLECTION = "admins";

export function AdminAPI(mongoDatabase) {
  const router = new Router();

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.length === 0) {
      res.sendStatus(404);
      return;
    }

    if (!password || password.length === 0) {
      res.sendStatus(404);
      return;
    }

    const admins = await mongoDatabase
      .collection(ADMINS_COLLECTION)
      .find({ username: username, password: password })
      .toArray();

    if (admins.length == 0) {
      res.sendStatus(404);
      return;
    }

    const admin = admins[0];

    res.json({
      cookie: admin._id,
      admin: admin,
    });
  });

  router.get("/", async (req, res) => {
    if (!req.cookies.admin) {
      res.sendStatus(403);
      return;
    }

    const admin = await mongoDatabase
      .collection(ADMINS_COLLECTION)
      .findOne({ _id: new ObjectID(req.cookies.admin) });

    res.send(admin);
  });

  return router;
}
