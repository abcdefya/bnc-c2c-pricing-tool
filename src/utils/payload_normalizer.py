from box import Box
from typing import Any, Dict, Union

def normalize_payload(
    payload: Union[Box, Dict[str, Any]],
    *,
    drop_empty: bool = True,
    stringify_numbers: bool = True
) -> Dict[str, Any]:
    
    if isinstance(payload, Box):
        data = payload.to_dict()
    else:
        data = dict(payload)

    # --- 2️⃣ Loại bỏ các field rỗng ---
    if drop_empty:
        def clean_dict(d: Dict[str, Any]) -> Dict[str, Any]:
            clean = {}
            for k, v in d.items():
                if isinstance(v, dict):
                    nested = clean_dict(v)
                    if nested:  # chỉ giữ nếu dict con không rỗng
                        clean[k] = nested
                elif v not in [None, "", []]:
                    clean[k] = v
            return clean

        data = clean_dict(data)

    if stringify_numbers:
        def stringify(d: Dict[str, Any]) -> Dict[str, Any]:
            for k, v in d.items():
                if isinstance(v, (int, float)):
                    d[k] = str(v)
                elif isinstance(v, dict):
                    d[k] = stringify(v)
            return d

        data = stringify(data)

    print("Normalized Payload:")
    for k, v in data.items():
        print(f"  {k}: {v}")

    return data
