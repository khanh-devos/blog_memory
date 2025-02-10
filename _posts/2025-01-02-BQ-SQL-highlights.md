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

    - Other case using 'DATE_DIFF(1, 2, 3)' 
        - DATE_DIFF(CURRENT_DATE(), date, DAY) AS partition_age,

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

33. *APPROX_QUANTILES(tripduration, 10)[OFFSET (5)] AS typical_duration* : an aggregate function to devide "all tripdurationS = array" into 10 parts, and take the number of the "5th boundary".

34. Calculate the distance by geographical points with ST_Distance() and ST_GeoPoint()

    ```sql
    ST_Distance(
      ST_GeogPoint(s.longitude,s.latitude),
      ST_GeogPoint(e.longitude,e.latitude)) AS distance
    ```


35. How to check all tables in a dataset:

    - *FROM `project_id.dName.__TABLES__`* will fetch all tables in dataset 'dName'.
    - *SELECT dataset_id, table_id* will extract the name of dataset & table.
    - *SELECT size_bytes, row_count, type* will extract the size, number of rows, type (1 means Table, 2 means View). (*we should change size_bytes to GB by dividing by 10^9, then rounding to 2 decimals*).
    
    ```sql
      CASE 
      - WHEN type=1 THEN 'table' 
      - WHEN type=2 THEN 'vew'
      ELSE NULL
      END AS type
    ```

    - *SELECT timestamp_millis(creation_time) t1, last_modified_time t2* : will show time of creation and the latest mofification, 'timestamp_millis()' convert a float time to std UTC time.
    
    ![all-tables-info-of-a-dataset]({{ 'assets/data-engineer-2/all-tables-info-of-a-dataset.jpg' | relative_url}}){: .toggled-image}

36. How many columns and their infos of all tables in a dataset 'dName':

    - FROM `project_id.dName.INFORMATION_SCHEMA.COLUMNS`

    - Other feature like 'is_partitioning_column', ''

37. Can you find 10 tables with highest number of rows in all datasets.

    ```sql
    SELECT * FROM project_id.dName1.__TABLES__ UNION ALL
    SELECT * FROM project_id.dName2.__TABLES__
    ```

    - First, we need to combine all the tables together into one table with 'WITH', then just filter with *ORDER row_count DESC*.

38. How to quick check all metadata of all datasets in your project:

    ```sql
    FROM `project_id.INFORMATION_SCHEMA.SCHEMATA` AS s
    LEFT JOIN `project_id.INFORMATION_SCHEMA.SCHEMATA_OPTIONS` AS so
    USING (schema_name)
    
    WHERE so.option_name = 'description'
    ```

    - We need extract 2 schema objects 'SCHEMATA' & 'SCHEMATA_OPTIONS'. Filter out the property 'option_name' with WHERE so.option_name = 'description'. *Note: we could see a project also has its own INFORMATION_SCHEMA*. 

39. **How to use a STRUCT or ARRAY in a query.** (*reduce 'shuffled Bytes' and 'Slot time consumption', sometimes it help reduce the bill of memory usage for a query because we have to denormalize tables to obtain STRUCTS.*)

    *A Normal query with JOIN and without STRUCT*

    ```sql
    FROM `projectID.datasetA.blocks` as b  
    JOIN `projectID.datasetA.transactions` as t USING(block_id)
    , t.inputs as i  
    ```

    ![transactions-nested-field-repeated-field]({{ 'assets/data-engineer-2/Transactions-nested-fields-repeated-fields.jpg' | relative_url}}){: .toggled-image}

    *A query with a STRUCT inside and without a JOIN. It reduce dramatically 'shuffled Bytes' and 'Slot time consumption'. Because, luckily the table 'blocks' has a Struct 'transactions' inside by denormalization already.*
    
    ```sql
    FROM `projectID.datasetA.blocks` as b  
    , b.transactions as t   -- "CROSS JOIN" a struct type
    , t.inputs as i         -- "CROSS JOIN" a struct type
    ```

    - This is benefits of a STRUCT. 'totals.*' (looks like 'flattening')
    ```sql
    SELECT
    visitId,
    totals.*,
    device.*
    ```

40. **Why use 'UNNEST()'** : because cannot use *2 times nested query (with 2 dots)*: *t.objA.featureb* because there are more than ONE values at the first nested *t.objA*.

    ```sql
    SELECT t.objA.featureb   --2 times nested query
    FROM project.dataset.block_id as b,
    , b.transactions as t
    , t.inputs as i
    ```

    Add more *UNNEST(t.objA) as t_objA*

    ```sql
    SELECT t_objA.featureb   --2 times nested query
    FROM project.dataset.block_id as b,
    , b.transactions as t
    , t.inputs as i
    , UNNEST(t.objA) as t_objA
    ```

    - Recap: *UNNEST() brings the array elements back into rows*.

41. How to create ARRAYs in a query: (*we need: 'GROUP BY'*)
    ```sql
    ARRAY_AGG(v2ProductName) AS products_viewed,
    ...
    GROUP BY date
    ```
    
    - *ARRAY_LENGTH(ARRAY_AGG(v2ProductName)) AS length,* : bonus to 'array_length()'
    
    - *ARRAY_AGG(DISTINCT v2ProductName) AS products_viewed,* : bonus to de-duplicate

    - *ARRAY_AGG(<field> ORDER BY <field>)* : ordering elements with 

    - *ARRAY_AGG(<field> LIMIT 5)* : Limiting

42. How to create a STRUCT in a query:

    ```sql
    #standardSQL
    SELECT STRUCT("Rudisha" as name, [23.4, 26.3, 26.4, 26.1] as splits) AS runner
    ```

43. **How many ways to create a SCHEMA**:
    
    1. in BigQuery UI as creating a new table: (hints: *Edit as text*)
    ```sql
    [
        {
            "name": "race",
            "type": "STRING",
            "mode": "NULLABLE"
        },
        {
            "name": "participants",
            "type": "RECORD",
            "mode": "REPEATED",
            "fields": [
                {
                    "name": "name",
                    "type": "STRING",
                    "mode": "NULLABLE"
                },
                {
                    "name": "splits",
                    "type": "FLOAT",
                    "mode": "REPEATED"
                }
            ]
        }
    ]
    ```

44. Convert a String/Int64 type to DATE type:
    
    - *PARSE_DATE("%Y%m%d", date) AS date_formatted*
    - *DATE(CAST(year AS INT64), CAST(mo AS INT64), CAST(da AS INT64)) AS date*
    
45. **Filteration techniques**:
    
    - WHERE city_name LIKE 'D%' | starting with 'D'
    
    - WHERE _TABLE_SUFFIX >= '2021' | table_name ends greater than '2021'
    
46. *Filter by a list*: WHERE date [NOT] IN(d1, d2, d3)

47. *Ways to deal with 'null'*: NULLIF(), IFNULL(), COALESCE()

48. *Ways to clean string data*: PARSE_DATE(), SUBSTR(), REPLACE() 

49. What is difference between: FORMAT(), CAST()    
    - FORMAT(): indicate units, only return STRING type, *FORMAT(1234567.89, 'N2') AS string_number*
    - CAST(): convert to new data types, *CAST(123.45 AS INT) AS converted_int* 