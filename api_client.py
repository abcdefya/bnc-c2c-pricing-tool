import os
import time
import hmac
import hashlib
import requests
import json
from urllib.parse import urlencode
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
BASE_URL = os.getenv("BASE_URL", "https://api.binance.com")


def get_timestamp():
    return int(time.time() * 1000)


def sign(query_string: str) -> str:
    return hmac.new(
        SECRET_KEY.encode("utf-8"),
        query_string.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()


def send_signed_post(endpoint: str, body: dict):
    timestamp = get_timestamp()
    query_string = f"timestamp={timestamp}"
    signature = sign(query_string)

    url = f"{BASE_URL}{endpoint}?{query_string}&signature={signature}"

    headers = {
        "X-MBX-APIKEY": API_KEY,
        "Content-Type": "application/json",
        "clientType": "WEB"
    }

    # print("URL:", url)
    # print("Body:", json.dumps(body, indent=2))

    resp = requests.post(url, headers=headers, data=json.dumps(body))
    try:
        return resp.json()
    except ValueError:
        return {"error": "invalid_json_response", "status_code": resp.status_code, "text": resp.text}
