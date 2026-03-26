import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Price Yaar 🔥</h1>
      </div>

      {/* Content */}
      <div className="p-4">

        {loading && (
          <p className="text-center text-lg">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found in database
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="text-sm font-semibold mt-2 line-clamp-2">
                {item.name}
              </h2>

              <p className="text-green-600 font-bold mt-1">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
