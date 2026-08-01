import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os

def load_data(filepath="dataset/customer_churn.csv"):
    """Loads and performs basic cleaning on the dataset."""
    df = pd.read_csv(filepath)
    # Convert TotalCharges to numeric, coerce errors to NaN
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    # Drop rows with NaN TotalCharges
    df.dropna(subset=['TotalCharges'], inplace=True)
    if 'customerID' in df.columns:
        df.drop('customerID', axis=1, inplace=True)
    return df

def preprocess_training_data(df, model_dir="model"):
    """Preprocesses training data, fits encoders and scalers, and saves them."""
    os.makedirs(model_dir, exist_ok=True)
    
    X = df.drop('Churn', axis=1)
    y = df['Churn']
    
    categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
    numerical_cols = X.select_dtypes(exclude=['object']).columns.tolist()
    
    label_encoders = {}
    X_encoded = X.copy()
    
    for col in categorical_cols:
        le = LabelEncoder()
        X_encoded[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le
        
    joblib.dump(label_encoders, os.path.join(model_dir, "label_encoders.pkl"))
    
    scaler = StandardScaler()
    X_scaled = X_encoded.copy()
    X_scaled[numerical_cols] = scaler.fit_transform(X_encoded[numerical_cols])
    joblib.dump(scaler, os.path.join(model_dir, "scaler.pkl"))
    
    y_le = LabelEncoder()
    y_encoded = y_le.fit_transform(y)
    joblib.dump(y_le, os.path.join(model_dir, "target_encoder.pkl"))
    
    return X_scaled, y_encoded, list(X.columns), categorical_cols, numerical_cols

def preprocess_new_data(df, model_dir="model"):
    """Preprocesses new inference data using saved encoders and scalers."""
    label_encoders = joblib.load(os.path.join(model_dir, "label_encoders.pkl"))
    scaler = joblib.load(os.path.join(model_dir, "scaler.pkl"))
    
    X = df.copy()
    if 'customerID' in X.columns:
        X.drop('customerID', axis=1, inplace=True)
        
    if 'Churn' in X.columns:
        X.drop('Churn', axis=1, inplace=True)
        
    if 'TotalCharges' in X.columns:
        X['TotalCharges'] = pd.to_numeric(X['TotalCharges'], errors='coerce')
        # Fill missing inference values with median
        X['TotalCharges'].fillna(X['TotalCharges'].median(), inplace=True)
        
    categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
    numerical_cols = X.select_dtypes(exclude=['object']).columns.tolist()
    
    for col in categorical_cols:
        if col in label_encoders:
            le = label_encoders[col]
            classes = le.classes_
            # Map unseen labels to the most frequent/first class to avoid errors
            X[col] = X[col].apply(lambda x: x if x in classes else classes[0])
            X[col] = le.transform(X[col].astype(str))
            
    # For robust numerical processing if some columns are missing
    for col in numerical_cols:
        if col not in X.columns:
            X[col] = 0
            
    X_scaled = X.copy()
    X_scaled[numerical_cols] = scaler.transform(X[numerical_cols])
    
    return X_scaled
