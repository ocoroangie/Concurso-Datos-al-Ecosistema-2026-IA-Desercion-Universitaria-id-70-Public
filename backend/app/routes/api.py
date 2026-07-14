from fastapi import APIRouter, HTTPException
from app.ml.data_loader import get_dataset_summary, load_dataset, update_dataset
from app.ml.training import train_model
from app.ml.model_loader import load_model, load_model_info
from app.ml.predict import predict
from app.ml.metrics import compute_metrics
from app.ml.feature_importance import get_feature_importance
from app.ml.data_analysis import get_exploration_data, get_eda_data, get_insights, get_report_data

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    try:
        summary = get_dataset_summary()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Dataset not available")

    model = load_model()
    model_info = load_model_info()
    return {
        "total_records": summary["total_records"],
        "total_datasets": 1,
        "total_variables": summary["total_variables"],
        "model": "trained" if model is not None else "not trained",
        "last_update": summary.get("last_update"),
        "columns": summary["columns"],
        "model_status": model_info,
    }


@router.get("/statistics")
def get_statistics():
    try:
        summary = get_dataset_summary()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Dataset not available")

    return {
        "status": "ok",
        "statistics": {
            "total_records": summary["total_records"],
            "total_variables": summary["total_variables"],
            "unique_values": summary["n_unique"],
        },
    }


@router.get("/features")
def get_features():
    try:
        summary = get_dataset_summary()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Dataset not available")

    return {"features": summary["columns"]}


@router.get("/model")
def get_model():
    model_info = load_model_info()
    return {
        "model": "random_forest",
        "trained": model_info.get("trained", False),
        "feature_names": model_info.get("feature_names", []),
        "target_labels": model_info.get("target_labels", []),
        "metrics": model_info.get("metrics", {}),
        "record_count": model_info.get("record_count", 0),
    }


@router.post("/model/train")
def train_model_route(target_col: str = "NOMBRE_ESTADO"):
    try:
        df = load_dataset()
        result = train_model(df, target_col=target_col)
        return result
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Dataset not available")
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.post("/model/predict")
def predict_model(payload: dict):
    try:
        result = predict(payload)
        return result
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Model not available")
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get("/model/metrics")
def model_metrics():
    model_info = load_model_info()
    return {"metrics": model_info.get("metrics", {})}


@router.get("/feature-importance")
def feature_importance():
    try:
        values = get_feature_importance()
        return {"feature_importance": values}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/insights")
def insights():
    try:
        return get_insights()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/exploration")
def exploration():
    try:
        return get_exploration_data()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/eda")
def eda():
    try:
        return get_eda_data()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/report")
def get_report():
    try:
        return get_report_data()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/update-data")
def update_data():
    try:
        return update_dataset()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
