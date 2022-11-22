import { Router } from "express";
import { ObjectID } from "mongodb";

const ORDERS_COLLECTION = "orders";

export function OrderAPI(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (!customerId) {
      res.sendStatus(403);
      return;
    }

    const orders = await mongoDatabase
      .collection(ORDERS_COLLECTION)
      .find({ customerId: customerId })
      .toArray();

    res.send(orders);
  });

  router.put("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (!req.body || req.body == Object) {
      res.sendStatus(404);
      return;
    }

    if (!customerId) {
      res.sendStatus(403);
      return;
    }

    const order = req.body;
    const orderId = order._id;

    delete order._id;

    mongoDatabase.collection(ORDERS_COLLECTION).updateOne(
      { _id: new ObjectID(orderId) },
      {
        $set: {
          ...order,
        },
      }
    );

    res.sendStatus(200);
  });

  router.get("/:id", async (req, res) => {
    const customerId = req.cookies.customer;

    if (!customerId) {
      res.sendStatus(403);
      return;
    }

    const order = await mongoDatabase
      .collection(ORDERS_COLLECTION)
      .findOne({ customerId: customerId, _id: new ObjectID(req.params.id) });

    if (!order) {
      res.sendStatus(404);
      return;
    }

    res.send(order);
  });

  router.post("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (!customerId) {
      res.sendStatus(403);
      return;
    }

    const order = {
      ...req.body,
      customerId,
    };

    await mongoDatabase.collection(ORDERS_COLLECTION).insertOne(order);

    res.sendStatus(200);
  });

  return router;
}
