
import { useEffect, useState } from "react";
import { getProducts } from "./lib/supabase";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    console.log("Fetching products...");

    const { data, error } = await getProducts();

    if (error) {
      console.error("ERROR:", error);
      setErrorMsg("Error loading products");
    } else {
      console.log("DATA:", data);

      if (!data || data.length === 0) {
        setErrorMsg("No products found in database");
      }

      setProducts(data || []);
    }

    setLoading(false);
  };

  // Loading state
  if (loading) {
    return <h1 className="p-4">Loading...</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Price Yaar 🔥</h1>

      {/* Error message */}
      {errorMsg && (
        <p className="text-red-500 mb-4">{errorMsg}</p>
      )}

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <div key={item.id} className="border p-2 rounded">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-green-600">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
