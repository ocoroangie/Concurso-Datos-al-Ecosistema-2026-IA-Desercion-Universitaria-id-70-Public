# CM IA

## Observatorio Inteligente para el Análisis y Predicción de la Deserción Universitaria

**CM IA** es un proyecto desarrollado para el concurso **Datos al Ecosistema 2026 – IA para Colombia**, categoría **Educación – Nivel Intermedio**.

El objetivo es combinar una aplicación web con un backend de análisis para explorar y comprender los patrones de deserción universitaria a partir de datos abiertos.

---

## Estructura del proyecto

- `frontend/` – aplicación web construida con React y Vite.
- `backend/` – API REST desarrollada con FastAPI.
- `.gitignore` – recursos ignorados por git.
- `README.md` – documentación del proyecto.

---

## Tecnologías principales

- React 18
- Vite
- React Router
- FastAPI
- Uvicorn
- Python 3
- Pandas
- Scikit-learn

---

## Cómo ejecutar el proyecto

### 1. Instalar dependencias

```powershell
cd frontend
npm install
```

```powershell
cd ..\backend
pip install -r requirements.txt
```

### 2. Iniciar el frontend

```powershell
cd frontend
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

### 3. Iniciar el backend

```powershell
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Abrir en el navegador:

```text
http://localhost:8000/docs
```

---

## Qué contiene el proyecto

- Interfaz web de consulta y navegación.
- API backend para servir datos y lógica.
- Base para análisis de deserción con Python.
- Soporte para modelos de Machine Learning.

---

## Datos utilizados

El proyecto se basa en datos abiertos de **Datos Abiertos Colombia**.

| Conjunto de datos                       | Enlace                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Deserción Académica Pregrado y Posgrado | https://www.datos.gov.co/dataset/DESERCION-ACADEMICA-PREGRADO-Y-POSGRADO/3iew-7wpx/about_data |
| Deserción No Académica 1-2019           | https://www.datos.gov.co/Educaci-n/Deserci-n-no-acad-mica-1-2019/fhn9-rk3r/about_data         |
| Deserción No Académica 2-2019           | https://www.datos.gov.co/Educaci-n/Deserci-n-no-acad-mica-2-2019/uxa5-pmvd/about_data         |

---

## Objetivo principal

Desarrollar una plataforma capaz de aprovechar datos abiertos y análisis estadístico para apoyar la comprensión de la deserción universitaria y la generación de información útil para la toma de decisiones.

---

## Estado actual

- ✅ Frontend inicial con React y Vite
- ✅ Backend básico con FastAPI
- ✅ Documentación actualizada
- 🚧 En desarrollo: integración completa de datos, análisis y modelos de IA

---

## Notas importantes

- No se debe subir la carpeta `frontend/node_modules` al repositorio.
- Para construir el frontend en producción:

```powershell
cd frontend
npm run build
```

- Para previsualizar el build:

```powershell
npm run preview
```

---

## Próximos pasos sugeridos

- Integrar los datasets en el backend y la aplicación.
- Desarrollar el modelo de Machine Learning para predicción de riesgo.
- Añadir visualizaciones y métricas en la interfaz.
- Incorporar un dashboard interactivo con Power BI o similares.

CM IA constituye una herramienta tecnológica orientada al aprovechamiento de datos abiertos para fortalecer el análisis de la deserción universitaria.

La solución puede servir como apoyo para instituciones de educación superior, investigadores y entidades públicas interesadas en comprender este fenómeno y diseñar estrategias de permanencia estudiantil.

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

## Aplicación Web

Pendiente de despliegue.

## Dashboard Power BI

Incluido en el repositorio.

---

# 👥 Equipo de desarrollo

- **Angie Melissa Ocoro Hurtado cc.1192807085**
- **Juan Camilo López Quintana cc.1118310951**

---

# 📄 Licencia

Proyecto desarrollado para el **Concurso Datos al Ecosistema 2026 – IA para Colombia**.

Uso académico e investigativo.
