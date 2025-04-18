import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/Product/ProductDetail';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import UserCenter from './pages/Login/UserCenter';
import Navbar from './components/NavbarCart';
import Cart from './pages/Product/Cart';
import Checkout from './pages/Product/Checkout';
import AdminProductList from './pages/admin/AdminProductList';
import OrderList from "./pages/Product/OrderList";
import OrderComplete from "./pages/Product/OrderComplete";
import ProductList from './components/ProductList';
import NavBarCart from './components/NavbarCart';
import NavBarActive from './components/NavbarActive';
import NavBarSearch from './components/NavbarSearch';
import NavbarCategory from './components/NavbarCategory';

function AppRoutes() {
  const location = useLocation();
  const showNav = ['/', '/product-list'].includes(location.pathname);

  return (
    <>
      <NavBarCart />
      {showNav && <><NavBarActive /><NavBarSearch /><NavbarCategory /></>}

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product-list' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/user" element={<UserCenter />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
