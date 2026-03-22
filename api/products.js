export default async function handler(req, res) {
  try {
    const API_KEY = 607add012dadcfacf6c4eb6464541fefa0d1e59068cb5240f7df1a4c350cc6a3


    const response = await fetch(
      `https://serpapi.com/search.json?q=iphone&engine=google_shopping&api_key=${API_KEY}`
    );

    const text = await response.text();

    res.status(200).json({
      raw: text
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
