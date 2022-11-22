import { useState } from "react";
import { ADMIN_API } from "../api/admin_api.js";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export function AdminLoginForm({ setAdmin, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const result = await ADMIN_API.login(username, password);

    if (result) {
      setAdmin(result);
      onLogin();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <TextField
          label="Username*"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username.."
        />
      </div>
      <div className="form-group">
        <TextField
          label="Password*"
          value={password}
          type="password"
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

export function AdminLoginDialog({ open, setOpen, setAdmin }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Login Admin</DialogTitle>
      <DialogContent>
        <AdminLoginForm setAdmin={setAdmin} onLogin={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
