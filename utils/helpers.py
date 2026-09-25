import os
import urllib.request
import streamlit as st
import pandas as pd

def download_dataset_if_not_exists(filepath="dataset/customer_churn.csv"):
    """Downloads the Telco Customer Churn dataset if it does not exist locally."""
    if not os.path.exists(filepath):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        url = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"
        try:
            with st.spinner('Downloading dataset for the first time...'):
                urllib.request.urlretrieve(url, filepath)
            st.success(f"Dataset downloaded successfully to {filepath}")
        except Exception as e:
            st.error(f"Error downloading dataset: {e}")
            raise e

def load_css(file_name):
    """Loads a custom CSS file into Streamlit."""
    try:
        with open(file_name) as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except FileNotFoundError:
        pass

def create_sample_csv(filepath="dataset/sample_input.csv"):
    """Creates a sample CSV if it doesn't exist for batch testing."""
    if not os.path.exists(filepath):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        data = {
            'gender': ['Female', 'Male'],
            'SeniorCitizen': [0, 0],
            'Partner': ['Yes', 'No'],
            'Dependents': ['No', 'No'],
            'tenure': [1, 34],
            'PhoneService': ['No', 'Yes'],
            'MultipleLines': ['No phone service', 'No'],
            'InternetService': ['DSL', 'DSL'],
            'OnlineSecurity': ['No', 'Yes'],
            'OnlineBackup': ['Yes', 'No'],
            'DeviceProtection': ['No', 'Yes'],
            'TechSupport': ['No', 'No'],
            'StreamingTV': ['No', 'No'],
            'StreamingMovies': ['No', 'No'],
            'Contract': ['Month-to-month', 'One year'],
            'PaperlessBilling': ['Yes', 'No'],
            'PaymentMethod': ['Electronic check', 'Mailed check'],
            'MonthlyCharges': [29.85, 56.95],
            'TotalCharges': [29.85, 1889.5]
        }
        pd.DataFrame(data).to_csv(filepath, index=False)
