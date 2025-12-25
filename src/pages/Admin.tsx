import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminProductTable from "../components/Admin/AdminProductTable";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  description?: string;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProducts, setIsEditingProducts] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    id: "",
    title: "",
    imageUrl: "",
    price: 0,
    quantity: 0,
  });
   const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetching products from API
  useEffect(() => {
    fetch("https://69354c56fa8e704dafbd697e.mockapi.io/shop")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

 // Logging action
const logAction = (action: string, product: Product) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    product,
  };

  const existingLogs = JSON.parse(localStorage.getItem("actionLogs") || "[]");
  existingLogs.push(logEntry);
  localStorage.setItem("actionLogs", JSON.stringify(existingLogs));
};

// Add product
const handelAddProduct = () => {
  fetch("https://69354c56fa8e704dafbd697e.mockapi.io/shop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((newProduct) => {
      setProducts([...products, newProduct]);
      logAction("Added Product", newProduct);  // اینجا باید newProduct باشد
      setIsModalOpen(false);
    })
    .catch((err) => console.error("Error adding product:", err));
};

// Edit product
const handleEditProduct = () => {
  fetch(`https://69354c56fa8e704dafbd697e.mockapi.io/shop/${formData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((updatedProduct) => {
      setProducts(
        products.map((product) =>
          product.id === formData.id ? updatedProduct : product
        )
      );
      logAction("Edited Product", updatedProduct);  // اینجا هم باید updatedProduct باشد
      setIsModalOpen(false);
    })
    .catch((err) => console.error("Error editing product:", err));
};

// Delete product
const handleDeleteProduct = (id: string) => {
  // ابتدا پیدا کردن محصولی که باید حذف بشه
  const productToDelete = products.find((product) => product.id === id);
  
  if (productToDelete) {
    fetch(`https://69354c56fa8e704dafbd697e.mockapi.io/shop/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        logAction("Deleted Product", productToDelete);  // اینجا باید productToDelete باشد
      })
      .catch((err) => console.error("Error deleting product:", err));
  }
};


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) pageNumbers.push(i);

  const openModal = (product: Product | null) => {
    if (product) {
      setIsEditingProducts(product);
      setFormData(product);
    } else {
      setIsEditingProducts(null);
      setFormData({
        id: crypto.randomUUID(),
        title: "",
        imageUrl: "",
        price: 0,
        quantity: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProducts) {
      handleEditProduct();
    } else {
      handelAddProduct();
    }
  };

  const handleLogout = () => {
  // پاک کردن وضعیت ورود
  sessionStorage.removeItem("isAdminLoggedIn");
  setIsEditingProducts(null);
  setIsModalOpen(false);

  // هدایت به صفحه Home
  navigate("/");
};


  return (
    <div className="min-h-screen bg-[#f6f3ee] flex">
      <aside className="p-6 text-white w-64 bg-[#7cb1a3ff]">
        <h2 className="text-2xl mb-10 font-bold">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-teal-900 cursor-pointer">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="hover:text-teal-900 cursor-pointer">
            <Link to="/admin/logs">Logs</Link>
          </li>
          <li className="hover:text-teal-900 cursor-pointer">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6 text-[#7cb1a3ff]">Welcome Admin</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-3 rounded-lg border border-gray-300 w-[600px]"
          placeholder="Search product"
        />
        <button
          onClick={() => openModal(null)}
          className="rounded-lg text-white bg-teal-700 px-6 py-2 mb-4 ml-10 hover:text-[#7cb1a3ff]"
        >
          + Add Product
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="max-w-md p-6 rounded-xl bg-white w-full">
              <h3 className="text-xl font-bold mb-4 text-[#7cb1a3ff]">
                {editingProducts ? "Edit Product" : "Add Product"}
              </h3>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full rounded p-2 mb-3 border"
              />
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded p-2 mb-3 border"
              />
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full rounded p-2 mb-3 border"
              />
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full rounded p-2 mb-3 border"
              />
              <label className="block text-sm font-medium text-gray-700">Image Url</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full rounded p-2 mb-3 border"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border hover:text-white bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded text-white bg-[#7cb1a3ff] border hover:text-teal-900"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <AdminProductTable
          products={currentProducts}
          searchQuery={searchQuery}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={openModal}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#7cb1a3ff] text-white px-4 py-2 rounded-md hover:text-teal-900"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${
                currentPage === number ? "bg-teal-700 text-white" : "bg-white text-[#7cb1a3ff]"
              } px-4 py-2 mx-1 rounded-md`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
            className="bg-[#7cb1a3ff] text-white px-4 py-2 rounded-md hover:text-teal-900"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
