import { Router } from "express";
import { ObjectID } from "mongodb";

const CHATS_COLLECTION = "chats";

export function ChatAPI(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (!customerId) {
      res.sendStatus(403);
      return;
    }

    const customer = await mongoDatabase
      .collection("customers")
      .findOne({ _id: new ObjectID(customerId) });

    if (!customer) {
      res.sendStatus(403);
      return;
    }

    let chat = await mongoDatabase
      .collection(CHATS_COLLECTION)
      .findOne({ customerId: customerId });

    if (!chat) {
      chat = {
        customerId: customer._id.toString(),
        customerName: customer.name,
        messages: [],
      };

      const result = await mongoDatabase
        .collection(CHATS_COLLECTION)
        .insertOne(chat);
    }

    res.send(chat ? chat : null);
  });

  router.get("/chats", async (req, res) => {
    if (!req.cookies.admin) {
      res.sendStatus(403);
      return;
    }

    const chats = await mongoDatabase
      .collection(CHATS_COLLECTION)
      .find()
      .toArray();

    res.send(chats);
  });

  return router;
}
