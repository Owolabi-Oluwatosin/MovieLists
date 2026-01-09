export default async function handler(req, res) {
  const { title, country = "NG" } = req.query;

  if (!title) {
    return res.status(200).json({ providers: [] });
  }

  try {
    const jwRes = await fetch(
      `https://apis.justwatch.com/content/titles/en_${country}/popular`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          query: title,
          page_size: 1,
          page: 1
        })
      }
    );

    const text = await jwRes.text();

    if (!text.trim().startsWith("{")) {
      return res.status(200).json({ providers: [] });
    }

    const data = JSON.parse(text);

    const providers =
      data?.items?.[0]?.offers
        ?.filter(o => ["nfx", "prv"].includes(o.package_short_name))
        ?.map(o => ({
          provider_name:
            o.package_short_name === "nfx"
              ? "Netflix"
              : "Amazon Prime Video",
          url: o.urls?.standard_web
        })) || [];

    return res.status(200).json({ providers });
  } catch {
    return res.status(200).json({ providers: [] });
  }
}
