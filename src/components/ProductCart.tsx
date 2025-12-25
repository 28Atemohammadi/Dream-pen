import { useState } from "react";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="border border-[#7cb1a3ff] text-center transition shadow hover:shadow-xl rounded-2xl">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-48 w-full rounded-2xl object-cover"
      />
      <h3 className="mt-3 text-sm text-gray-900">
        {product.title}
      </h3>
      <p className="mt-3 text-sm text-gray-900">
        {product.price} $
      </p>

      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={decrease}
          className="w-9 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg transition"
        >
          -
        </button>
        <input
          className="w-14 text-center rounded-md border border-gray-300"
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
        <button
          onClick={increase}
          className="w-9 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onAddToCart(product, quantity)}
        className="flex justify-center items-center gap-2 rounded-lg hover:text-teal-900 bg-[#7cb1a3ff] mt-4 mb-4 w-full py-2 transition"
      >
        <img src="/images/shopping-cart.png" alt="Add to Cart" className="w-5" />
        Add to Cart
      </button>
    </div>
  );
}
