import { ObjectID } from "mongodb";

export async function handleAdminSocket(packet, mongoDatabase) {
  if (packet.isAdmin) {
    let chat = await mongoDatabase.collection("chats").findOne({
      _id: new ObjectID(packet.chatId),
    });

    chat.messages.push({
      authorId: packet.adminId,
      authorName: packet.adminName,
      isAdmin: true,
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
