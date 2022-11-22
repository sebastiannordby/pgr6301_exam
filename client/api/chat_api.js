export const CHAT_API = {
  getCustomerChat: async () => {
    const res = await fetch("/api/chat");

    return res.ok ? await res.json() : null;
  },
  list: async () => {
    const res = await fetch("/api/chat/chats");

    return await res.json();
  },
};
