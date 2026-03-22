export default async function handler(req, res) {
  try {
    const API_KEY = 607add012dadcfacf6c4eb6464541fefa0d1e59068cb5240f7df1a4c350cc6a3

    const response = await fetch(
      `https://serpapi.com/search.json?q=iphone&engine=google_shopping&api_key=${API_KEY}`
    );

    const data = await response.json();

    const products = data.shopping_results || [];

    const validProducts = products.filter(p => p.price);

    const best = validProducts.reduce((lowest, current) => {
      const price1 = parseInt(lowest.price.replace(/[^0-9]/g, ""));
      const price2 = parseInt(current.price.replace(/[^0-9]/g, ""));
      return price2 < price1 ? current : lowest;
    }, validProducts[0]);

    res.status(200).json({
      bestProduct: best,
      allProducts: validProducts
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
}
