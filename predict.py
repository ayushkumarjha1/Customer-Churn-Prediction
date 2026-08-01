import joblib
import pandas as pd
import os
from utils.preprocessing import preprocess_new_data

def predict_single(data_dict, model_dir="model"):
    """Predicts churn for a single customer."""
    df = pd.DataFrame([data_dict])
    X = preprocess_new_data(df, model_dir)
    
    model = joblib.load(os.path.join(model_dir, "churn_model.pkl"))
    target_encoder = joblib.load(os.path.join(model_dir, "target_encoder.pkl"))
    
    prediction = model.predict(X)
    probability = model.predict_proba(X)[0][1]
    
    result = target_encoder.inverse_transform(prediction)[0]
    return result, probability

def predict_batch(df, model_dir="model"):
    """Predicts churn for a batch of customers."""
    X = preprocess_new_data(df, model_dir)
    
    model = joblib.load(os.path.join(model_dir, "churn_model.pkl"))
    target_encoder = joblib.load(os.path.join(model_dir, "target_encoder.pkl"))
    
    predictions = model.predict(X)
    probabilities = model.predict_proba(X)[:, 1]
    
    results = target_encoder.inverse_transform(predictions)
    
    output_df = df.copy()
    output_df['Prediction'] = results
    output_df['Probability'] = probabilities
    
    return output_df
