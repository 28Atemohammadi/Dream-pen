import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // بررسی وضعیت ورود کاربر
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // لاگ‌اوت کردن
  const handelLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
  };

  // افزودن محصول به سبد خرید
  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // به‌روزرسانی تعداد محصول در سبد خرید
  const updateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // حذف محصول از سبد خرید
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // محاسبه تعداد محصولات در سبد خرید
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar
        cartCount={cartCount}  /* ارسال cartCount به Navbar */
        isLoggedIn={isLoggedIn}
        onLogout={handelLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet
          context={{
            setIsLoggedIn,
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
          }}
        />
      </main>
    </>
  );
};

export default App;
