// sitemapGenerator.ts

import axios from "axios";
import * as fs from "fs";

function generateSitemap(routes) {
  const baseUrl = "https://arcavena.com"; // Base URL of your website
  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach((route) => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

function generateSitemapFile(routes) {
  const sitemap = generateSitemap(routes);
  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully.");
}

async function fetchDataAndGenerate() {
  try {
    const { data } = await axios.get("http://localhost:4000/profile/fsrd");

    const routes = [
      { path: "/" },
      { path: "/daftar" },
      { path: "/pameran" },
      {
        path: "/media-sosial",
      },
      {
        path: "/tentang",
      },
      { path: "/alamat" },
      {
        path: "/sponsor",
      },
    ];

    data.forEach((nim) => {
      // exclude developer nim (Yonatan - 19623271)
      // if (+nim !== 19623271) {
      routes.push({ path: "/profile-fsrd/" + nim });
      // }
    });

    generateSitemapFile(routes);
  } catch (error) {
    console.error(error);
  }
}
fetchDataAndGenerate();
