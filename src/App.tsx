import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.shopping_results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Price Yaar 🔥</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item: any, index: number) => (
          <div key={index} className="border p-3 rounded-lg shadow">
            <img src={item.thumbnail} alt="" className="w-full h-40 object-cover" />
            <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
            <p className="text-green-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
