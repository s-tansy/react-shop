import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

// 引入了并发渲染支持，createRoot 是新的入口 API
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 它包裹了整个 App ，这样**App 里面的所有组件**都能通过 useCart() 来访问购物车状态 */}
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
