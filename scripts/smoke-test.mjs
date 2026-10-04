// Smoke test for the production build. Run after `npm run build`:
//
//   npm test             -> this script
//   npm run verify       -> lint + build + this script (run before pushing)
//
// Boots `next start` on a spare port, then checks what a visitor, a crawler
// and Vercel would see: every route answers, the story is intact and in
// order, no placeholder text leaked, structured data parses, and every image
// and internal link on each page resolves. No dependencies beyond Node 20.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = 3210;
const BASE = `http://localhost:${PORT}`;
const PAGES = ["/", "/get-involved"];

if (!existsSync(".next/BUILD_ID")) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
  stdio: "ignore",
});

const failures = [];
let passed = 0;
const check = (ok, label) => {
  if (ok) passed++;
  else failures.push(label);
};

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const all = (html, re) => [...html.matchAll(re)].map((m) => decode(m[1]));

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start within 30s");
}

async function status(path) {
  try {
    return (await fetch(BASE + path, { redirect: "manual" })).status;
  } catch {
    return 0;
  }
}

async function run() {
  await waitForServer();

  // 1. Routes.
  for (const path of [...PAGES, "/llms.txt", "/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.png", "/apple-icon.png"]) {
    check((await status(path)) === 200, `GET ${path} should be 200`);
  }
  check((await status("/this-page-does-not-exist")) === 404, "unknown route should be 404");

  const html = {};
  for (const path of PAGES) html[path] = await (await fetch(BASE + path)).text();
  // Next also embeds each page's data in inline <script> payloads, which
  // repeats the text. Structural checks look at the rendered markup only.
  const markup = (page) => page.replace(/<script[\s\S]*?<\/script>/g, "");
  const home = markup(html["/"]);
  const gi = markup(html["/get-involved"]);

  // 2. The home page story: one h1, the legal name, all eight chapters in order.
  check((home.match(/<h1[\s>]/g) || []).length === 1, "home should have exactly one <h1>");
  check(home.includes("The Love and Light Community and Humanitarian Foundation"), "home should show the full legal name");
  const chapters = [...home.matchAll(/Chapter (0\d)/g)].map((m) => m[1]);
  check(
    JSON.stringify(chapters) === JSON.stringify(["01", "02", "03", "04", "05", "06", "07", "08"]),
    `chapters should run 01-08 in order, found ${chapters.join(",") || "none"}`
  );
  for (const title of ["Food Security", "Education", "Youth Empowerment", "Women Development", "Community Development", "CSR Execution for Partners"]) {
    check(home.includes(title), `home should list programme "${title}"`);
  }
  for (const name of ["Agness A. Mnzava", "Toluwalade Arijeniwa"]) {
    check(home.includes(name), `home should include the review by ${name}`);
  }

  // 3. No placeholder text may reach a visitor.
  for (const [path, page] of Object.entries(html)) {
    const leaked = page.match(/\[(PHOTO|COPY|GRAPHIC|REVIEW|DATE)[:\]]/);
    check(!leaked, `${path} should contain no placeholder text (found ${leaked?.[0]})`);
  }

  // 4. The second page.
  check((gi.match(/<h1[\s>]/g) || []).length === 1, "/get-involved should have exactly one <h1>");
  check(/rel="canonical" href="[^"]*\/get-involved"/.test(gi), "/get-involved should declare its own canonical URL");
  check(html["/get-involved"].includes('"BreadcrumbList"'), "/get-involved should include breadcrumb structured data");

  // 5. Structured data parses on every page.
  for (const [path, page] of Object.entries(html)) {
    const blocks = all(page, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    check(blocks.length >= 2, `${path} should have organisation and page structured data`);
    for (const b of blocks) {
      try {
        JSON.parse(b);
        passed++;
      } catch {
        failures.push(`${path} has structured data that is not valid JSON`);
      }
    }
  }

  // 6. Every image and internal link resolves.
  for (const [path, page] of Object.entries(html)) {
    const images = new Set(all(page, /<img[^>]*?\ssrc="([^"]+)"/g));
    for (const src of images) {
      check((await status(src)) === 200, `${path}: image ${src.slice(0, 80)} should load`);
    }
    const ids = new Set(all(page, /\sid="([^"]+)"/g));
    const hrefs = new Set(all(page, /<a[^>]*?\shref="([^"]+)"/g));
    for (const href of hrefs) {
      if (href.startsWith("#")) {
        if (href.length > 1) check(ids.has(href.slice(1)), `${path}: link ${href} should match an element`);
      } else if (href.startsWith("/")) {
        const [route, hash] = href.split("#");
        check((await status(route || "/")) === 200, `${path}: link ${href} should resolve`);
        if (hash) {
          const target = html[route || "/"] ?? (await (await fetch(BASE + (route || "/"))).text());
          check(new RegExp(`\\sid="${hash}"`).test(target), `${path}: link ${href} should match an element`);
        }
      }
    }
  }

  // 7. Search engine and AI files list the second page.
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
  check(sitemap.includes("/get-involved"), "sitemap should list /get-involved");
  const llms = await (await fetch(BASE + "/llms.txt")).text();
  check(llms.includes("/get-involved"), "llms.txt should mention /get-involved");
}

try {
  await run();
} catch (e) {
  failures.push(`Test run crashed: ${e.message}`);
} finally {
  server.kill();
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} failed, ${passed} passed\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ All ${passed} checks passed`);
