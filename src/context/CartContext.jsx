import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();//创建一个全局共享的“容器”，你可以把它当成一个全局变量，任何组件都可以访问它的值。

export const useCart = () => useContext(CartContext);//用来“读取”这个全局容器里的内容

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 页面第一次加载时，从浏览器的 localStorage 读取之前保存的购物车数据
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // 每次购物车变化时，把新的内容保存到 localStorage，让刷新页面时不会丢失
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  //把指定商品移除购物车
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  
  //更新购物车中商品的数量
  const updateQuantity = (productId, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
            : item
        )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  //清空购物车
  const clearCart = () => {
    setCartItems([]);
  };
  

  return (
    //通过 Provider 把 cartItems 和 addToCart 提供给所有子组件
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart ,totalPrice}}>
      {children}
    </CartContext.Provider>
  );
};

