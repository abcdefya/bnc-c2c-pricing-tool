from typing import Dict, Any, Optional
# inside ads_service.py
from src.utils.binance_client import BinanceClient
from copy import deepcopy
from configs.sapi_configs import UPDATE_AD_PARAMS
from src.utils.payload_normalizer import *
from box import Box

class C2CAdsService:
    def __init__(self, client: BinanceClient):
        self.client = client

    def update_ad(self, payload: Box):

        endpoint = "/sapi/v1/c2c/ads/update"
    
        normalized = normalize_payload(payload)

        result = self.client.request("POST", endpoint, data=normalized)
        return result

    def get_ads_list(
        self,
        page: int = 1,
        rows: int = 20,
        asset: str = "USDT",
        fiat_unit: str = "VND",
        trade_type: Optional[str] = None,
        adv_status: Optional[int] = None
    ) -> Dict[str, Any]:
        endpoint = "/sapi/v1/c2c/ads/listWithPagination"

        body = {
            "page": str(page),
            "rows": str(rows),
            "asset": asset,
            "fiatUnit": fiat_unit,
        }

        if trade_type:
            body["tradeType"] = trade_type
        if adv_status is not None:
            body["advStatus"] = adv_status

        result = self.client.request("POST", endpoint, data=body)
        return result
