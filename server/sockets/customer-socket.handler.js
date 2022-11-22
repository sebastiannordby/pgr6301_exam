import { ObjectID } from "mongodb";

export async function handleCustomerSocket(packet, mongoDatabase) {
  if (packet.customerId) {
    let chat = await mongoDatabase.collection("chats").findOne({
      customerId: packet.customerId,
    });

    if (!chat) {
      chat = {
        customerId: packet.customerId,
        customerName: packet.customerName,
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
      await mongoDatabase.collection("chats").updateOne(
        { _id: new ObjectID(chat._id) },
        {
          $set: {
            ...chat,
          },
        }
      );
    }
  }
}
