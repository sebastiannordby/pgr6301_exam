import { Router } from "express";
import { ObjectID } from "mongodb";

const ORDERS_COLLECTION = "orders";
const SAMPLE_ORDER = {
  _id: {
    $oid: "637bab874d00754a3bbd120e",
  },
  deliveryAddressLine: "Skibakkvegen 2",
  deliveryPostOfficeCode: "1923",
  deliveryPostOffice: "Sørum",
  customerId: "637ba7e3f365fbf863d541b8",
  deliveryTime: "21.11.2022",
  dishes: [
    {
      // Dish
      quantity: 1,
    },
    {
      // Dish
      quantity: 1,
    },
  ],
};

export function OrderAPI(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const customerId = req.cookies.customer;

    if (customerId) {
      const orders = await mongoDatabase
        .collection(ORDERS_COLLECTION)
        .find({ customerId: customerId })
        .toArray();

      res.send(orders);
    } else {
      res.sendStatus(403);
    }
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

    mongoDatabase.collection(ORDERS_COLLECTION).insertOne(order);

    res.sendStatus(200);
  });

  return router;
}
