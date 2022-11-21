import { Router } from "express";

const ADMINS_COLLECTION = "admins";

export function AdminAPI(mongoDatabase) {
  const router = new Router();

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admins = await mongoDatabase
      .collection(ADMINS_COLLECTION)
      .find({ username: username, password: password })
      .toArray();

    if (admins.length > 0) {
      const admin = admins[0];

      res.json({
        cookie: admin.username,
      });
    } else {
      res.sendStatus(404);
    }
  });

  return router;
}
