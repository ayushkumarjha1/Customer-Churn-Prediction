import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, roc_curve, confusion_matrix

from utils.preprocessing import load_data, preprocess_training_data

def train_and_evaluate():
    print("Loading data...")
    try:
        df = load_data("dataset/customer_churn.csv")
    except FileNotFoundError:
        print("Dataset not found. Please place 'customer_churn.csv' in the 'dataset' directory.")
        return

    print("Preprocessing data...")
    X, y, feature_names, _, _ = preprocess_training_data(df, "model")
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Decision Tree": DecisionTreeClassifier(random_state=42),
        "Random Forest": RandomForestClassifier(random_state=42),
        "Gradient Boosting": GradientBoostingClassifier(random_state=42),
        "Support Vector Machine": SVC(probability=True, random_state=42),
        "K-Nearest Neighbours": KNeighborsClassifier()
    }
    
    results = []
    best_model = None
    best_roc_auc = 0
    best_model_name = ""
    
    os.makedirs("images", exist_ok=True)
    
    print("Training models...")
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]
        
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred)
        rec = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc = roc_auc_score(y_test, y_prob)
        
        results.append({
            "Model": name,
            "Accuracy": acc,
            "Precision": prec,
            "Recall": rec,
            "F1 Score": f1,
            "ROC-AUC": roc
        })
        
        if roc > best_roc_auc:
            best_roc_auc = roc
            best_model = model
            best_model_name = name

    print(f"\nBest Model: {best_model_name} with ROC-AUC: {best_roc_auc:.4f}")
    
    # Save best model
    joblib.dump(best_model, "model/churn_model.pkl")
    
    # Save results
    results_df = pd.DataFrame(results)
    results_df.to_csv("model/model_performance.csv", index=False)
    
    # Evaluate best model and plot
    y_pred_best = best_model.predict(X_test)
    y_prob_best = best_model.predict_proba(X_test)[:, 1]
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred_best)
    plt.figure(figsize=(8,6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title(f'Confusion Matrix - {best_model_name}')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('images/confusion_matrix.png')
    plt.close()
    
    # ROC Curve
    fpr, tpr, _ = roc_curve(y_test, y_prob_best)
    plt.figure(figsize=(8,6))
    plt.plot(fpr, tpr, label=f'{best_model_name} (AUC = {best_roc_auc:.4f})')
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.legend()
    plt.savefig('images/roc_curve.png')
    plt.close()
    
    # Feature Importance (if applicable)
    if hasattr(best_model, 'feature_importances_'):
        importances = best_model.feature_importances_
        indices = np.argsort(importances)[::-1]
        
        plt.figure(figsize=(10,8))
        plt.title("Feature Importances")
        plt.bar(range(X.shape[1]), importances[indices], align="center")
        plt.xticks(range(X.shape[1]), np.array(feature_names)[indices], rotation=90)
        plt.tight_layout()
        plt.savefig('images/feature_importance.png')
        plt.close()
        
        # Save feature importance data for Streamlit
        fi_df = pd.DataFrame({
            'Feature': np.array(feature_names)[indices],
            'Importance': importances[indices]
        })
        fi_df.to_csv("model/feature_importance.csv", index=False)

    print("Training complete. Model and plots saved.")

if __name__ == "__main__":
    train_and_evaluate()
