import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// تایپ محصولات
interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(10);

  useEffect(() => {
    fetch("https://69354c56fa8e704dafbd697e.mockapi.io/stationery")
      .then((res) => {
        if (!res.ok) throw new Error("مشکلی در دریافت اطلاعات پیش آمد");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">در حال بارگذاری محصولات...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-lg">خطا: {error}</p>;
  }

  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="bg-[#f6f3ee] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mt-3">
        <div className="relative h-[450px] rounded-3xl overflow-hidden mx-auto">
          <img
            src="/images/Give_me_a_202512101335.jpeg"
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-6 text-[#fff3d7ff]">
            <h1 className="font-bold text-5xl mb-4 font-script tracking-wider italic">Welcome to The Dream Pen</h1>
            <p className="max-w-xl mb-6 text-lg">
              Your curated destination for exceptional paper goods & creative tools
            </p>
            <Link
              to="/shop"
              className="bg-[#7cb1a3ff] px-6 py-2 mt-6 rounded-full hover:text-teal-900 transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl shadow hover:shadow-xl transition border border-[#7cb1a3ff] flex flex-col"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-48 w-full rounded-t-2xl object-cover"
              />
              <div className="p-4 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 text-gray-900 font-semibold text-sm">{product.title}</h3>
                  <p className="text-teal-600 font-medium mb-3">{product.price} $</p>
                </div>
                <Link
                  to="/shop"
                  className="rounded-full hover:text-teal-900 bg-[#7cb1a3ff] px-6 py-2 mt-2"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
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
};

export default Home;
