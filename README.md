# CM IA

## Observatorio Inteligente para el Análisis y Predicción de la Deserción Universitaria

**CM IA** es un proyecto para el concurso **Datos al Ecosistema 2026 – IA para Colombia**, categoría **Educación – Nivel Intermedio**.

Se trata de una aplicación web que consume un backend en FastAPI para explorar datos de deserción universitaria, generar visualizaciones y entrenar un modelo de Machine Learning.

---

## Estado actual

- ✅ Frontend desplegado en Vercel
- ✅ Backend desplegado en Render
- ✅ Conexión entre frontend y backend con `VITE_API_URL`
- ✅ Páginas disponibles: Observatorio, Machine Learning, EDA, Exploración, Insights y Reportes
- 🚧 En desarrollo: mejoras de UX, validación de inputs y ampliación de análisis estadísticos

---

## Enlaces de despliegue

- Frontend (Vercel): https://concurso-datos-al-ecosistema-2026-i-murex.vercel.app/
- Backend (Render): https://concurso-datos-al-ecosistema-2026-ia.onrender.com/

---

## Estructura del proyecto

- `frontend/` – aplicación web con React, Vite y Recharts.
- `backend/` – API FastAPI para datos, análisis y Machine Learning.
- `backend/app/ml/` – lógica de carga de datos, preprocesamiento, entrenamiento y métricas.
- `frontend/src/services/api.js` – configuración de Axios y URL base.
- `frontend/src/pages/` – páginas de interfaz del usuario.
- `backend/models/` – modelos guardados y metadata.
- `backend/data/` – dataset limpio usado por el backend.

---

## Tecnologías usadas

- Frontend: React 18, Vite, React Router, Recharts, MUI
- Backend: FastAPI, Uvicorn, pandas, scikit-learn, joblib
- Despliegue: Vercel (frontend), Render (backend)

---

## API pública disponible

El backend expone los siguientes endpoints bajo `/api`:

- `GET /api/health` – estado del backend
- `GET /api/dashboard` – resumen del dataset y estado del modelo
- `GET /api/eda` – datos de análisis exploratorio
- `GET /api/exploration` – datos para exploración y tabla de muestra
- `GET /api/insights` – hallazgos automáticos
- `GET /api/report` – reportes ejecutivos
- `GET /api/model` – estado del modelo entrenado
- `POST /api/model/train` – entrena el modelo de Random Forest
- `GET /api/feature-importance` – importancia de variables
- `POST /api/model/predict` – predicción con el modelo entrenado
- `GET /api/features` – lista de columnas/features del dataset
- `GET /api/statistics` – estadísticas básicas del dataset
- `POST /api/update-data` – recarga/actualiza dataset (si se implementa)

---

## Cómo ejecutar localmente

### Backend

```powershell
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Endpoints locales:

- `http://localhost:8000/api/health`
- `http://localhost:8000/api/dashboard`

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Abrir en el navegador:

- `http://localhost:5173`

### Variable de entorno para producción

En Vercel, agrega esta variable para el frontend:

- `VITE_API_URL=https://concurso-datos-al-ecosistema-2026-ia.onrender.com/api`

Esto hace que el frontend en producción apunte al backend en Render.

---

## Qué hace cada módulo

### Frontend
- `HomePage` – portada de la aplicación.
- `Observatorio` – panel principal con KPIs y visualizaciones.
- `MachineLearning` – muestra el estado del modelo y permite entrenarlo.
- `Eda` – análisis exploratorio del dataset.
- `Exploracion` – vista de tabla y distribución de variables.
- `Insights` – hallazgos automáticos.
- `Reportes` – reportes ejecutivos y resúmenes.
- `Acerca` – información del proyecto.

### Backend
- `backend/app/main.py` – inicia FastAPI y configura CORS.
- `backend/app/routes/api.py` – define todos los endpoints de la API.
- `backend/app/ml/data_loader.py` – carga el CSV y resume datos.
- `backend/app/ml/preprocessing.py` – procesa datos antes de entrenar.
- `backend/app/ml/training.py` – entrena el modelo RandomForest y guarda resultados.
- `backend/app/ml/model_loader.py` – carga modelo e información guardada.
- `backend/app/ml/metrics.py` – calcula métricas de rendimiento.
- `backend/app/ml/data_analysis.py` – genera datos para exploración, EDA e insights.
- `backend/app/ml/feature_importance.py` – extrae importancia de variables.
- `backend/app/ml/predict.py` – predice usando el modelo entrenado.

---

## Datos utilizados

El proyecto usa un dataset limpio llamado `DATASET_DESERCION_LIMPIO.csv` ubicado en `backend/data/`.

---

## Notas importantes

- No subas `frontend/node_modules` ni `.venv` al repositorio.
- En producción, el frontend debe usar `VITE_API_URL` para conectar con el backend remoto.
- Si el frontend carga sin datos, revisa la consola de red y verifica que las llamadas vayan a Render.

---

## Equipo

- **Angie Melissa Ocoro Hurtado**
- **Juan Camilo López Quintana**

---

# 📁 Estructura del proyecto

```text
CM-IA/

frontend/

backend/

data/

docs/

powerbi/

recursos/

README.md
```

---

# 🔗 Enlaces

## Repositorio

https://github.com/melissa992/Concurso-Datos-al-Ecosistema-2026-IA-Desercion-Universitaria-id-70

## Aplicación Web Vercel

https://concurso-datos-al-ecosistema-2026-i-murex.vercel.app/

## Backend Render

https://concurso-datos-al-ecosistema-2026-ia.onrender.com/

## Dashboard Power BI

Incluido en el repositorio.

---

# 👥 Equipo de desarrollo

- **Angie Melissa Ocoro Hurtado cc.1192807085**
- **Juan Camilo López Quintana cc.1118310951**

---

## Licencia

Proyecto desarrollado para el **Concurso Datos al Ecosistema 2026 – IA para Colombia**.
Uso académico e investigativo.
