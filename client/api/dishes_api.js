export const DISHES_API = {
  fetchAll: async () => {
    const result = await fetch("/api/dishes");
    const json = result.json();

    return json;
  },
  insert: async ({ name, price, description, includes, allergens }) => {
    const res = await fetch("/api/dishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        includes,
        allergens,
      }),
    });

    return res.ok;
  },
  update: async ({ id, name, price, description, includes, allergens }) => {
    const res = await fetch("/api/dishes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        price,
        description,
        includes,
        allergens,
      }),
    });

    return res.ok;
  },

  delete: async (id) => {
    const res = await fetch("/api/dishes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    return res.ok;
  },
};
