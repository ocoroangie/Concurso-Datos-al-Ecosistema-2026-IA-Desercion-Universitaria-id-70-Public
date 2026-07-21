from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.api import router as api_router

app = FastAPI(
    title="EduPredict IA API",
    version="0.1.0",
    description="API base para futuras funcionalidades de predicción educativa",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "message": "EduPredict IA Backend funcionando"}


@app.get("/api")
def api_root():
    return {"status": "ok", "message": "API root"}


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Backend listo para expandirse"}