export const ADMIN_API = {
  login: async (username, password) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return res.ok ? await res.json() : null;
  },
};
