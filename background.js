
let capturedHeaders = {};

const TARGET_API =
  "https://c2c-admin.binance.com/bapi/c2c/v1/private/c2c/merchant/get-exchange-rate-list";


chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (!details.url.startsWith(TARGET_API)) return;

    const headerMap = {};

    for (const h of details.requestHeaders) {
      const key = h.name.toLowerCase();

      if (
        key === "cookie" ||
        key === "csrftoken" ||
        key === "device-info" ||
        key === "fvideo-id" ||
        key === "fvideo-token" ||
        key === "bnc-uuid" ||
        key === "content-type" ||
        key === "c2ctype" ||
        key === "clienttype" ||
        key === "accept" ||
        key === "accept-language" ||
        key === "user-agent"
      ) {
        headerMap[h.name] = h.value;
      }
    }

    console.log("🔥 BẮT ĐƯỢC HEADER EXCHANGE RATE:");
    console.log(headerMap);

    capturedHeaders = headerMap;

    chrome.storage.local.set({ exchange_headers: headerMap });
  },
  { urls: ["https://c2c-admin.binance.com/*"] },
  ["requestHeaders"]
);


async function callExchangeRateAPI() {
  const stored = await chrome.storage.local.get("exchange_headers");

  if (!stored.exchange_headers) {
    console.warn("Header is not captured yet. Please visit the target page first.");
    return;
  }

  const headers = stored.exchange_headers;

  console.log("Extracted headers:");
  console.log(headers);

  try {
    const res = await fetch(TARGET_API, {
      method: "GET",
      headers: headers,
    });

    const data = await res.json();
    console.log("Exchange Rate (Auto Refresh):", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

chrome.alarms.create("autoFetchExchangeRate", {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "autoFetchExchangeRate") {
    console.log("API Calling");
    callExchangeRateAPI();
  }
});

console.log("Binance C2C Auto Fetcher Loaded.");
