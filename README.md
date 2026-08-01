# Customer Churn Prediction System 🔮

![Python](https://img.shields.io/badge/Python-3.12%2B-blue)
![Streamlit](https://img.shields.io/badge/Streamlit-1.31.0-FF4B4B)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4.0-F7931E)
![License](https://img.shields.io/badge/License-MIT-green)

A complete, production-ready Machine Learning system to predict customer churn using the IBM Telco Customer Churn dataset. Built with Python, Scikit-Learn, and a modern Streamlit dashboard.

## 🌟 Features

- **Automated ML Pipeline:** End-to-end data preprocessing, scaling, and encoding.
- **Model Comparison:** Automatically trains and compares Logistic Regression, Random Forest, SVM, Gradient Boosting, etc., selecting the best model based on ROC-AUC.
- **Interactive Dashboard:** Beautiful, responsive Streamlit UI with custom CSS.
- **Data Exploration:** Rich Plotly visualizations for exploratory data analysis (EDA).
- **Real-time Predictions:** Input customer data via form for instant risk assessment.
- **Batch Processing:** Upload CSV files to predict churn for multiple customers at once.

## 🚀 Installation

1. **Clone the repository** (if on GitHub):
   ```bash
   git clone https://github.com/yourusername/Customer-Churn-Prediction.git
   cd Customer-Churn-Prediction
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## 🧠 Usage

1. **Train the Model:**
   This will download the dataset automatically (if missing), preprocess it, train 6 different ML algorithms, evaluate them, save the best one, and generate evaluation plots.
   ```bash
   python train_model.py
   ```

2. **Launch the Dashboard:**
   Start the interactive Streamlit application.
   ```bash
   streamlit run app.py
   ```

## 📸 Dashboard Screenshots

### 1. Home & Overview
The landing page provides an immediate overview of the dataset. It features key metrics (Total Customers, Churn Rate, Total Revenue) ensuring business stakeholders can quickly digest the current state of customer retention.
![Home Dashboard](images/dashboard_home.png)

### 2. Dataset Dashboard & EDA
A deep dive into the dataset directly within the application. It includes a raw data overview alongside interactive Plotly visualizations (Pie Charts, Bar Charts, and a comprehensive Correlation Heatmap) to uncover hidden patterns in customer behavior before running any predictions.
![Dataset Overview](images/dashboard_data_1.png)
![Dataset Distributions](images/dashboard_data_2.png)
![Correlation Heatmap](images/dashboard_data_3.png)

### 3. Single Customer Prediction Form
An intuitive, comprehensive input form categorized into Demographics, Services, and Account Details. This allows support agents to input a specific customer's profile in real-time.
![Prediction Input 1](images/dashboard_predict_1.png)
![Prediction Input 2](images/dashboard_predict_2.png)

After submission, the system evaluates the profile using the Gradient Boosting model and outputs a clear Risk Score, Probability, and tailored Business Actions to help retain the customer.
![Prediction Result](images/dashboard_predict_result.png)

### 4. Batch Processing via CSV Upload
For large-scale evaluations, users can upload entire datasets. The system processes thousands of records in seconds and outputs a downloadable CSV with predictions attached, alongside an instant retention summary.
![Batch Prediction](images/dashboard_batch.png)

---

## 📊 Model Performance Highlights

Here are the evaluation plots generated automatically by our best-performing model (Gradient Boosting):

### 1. Feature Importance
This chart reveals the most critical factors influencing whether a customer will churn or stay.
![Feature Importance](images/feature_importance.png)

### 2. Receiver Operating Characteristic (ROC) Curve
Demonstrates the high predictive accuracy (AUC) of the chosen model.
![ROC Curve](images/roc_curve.png)

### 3. Confusion Matrix
Visual breakdown of the model's True Positives, True Negatives, False Positives, and False Negatives.
![Confusion Matrix](images/confusion_matrix.png)

## 📁 Project Structure

```
Customer-Churn-Prediction/
├── app.py                 # Streamlit main application
├── train_model.py         # ML training pipeline script
├── predict.py             # Inference logic for single/batch
├── requirements.txt       # Project dependencies
├── utils/                 # Helper modules
│   ├── preprocessing.py   # Data cleaning and encoding
│   ├── visualization.py   # Plotly chart generators
│   └── helpers.py         # CSS loading, dataset downloader
├── model/                 # Saved models and encoders
├── dataset/               # CSV datasets
├── images/                # Generated performance plots
└── assets/                # UI assets (CSS, logo)
```

## ☁️ Deployment

### Streamlit Community Cloud
1. Push this repository to GitHub.
2. Go to [share.streamlit.io](https://share.streamlit.io).
3. Click "New app", select your repository, branch, and set the main file path to `app.py`.
4. Click "Deploy".

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

