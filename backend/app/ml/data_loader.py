import json
import pandas as pd
from pathlib import Path
from typing import Any, Dict
from urllib.request import urlopen
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
DATASET_PATH = DATA_DIR / "DATASET_DESERCION_LIMPIO.csv"
SOURCES = [
    {
        "name": "desercion_academica",
        "url": "https://www.datos.gov.co/resource/3iew-7wpx.json",
    },
    {
        "name": "desercion_no_academica_1",
        "url": "https://www.datos.gov.co/resource/fhn9-rk3r.json",
    },
    {
        "name": "desercion_no_academica_2",
        "url": "https://www.datos.gov.co/resource/uxa5-pmvd.json",
    },
]


def load_dataset() -> pd.DataFrame:
    if not DATASET_PATH.exists():
        raise FileNotFoundError(f"Dataset file not found: {DATASET_PATH}")
    return pd.read_csv(DATASET_PATH)


def get_dataset_summary() -> Dict[str, Any]:
    df = load_dataset()
    return {
        "path": str(DATASET_PATH),
        "total_records": int(df.shape[0]),
        "total_variables": int(df.shape[1]),
        "total_programs": int(df["NOMBRE_PROGRAMA"].nunique()) if "NOMBRE_PROGRAMA" in df.columns else 0,
        "columns": df.columns.tolist(),
        "n_unique": {col: int(df[col].nunique()) for col in df.columns},
        "last_update": datetime.fromtimestamp(DATASET_PATH.stat().st_mtime).isoformat(),
    }


def update_dataset() -> Dict[str, Any]:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    summary = {"sources": []}
    for source in SOURCES:
        target_path = RAW_DIR / f"{source['name']}.json"
        with urlopen(source["url"] + "?$limit=5000") as response:
            data = json.loads(response.read().decode("utf-8"))
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        df = pd.json_normalize(data)
        csv_path = RAW_DIR / f"{source['name']}.csv"
        df.to_csv(csv_path, index=False)
        summary["sources"].append({
            "name": source["name"],
            "records": int(df.shape[0]),
            "csv": str(csv_path),
        })
    return summary
