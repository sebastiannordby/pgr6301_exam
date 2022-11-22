import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CUSTOMER_API } from "../../api/customer_api.js";

export function CustomerLoginDialog({ open, setOpen, setSignedInCustomer }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Login - Customer</DialogTitle>
      <DialogContent>
        <CustomerLoginForm
          onLoginSuccess={() => setOpen(false)}
          setSignedInCustomer={setSignedInCustomer}
        />
      </DialogContent>
    </Dialog>
  );
}

export function CustomerLoginForm({ setSignedInCustomer, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const result = await CUSTOMER_API.login(username, password);

    if (result) {
      setSignedInCustomer(result);
      onLoginSuccess();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <TextField
          value={username}
          type="text"
          className="form-control"
          label="Username*"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username.."
        />
      </div>
      <div className="form-group">
        <TextField
          value={password}
          type="password"
          label="Password*"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
        />
      </div>
      <Button variant="contained" type="submit" sx={{ width: "100%" }}>
        Login
      </Button>
    </form>
  );
}
