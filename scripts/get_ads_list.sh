TS=$(date +%Y%m%d_%H%M%S)
OUT="p2p_usdt_vnd_buy_${TS}.json"

curl 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search' \
  -H 'accept: */*' \
  -H 'accept-language: vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5' \
  -H 'bnc-level: 0' \
  -H 'bnc-location: VN' \
  -H 'bnc-time-zone: Asia/Bangkok' \
  -H 'bnc-uuid: 26baa431-84d0-420f-b5bf-4ba2c327cdab' \
  -H 'c2ctype: c2c_web' \
  -H 'clienttype: web' \
  -H 'content-type: application/json' \
  -b 'theme=dark; bnc-uuid=26baa431-84d0-420f-b5bf-4ba2c327cdab; ref=CGT69QN3; lang=vi; se_sd=BkFFxUFsMQWFlwPdTFxEgZZBxBRIUETU1cTFQVE5FJWUQUVNWVUQ1; se_gd=VlTFQUFEKRPGQkBxTEVMgZZElEVMTBTU1ZVFQVE5FJWUQUVNWVgS1; se_gsd=SjYmPBl1NjImJycoJDU2NA8xAhAFDwsAV1RGUVJaVVJQM1NT1; sajssdk_2015_cross_new_user=1; BNC_FV_KEY=330f4c45497ba87bbd4555f2085c545284c9ccf5; BNC_FV_KEY_T=101-d1Pf6i9s%2BY%2FBdemEAzYsi8Gj7PDQdfSNOMWpAUWFbzEiakxXWmvqO0HmWrmJ9pDlq%2BreciO0ynTVIHN11umQpg%3D%3D-PK382eI%2F9n8s6nib3VaTuw%3D%3D-04; BNC_FV_KEY_EXPIRE=1763248471385; r20t=web.5C63A485C258E1D97DAEF4A97B12E158; r30t=1; cr00=C8F16FD1A254D7BC7DC316706BE099BC; d1og=web.367842430.B5D4CD557199A7EA9605F258493DC262; r2o1=web.367842430.E6662B3E930657A0B4DB28D5940AB9FD; f30l=web.367842430.43F0D2DFF718592985EEDC8D7A2595FB; currentAccount=; logined=y; BNC-Location=VN; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22367842430%22%2C%22first_id%22%3A%2219a8882e5737eb-08f64ecd38ad9e-26061b51-2073600-19a8882e57423e3%22%2C%22props%22%3A%7B%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTlhODg4MmU1NzM3ZWItMDhmNjRlY2QzOGFkOWUtMjYwNjFiNTEtMjA3MzYwMC0xOWE4ODgyZTU3NDIzZTMiLCIkaWRlbnRpdHlfbG9naW5faWQiOiIzNjc4NDI0MzAifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22367842430%22%7D%7D; p20t=web.367842430.06914FA1F73B208FF2F2FC705BF9151A; _h_desk_key=3ad4a989c8994f8cabe60d39b0b33121; fiat-prefer-currency=VND; common_fiat=%7B%22fiat%22%3A%22VND%22%7D; OptanonAlertBoxClosed=2025-11-15T17:17:20.604Z; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Nov+16+2025+00%3A17%3A20+GMT%2B0700+(Gi%E1%BB%9D+%C4%90%C3%B4ng+D%C6%B0%C6%A1ng)&version=202506.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=a3882f01-0c1c-4cc4-bb4f-384251770e68&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A0%2CC0004%3A0%2CC0002%3A0&AwaitingReconsent=false&intType=2' \
  -H 'csrftoken: 49446365e090ce60d28a77a0d568b32e' \
  -H 'device-info: eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA0MCIsInN5c3RlbV92ZXJzaW9uIjoiV2luZG93cyAxMCIsImJyYW5kX21vZGVsIjoidW5rbm93biIsInN5c3RlbV9sYW5nIjoidmktVk4iLCJ0aW1lem9uZSI6IkdNVCswNzowMCIsInRpbWV6b25lT2Zmc2V0IjotNDIwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzE0Mi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJQREYgVmlld2VyLENocm9tZSBQREYgVmlld2VyLENocm9taXVtIFBERiBWaWV3ZXIsTWljcm9zb2Z0IEVkZ2UgUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGIiwiY2FudmFzX2NvZGUiOiI5ZTlkYjc1NCIsIndlYmdsX3ZlbmRvciI6Ikdvb2dsZSBJbmMuIChOVklESUEpIiwid2ViZ2xfcmVuZGVyZXIiOiJBTkdMRSAoTlZJRElBLCBOVklESUEgR2VGb3JjZSBSVFggNDA2MCAoMHgwMDAwMjg4MikgRGlyZWN0M0QxMSB2c181XzAgcHNfNV8wLCBEM0QxMSkiLCJhdWRpbyI6IjEyNC4wNDM0NzUyNzUxNjA3NCIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJBc2lhL0Jhbmdrb2siLCJkZXZpY2VfbmFtZSI6IkNocm9tZSBWMTQyLjAuMC4wIChXaW5kb3dzKSIsImZpbmdlcnByaW50IjoiOGY5YzNlMTEyNWQyNzNiZDg4YTQ4ZDI5MDVhNTEwNjkiLCJkZXZpY2VfaWQiOiIiLCJyZWxhdGVkX2RldmljZV9pZHMiOiIifQ==' \
  -H 'fvideo-id: 330f4c45497ba87bbd4555f2085c545284c9ccf5' \
  -H 'fvideo-token: VfCzM1hnhyk9GHDIK8lfmHxpxiLkEv/A4joBazaO8z6CrUaDxKAjVFihZmIhk+jO9k4Gl195uanYeyOywUaB6oRZ+GMqE59In9tQ1OU58lmTUGzGl1zlClRgGHmIX3FdQMcnwmm8N5LMlK0pEy87d3NthWibnLmxcPurf6tzopl2N+tCiGU2Xj+khIlxgl3dc=0b' \
  -H 'lang: vi' \
  -H 'origin: https://p2p.binance.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://p2p.binance.com/trade/all-payments/USDT?fiat=VND' \
  -H 'sec-ch-ua: "Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36' \
  -H 'x-trace-id: b758918b-d2da-454c-b03e-01b8beafd6bb' \
  -H 'x-ui-request-trace: b758918b-d2da-454c-b03e-01b8beafd6bb' \
  --compressed \
  --data-raw '{"fiat":"VND","page":1,"rows":10,"tradeType":"BUY","asset":"USDT","countries":[],"proMerchantAds":false,"shieldMerchantAds":false,"filterType":"tradable","periods":[],"additionalKycVerifyFilter":1,"publisherType":"merchant","payTypes":[],"classifies":["mass","profession","fiat_trade"],"tradedWith":false,"followed":false,"transAmount":1000000}' \
  | jq '.' > "$OUT"

echo "Saved to $OUT"