import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def plot_churn_pie(df):
    """Generates a pie chart of churn distribution."""
    churn_counts = df['Churn'].value_counts().reset_index()
    churn_counts.columns = ['Churn', 'Count']
    fig = px.pie(churn_counts, values='Count', names='Churn', 
                 title='Customer Churn Distribution', hole=0.4,
                 color='Churn', color_discrete_map={'Yes': '#ef553b', 'No': '#00cc96'})
    return fig

def plot_numerical_distribution(df, column, title):
    """Generates a histogram for numerical columns."""
    fig = px.histogram(df, x=column, color="Churn", marginal="box",
                       title=title, barmode="overlay",
                       color_discrete_map={'Yes': '#ef553b', 'No': '#00cc96'})
    return fig

def plot_categorical_count(df, column, title):
    """Generates a count plot for categorical columns."""
    fig = px.histogram(df, x=column, color="Churn", barmode="group",
                       title=title, color_discrete_map={'Yes': '#ef553b', 'No': '#00cc96'})
    return fig

def plot_correlation_heatmap(df):
    """Generates a correlation heatmap of numerical features."""
    # Map binary churn for correlation
    df_corr = df.copy()
    df_corr['Churn'] = df_corr['Churn'].map({'Yes': 1, 'No': 0})
    corr = df_corr.select_dtypes(include=[np.number]).corr()
    
    fig = px.imshow(corr, text_auto=True, aspect="auto", 
                    color_continuous_scale='RdBu_r', 
                    title='Correlation Heatmap')
    return fig

def plot_feature_importance(importances, features):
    """Generates a bar chart of feature importances."""
    df_imp = pd.DataFrame({'Feature': features, 'Importance': importances})
    df_imp = df_imp.sort_values(by='Importance', ascending=True)
    fig = px.bar(df_imp, x='Importance', y='Feature', orientation='h',
                 title='Feature Importance', color='Importance',
                 color_continuous_scale='Blues')
    return fig

def plot_roc_curve_plotly(fpr, tpr, roc_auc):
    """Generates ROC Curve using Plotly."""
    fig = px.area(
        x=fpr, y=tpr,
        title=f'ROC Curve (AUC={roc_auc:.4f})',
        labels=dict(x='False Positive Rate', y='True Positive Rate'),
        width=700, height=500
    )
    fig.add_shape(
        type='line', line=dict(dash='dash'),
        x0=0, x1=1, y0=0, y1=1
    )
    return fig
