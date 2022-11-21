import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CUSTOMER_API } from "../../api/customer_api.js";

export function CustomerRegisterDialog({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Register - Customer</DialogTitle>
      <DialogContent>
        <CustomerRegisterForm onRegistered={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function CustomerRegisterForm({ onRegistered }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (
      await CUSTOMER_API.register({
        name,
        username,
        password,
      })
    ) {
      onRegistered();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <TextField
          label="Full name*"
          value={name}
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name.."
        />
      </div>
      <div className="form-group">
        <TextField
          label="Username*"
          value={username}
          type="text"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username.."
        />
      </div>
      <div className="form-group">
        <TextField
          label="Password*"
          value={password}
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
        />
      </div>
      <Button variant="contained" type="submit" sx={{ width: "100%" }}>
        Register
      </Button>
    </form>
  );
}
