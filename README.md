# ChurnIQ 🚀
**AI-Powered Customer Retention Intelligence Platform**
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-success?style=for-the-badge&logo=streamlit)](https://ayushkumarjha1-customer-churn-prediction-app-axgcxh.streamlit.app/)



ChurnIQ is a premium B2B SaaS application that uses machine learning and explainable AI to identify customers at risk of leaving and turns predictions into actionable retention strategies.

## 🌟 Features
- **Predictive Analytics:** Uses a highly accurate Gradient Boosting model to estimate churn probability.
- **Explainable AI (SHAP):** Understand *why* a customer is at risk with feature importance breakdowns.
- **Customer Intelligence:** Searchable, filterable dashboard of your customer base.
- **Retention Simulator:** Interactive "What If" scenarios to estimate retained revenue after intervention.
- **AI Copilot:** Dedicated assistant for customer health queries and retention strategy generation.

## 🏗️ Architecture
ChurnIQ is built on a modern, decoupled SaaS architecture:
- **Frontend:** Next.js (React), Tailwind CSS, TypeScript.
- **Backend:** FastAPI (Python), SQLAlchemy (SQLite).
- **Machine Learning:** Scikit-Learn, pandas, NumPy, SHAP, Joblib.


## 📸 Project Dashboards & Visualizations

### 1. Main Dashboard
![Dashboard Home](images/dashboard_home.png)

### 2. Dataset Analytics & Insights
![Dataset Analytics 1](images/dashboard_data_1.png)
![Dataset Analytics 2](images/dashboard_data_2.png)
![Dataset Analytics 3](images/dashboard_data_3.png)
![Dataset Analytics 4](images/dashboard_data_4.png)

### 3. Customer Prediction UI
![Prediction Input 1](images/dashboard_predict_1.png)
![Prediction Input 2](images/dashboard_predict_2.png)
![Prediction Result](images/dashboard_predict_result.png)

### 4. Batch Prediction
![Batch Prediction](images/dashboard_batch.png)

### 5. ML Evaluation Metrics
![Feature Importance](images/feature_importance.png)
![ROC Curve](images/roc_curve.png)
![Confusion Matrix](images/confusion_matrix.png)


## 🚀 Getting Started

### 1. Start the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API runs on `http://localhost:8000`

### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
UI runs on `http://localhost:3000`

## 🧠 Machine Learning Pipeline
The ML pipeline uses the IBM Telco dataset. It automatically preprocesses categorical and numerical features, scales them, and scores them using a pre-trained Gradient Boosting Classifier. It integrates SHAP (SHapley Additive exPlanations) to provide local interpretability.

## 🔒 Security
- CORS configured for frontend origins.
- ML models loaded securely via Joblib.
- API keys for Copilot must be injected via `.env`.

---
*Built as a flagship AI SaaS portfolio project.*
