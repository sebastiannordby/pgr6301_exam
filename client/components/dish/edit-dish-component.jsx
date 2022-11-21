import { useEffect, useState } from "react";
import { DISHES_API } from "../../api/dishes_api.js";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export function EditDishDialog({ open, setOpen, dish }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [includes, setIncludes] = useState("");
  const [allergens, setAllergens] = useState("");

  const onDishSubmit = async (e) => {
    e.preventDefault();

    if (
      await DISHES_API.update({
        id: dish.id,
        name,
        price,
        description,
        includes,
        allergens,
      })
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (dish) {
      setName(dish.name);
      setPrice(dish.price);
      setDescription(dish.description);
      setIncludes(dish.includes);
      setAllergens(dish.allergens);
    }
  }, [dish]);

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>New Dish</DialogTitle>
      <DialogContent>
        <form onSubmit={onDishSubmit} style={{ width: "350px" }}>
          <div className="form-group">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name*"
            />
          </div>
          <div className="form-group">
            <TextField
              value={price}
              label="Price"
              type="number"
              step="0"
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </div>
          <div className="form-group">
            <TextField
              value={description}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              label="Description*"
            />
          </div>
          <div className="form-group">
            <TextField
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              label="Includes"
            />
          </div>
          <div className="form-group">
            <TextField
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
              label="Allergens"
            />
          </div>

          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
