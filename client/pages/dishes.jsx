import React, { useEffect, useState } from "react";
import { DISHES_API } from "../api/dishes_api.js";

export function DishesPage({ customer }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    (async () => {
      setDishes(await DISHES_API.fetchAll());
    })();
  }, []);

  return (
    <div className={"dishes-page page"}>
      {customer && <h2>Welcome {customer.name}!</h2>}

      <h2>Dishes</h2>

      <div className={"items"}>
        {dishes.map((x) => (
          <div key={x.id} className="dish">
            <h3>{x.name}</h3>
            <p>Description: {x.description}</p>
            <p>Includes: {x.includes}</p>
            <p>
              Allergens: <strong>{x.allergens}</strong>
            </p>
            <p>Price: {x.price},-</p>
          </div>
        ))}
      </div>
    </div>
  );
}
