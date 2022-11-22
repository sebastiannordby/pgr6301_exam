import { WebSocketServer } from "ws";
import { MongoClient, ObjectID } from "mongodb";
import { DishesAPI } from "./apis/dishes_api.js";
import { CustomerAPI } from "./apis/customer_api.js";
import { AdminAPI } from "./apis/admin_api.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { OrderAPI } from "./apis/order_api.js";
import { ChatAPI } from "./apis/chat_api.js";

dotenv.config();

const APP = express();
const WEB_SOCKET_SERVER = new WebSocketServer({ noServer: true });
const MONGO_CLIENT = new MongoClient(process.env.MONGODB_URI);
const MONGO_DATABASE_NAME = process.env.MONGODB_DATABASE || "pg6103_exam";
const MONGO_DATABASE = MONGO_CLIENT.db(MONGO_DATABASE_NAME);
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
APP.use(cookieParser());
APP.use(express.static("../client/dist"));

MONGO_CLIENT.connect().then(async (res) => {
  APP.use("/api/dishes", DishesAPI(MONGO_DATABASE));
  APP.use("/api/customer", CustomerAPI(MONGO_DATABASE));
  APP.use("/api/admin", AdminAPI(MONGO_DATABASE));
  APP.use("/api/order", OrderAPI(MONGO_DATABASE));
  APP.use("/api/chat", ChatAPI(MONGO_DATABASE));
});

WEB_SOCKET_SERVER.on("connect", (socket) => {
  console.log("Ws connected");
  socket.send("Hello");

  socket.on("message", async (data) => {
    const packet = JSON.parse(data);

    if (packet) {
      let chat = await MONGO_DATABASE.collection("chats").findOne({
        customerId: packet.customerId,
      });

      if (!chat) {
        chat = {
          customerId: packet.customerId,
          messages: [],
        };
      }

      if (!packet.admin) {
        chat.messages.push({
          authorId: packet.customerId,
          authorName: packet.customerName,
          isAdmin: false,
          message: packet.message,
        });
      } else {
        chat.messages.push({
          authorId: packet.adminId,
          authorName: packet.adminName,
          isAdmin: true,
          message: packet.message,
        });
      }

      await MONGO_DATABASE.collection("chats").updateOne(
        { _id: new ObjectID(chat._id) },
        {
          $set: {
            ...chat,
          },
        }
      );
    }
  });
});

APP.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const EXPRESS_SERVER = APP.listen(process.env.PORT || 3000, () => {
  console.log("Server started at: ", EXPRESS_SERVER.address());

  EXPRESS_SERVER.on("upgrade", (req, socket, buffer) => {
    WEB_SOCKET_SERVER.handleUpgrade(req, socket, buffer, (socket) => {
      WEB_SOCKET_SERVER.emit("connect", socket, req);
    });
  });
});
