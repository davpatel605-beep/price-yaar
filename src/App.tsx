import { useEffect, useState } from "react";
import { getProducts } from "./lib/supabase";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await getProducts();

    if (error) {
      console.log(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Price Yaar 🔥</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <div key={item.id} className="border p-2 rounded">
            <img src={item.image} className="w-full h-40 object-cover" />
            <h2>{item.name}</h2>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
