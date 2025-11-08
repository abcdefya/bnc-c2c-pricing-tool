import os
import time
import hmac
import hashlib
import requests
import json
from urllib.parse import urlencode
from typing import Dict, Any, Optional
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass
class BinanceConfig:
    api_key: str
    secret_key: str
    base_url: str = "https://api.binance.com"


class BinanceClient:
    def __init__(self, config: BinanceConfig):
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json;charset=utf-8",
            "X-MBX-APIKEY": config.api_key,
            "clientType": "WEB"
        })
        self.secret = config.secret_key
        self.base_url = config.base_url

    @staticmethod
    def _timestamp() -> int:
        return int(time.time() * 1000)

    def _sign(self, payload: Dict[str, Any]) -> str:
        query_string = urlencode(payload)
        return hmac.new(
            self.secret.encode("utf-8"),
            query_string.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

    def _dispatch(self, method: str):
        return {
            "GET": self.session.get,
            "POST": self.session.post,
            "PUT": self.session.put,
            "DELETE": self.session.delete
        }.get(method.upper(), self.session.get)

    def request(self, method: str, path: str, data: Optional[Dict[str, Any]] = None,
                params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Tổng quát hoá mọi request signed tới SAPI"""
        if params is None:
            params = {}
        params["timestamp"] = self._timestamp()
        signature = self._sign(params)
        url = f"{self.base_url}{path}?{urlencode(params)}&signature={signature}"

        dispatch = self._dispatch(method)
        try:
            res = dispatch(url=url, data=json.dumps(data or {}))
            return res.json()
        except Exception as e:
            return {"error": str(e), "status": getattr(e, "status_code", None)}
