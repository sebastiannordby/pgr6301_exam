import { useEffect, useState } from "react";
import { ORDER_API } from "../api/order_api.js";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DISHES_API } from "../api/dishes_api.js";
import { NewOrderDialog } from "../components/order/new-order-dialog.jsx";
import { NoAccessComponent } from "../no-access-component";

export function OrderPage({ customer }) {
  const [orders, setOrders] = useState([]);
  const [newOrderDialogVisible, setNewOrderDialogVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setOrders(await ORDER_API.list());
    })();
  }, []);

  if (customer) {
    return (
      <>
        <div className="page orders-page">
          <div className="header">
            <h2>Orders</h2>
            <Button
              variant="contained"
              onClick={() => setNewOrderDialogVisible(true)}
            >
              Add
            </Button>
          </div>

          <div className="orders">
            {orders.map((x) => (
              <a href={`/order/${x._id}`} key={x._id} className="order">
                <span>Address: {x.deliveryAddressLine}</span>
                <span>
                  Postoffice: {x.deliveryPostOfficeCode} -{" "}
                  {x.deliveryPostOffice}
                </span>
                <span>Delivery: {x.deliveryTime}</span>
              </a>
            ))}
          </div>
        </div>

        <NewOrderDialog
          open={newOrderDialogVisible}
          setOpen={setNewOrderDialogVisible}
        />
      </>
    );
  }

  return <NoAccessComponent />;
}

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [deliveryAddressLine, setDeliveryAddressLine] = useState("");
  const [deliveryPostOfficeCode, setDeliveryPostOfficeCode] = useState("");
  const [deliveryPostOffice, setDeliveryPostOffice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState();
  const [dishes, setDishes] = useState([]);

  const addDishToOrder = (dish) => {
    order.dishes.push(dish);
  };

  const saveOrder = async () => {
    order.deliveryAddressLine = deliveryAddressLine;
    order.deliveryPostOfficeCode = deliveryPostOfficeCode;
    order.deliveryPostOffice = deliveryPostOffice;
    order.deliveryTime = deliveryTime;

    if (await ORDER_API.update(order)) {
      alert("Order successfully saved.");
    }
  };

  useEffect(() => {
    (async () => {
      const order = await ORDER_API.find(orderId);

      if (order) {
        setDeliveryAddressLine(order.deliveryAddressLine);
        setDeliveryPostOfficeCode(order.deliveryPostOfficeCode);
        setDeliveryPostOffice(order.deliveryPostOffice);
        setDeliveryTime(order.deliveryTime);
        setDishes(order.dishes);
        setOrder(order);
      }
    })();
  }, []);

  if (order) {
    return (
      <div className="page order-details-page">
        <div className="header">
          <h1>Order</h1>

          <Button variant="contained" onClick={saveOrder}>
            Save
          </Button>
        </div>

        <div className="details">
          <TextField
            label="Addressline"
            value={deliveryAddressLine}
            onChange={(e) => setDeliveryAddressLine(e.target.value)}
          />
          <TextField
            label="PostCode"
            value={deliveryPostOfficeCode}
            onChange={(e) => setDeliveryPostOfficeCode(e.target.value)}
          />
          <TextField
            label="PostOffice"
            value={deliveryPostOffice}
            onChange={(e) => setDeliveryPostOffice(e.target.value)}
          />
          <TextField
            label="DeliveryTime"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />

          <div className="dish-details">
            <DishOrderAdministration
              addDishToOrder={addDishToOrder}
              order={order}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <label>Loading..</label>;
  }
}

function DishOrderAdministration({ order, addDishToOrder }) {
  const [availableDishes, setAvailableDishes] = useState([]);
  const [addDishDialogVisible, setAddDishDialogVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setAvailableDishes(await DISHES_API.fetchAll());
    })();
  }, []);

  return (
    <>
      <div className="header">
        <h2>Dishes</h2>

        <Button
          variant="contained"
          onClick={() => setAddDishDialogVisible(true)}
        >
          Add
        </Button>
      </div>

      <div className="dishes">
        {order.dishes.map((x) => (
          <div key={x.name} className="dish">
            <span>Name: {x.name}</span>
            <span>Description: {x.description}</span>
            <span>Price: {x.price}</span>
            <span>Includes: {x.includes}</span>
            <span>Allergens: {x.allergens}</span>
            <span>Quantity: {x.quantity}</span>
          </div>
        ))}
      </div>

      <AddDishDialog
        onAddDish={addDishToOrder}
        open={addDishDialogVisible}
        setOpen={setAddDishDialogVisible}
        dishes={availableDishes}
      />
    </>
  );
}

function AddDishDialog({ dishes, open, setOpen, onAddDish }) {
  const [selectedDishId, setSelectedDishId] = useState();
  const [selectedDish, setSelectedDish] = useState();
  const [quantity, setQuantity] = useState(1);

  const selectDish = (dish) => {
    setSelectedDishId(dish.id);
    setSelectedDish(dish);
  };

  const addDishToOrder = () => {
    if (selectedDish) {
      onAddDish({
        ...selectedDish,
        quantity,
      });

      setOpen(false);
      setSelectedDishId(undefined);
      setSelectedDish(undefined);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Dish</DialogTitle>
      <DialogContent>
        <div className="add-dish-dialog">
          <div className="dishes">
            {dishes.map((x) => (
              <div
                key={x.id}
                className={selectedDishId == x.id ? "dish selected" : "dish"}
                onClick={() => selectDish(x)}
              >
                <span>Name: {x.name}</span>
                <span>Description: {x.description}</span>
                <span>Price: {x.price}</span>
                <span>Includes: {x.includes}</span>
                <span>Allergens: {x.allergens}</span>
              </div>
            ))}
          </div>

          <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />
          <Button variant="contained" onClick={addDishToOrder}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DishAdministrationItem({ dish }) {}
