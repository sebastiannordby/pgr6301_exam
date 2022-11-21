import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ORDER_API } from "../../api/order_api.js";

export function NewOrderDialog({ open, setOpen }) {
  const [deliveryAddressLine, setDeliveryAddressLine] = useState("");
  const [deliveryPostOfficeCode, setDeliveryPostOfficeCode] = useState("");
  const [deliveryPostOffice, setDeliveryPostOffice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState();
  const createNewOrder = async () => {
    if (
      await ORDER_API.insert({
        deliveryAddressLine,
        deliveryPostOffice,
        deliveryPostOfficeCode,
        deliveryTime,
        dishes: [],
      })
    ) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>New Order</DialogTitle>
      <DialogContent>
        <form className="create-new-order-dialog">
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

          <Button variant="contained" onClick={createNewOrder}>
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
