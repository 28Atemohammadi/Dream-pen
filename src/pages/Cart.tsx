import { useOutletContext } from "react-router-dom";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface CartContext {
  cartItems: CartItem[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function Cart() {
  const { cartItems, removeItem, updateQuantity } = useOutletContext<CartContext>();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-xl font-bold mt-10 text-gray-600">
        Your Cart Is Empty 🛍️
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="font-bold text-[#7cb1a3ff] text-2xl mb-6 pb-2 border-b">YOUR CART</h2>

      <div className="grid grid-cols-4 items-center p-4 mb-4 shadow-md rounded-xl text-[#7cb1a3ff]">
        <span>Products</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-center">Total</span>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="grid grid-cols-4 items-center p-4 mb-4 shadow-md rounded-xl hover:bg-gray-50 transition">
          {/* Product */}
          <div className="flex gap-4 items-center relative">
            <img src={item.imageUrl} className="border rounded-md w-20 h-full object-contain" alt={item.title} />
            <p className="text-sm font-medium">{item.title}</p>
            <button
              className="absolute top-2 left-2 text-red-500 text-xl hover:text-red-700"
              onClick={() => removeItem(item.id)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <div className="text-center text-gray-700">{item.price} $</div>

          {/* Quantity */}
          <div className="flex justify-center items-center gap-3">
            <button
              className="w-9 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg transition"
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
              className="w-14 text-center rounded-md border border-gray-300"
            />
            <button
              className="w-9 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg transition"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Total */}
          <div className="font-bold text-center text-[#7cb1a3ff] text-sm">
            {(item.price * item.quantity).toLocaleString()} $
          </div>
        </div>
      ))}

      <div className="bg-[#7cb1a3ff] font-bold text-lg p-4 rounded-xl text-center mt-6 shadow-lg">
        TOTAL PRICE : $ {totalPrice.toLocaleString()}
      </div>
    </div>
  );
}
