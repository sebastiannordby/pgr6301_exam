import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { DishesPage } from "./pages/dishes";
import "./index.css";
import { useCookies } from "react-cookie";
import { AdminPage } from "./pages/admin.jsx";
import { AdminLoginDialog } from "./components/admin-login.jsx";
import { CustomerLoginDialog } from "./components/customer/customer-login-component.jsx";
import { CustomerRegisterDialog } from "./components/customer/customer-register-component.jsx";
import { OrderDetailsPage, OrderPage } from "./pages/order.jsx";
import { CUSTOMER_API } from "./api/customer_api.js";
import { CustomerContext } from "./state/customer-context.jsx";
import React from "react";

const element = document.getElementById("root");
const root = createRoot(element);

function Application() {
  const [customer, setCustomer] = useState();

  return (
    <BrowserRouter>
      <Header onCustomerLoggedIn={setCustomer} />
      <main>
        <Routes>
          <Route path="/" element={<DishesPage customer={customer} />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/order/:orderId" element={<OrderDetailsPage />}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

function Header({ onCustomerLoggedIn }) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [customerLoginDialogVisible, setCustomerLoginDialogVisible] =
    useState(false);
  const [customerRegisterDialogVisible, setCustomerRegisterDialogVisible] =
    useState(false);
  const [customer, setCustomer] = useState({
    name: "Sign in to see customer name",
  });

  const setSignedInCustomer = (result) => {
    setCookie("customer", result.cookie);
    setCustomer(result.customer);
    onCustomerLoggedIn(result.customer);
  };

  const signoutCustomer = () => {
    removeCookie("customer");
    setCustomer(null);
  };

  useEffect(() => {
    (async () => {
      if (cookies["customer"]) {
        const customer = await CUSTOMER_API.getSignedOnCustomer();
        setCustomer(customer);
        onCustomerLoggedIn(customer);
      }
    })();
  }, [cookies]);

  console.log(customer);

  return (
    <>
      <header>
        <h1>Indish Resturantos</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Dishes</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            {!cookies.admin && (
              <>
                <li>
                  <a onClick={() => setCustomerLoginDialogVisible(true)}>
                    Login
                  </a>
                </li>
                <li>
                  <a onClick={() => setCustomerRegisterDialogVisible(true)}>
                    Register
                  </a>
                </li>
                <li>
                  <a onClick={signoutCustomer}>Signout</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <CustomerLoginDialog
        open={customerLoginDialogVisible}
        setOpen={setCustomerLoginDialogVisible}
        setSignedInCustomer={setSignedInCustomer}
      />

      <CustomerRegisterDialog
        open={customerRegisterDialogVisible}
        setOpen={setCustomerRegisterDialogVisible}
      />
    </>
  );
}

function Footer() {
  const [adminLoginDialogVisible, setAdminDialogVisible] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const signOutAdmin = () => {
    removeCookie("admin");
  };

  if (!cookies["customer"]) {
    return (
      <>
        <footer>
          <ul>
            <li>
              <a onClick={() => setAdminDialogVisible(true)}>Login(Admin)</a>
            </li>
            <li>
              <Link to="/admin">Management</Link>
            </li>
            <li>
              <a onClick={signOutAdmin}>Signout(Admin)</a>
            </li>
          </ul>
        </footer>
        <AdminLoginDialog
          open={adminLoginDialogVisible}
          setOpen={setAdminDialogVisible}
        />
      </>
    );
  }

  return <></>;
}

root.render(<Application />);
