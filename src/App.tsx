import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    console.log("DATA:", data);

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Price Yaar 🔥</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item, index) => (
          <div key={index} className="border p-2 rounded">

            <img
              src={item.product_image}
              alt=""
              className="w-full h-40 object-cover"
            />

            <h2>{item.product_name}</h2>

            <p>₹{item.price}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
