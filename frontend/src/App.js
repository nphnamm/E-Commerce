import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage, SignupPage, ActivationPage, HomePage,ProductsPage ,BestSellingPage,EventsPage , FAQPage,ProductDetailsPage} from "./Routes.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server.js";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { useSelector } from "react-redux";
import ShopCreatePage from "./pages/ShopCreate.jsx";
import SellerActivationPage from "./pages/SellerActivationPage.jsx";

function App() {
  const {loading, isAuthenticated} = useSelector((state) => state.user);
  
  useEffect(() => {

    Store.dispatch(loadUser());

  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/product/:name" element={<ProductDetailsPage/>}/>

        <Route  path="best-selling" element={<BestSellingPage />}
        />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {/* <Route path="/checkout" element={
          <ProtectedRoute>

            <CheckoutPage />
          </ProtectedRoute>
          }/> */}
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        {/* <Route path="/order/success/:id" element={<OrderSuccessPage />} />  */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />




      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
