import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ProductCart from "../components/ProductCart"

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
}

interface ShopContext {
  addToCart: (product: Product, quantity: number) => void;
}

export default function Shop() {
  const { addToCart } = useOutletContext<ShopContext>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(10);

  useEffect(() => {
    fetch("https://69354c56fa8e704dafbd697e.mockapi.io/shop")
      .then((res) => {
        if (!res.ok) throw new Error("مشکلی در دریافت اطلاعات پیش آمد");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">در حال بارگذاری محصولات...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-lg">خطا: {error}</p>;

  const loadMoreProducts = () => setVisibleCount((prev) => prev + 10);

  return (
    <div className="bg-[#f6f3ee] min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mt-3">
        <div className="relative h-[450px] rounded-3xl overflow-hidden mx-auto">
          <img
            src="/images/Can_you_give_202512161058.jpeg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-6 text-[#fff3d7ff]">
            <h1 className="font-bold text-5xl mb-4 font-script tracking-wider italic">Welcome to the shop</h1>
            <p className="max-w-xl mb-6 text-lg">explore our complete collection of fine stationery and creative tools.</p>
            <Link to="/shop" className="bg-[#7cb1a3ff] px-6 py-2 mt-6 rounded-full hover:text-teal-900">View Cart</Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <ProductCart key={product.id} product={product} onAddToCart={(product, quantity) => addToCart(product, quantity)} />
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMoreProducts}
              className="bg-[#7cb1a3ff] px-6 py-2 mt-6 rounded-full hover:text-teal-900 transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
