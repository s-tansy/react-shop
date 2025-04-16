import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserCenter from './pages/UserCenter';
import RequireAuth from './pages/RequireAuth';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminProductList from './pages/admin/AdminProductList';
import OrderList from "./pages/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/user" element={
          <RequireAuth>
            <UserCenter />
          </RequireAuth>
        }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </BrowserRouter>);
}

export default App
