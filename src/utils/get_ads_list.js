// get_ads_list.js
import axios from "axios";
import "dotenv/config";

const cookie = process.env.BINANCE_P2P_COOKIE || "";

if (!cookie) {
  console.warn("BINANCE_P2P_COOKIE không có trong .env → sẽ gọi ở trạng thái không login");
}

const BASE_HEADERS = {
  accept: "*/*",
  "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
  "bnc-level": "0",
  "bnc-location": "VN",
  "bnc-time-zone": "Asia/Bangkok",
  "bnc-uuid": "26baa431-84d0-420f-b5bf-4ba2c327cdab",
  c2ctype: "c2c_web",
  clienttype: "web",
  "content-type": "application/json",
  lang: "vi",
  origin: "https://p2p.binance.com",
  referer: "https://p2p.binance.com/trade/all-payments/USDT?fiat=VND",
  "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
};

const client = axios.create({
  baseURL: "https://p2p.binance.com",
  headers: {
    ...BASE_HEADERS,
    ...(cookie && { Cookie: cookie }),
  },
});


export async function getAdsList(options = {}) {
  const {
    fiat = "VND",
    asset = "USDT",
    tradeType = "BUY",
    page = 1,
    rows = 10,
    transAmount = 5000000,
  } = options;

  const payload = {
    fiat,
    page,
    rows,
    tradeType, 
    asset,
    countries: [],
    proMerchantAds: false,
    shieldMerchantAds: false,
    filterType: "tradable",
    periods: [],
    additionalKycVerifyFilter: 1,
    publisherType: "merchant",
    payTypes: [],
    classifies: ["mass", "profession", "fiat_trade"],
    tradedWith: false,
    followed: false,
    transAmount,
  };

  try {
    const res = await client.post(
      "/bapi/c2c/v2/friendly/c2c/adv/search",
      payload,
    );

    if (res.status !== 200) {
      console.error("Non-200 status:", res.status);
    }

    return res.data; // { data: [...], total, success, ... }
  } catch (err) {
    if (err.response) {
      console.error("Error status:", err.response.status);
      console.error("Body:", err.response.data);
    } else {
      console.error("Request error:", err.message);
    }
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  getAdsList()
    .then((data) => {
      console.log("Status: 200");
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(() => {});
}
