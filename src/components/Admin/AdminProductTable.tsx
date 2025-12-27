import React from "react";


// تعریف تایپ برای محصولات
interface AdminProductTableProps {
  products: Product[];
  searchQuery: string;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: Product | null) => void;
}
interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  searchQuery,
  onDeleteProduct,
  onEditProduct,
}) => {
  // فیلتر کردن محصولات بر اساس جستجو
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
);

    return (
        <div className="overflow-x-auto bg-white p-4 shadow rounded-xl ">
            <table className="min-w-full table-auto">
                <thead className="bg-[#7cb1a3ff] text-white items-center shadow-md rounded-xl ">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                         <th className="px-4 py-2">Product Image</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b ">
                            <td className="px-10 py-2">{product.id}</td>
                            <td className="px-10 py-2">
                            <img
                            src={product.imageUrl || "/images/default-image.jpg"}  // تصویر پیش‌فرض اگر نباشه
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-md"
                            />
                            </td>
                            <td className="px-10 py-2">{product.title}</td>
                            <td className="px-10 py-2">{product.price} $</td>
                            <td className="px-10 py-2">{product.quantity}</td>
                            <td className="px-10 py-2">
                                <button onClick={() => onEditProduct(product)}
                                 className="mr-7 text-blue-500 hover:text-blue-700">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteProduct(product.id)}
                                 className="mr-7 text-red-500 hover:text-red-700">
                                    Delet
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-red-500 hover:text-red-700 text-center ">
                            No products found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}
export default AdminProductTable;