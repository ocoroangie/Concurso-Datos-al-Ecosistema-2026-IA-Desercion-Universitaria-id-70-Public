import joblib
import pandas as pd
from pathlib import Path
from .preprocessing import prepare_features
from .model_loader import load_model_info

MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "model.joblib"

def predict(data: dict) -> dict:
    model = joblib.load(MODEL_PATH)
    df = pd.DataFrame([data])
    X = prepare_features(df)
    preds = model.predict(X)
    info = load_model_info()
    labels = info.get("target_labels", [])
    mapped = [labels[p] if labels and p < len(labels) else int(p) for p in preds]
    return {"predictions": mapped}
