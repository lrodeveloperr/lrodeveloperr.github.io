import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  {
    file: "pressbench.png",
    url: "https://raw.githubusercontent.com/lrodeveloperr/Pressbench-iphone/main/PressBench/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png",
  },
  {
    file: "welding-gas-wallet.png",
    url: "https://raw.githubusercontent.com/lrodeveloperr/welding-wallet-ios/main/Shell/Resources/Assets.xcassets/AppIcon.appiconset/WeldingGasWallet-1024.png",
  },
  {
    file: "grocery-benefits.png",
    url: "https://raw.githubusercontent.com/lrodeveloperr/Grocery-code-ios-test/main/release-overlay/assets/brand-logo-ui.png",
  },
  {
    file: "get-it-on-google-play.png",
    url: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
  },
];

const outputDirectory = path.resolve("public/assets");
await mkdir(outputDirectory, { recursive: true });

for (const asset of assets) {
  const outputPath = path.join(outputDirectory, asset.file);

  try {
    const existing = await stat(outputPath);
    if (existing.size > 0) continue;
  } catch {
    // The production checkout intentionally fetches authoritative assets here.
  }

  const response = await fetch(asset.url, {
    headers: { "User-Agent": "worksbien-studios-cloudflare-build" },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${asset.file}: HTTP ${response.status}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length === 0) throw new Error(`Fetched an empty ${asset.file}`);
  await writeFile(outputPath, bytes);
}
