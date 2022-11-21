export const ORDER_API = {
  list: async () => {
    const res = await fetch("/api/order");

    return await res.json();
  },
  find: async (id) => {
    const res = await fetch(`/api/order/${id}`);

    return await res.json();
  },
  update: async (order) => {
    const res = await fetch("/api/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return res.ok;
  },
  insert: async ({
    deliveryAddressLine,
    deliveryAddressPostCode,
    deliveryPostOffice,
    deliveryTime,
    dishes,
  }) => {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryAddressLine,
        deliveryAddressPostCode,
        deliveryPostOffice,
        deliveryTime,
        dishes,
      }),
    });

    return res.ok;
  },
};
