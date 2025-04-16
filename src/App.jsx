import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/Product/ProductDetail';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import UserCenter from './pages/Login/UserCenter';
import Navbar from './components/Navbar';
import Cart from './pages/Product/Cart';
import Checkout from './pages/Product/Checkout';
import AdminProductList from './pages/admin/AdminProductList';
import OrderList from "./pages/Product/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/user" element={<UserCenter />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </BrowserRouter>);
}

export default App
