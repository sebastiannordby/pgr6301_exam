import { Router } from "express";

const CHATS_COLLECTION = "chats";

export function ChatAPI(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (customerId) {
      const chat = await mongoDatabase
        .collection(CHATS_COLLECTION)
        .findOne({ customerId: customerId });

      res.send(chat);
    } else {
      res.sendStatus(403);
    }
  });

  return router;
}
