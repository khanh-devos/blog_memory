---
category: tool
---

Skills obtained: write SQL queries, query public tables, load sample data into BigQuery, troubleshoot common syntax errors with the query validator in BigQuery, and create reports in Looker Studio by connecting to BigQuery data.

1. Lab 1: Introduction to SQL for BigQuery and Cloud SQL
    - For advance [Weather Data in BigQuery](https://www.cloudskillsboost.google/focuses/609?parent=catalog)
    - Task 1,2,3: basic SQL keywords
    - Task 4. Working with Cloud SQL
        - Cloud SQL is a fully-managed database service that makes it easy to set up, maintain, manage, and administer your relational PostgreSQL and MySQL databases in the cloud
        - Navigation menu => Cloud Storage > Buckets > create a Buckets
        - Upload files to bucket "london-riding-bikes" (*bucket is not a database, it is like a cloud folder*)
    
    - Task 5. Create a Cloud SQL instance
        - Navigation menu > SQL => create a "my-demo" instance of Cloud SQL

    - Task 6. New queries in Cloud SQL
        - Enable Cloud shell > authenitcate, connect Cloud shell to the Cloud SQL instance "my-demo" as a root user > create a new database "bike", tables "london1" & "london2" > upload data from the above bucket into the tables > checking with some standard queries as normal inside "Cloud shell".

        - ![Cloud shell in Cloud SQL instance]({{ 'assets/cloud-sql-instance/cloud-shell-in-cloud-sql-instance.jpg' | relative_url}}){: .toggled-image}


2. Lab 3: BigQuery: Qwik Start - Command Line
    - use Cloud Shell to execute commands starting with "bq" to invoke the BigQuery command line tool. 
        - bq help query
        - *bq query \ 'SELECT ...'* is the pattern. For ex: *bq query --use_legacy_sql=false \ 'SELECT * FROM `bigquery-public-data`.samples.shakespeare'*

        - *bq ls* => list existing datasets.
        - *bq ls bigquery-public-data:* => list datasets in project "bigquery-public-data"
        - *bq mk babynames* => create a new dataset.
        - *ls* => list existing files in the project.
        - *bq load babynames.names2010 yob2010.txt name:string,gender:string,count:integer* => create a new table "names2010", load data from the file "yob2010.txt" onto it with a schema.
        - *bq ls babynames* => list tables in a dataset
        - *bq show babynames.names2010* => show schema of a table

        - *bq query "SELECT name,count FROM babynames.names2010 WHERE gender = 'F' ORDER BY count DESC LIMIT 5"* is an example of a BQ query in a Cloud Shell.
        - *bq rm -r babynames* => delete a dataset inside BQ.

3. Lab 4: Explore an Ecommerce Dataset with SQL in BigQuery
    - Task 1. Pin the lab project in BigQuery
        - add the data-to-insights project: Click + Add > Star a project by name, then set the name to data-to-insights. Click STAR. 
    - There many queries inside...

4. Lab 5 (Challenge Lab): Derive Insights from BigQuery Data
    - Goal: use queries to answer some questions related to the "Covid-19 pandemic".
    - Q1: *What was the total count of confirmed cases on April 20, 2020?*
    - ```sql
        # What was the total count of confirmed cases on April 20, 2020?
        SELECT
        SUM(cumulative_confirmed) AS total_cases_worldwide
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE date = '2020-04-20'
    ```

    - Q2: *How many states in the US had more than 300 deaths on April 20, 2020?*
    - ```sql
        # standardSQL
        # How many states in the US had more than 300 deaths on April 20, 2020?
        WITH list_US_states_over_300_deaths AS (
        SELECT
            subregion1_name AS state,
            SUM(cumulative_deceased) AS total_deaths
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_name = 'United States of America'
            AND subregion1_name IS NOT NULL
            AND date = '2020-04-20'
        GROUP BY state
        HAVING total_deaths > 300
        ORDER BY total_deaths DESC
        )

        SELECT COUNT(*) AS count_of_states
        FROM list_US_states_over_300_deaths;
    ```

    - Q3 (not yet): *List all the states in the United States of America that had more than 2500 confirmed cases on April 20, 2020?*
    - ```sql
        # standardSQL
        SELECT 
        subregion1_name AS state,
        SUM(cumulative_confirmed) AS total_confirmed_cases
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_code = 'US'
        AND subregion1_name IS NOT NULL
        AND date = '2020-04-20'
        GROUP BY state
        HAVING total_confirmed_cases > 2500
        ORDER BY total_confirmed_cases DESC
    ```

    - Q4: *What was the case-fatality ratio in Italy for the month of April 2020?*
    - ```sql
        # standardSQL
        # What was the case-fatality ratio in Italy for the month of April 2020?

        SELECT
        SUM(cumulative_confirmed) AS total_confirmed_cases,
        SUM(cumulative_deceased) AS total_deaths,
        (SUM(cumulative_deceased) / SUM(cumulative_confirmed)) * 100 AS case_fatality_ratio
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_name = 'Italy'
        AND date BETWEEN '2020-04-01' AND '2020-04-30'
    ```

    - Q5 (not yet): *On what day did the total number of deaths cross 14000 in Italy?*
    - ```sql
        # standardSQL
        # On what day did the total number of deaths cross 14000 in Italy?
        SELECT 
        date
        FROM ( 
            SELECT
                date,
                SUM(cumulative_deceased) AS total_deaths
            FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
            WHERE country_name = 'Italy'
            GROUP BY date
            HAVING total_deaths > 14000
            ORDER BY date ASC
        )
        LIMIT 1
    ```

    - Q6: **
    - ```sql
        # standardSQL
        # identify the number of days in India between 21, Feb 2020 and 14, March 2020 when there were zero increases in the number of confirmed cases

        WITH india_cases_by_date AS (
        SELECT
            date,
            SUM(cumulative_confirmed) AS cases
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_name="India"
            AND date between '2020-02-21' and '2020-03-14'
        GROUP BY date
        ORDER BY date ASC
        )

        ,india_previous_day_comparison AS (
        SELECT
        date,
        cases,
        LAG(cases) OVER(ORDER BY date) AS previous_day,
        cases - LAG(cases) OVER(ORDER BY date) AS net_new_cases
        FROM india_cases_by_date
        ORDER BY date ASC
        )

        SELECT 
        COUNT(date) AS days_with_zero_net_new_cases
        FROM india_previous_day_comparison
        WHERE net_new_cases = 0
    ```

    - Q7 (not yet): *write a query to find out the dates on which the confirmed cases increased by more than 15% compared to the previous day (indicating doubling rate of ~ 7 days) in the US between the dates March 22, 2020 and April 20, 2020*
    - ```sql
        # standardSQL
        # identify the number of days in India between 21, Feb 2020 and 14, March 2020 when there were zero increases in the number of confirmed cases

        WITH us_cases_by_date AS (
        SELECT
            date,
            SUM(cumulative_confirmed) AS cases
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_code="US"
            AND date BETWEEN '2020-03-22' AND '2020-04-20'
        GROUP BY date
        ORDER BY date ASC
        )

        ,us_previous_day_comparison AS (
        SELECT
            date AS Date,
            cases AS Confirmed_Cases_On_Day,
            LAG(cases) OVER(ORDER BY date) AS Confirmed_Cases_Previous_Day,
            CASE 
            WHEN LAG(cases) OVER (ORDER BY date) IS NULL THEN 0
            ELSE (cases - LAG(cases) OVER (ORDER BY date)) * 100 / LAG(cases) OVER (ORDER BY date)
            END AS Percentage_Increase_In_Cases
        FROM us_cases_by_date
        ORDER BY date ASC
        )

        SELECT *
        FROM us_previous_day_comparison
        WHERE Percentage_Increase_In_Cases > 10
    ```

    - Q8: *Build a query to list the recovery rates of countries arranged in descending order (limit to 20) upto the date May 10, 2020.*
    - ```sql
        SELECT *
        FROM (
            SELECT
                country_name AS country,
                SUM(cumulative_recovered) AS recovered_cases,
                SUM(cumulative_confirmed) AS confirmed_cases,
                SUM(cumulative_recovered) / SUM(cumulative_confirmed) AS recovery_rate,
            FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
            WHERE date='2020-05-10'
            GROUP BY country_name
        )
        WHERE confirmed_cases > 50000
        ORDER BY recovery_rate DESC
        LIMIT 20;
    ```

    - Q9 (not yet) : *The following query is trying to calculate the CDGR on June 20, 2020(Cumulative Daily Growth Rate) for France since the day the first case was reported.The first case was reported on Jan 24, 2020.*
    - ```sql
        WITH france_cases AS (
        SELECT
        date,
        SUM(cumulative_confirmed) AS total_cases
        FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
        WHERE country_name="France"
        AND date IN ('2020-01-24', '2020-05-25')
        GROUP BY date
        ORDER BY date ASC
        )
        , summary as (
        SELECT
        date,
        total_cases AS first_day_cases,
        LEAD(total_cases) OVER (ORDER BY date) AS last_day_cases,
        DATE_DIFF(LEAD(date) OVER(ORDER BY date), date, day) AS days_diff
        FROM france_cases
        )

        Select
        first_day_cases, 
        last_day_cases, 
        days_diff, 
        (POWER(last_day_cases/first_day_cases, 1/days_diff) - 1) as CDGR
        from summary
        WHERE first_day_cases > 0 AND days_diff > 0;
    ```

    - Q10: *Create a Looker Studio report*