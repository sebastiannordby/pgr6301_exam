import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CUSTOMER_API } from "../../api/customer_api.js";

export function CustomerLoginDialog({ open, setOpen, setCustomerCookie }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Login - Customer</DialogTitle>
      <DialogContent>
        <CustomerLoginForm setCustomerCookie={setCustomerCookie} />
      </DialogContent>
    </Dialog>
  );
}

export function CustomerLoginForm({ setCustomerCookie }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const result = await CUSTOMER_API.login(username, password);

    console.log("Result: ", result);

    if (result) {
      setCustomerCookie(result.cookie);
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
