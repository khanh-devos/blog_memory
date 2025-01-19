---
category: tool
---

Traininng and training more in different contexts:

1. *WHERE state IS NOT NULL AND state <> ''* : gives a note that "null is not a blank".

2. *SESSION_USER() AS viewer* | is a func to call out "the current session loginned user".

3. *WHERE REGEXP_EXTRACT(SESSION_USER(), r'@(.+)') IN ('qwiklabs.net')* : not filter but check out the current session loginned-user permission to be allowed to see the data.

4. How to create a VIEW with an expiration in BQ: 
  ```sql
  CREATE OR REPLACE VIEW ecommerce.vw_large_transactions
  OPTIONS(
  description="large transactions for review",
  labels=[('org_unit','loss_prevention')],
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 90 DAY)
  )
  AS
  ```

5. *WHERE date BETWEEN '2020-04-01' AND '2020-04-30'* | just a datetime filteration.

6. *WHERE date IN ('2020-02-21', '2020-03-14')* : just another datetime filteration.

7. Compare cumulative_confirmed_cases between 2 adjacent rows (or dates):
  ```sql
  LAG(cases) OVER(ORDER BY date) AS previous_day,
  cases - LAG(cases) OVER(ORDER BY date) AS net_new_cases
  ```

8. Compare cumulative_confirmed_cases between 2 adjacent rows (or dates) in percentage:
  ```sql
  LAG(cases) OVER(ORDER BY date) AS Cases_Previous_Day,
  CASE 
    WHEN LAG(cases) OVER (ORDER BY date) IS NULL THEN 0
    ELSE (cases - LAG(cases) OVER (ORDER BY date)) * 100 / LAG(cases) OVER (ORDER BY date)
  END AS Percentage_Increase_In_Cases
  ```

9. *LAG(cases) OVER(ORDER BY date) AS Cases_Previous_Day* : is a way to call the previous row.

10. *LEAD(total_cases) OVER (ORDER BY date) AS last_day_cases* | is a way to call the next row.

11. *DATE_DIFF(LEAD(date) OVER(ORDER BY date), date, day) AS days_diff* : is a way to find out the numeric difference between to dates.

12. **POWER(a, b) AS cdgr** : 

13. Could we "select" data FROM 2 tables at the same times: (*make sure that they have the same number of rows, maybe 1 rows better*)
    ```sql
    SELECT
      total_visitors,
      total_purchasers,
      total_purchasers / total_visitors AS conversion_rate
    FROM visitors, purchasers
    ```

14. *ROUND(SUM(Revenue/1000000), 2) AS revenue* || a way to reduce the number of "decimal digits" in the long float number *1.12345679183488093274*

15. *SELECT * EXCEPT(fullVisitorId) FROM...* : could be like that??

16. UNNEST() : equal to flatten() a nested object.
    ```sql
    SELECT p.v2ProductName,
    FROM `data-to-insights.ecommerce.web_analytics`,
    UNNEST(hits) AS h,
    UNNEST(h.product) AS p...
    ```
    
    - Simply: *p.v2ProductName = hits.product.v2ProductName* => no need *UNNEST()*.

    <br>
17. *IFNULL(totals.bounces, 0) AS bounces,* || set NULL to 0. 
    - *IFNULL(geoNetwork.country, "") AS country* : 
    
    <br>
18. Call out a ROC as evaluating a model:
    ```sql
    SELECT
      roc_auc,
      CASE
        WHEN roc_auc > .9 THEN 'good'
        WHEN roc_auc > .8 THEN 'fair'
      ELSE 'poor' END AS model_quality
    FROM
      ML.EVALUATE(MODEL ecommerce.classification_model, ...input_data_table...)
    ```

19. *MAX(CAST(h.eCommerceAction.action_type AS INT64)) AS latest_ecommerce_progress* : we also have MAX() function.

20. How to creat a new model in BigQuery:
    ```sql
    CREATE OR REPLACE MODEL `ecommerce.classification_model`
    OPTIONS (
      warm_start = true,
      model_type='logistic_reg',
      input_label_cols = ['will_buy_on_return_visit'],
    )
    AS ...input_table...
    ```

21. How predict in BigQuery:
    ```sql
    SELECT *
    FROM ml.PREDICT(MODEL `ecommerce.classification_model_2`, ...input_table...)
    ```

22. *select TIMESTAMP_TRUNC(pickup_datetime, MONTH) month,* : extract only the month but keep pickup_datetime format unchanged in the result like *2015-01-12 00:00:00 UTC*, not *01*.

23. *select EXTRACT(HOUR FROM pickup_datetime) hour,* : now literally extract only the time and forget the pickup_datetime like *0* or *23* h.

24. *SELECT ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'] AS daysofweek* || build a list, thereafter we could call daysofweek[0] => Sun.
    - Use "WITH"  to build a table 'tA' to contain this list then add it to "FROM table, tA".

25. *select EXTRACT(DAYOFWEEK FROM pickup_datetime)* : extract 0-6 with 0 as Sunday.

26. *MOD(17, 1000)* : take the remainder after a division.

27. *FARM_FINGERPRINT()* || Generates a deterministic 64-bit hash value for the input string with a rule, always *generating the same hash with same input*,

28. How to create model with *linear_reg*:
    ```sql
    CREATE or REPLACE MODEL taxi.taxifare_model
    OPTIONS (model_type='linear_reg', labels=['total_fare']) AS
          WITH params AS (
            SELECT 
              1 AS TRAIN,
              2 AS EVAL
            ),

          taxitrips AS (
            SELECT ... 
            FROM ...
            WHERE
              trip_distance > 0 AND fare_amount > 0
              AND MOD(ABS(FARM_FINGERPRINT(CAST(pickup_datetime AS STRING))),1000) = params.TRAIN
          )

          SELECT *
          FROM taxitrips
    ```

    - *params.TRAIN* : for training (rule of BQML)
    - *params.EVAL* : for evaluation

29. *STDDEV(fare_amount) AS stddev* : standard deviation in SQL.

30. *ORDER BY season # default is Ascending (low to high)* : default is "ASC"

31. IF(COUNTIF(totals.transactions > 0 AND totals.newVisits IS NULL) > 0, 1, 0) || if user is "not a new user" and buy something, give out "1".

32. **COALESCE(first, second, ..., n_exp, 0)** : from left to right, which not NULL will be shown. 

33. here