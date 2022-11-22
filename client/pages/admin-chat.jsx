import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CHAT_API } from "../api/chat_api.js";

export function AdminChat({ admin }) {
  const [webSocket, setWebSocket] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [chatLog, setChatlog] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setChatlog(chat.messages);
  };

  const removeChatSelection = () => {
    setSelectedChat(null);
    setChatlog([]);
  };

  const onNewMessageSubmit = (e) => {
    e.preventDefault();

    setChatlog([
      ...chatLog,
      {
        authorName: admin.username,
        message: newMessage,
      },
    ]);

    webSocket.send(
      JSON.stringify({
        message: newMessage,
        adminId: admin._id,
        adminName: admin.username,
        chatId: selectedChat._id,
        isAdmin: true,
      })
    );

    setNewMessage("");
  };

  useEffect(() => {
    const socket = new WebSocket(window.location.origin.replace(/^http/, "ws"));

    socket.addEventListener("message", (e) => {
      console.log("Message from server: ", e);
    });

    setWebSocket(socket);
  }, []);

  useEffect(() => {
    (async () => {
      setChats(await CHAT_API.list());
    })();
  }, []);

  if (admin) {
    if (selectedChat) {
      return (
        <div className="page admin-chat">
          <div className="header">
            <h2>Chat with {selectedChat.customerName}</h2>

            <Button variant="contained" onClick={removeChatSelection}>
              Go back
            </Button>
          </div>

          <div className="messages">
            {chatLog.map((chat, index) => (
              <ChatElement chat={chat} key={index}></ChatElement>
            ))}
          </div>
          <div>
            <form onSubmit={onNewMessageSubmit}>
              <TextField
                sx={{ width: "100%" }}
                value={newMessage}
                placeholder="Send a message.."
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" variant="contained">
                Send
              </Button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="page admin-chat">
          <h2>Customers with open chat</h2>

          <div className="chat-list">
            {chats.map((x) => (
              <div
                id={x._id}
                className="chat-card"
                onClick={() => selectChat(x)}
              >
                <span>{x.customerName}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return <></>;
}

function ChatElement({ chat: { authorName, message } }) {
  return (
    <div>
      <strong>{authorName}</strong>: {message}
    </div>
  );
}
