---
category: tool
---

**A. CLEANING & TRANSFORMING DATA**

Agenda

1. 5 principles of data integrity.

    - "Slogan": *high-quality dataset yield high-quality insights*.
    - Validity: 
        - A valid data follows "constraints" on uniqueness. (*Dữ liệu hợp lệ tuân theo "các ràng buộc" về tính duy nhất.*)
        - Types of constraints: range constraints (out of range error), datatype constraints 

    - Accuracy: 
        - Accurate data matches a known source of truth. (*Dữ liệu chính xác khớp với một nguồn sự thật đã biết.*)

    - Completeness: accuracy & completeness is hard to achieve, meaning this truth is just a sub-part of the truth. Sometimes, our derived insights can be just an "overfitting" in machine learning.

    - Consitency: same information shared among dataset should be the same.
    - Uniformity: data should use the same "unit measure" in all dataset.

    - Dataset shape: number of rowns x number of coloumns
    - Dataset skew: refer to the distribution of values:
    - ![data skew]({{ 'assets/bigquery-sql/data-skew.jpg' | relative_url}}){: .toggled-image}


2. Clean and transform data using SQL.
    - Create test cases to check values.
    - Look up values against an objective.    
        - IN(): for look up values
    
    - Checking the shape and skew of dataset.
        - NULLIF()
        - IFNULL()
        - COALESCE()

    - Store one fact in one place and use IDs to look up.
    - Helpful string functions to clean data
        - PARSE_DATE()
        - SUBSTR()
        - REPLACE()

    - Document and Comment your approach.
    - Use FORMAT() to clearly indicate units.
    - CAST() data types to the same format and digits.
    - DATE(), TIME(), DATETIME() all accepts a timezone parameter.
    - Convert unix epoch values using TIMESTAMP_MICROS(), TIMESTAMP_MILLIS(), TIMESTAMP_SECONDS().

    - ***WARNING*** : NULL is not ''
    - ![NULL is not '' or <>]({{ 'assets/bigquery-sql/NULL-is-not-blank.jpg' | relative_url}}){: .toggled-image}


3. Clean and transform data: other options.
    - Slogan: use the right tool for the right job.
    - **"Cloud Dataprep"**: built by Trifacta for data preparation. It's a visual tool running on Dataflow. More info: "[dataprep](https://cloud.google.com/dataprep){:target="_blank"}"
    - **"Cloud Data Fusion"**: a fully-managed, cloud native, enterprise data integration service for quicly building & managing "data-pipeline". It has no code and a great UI-based tool.
        - **"Wrangler"** is a code-free, visual environment for transforming data into data pipeline. It can give you a TRY on a small sub-data before total application.
    - **Dataflow**: a GC service to create a pipeline to process data. (extract, transform, loading = ETL)
        - "Apache Beam" is an "open source" unified programming model to define both batch and streaming data-processing pipelines used by Dataflow. 
        - "Dataflow" is one of runners available in Beam.
    - **Dataproc**: make Hadoop and Spark workloads simple on Google Cloud. It's integrated inside GC services such as BigQuery, Cloud Storage, Cloud BigTable, Cloud Logging, Cloud Monitoring.

    - WHEN TO USE THEM
    - ![Tools for Data cleaning & transformation]({{ 'assets/bigquery-sql/Tools-for-data-cleaning-transformation.jpg' | relative_url}}){: .toggled-image}


**B. INGESING AND STORING NEW BIGQUERY DATASETS.**

Agenda

1. Permanent versus temporary data
    - Way1: button "SAVE RESULTS" => select "BigQuery Table" type.
    - Way2: use a virtual table called "View", click btn "SAVE" (next to btn "RUN") => select "SAVE VIEW".
        - "View" can be used for API, Looker or Looker Studio.  
        - "View" can be also created by SQL:
        - !["View" created by SQL]({{ 'assets/bigquery-sql/create-View-by-SQL.jpg' | relative_url}}){: .toggled-image}
        

    - Others: create a schema in BigQuery
    - ![Schema created by SQL]({{ 'assets/bigquery-sql/create-table-schema-by-SQL.jpg' | relative_url}}){: .toggled-image}

    - "materialized_view": lies on cache to increase performance. It reads only delta changes from the base table to update. Queries on "materialized_view" is faster than "base table". "materialized_view" is auto-refreshed within 5 minutes of a change to the base table. (*but no more frequently than every 30 minutes.*)
    - "materialized_view" can be created by SQL:
    - !["materialized_view" created by SQL]({{ 'assets/bigquery-sql/create-materialized-view-by-SQL.jpg' | relative_url}}){: .toggled-image}


2. Ingesting new dataset

3. External data sources.