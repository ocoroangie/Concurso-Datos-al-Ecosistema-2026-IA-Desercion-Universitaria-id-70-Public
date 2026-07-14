import pandas as pd
from pathlib import Path
from datetime import datetime
from .data_loader import load_dataset, DATASET_PATH
from .model_loader import load_model, load_model_info


def _top_values(df: pd.Series, top_n=5):
    if df.empty:
        return []
    return [
        {"value": int(v), "name": str(k)}
        for k, v in df.value_counts(dropna=False).head(top_n).items()
    ]


def get_exploration_data():
    df = load_dataset()
    categorical_columns = df.select_dtypes(include=["object", "category"]).columns.tolist()
    numeric_columns = df.select_dtypes(include=["number"]).columns.tolist()
    missing = df.isna().sum()
    duplicates = int(df.duplicated().sum())

    return {
        "summary": {
            "total_records": int(df.shape[0]),
            "total_columns": int(df.shape[1]),
            "categorical_variables": len(categorical_columns),
            "numeric_variables": len(numeric_columns),
            "missing_values": int(missing.sum()),
            "duplicates": duplicates,
            "last_update": datetime.fromtimestamp(DATASET_PATH.stat().st_mtime).isoformat(),
        },
        "columns": df.columns.tolist(),
        "types": df.dtypes.astype(str).to_dict(),
        "missing_by_column": missing.fillna(0).astype(int).to_dict(),
        "top_programs": _top_values(df["NOMBRE_PROGRAMA"] if "NOMBRE_PROGRAMA" in df else pd.Series([], dtype="object")),
        "top_faculties": _top_values(df["NOMBRE_FACULTAD"] if "NOMBRE_FACULTAD" in df else pd.Series([], dtype="object")),
        "top_sedes": _top_values(df["NOMBRE_SEDE"] if "NOMBRE_SEDE" in df else pd.Series([], dtype="object")),
        "gender_distribution": _top_values(df["GENERO"] if "GENERO" in df else pd.Series([], dtype="object")),
        "faculty_distribution": _top_values(df["NOMBRE_FACULTAD"] if "NOMBRE_FACULTAD" in df else pd.Series([], dtype="object")),
        "program_distribution": _top_values(df["NOMBRE_PROGRAMA"] if "NOMBRE_PROGRAMA" in df else pd.Series([], dtype="object")),
        "modalidad_distribution": _top_values(df["MODALIDAD"] if "MODALIDAD" in df else pd.Series([], dtype="object")),
        "estrato_distribution": _top_values(df["ESTRATO"] if "ESTRATO" in df else pd.Series([], dtype="object")),
        "sample_rows": df.head(10).fillna("—").to_dict(orient="records"),
    }


def get_eda_data():
    df = load_dataset()
    numeric_columns = df.select_dtypes(include=["number"]).columns.tolist()
    categorical_columns = df.select_dtypes(include=["object", "category"]).columns.tolist()
    missing = df.isna().sum()

    freq = {col: _top_values(df[col]) for col in categorical_columns if col in df.columns}
    stats = df[numeric_columns].describe().fillna(0).to_dict() if numeric_columns else {}

    return {
        "total_records": int(df.shape[0]),
        "missing_values": missing.to_dict(),
        "numeric_columns": numeric_columns,
        "categorical_columns": categorical_columns,
        "top_programs": _top_values(df["NOMBRE_PROGRAMA"] if "NOMBRE_PROGRAMA" in df else pd.Series([], dtype="object"), top_n=7),
        "top_faculties": _top_values(df["NOMBRE_FACULTAD"] if "NOMBRE_FACULTAD" in df else pd.Series([], dtype="object"), top_n=7),
        "top_sedes": _top_values(df["NOMBRE_SEDE"] if "NOMBRE_SEDE" in df else pd.Series([], dtype="object"), top_n=7),
        "frequency": freq,
        "numeric_stats": stats,
        "distribution_columns": {
            "GENERO": _top_values(df["GENERO"] if "GENERO" in df else pd.Series([], dtype="object")),
            "MODALIDAD": _top_values(df["MODALIDAD"] if "MODALIDAD" in df else pd.Series([], dtype="object")),
            "JORNADA": _top_values(df["JORNADA"] if "JORNADA" in df else pd.Series([], dtype="object")),
        },
    }


def get_insights():
    df = load_dataset()
    top_program = df["NOMBRE_PROGRAMA"].mode().iloc[0] if "NOMBRE_PROGRAMA" in df and not df["NOMBRE_PROGRAMA"].mode().empty else "N/A"
    top_faculty = df["NOMBRE_FACULTAD"].mode().iloc[0] if "NOMBRE_FACULTAD" in df and not df["NOMBRE_FACULTAD"].mode().empty else "N/A"
    top_modality = df["MODALIDAD"].mode().iloc[0] if "MODALIDAD" in df and not df["MODALIDAD"].mode().empty else "N/A"
    top_origin = df["ORIGEN_GEOGRAFICO"].mode().iloc[0] if "ORIGEN_GEOGRAFICO" in df and not df["ORIGEN_GEOGRAFICO"].mode().empty else "N/A"
    gender_counts = df["GENERO"].value_counts(normalize=True).mul(100).round(1) if "GENERO" in df else pd.Series()
    gender_insight = (
        f"El género con mayor representación es {gender_counts.idxmax()} con {gender_counts.max()}% de los registros." if not gender_counts.empty else "No hay datos de género disponibles."
    )
    model_info = load_model_info()
    model_status = "entrenado" if model_info.get("trained") else "pendiente"

    return {
        "insights": [
            {
                "title": "Concentración por programa",
                "description": f"El programa con mayor número de registros es {top_program}."
            },
            {
                "title": "Facultad con mayor volumen",
                "description": f"La facultad con más registros es {top_faculty}."
            },
            {
                "title": "Modalidad predominante",
                "description": f"La modalidad con mayor incidencia es {top_modality}."
            },
            {
                "title": "Origen geográfico más frecuente",
                "description": f"El origen geográfico más frecuente es {top_origin}."
            },
            {
                "title": "Distribución de género",
                "description": gender_insight,
            },
            {
                "title": "Estado del modelo",
                "description": f"El estado actual del modelo es {model_status}.",
            },
        ]
    }


def get_report_data():
    df = load_dataset()
    model_info = load_model_info()
    summary = get_exploration_data()["summary"]
    return {
        "summary": summary,
        "kpis": {
            "total_records": summary["total_records"],
            "total_columns": summary["total_columns"],
            "duplicates": summary["duplicates"],
            "missing_values": summary["missing_values"],
        },
        "findings": [
            {"title": "Top programa", "value": df["NOMBRE_PROGRAMA"].mode().iloc[0] if "NOMBRE_PROGRAMA" in df else "N/A"},
            {"title": "Top facultad", "value": df["NOMBRE_FACULTAD"].mode().iloc[0] if "NOMBRE_FACULTAD" in df else "N/A"},
            {"title": "Top modalidad", "value": df["MODALIDAD"].mode().iloc[0] if "MODALIDAD" in df else "N/A"},
        ],
        "model": model_info,
    }
