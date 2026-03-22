export default async function handler(req, res) {
  try {
    const API_KEY = "607add012dadcfacf6c4eb6464541fefa0d1e59068cb5240f7df1a4c350cc6a3";

    const https = require("https");

    const url = `https://serpapi.com/search.json?q=iphone&engine=google_shopping&api_key=${API_KEY}`;

    https.get(url, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        res.status(200).json(JSON.parse(data));
      });
    }).on("error", (err) => {
      res.status(500).json({ error: err.message });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
