import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // اضافه کردن BrowserRouter و Routes
import App from './App';
import Home from './pages/Home';  // مسیر صفحه اصلی
import Shop from './pages/Shop';  // مسیر فروشگاه
import Login from './pages/Login';  // مسیر ورود
import Cart from './pages/Cart';  // مسیر سبد خرید
import Admin from './pages/Admin';  // مسیر پنل ادمین
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogs from './components/Admin/AdminLogs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
          } />
        <Route path="/admin/logs" element = {<AdminLogs />} />
          
      </Route>
    </Routes>
  </BrowserRouter>
);

