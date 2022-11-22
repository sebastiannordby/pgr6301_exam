export const CUSTOMER_API = {
  getSignedOnCustomer: async () => {
    const res = await fetch("/api/customer/signed-on");

    return res.ok ? await res.json() : null;
  },
  register: async (customer) => {
    const res = await fetch("/api/customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    return res.ok;
  },
  login: async (username, password) => {
    const res = await fetch("/api/customer/login", {
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
