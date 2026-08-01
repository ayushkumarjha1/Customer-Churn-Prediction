import streamlit as st
import pandas as pd
import numpy as np
import os
from PIL import Image

from utils.helpers import download_dataset_if_not_exists, load_css, create_sample_csv
from utils.preprocessing import load_data
from utils.visualization import (plot_churn_pie, plot_numerical_distribution, 
                                 plot_categorical_count, plot_correlation_heatmap,
                                 plot_feature_importance, plot_roc_curve_plotly)
from predict import predict_single, predict_batch

st.set_page_config(page_title="Customer Churn Prediction", page_icon="🔮", layout="wide", initial_sidebar_state="expanded")

def main():
    #load_css("assets/style.css")
    
    st.sidebar.title("🔮 Churn Predictor")
    st.sidebar.markdown("---")
    
    app_mode = st.sidebar.radio("Navigation", 
        ["Home", "Dataset Dashboard", "Single Prediction", "Batch Prediction", "Model Performance"])
    
    st.sidebar.markdown("---")
    st.sidebar.info("Developed with ❤️ using Python & Streamlit.")
    
    # Ensure dataset exists
    download_dataset_if_not_exists()
    create_sample_csv()
    
    if app_mode == "Home":
        show_home()
    elif app_mode == "Dataset Dashboard":
        show_dataset_dashboard()
    elif app_mode == "Single Prediction":
        show_single_prediction()
    elif app_mode == "Batch Prediction":
        show_batch_prediction()
    elif app_mode == "Model Performance":
        show_model_performance()

def show_home():
    st.title("Customer Churn Prediction using Machine Learning")
    st.markdown("### Anticipate customer behavior and improve retention.")
    
    st.write("""
    Welcome to the Customer Churn Prediction System. This platform utilizes advanced Machine Learning 
    algorithms to analyze customer data and accurately predict the likelihood of churn.
    
    **Key Features:**
    - 📊 **Interactive Dashboard:** Explore customer demographics, services, and account information.
    - 🎯 **Real-time Prediction:** Input single customer details for immediate risk assessment.
    - 📁 **Batch Processing:** Upload a CSV for bulk predictions and download the results.
    - 📈 **Performance Metrics:** Review the underlying model's accuracy, ROC-AUC, and feature importances.
    """)
    
    try:
        df = load_data()
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Total Customers", f"{len(df):,}")
        col2.metric("Churn Rate", f"{(df['Churn'] == 'Yes').mean() * 100:.1f}%")
        col3.metric("Total Revenue", f"${df['TotalCharges'].sum():,.0f}")
        col4.metric("Avg Monthly Charge", f"${df['MonthlyCharges'].mean():.2f}")
    except Exception as e:
        st.warning("Data not available yet. Please check dataset.")

def show_dataset_dashboard():
    st.title("📊 Dataset Dashboard")
    st.write("Explore the IBM Telco Customer Churn dataset.")
    
    try:
        df = load_data()
        
        st.subheader("Data Overview")
        st.dataframe(df.head())
        
        col1, col2 = st.columns(2)
        with col1:
            st.plotly_chart(plot_churn_pie(df), use_container_width=True)
            st.plotly_chart(plot_numerical_distribution(df, "MonthlyCharges", "Monthly Charges Distribution"), use_container_width=True)
        with col2:
            st.plotly_chart(plot_categorical_count(df, "Contract", "Churn by Contract Type"), use_container_width=True)
            st.plotly_chart(plot_numerical_distribution(df, "tenure", "Tenure Distribution"), use_container_width=True)
            
        st.subheader("Correlation Heatmap")
        st.plotly_chart(plot_correlation_heatmap(df), use_container_width=True)
        
    except Exception as e:
        st.error(f"Error loading dataset: {e}")

def show_single_prediction():
    st.title("🎯 Single Customer Prediction")
    st.write("Enter customer details below to predict their likelihood of churning.")
    
    if not os.path.exists("model/churn_model.pkl"):
        st.warning("Model not found. Please run `python train_model.py` first.")
        return
        
    with st.form("prediction_form"):
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.markdown("### Demographics")
            gender = st.selectbox("Gender", ["Female", "Male"])
            senior = st.selectbox("Senior Citizen", [0, 1])
            partner = st.selectbox("Partner", ["Yes", "No"])
            dependents = st.selectbox("Dependents", ["Yes", "No"])
            
        with col2:
            st.markdown("### Services")
            phone = st.selectbox("Phone Service", ["Yes", "No"])
            multiple = st.selectbox("Multiple Lines", ["Yes", "No", "No phone service"])
            internet = st.selectbox("Internet Service", ["DSL", "Fiber optic", "No"])
            security = st.selectbox("Online Security", ["Yes", "No", "No internet service"])
            backup = st.selectbox("Online Backup", ["Yes", "No", "No internet service"])
            protection = st.selectbox("Device Protection", ["Yes", "No", "No internet service"])
            support = st.selectbox("Tech Support", ["Yes", "No", "No internet service"])
            tv = st.selectbox("Streaming TV", ["Yes", "No", "No internet service"])
            movies = st.selectbox("Streaming Movies", ["Yes", "No", "No internet service"])
            
        with col3:
            st.markdown("### Account")
            tenure = st.number_input("Tenure (months)", min_value=0, max_value=100, value=1)
            contract = st.selectbox("Contract", ["Month-to-month", "One year", "Two year"])
            paperless = st.selectbox("Paperless Billing", ["Yes", "No"])
            payment = st.selectbox("Payment Method", ["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"])
            monthly = st.number_input("Monthly Charges ($)", min_value=0.0, value=50.0)
            total = st.number_input("Total Charges ($)", min_value=0.0, value=50.0)
            
        submit = st.form_submit_button("Predict Churn")
        
    if submit:
        data = {
            'gender': gender, 'SeniorCitizen': senior, 'Partner': partner, 'Dependents': dependents,
            'tenure': tenure, 'PhoneService': phone, 'MultipleLines': multiple, 'InternetService': internet,
            'OnlineSecurity': security, 'OnlineBackup': backup, 'DeviceProtection': protection, 'TechSupport': support,
            'StreamingTV': tv, 'StreamingMovies': movies, 'Contract': contract, 'PaperlessBilling': paperless,
            'PaymentMethod': payment, 'MonthlyCharges': monthly, 'TotalCharges': total
        }
        
        with st.spinner("Analyzing profile..."):
            try:
                prediction, probability = predict_single(data)
                
                st.markdown("---")
                st.subheader("Prediction Result")
                
                col1, col2, col3 = st.columns(3)
                
                if prediction == "Yes":
                    col1.markdown(f"""
                    <div class="prediction-card-churn">
                        <h2>⚠️ High Risk</h2>
                        <p>Customer is likely to CHURN</p>
                    </div>
                    """, unsafe_allow_html=True)
                    action = "Offer immediate discount or personalized retention plan."
                else:
                    col1.markdown(f"""
                    <div class="prediction-card-stay">
                        <h2>✅ Low Risk</h2>
                        <p>Customer will likely STAY</p>
                    </div>
                    """, unsafe_allow_html=True)
                    action = "Maintain regular engagement. Upsell opportunities exist."
                
                col2.metric("Churn Probability", f"{probability*100:.1f}%")
                col3.metric("Risk Score", f"{int(probability*100)}/100")
                
                st.info(f"💡 **Suggested Action:** {action}")
                
            except Exception as e:
                st.error(f"Prediction error: {e}")

def show_batch_prediction():
    st.title("📁 Batch Prediction")
    st.write("Upload a CSV file containing multiple customer records to predict churn in bulk.")
    
    if not os.path.exists("model/churn_model.pkl"):
        st.warning("Model not found. Please run `python train_model.py` first.")
        return
        
    st.download_button(
        "Download Sample Template",
        data=open("dataset/sample_input.csv", "rb"),
        file_name="sample_input.csv",
        mime="text/csv"
    )
    
    uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
    
    if uploaded_file is not None:
        try:
            df = pd.read_csv(uploaded_file)
            st.write("Preview of uploaded data:")
            st.dataframe(df.head())
            
            if st.button("Run Batch Prediction"):
                with st.spinner("Processing records..."):
                    results_df = predict_batch(df)
                    
                    st.success("Predictions completed successfully!")
                    
                    col1, col2, col3 = st.columns(3)
                    total = len(results_df)
                    churned = (results_df['Prediction'] == 'Yes').sum()
                    
                    col1.metric("Total Predictions", total)
                    col2.metric("Predicted to Churn", churned)
                    col3.metric("Retention Rate", f"{((total-churned)/total)*100:.1f}%")
                    
                    st.subheader("Prediction Results")
                    st.dataframe(results_df)
                    
                    csv = results_df.to_csv(index=False)
                    st.download_button(
                        "Download Prediction Results",
                        data=csv,
                        file_name="churn_predictions.csv",
                        mime="text/csv"
                    )
        except Exception as e:
            st.error(f"Error processing file: {e}")

def show_model_performance():
    st.title("📈 Model Performance")
    
    if not os.path.exists("model/model_performance.csv"):
        st.warning("Performance metrics not found. Please run `python train_model.py` to train and evaluate models.")
        return
        
    perf_df = pd.read_csv("model/model_performance.csv")
    best_model_row = perf_df.loc[perf_df['ROC-AUC'].idxmax()]
    
    st.markdown("### Best Model Metrics")
    col1, col2, col3, col4, col5 = st.columns(5)
    col1.metric("Algorithm", best_model_row['Model'])
    col2.metric("Accuracy", f"{best_model_row['Accuracy']:.4f}")
    col3.metric("Precision", f"{best_model_row['Precision']:.4f}")
    col4.metric("Recall", f"{best_model_row['Recall']:.4f}")
    col5.metric("ROC-AUC", f"{best_model_row['ROC-AUC']:.4f}")
    
    st.markdown("---")
    st.subheader("Algorithm Comparison")
    st.dataframe(perf_df.style.highlight_max(subset=['Accuracy', 'ROC-AUC'], color='lightgreen'))
    
    st.markdown("---")
    st.subheader("Evaluation Plots")
    
    col1, col2 = st.columns(2)
    with col1:
        if os.path.exists("images/confusion_matrix.png"):
            st.image("images/confusion_matrix.png", caption="Confusion Matrix")
    with col2:
        if os.path.exists("images/roc_curve.png"):
            st.image("images/roc_curve.png", caption="ROC Curve")
            
    if os.path.exists("images/feature_importance.png"):
        st.subheader("Feature Importance")
        st.image("images/feature_importance.png", caption="Feature Importance", use_column_width=True)

if __name__ == "__main__":
    main()
