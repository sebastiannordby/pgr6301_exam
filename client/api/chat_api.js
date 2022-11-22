export const CHAT_API = {
  list: async () => {
    const res = await fetch("/api/chat");

    return await res.json();
  },
};
