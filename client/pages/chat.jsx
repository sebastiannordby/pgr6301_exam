import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CHAT_API } from "../api/chat_api.js";
import { NoAccessComponent } from "../no-access-component.js";

export function SupportChat({ customer }) {
  const [webSocket, setWebSocket] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [chatLog, setChatlog] = useState([]);

  const onNewMessageSubmit = (e) => {
    e.preventDefault();

    setChatlog([
      ...chatLog,
      {
        authorName: customer.name,
        message: newMessage,
      },
    ]);

    webSocket.send(
      JSON.stringify({
        message: newMessage,
        customerId: customer._id,
        customerName: customer.name,
      })
    );

    setNewMessage("");
  };

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));

    ws.addEventListener("message", (e) => {
      console.log("Message from server: ", e);
    });

    setWebSocket(ws);
  }, []);

  useEffect(() => {
    (async () => {
      const chat = await CHAT_API.getCustomerChat();
      const messages = chat ? chat.messages : [];

      setChatlog(messages);
    })();
  }, []);

  if (customer) {
    return (
      <div className="page support-chat">
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
  }

  return <NoAccessComponent />;
}

function ChatElement({ chat: { authorName, message } }) {
  return (
    <div>
      <strong>{authorName}</strong>: {message}
    </div>
  );
}
