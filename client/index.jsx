import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DishesPage } from "./pages/dishes";
import "./index.css";
import { useCookies } from "react-cookie";
import { AdminPage } from "./pages/admin.jsx";
import { AdminLoginDialog } from "./components/admin-login.jsx";
import { CustomerLoginDialog } from "./components/customer/customer-login-component.jsx";
import { CustomerRegisterDialog } from "./components/customer/customer-register-component.jsx";
import { OrderDetailsPage, OrderPage } from "./pages/order.jsx";

const element = document.getElementById("root");
const root = createRoot(element);

function Application() {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DishesPage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route
              path="/order/:orderId"
              element={<OrderDetailsPage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [customerLoginDialogVisible, setCustomerLoginDialogVisible] =
    useState(false);
  const [customerRegisterDialogVisible, setCustomerRegisterDialogVisible] =
    useState(false);

  console.log("CookieS: ", cookies);

  const setCustomerCookie = (cookieValue) => {
    setCookie("customer", cookieValue);
  };

  const signoutCustomer = () => {
    removeCookie("customer");
  };

  return (
    <>
      <header>
        <h1>Indish Resturantos</h1>

        <nav>
          <ul>
            <li>
              <a href="/">Dishes</a>
            </li>
            <li>
              <a href="/order">Order</a>
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
        setCustomerCookie={setCustomerCookie}
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
              <a href="/admin">Management</a>
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
