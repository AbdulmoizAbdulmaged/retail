import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
 
}
from "react-router-dom";
import Success from "./pages/Success";
import PayCash from "./pages/PayCash";
import Orders from "./pages/Orders";
import WishesList from "./pages/WishesList";
import SearchedProductList from "./pages/SearchedProductList";




const App = () => {
  const user = useSelector(state=>state.customer.currentCustomer.email);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />

        <Route path="/products/:category" element={<ProductList/>} />

        <Route path="/products" element={<ProductList/>} />

        <Route path="/searchedProducts" element={<SearchedProductList/>} />

        <Route path="/wishes" element={<WishesList/>} />

        <Route path="/product/:id" element={<Product/>} />

        <Route path="/cart" element={<Cart/>} />

        <Route path="/orders" element={<Orders/>}></Route>

        <Route path="/success" element={<Success/>} />

        <Route path="/paycash" element={<PayCash/>} />

        <Route path="/login" element={user ? <Home/> : <Login/>} />

        <Route path="/register" element={user ? <Home/> : <Register/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;