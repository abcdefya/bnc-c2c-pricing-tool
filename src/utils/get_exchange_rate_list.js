import axios from "axios";
import "dotenv/config";

const cookie = process.env.BINANCE_C2C_ADMIN_COOKIE;

if (!cookie) {
  console.error("Missing BINANCE_C2C_ADMIN_COOKIE in .env");
  process.exit(1);
}


const BASE_HEADERS = {
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  "bnc-location": "VN",
  "bnc-time-zone": "Asia/Bangkok",
  "bnc-uuid": "638d525d-5d83-4d29-a123-bc1475fcc1ab",
  c2ctype: "c2c_merchant",
  clienttype: "web",
  "content-type": "application/json",
  csrftoken: "788c1388fdde65bf9ac11cee92f720db",
  "device-info":
    "eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA0MCIsInN5c3RlbV92ZWJzaW9uIjoiV2luZG93cyAxMCIsImJyYW5kX21vZGVsIjoidW5rbm93biIsInN5c3RlbV9sYW5nIjoiZW4tVVMiLCJ0aW1lem9uZSI6IkdNVCswNzowMCIsInRpbWV6b25lT2Zmc2V0IjotNDIwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzE0Mi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJNaWNyb3NvZnQgRWRnZSBQREYgVmlld2VyLFRKalpNR3FkLENocm9taXVtIFBvcnRhYmxlIERvY3VtZW50IEZvcm1hdCAsQ2hyb21pdW0gUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGLHRhMDVGQ28sUERGIFZpZXdlciIsImNhbnZhc19jb2RlIjoiYzFmN2IyNTAiLCJ3ZWJnbF92ZW5kb3IiOiJHb29nbGUgSW5jLiAoTlZJRElBKSIsIndlYmdsX3JlbmRlcmVyIjoiQU5HTEUgKE5WSURJQSwgTlZJRElBIEdlRm9yY2UgUlRYIDQwNjAgKDB4MDAwMDI4ODIpIERpcmVjdDNEMTEgdnNfNV8wIHBzXzVfMCwgRDNEMTEpIiwiYXVkaW8iOiIxMjMuNTE4NzczMTQ1Mjc1MTkiLCJwbGF0Zm9ybSI6IldpbjMyIiwid2ViX3RpbWV6b25lIjoiQXNpYS9CYW5na29rIiwiZGV2aWNlX25hbWUiOiJDaHJvbWUgVjE0Mi4wLjAuMCAoV2luZG93cykiLCJmaW5nZXJwcmludCI6IjM1N2JlZWNiYjIxNGY4ZmY5MzM4OTE2Mjg3OGI5ZWQ5IiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiIn0=",
  "fvideo-id": "3311416d97bca765b06aebf88b47a69e7755022c",
  "fvideo-token":
    "Bft8n6ehrY/IUZzxfxSP2Otk8XorNGBag9OrWcrpu383yddBJWvpblBYNyc3gFFYh0DB8dQNt3c8PpSTMydLjeLXjLbgwehZ8pwtcOKmZ9eVcxWz7nyPqHyJnvUCIOvb8XF0RwshHJ4zy09U2Tl2uIkJ7m6Y6W3W2eP9JjXc9y1D5h8yCkjAWprT9yW0qMr0E=39",
  lang: "en",
  priority: "u=1, i",
  referer: "https://c2c-admin.binance.com/en/advert/online/profession",
  "sec-ch-ua": '"Chromium";v="142", "Brave";v="142", "Not_A Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "sec-gpc": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
};

const client = axios.create({
  baseURL: "https://c2c-admin.binance.com",
  headers: {
    ...BASE_HEADERS,
    Cookie: cookie,
  },
});


export async function getExchangeRateList() {
  try {
    const res = await client.get(
      "/bapi/c2c/v1/private/c2c/merchant/get-exchange-rate-list",
    );

    if (res.status !== 200) {
      console.error("Non-200 status:", res.status);
    }

    return res.data;
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
  getExchangeRateList()
    .then((data) => {
      console.log("Status: 200");
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(() => {
    });
}
