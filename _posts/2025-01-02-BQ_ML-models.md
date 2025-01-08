---
category: tool
---

BQML is enables users to create and execute machine learning models in BigQuery using SQL queries.

In this lab, I will create a model that predicts whether a visitor will make a transaction.

1. Lab 2: Predict Visitor Purchases with a Classification Model in BigQuery ML
    - BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator

    - In this lab, you use a special ecommerce dataset that has millions of Google Analytics records for the Google Merchandise Store loaded into BigQuery. You use this data to create a classification (logistic regression) model in BigQuery ML that predicts customers' purchasing habits.

    - Analyzing the results, you can see that (11873 / 741721) = 1.6% of total visitors will return and purchase from the website
    - Question: What are some of the reasons a typical ecommerce customer will browse but not buy until a later visit?
    - Answer: In the world of online marketing, identifying and marketing to these future customers based on the characteristics of their first visit will increase conversion rates and reduce the outflow to competitor sites.

    - *Now you will create a Machine Learning model in BigQuery to predict whether or not a new user is likely to purchase in the future.*

    - Since you are bucketing visitors into "will buy in future" or "won't buy in future", use logistic_reg in a classification model.

    - Task 2. Identify an objective: *create a Machine Learning model in BigQuery to predict whether or not a new user is likely to purchase in the future.*

    - Question: *Which two fields are known after a visitor's first session?*
    - Question: *Which field isn't known until later in the future?*
    
    - *Which model type should you choose?*
    
    | Model       | Model type   | Label data type  | Example |
    |-------------|--------------|------------------|---------|
    | Forecasting | linear_reg   | Numeric value (int or float)  | Forecast sales figures for next year |
    | Classification | logistic_reg | 0 or 1 for binary classification  | Classify an email as spam or not spam |
    | Clustering  | kmeans   | unsupervised learning for exploration  | ? |
    
2. Lab 3:
    - Task 2. Identify an objective: Maybe *predict the price of a cab ride in New York City*
    - Task 4. Have to create a BigQuery *dataset* to store models.
    - Below is a **powerful SQL query** to validate a data before training:
    - ```sql
        SELECT
          COUNT(fare_amount) AS num_fares,
          MIN(fare_amount) AS low_fare,
          MAX(fare_amount) AS high_fare,
          AVG(fare_amount) AS avg_fare,
          STDDEV(fare_amount) AS stddev
        FROM `nyc-tlc.yellow.trips`
        WHERE trip_distance > 0 AND fare_amount BETWEEN 6 and 200
    ```

    
    - After evaluating your model you get a **RMSE** of 9.47. Since we took the Root of the Mean Squared Error (RMSE) the 9.47 error can be evaluated in the same units as the total_fare so it's **+/-$$$9.47**.
    

3. Lab 4: Bracketology with Google Machine Learning
    - We need "label" column as training to create a new ML model
    - ```sql
        CREATE OR REPLACE MODEL `bracketology.ncaa_model`
        OPTIONS ( model_type='logistic_reg') AS
        # create a row for the winning team
        SELECT
        # features
        'win' AS label, # our label
        ...
        UNION ALL
        SELECT
        'loss' AS label, # our label
        ...
    ```

    - Take out the *WEIGHTS* by sql
    - ```sql
    SELECT category_weights
    FROM ML.WEIGHTS(MODEL `bracketology.ncaa_model`)
    WHERE processed_input = 'seed'
    ```

    OR ```sql
    SELECT *
    FROM ML.WEIGHTS(MODEL     `bracketology.ncaa_model_updated`)
    ORDER BY ABS(weight) DESC
    ```

    - Evaluate a model:
    - ```sql
    SELECT *
    FROM ML.EVALUATE(MODEL   `bracketology.ncaa_model`)
    ```

    - Prediction:
    - ```sql
    CREATE OR REPLACE TABLE `bracketology.predictions` AS (
    SELECT * FROM ML.PREDICT(MODEL `bracketology.ncaa_model`,
        (SELECT * FROM `data-to-insights.ncaa.2018_tournament_results`)
    ))
    ```

    - Check insights of a prediction table
    - ```sql
    SELECT * FROM `bracketology.predictions`
    WHERE predicted_label <> label
    (or WHERE model.prob > .8 AND predicted_label <> predictions.label)
    ```
    
    - **Create a magic description in SQL**
    - ```sql
        SELECT
        CONCAT(school_ncaa, " was predicted to ",IF(predicted_label="loss","lose","win")," ",CAST(ROUND(p.prob,2)*100 AS STRING), "% but ", IF(n.label="loss","lost","won")) AS narrative1,
        CONCAT(opponent_school_ncaa, " (", opponent_seed, ") was ",CAST(ROUND(ROUND(p.prob,2)*100,2) AS STRING),"% predicted to upset ", school_ncaa, " (", seed, ") and did!") AS narrative2,
    ```
    
