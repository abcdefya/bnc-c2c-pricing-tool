// index.js
import { getExchangeRateList } from "./src/utils/get_exchange_rate_list.js";
import { getAdsList } from "./src/utils/get_ads_list.js";

async function main() {
  const exData = await getExchangeRateList();

  console.log("=== EXCHANGE RATE LIST (fiat / USD) ===");
  if (!exData?.data || !Array.isArray(exData.data)) {
    console.error("Exchange rate response không hợp lệ:", exData);
  } else {
    exData.data.forEach((item, idx) => {
      console.log(
        `${idx + 1}. ${item.fiatCurrency} (${item.fiatSymbol}) / ${
          item.againstCurrency
        }: ` +
          `${item.exchangeRate} (custom: ${item.customExRate}, range: ${
            item.customExchangeRateRange
          })`,
      );
    });
  }

  const adsData = await getAdsList({
    fiat: "VND",
    asset: "USDT",
    tradeType: "SELL", 
    page: 1,
    rows: 10,
    transAmount: 2_000_000,
  });

  console.log("\n=== ADS LIST PAGE 1 (USDT/VND, SELL) ===");
  console.log("Total ads (server báo):", adsData.total);

  if (!adsData?.data || !Array.isArray(adsData.data)) {
    console.error("Ads response không hợp lệ:", adsData);
  } else {
    adsData.data.forEach((row, idx) => {
      const adv = row.adv;
      const advertiser = row.advertiser;

      console.log(
        `${idx + 1}. ${advertiser.nickName} - ${adv.price} ${adv.fiatUnit}/${adv.asset}`,
      );
    });
  }
}

main().catch((err) => {
  console.error("Main error:", err);
});
