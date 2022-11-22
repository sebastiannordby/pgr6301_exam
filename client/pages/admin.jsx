import { useCookies } from "react-cookie";
import { NoAccessComponent } from "../no-access-component";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DISHES_API } from "../api/dishes_api.js";
import { NewDishDialog } from "../components/dish/add-dish-component.jsx";
import { EditDishDialog } from "../components/dish/edit-dish-component.jsx";

export function AdminPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  if (!cookies.customer) {
    if (cookies.admin) {
      return <DishesManagement />;
    }
  }

  return <NoAccessComponent />;
}

export function DishesManagement() {
  const [newDishDialogVisible, setNewDishDialogVisible] = useState(false);
  const [editDishDialogVisible, setEditDishDialogVisible] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [editDish, setEditDish] = useState(null);
  const deleteDish = async (dish) => {
    if (await DISHES_API.delete(dish.id)) {
      await fetchDishes();
      console.log("Hello");
    }
  };

  const fetchDishes = async () => {
    setDishes(await DISHES_API.fetchAll());
  };

  const openEditDialog = (dish) => {
    setEditDish(dish);
    setEditDishDialogVisible(true);
  };

  useEffect(() => {
    (async () => {
      await fetchDishes();
    })();
  }, [newDishDialogVisible]);

  return (
    <div className="page dish-management">
      <div className="header">
        <h2>Edit Dishes</h2>
        <Button
          variant="contained"
          onClick={() => setNewDishDialogVisible(true)}
        >
          New
        </Button>
      </div>

      <div className="dish-management">
        <div className="dishes">
          {dishes.map((x) => (
            <div className="dish" key={x.id}>
              <span
                className="delete-icon"
                onClick={async () => await deleteDish(x)}
              >
                X
              </span>
              <label onClick={() => openEditDialog(x)}>{x.name}</label>
            </div>
          ))}
        </div>

        <NewDishDialog
          onNewDishInserted={fetchDishes}
          setOpen={setNewDishDialogVisible}
          open={newDishDialogVisible}
        />

        <EditDishDialog
          dish={editDish}
          setOpen={setEditDishDialogVisible}
          open={editDishDialogVisible}
        />
      </div>
    </div>
  );
}
