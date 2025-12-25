import { Link } from 'react-router-dom';
import React from 'react';

interface NavbarProps {
    cartCount : number;
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Navbar : React.FC<NavbarProps> = ({ cartCount , isLoggedIn  , onLogout}) => {
  return (
    <nav style={{ backgroundColor: "#7cb1a3ff", color: "#fbf8f1" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* لوگو یا عنوان سایت */}
          <div className='flex items-center'>
            <h1 className='flex items-center text-lg font-bold text-4xl font-script tracking-wider italic'>
              <img src="/images/feather-pen.png" className="w-8 mr-2" />
              Dream Pen
            </h1>
          </div>

          {/* منو */}
          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md font-medium hover:text-teal-900">Home</Link>
            <Link to="/shop" className="px-3 py-2 rounded-md font-medium hover:text-teal-900">Shop</Link>

            {isLoggedIn && <Link to="/admin" className="px-3 py-2 rounded-md font-medium hover:text-teal-900">Admin Panel</Link>}

            {!isLoggedIn ? (
              <Link to="/login"className="px-3 py-2 rounded-md font-medium hover:text-teal-900">Login</Link>
            ) : (
              <button onClick={onLogout} className='px-3 py-2 rounded-md font-medium hover:text-teal-900'>Logout</button>
            )}
            <Link to="/cart" className="flex items-center px-3 py-2 rounded-md font-medium hover:text-teal-900 ">
              <img src="/images/shopping-cart.png" className="w-4 mr-1 text-white " />
              {cartCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
