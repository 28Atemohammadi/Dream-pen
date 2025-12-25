import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // TypeScript استفاده شده
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // بررسی ورود کاربر
    if (email === "admin@example.com" && password === "password123") {
      // ذخیره وضعیت لاگین در sessionStorage به جای localStorage
      sessionStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin"); // هدایت به صفحه Admin
    } else {
      setError("Access denied. Admin only.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Background_image_give_202512181234.jpeg')",
        height: "100vh",
        margin: 0,
      }}
    >
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-center mb-4 font-semibold text-3xl text-[#7cb1a3ff]">Log In</h2>
        <p className="text-center mb-6 font-semibold text-gray-700 text-sm">
          Please Enter Your Email and Password.
        </p>
        
        {/* نمایش خطای ورودی */}
        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        
        {/* فرم ورود */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full p-2 rounded-md border border-gray-300"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-6">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full p-2 rounded-md border border-gray-300"
              placeholder="Enter Your Password"
              required
            />
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className="w-full text-center hover:text-teal-900 bg-[#7cb1a3ff] rounded-full py-2 px-6 text-white text-lg"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
