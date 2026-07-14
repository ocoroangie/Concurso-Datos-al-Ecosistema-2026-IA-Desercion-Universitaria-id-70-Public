from pathlib import Path
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import pandas as pd
from .preprocessing import prepare_features
from .metrics import compute_metrics
from .model_loader import save_model_info

MODEL_DIR = Path(__file__).resolve().parents[2] / "models"
MODEL_PATH = MODEL_DIR / "model.joblib"


def train_model(df: pd.DataFrame, target_col: str = "NOMBRE_ESTADO") -> dict:
    if target_col not in df.columns:
        raise ValueError(f"target column '{target_col}' not found in dataset")

    y = df[target_col].copy()
    X = df.drop(columns=[target_col])
    X = prepare_features(X)
    y_encoded, target_labels = pd.factorize(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42
    )
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    y_pred = model.predict(X_test)
    metrics = compute_metrics(y_test, y_pred)
    model_info = {
        "trained": True,
        "model_name": "RandomForestClassifier",
        "target_col": target_col,
        "feature_names": X.columns.tolist(),
        "target_labels": [str(label) for label in target_labels.tolist()],
        "record_count": int(df.shape[0]),
        "metrics": metrics,
    }
    save_model_info(model_info)
    return {"status": "trained", "model_path": str(MODEL_PATH), "metrics": metrics}
