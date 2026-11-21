// Tell Bing (which powers ChatGPT search and Copilot), Yandex, Seznam and Naver that pages changed.
// Usage: node scripts/indexnow-ping.mjs https://your-site.example /path1 /path2 ...
// With no paths it submits the profile, essays index, each essay, llms.txt and feed.xml.
const KEY = "ba3dc97668efc13afac39a5056434f0d"; // must match public/<KEY>.txt
const [, , host, ...paths] = process.argv;
if (!host) { console.error("usage: node scripts/indexnow-ping.mjs <https://host> [paths...]"); process.exit(1); }
const base = host.includes("netlify.app") ? "/roni-paul" : "";
const defaults = ["/", "/notes", "/notes/the-money-that-dies-on-the-shelf", "/notes/why-i-left-medical-school", "/notes/the-customer-who-moved", "/notes/twelve-lakh-counters", "/notes/online-without-an-app", "/notes/online-pharmacy-strategy-for-neighbourhood-chemists", "/notes/why-chemists-lose-to-quick-commerce", "/notes/entrepreneur-from-assam", "/notes/e-prescription-rules-indian-clinic", "/notes/what-a-healthcare-entrepreneur-does-all-day", "/notes/cost-of-a-medicine-delivery-rider", "/notes/pharmacy-software-india-what-chemists-want", "/notes/how-to-sell-medicine-online-india-legally", "/notes/how-to-grow-from-scratch", "/speaking", "/facts/pharmacists-by-state", "/facts", "/llms.txt", "/llms-full.txt", "/feed.xml"].map(p => (base + p).replace(/\/\/$/, "/"));
const candidates = (paths.length ? paths : defaults).map(p => new URL(p, host).href);
// Only submit pages that are actually live (essays scheduled for a later date return 404 until then).
const live = await Promise.all(candidates.map(async u => { try { return (await fetch(u, { method: "HEAD" })).status === 200 ? u : null; } catch { return null; } }));
const urlList = live.filter(Boolean);
const body = { host: new URL(host).host, key: KEY, keyLocation: `${host.replace(/\/$/, "")}/${KEY}.txt`, urlList };
const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
console.log(res.status, res.statusText, "→", urlList.length, "URLs submitted");
if (res.status >= 400) console.log(await res.text());
