export async function getServerSideProps({ res }) {
  const baseUrl = "https://hotmovielist.com";

  const staticPages = [
    "",
    "/african-cinema",
    "/nollywood",
    "/about",
    "/contact",
    "/privacy-policy"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        path => `
      <url>
        <loc>${baseUrl}${path}</loc>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
