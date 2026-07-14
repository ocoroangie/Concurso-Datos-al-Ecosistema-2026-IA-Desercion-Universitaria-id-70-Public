import joblib
import json
from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parents[2] / "models"
MODEL_PATH = MODEL_DIR / "model.joblib"
MODEL_INFO_PATH = MODEL_DIR / "model_info.json"


def load_model():
    if not MODEL_PATH.exists():
        return None
    try:
        return joblib.load(MODEL_PATH)
    except Exception:
        return None


def load_model_info():
    if not MODEL_INFO_PATH.exists():
        return {"trained": False}
    try:
        with open(MODEL_INFO_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"trained": False}


def save_model_info(info: dict):
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    with open(MODEL_INFO_PATH, "w", encoding="utf-8") as f:
        json.dump(info, f, ensure_ascii=False, indent=2)
