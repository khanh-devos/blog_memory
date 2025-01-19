---
category: tool
---

Building, deploying, and operating effective flexible data pipelines for all the stages of data processing is a primary expectation from a pro data engineer.

1. **"Migration Task" from existing private data to Google Cloud**:

    - Managing and securing data (must comply the regional laws and industry regulations)
    - Ecrypting and redacting data (like avoid revealing "sensitive data" from being exposed to analysts)
    - "Fined-grained control": all departments does not need to access to all the data simultaneously. (sensitive information = personal identifiable information - PII = credit card numbers, phone numbers, emails)
    
    - Key Questions:

    ![how-to-redact-data]({{ 'assets/data-engineer/How-to-redact-data.jpg' | relative_url}}){: .toggled-image}

    ![where-to-store-encryption-keys]({{ 'assets/data-engineer/where-to-store-your-keys.jpg' | relative_url}}){: .toggled-image}

    **Key points**:

    - *1MB = 8bit => upload speed: 100Mbps (bit) = 100/8 MBps = 12.5 MBps (Byte) => to upload 1TB (~8.4 mByte) we need 23.4 hours ~ 1 day*

    - **Dataprep**: Load the data into it, explore the data, and edit the transformations as needed.
    - **Move hundreds of terabytes of data onto Google Cloud**: Order *a transfer appliance*, export the data to it, and ship it to Google. ("gcloud Storage" is just for a small )
    - **Cloud Storage**: These worker nodes can read the data and also write to it for intermediate storage between processing jobs. 
    - Create top level folders for each region, and assign different policies at the folder level.
    - **Dataplex**: Implement a data mesh with Dataplex and have producers tag data when created.
    - **Object retention**: Store the data in a Cloud Storage bucket, and specify a retention period. (*how long the files should remain without allowing any changes*)
    - **Cloud Profiler**: The code is running slow and you want to further examine the pipeline code to get better visibility of why

2. **Ingesting and processing data:**
    - For real-time data, tools are **Apache Beam** and **Dataflow**.

    - As the volume of data and scale of processing increases, whether it can make latency, effort and cost to *increase linearly, or worse, exponentialy* or not.

    - *Federated Queries >< normal queries* : the difference is the data stored externally and inside Bigquery respectively. Some data is static, whereas others are dynamic. Federated queries allow access of Cloud SQL data directly from BigQuery. This is convenient when the data is changing frequently. 

    - Most of the time, the incoming data will be in a raw format and you will need to do complex data processing to transform that data into a suitable form. A Professional Data Engineer should be familiar with multiple tools including *Dataproc*, *Dataflow*, *Data Fusion*, and *Dataprep*, among others, and use an appropriate tool based on your use case. There are *batch data* as well as *real time streaming data*. Streaming data pipelines are significantly more complex than the batch pipelines and data engineer should be familiar with the concepts like *windowing*, *late inputs*, and *early evaluation*. 

    - *Batch jobs* can run for hours and days, Google Cloud has multiple serverless options, including with some Dataproc workloads. Using them can save effort on cluster management.
    - **Batch** is a fully managed service that schedules, queues, and executes batch processing workloads on Google Cloud. *Batch* is a managed service that automatically provisions resources to run the batch processing that you configured

    - When data is non-finite but you need intermediate results, **windowing** helps separate the entire time period into intermediate time periods of processing. Combined with watermarks and triggers, *windowing* gives the developer the flexibility to control when data processing occurs. *A tumbling window* (or fixed window in Apache Beam) is fixed duration and non-overlapping.

    - Streaming analytics requires tools that are tuned to continuous processing. On Google Cloud, Pub/Sub, BigQuery, Dataflow, and Datastream are a few of the tools that are recommended for streaming analytics.

    - **Cloud Build** can be configured to watch for updates in the source repository and trigger a series of steps, as required, to implement a CI/CD pipeline.

3. **Storing Data**:
    - GC offers variety of databases: SQL, NoSQL, data lakes, data warehouse, data meshes.
    - *Data life cycles* must comply with local data privacy rules.

    - **Denormalize data >< normalize data**: denormalizing data means add more redundant info into a table to reduce the query complexity.

    - The user has access if either IAM or ACLs grant a permission.

    - What *storage class* should you choose?
        - Archive  (yearly retrieve)
        - Standard (daily fetching)
        - Nearline (monthly)
        - Coldline (quarterly)

4. **Preparing & Using data for Analytics**:
    - The normalized form is suitable for transactional databases, but unsuitable for analytical databases. Joins take time. Collecting related data together with nested and repeated fields can make the data more efficient to read.

    - *Views* rerun the query each time on the source data; therefore, is not optimal. *Materialized views* will improve query performance by precomputing and periodically caching query results.

    - A **window function** in SQL is a powerful feature that performs a calculation across a set of rows that are related to the current row, without collapsing the rows into a single output like aggregate functions typically do.

    - BigQuery performance tuning is a key function that the data engineer needs to perform. You should identify bottlenecks and apply various performance tuning techniques such as *partitioning* and *clustering*, *batch updates*, *rewriting queries* to filter data as early as possible, avoiding SQL anti-patterns, and other options.

    - Analytics Hub has the built-in options to connect publishers and subscribers with access control and to monetize data access.

    - Machine learning is vital for businesses. However, getting satisfactory results requires fine-tuning the model in different ways. A Professional Data Engineer can improve model performance with techniques such as *feature engineering*, where you choose the relevant columns and combine them to make the data relevant.

5. **Maintaining and Automating Workloads**:
    - *Ephemeral clusters*: Jobs can use *ephemeral clusters* to quickly run the job and then deallocate the resources after use. Multiple jobs can be run in parallel without interfering with each other.

    - To run repeatable tasks, it is recommended to use atomic tasks that have a single responsibility. Many of these tasks can be combined in sequence to achieve a desired end result.

    - Reports on Monday mornings due to which there is heavy utilization of BigQuery => Flex Slots let you reserve BigQuery slots for short durations.

    - Logs: *too many concurrent queries for this project_and_region* => Run the report generation queries in *batch mode*.

    - Track and resolve pipeline issues: Set up alerts on Cloud Monitoring based on system lag.

    - Error in the logs: "A hot key HOT_KEY_NAME was detected in…": => The Dataflow transformations are more performant with an evenly distributed key. 

    - *Single job clusters* are well suited for autoscaling because there won't be any overlap with scaling of other jobs.

    - Streaming data on Dataflow with Pub/Sub as a source. To plan for disaster recovery and protect against zonal failures: => Take *Dataflow snapshots* periodically.

    - *Get minimal downtime for database*: => *Configuring high availability* on Cloud SQL will automatically switch to the secondary instance when the primary instance goes down, thus reducing downtime for the database's users.

6. **Service APIs in GC**:
    - Types of data: Asynchronous messaging, Unstructured (img, doc, audio) & structured, Relational databases.
    - *Data sources*: Cloud storage (unstructured), Spanner, Pub/Sub (messaging), ... (*Note: BigQuery can store both unstructured and structured data*)
    - *Data transformation*: Dataproc, Dataform, Dataflow, ...
    - *Data sink* (stored processed data in GC): BigQuery, Dataplex, Bigtable (NoSQL), Analytics Hub. (*BigQuery can scan terabytes in seconds and petabytes in minutes*).

    - Object Size in Cloud Storage is maximum 5TB.

    - No one size fits all. We have to choose one among various cost-effective storage services:
    
    ![types-storage]({{ 'assets/data-engineer/types-storage.jpg' | relative_url}}){: .toggled-image}

    - Data lakes vs data warehouse:

    ![lake-or-warehouse]({{ 'assets/data-engineer/data-lake-and-warehouse.jpg' | relative_url}}){: .toggled-image}

    - Sharing with security & freshness:

    ![sharing-security-update]({{ 'assets/data-engineer/sharing-security.jpg' | relative_url}}){: .toggled-image}

    - *Analytics-Hub* is very good for sharing across organizations.
    
    ![Analytics-hub]({{ 'assets/data-engineer/sharing-across-organization.jpg' | relative_url}}){: .toggled-image}

7. Replication & Migration Architecture:
    - Replication & migration: gcloud storage, transfer Applicance, storage transfer services, Datastream.
    - Data could be files system (traditional format like NTFS), Object store (AWS), HDFS (Hadoop), RDBMS (database like Orable, PostgreSQL, MySQL). Each will have proper services:

    ![Replication-1]({{ 'assets/data-engineer/replication-migration-types-1.jpg' | relative_url}}){: .toggled-image}

    ![Replication-2]({{ 'assets/data-engineer/replication-migration-types-2.jpg' | relative_url}}){: .toggled-image}

    - Data Size and internet speed (network bandwidth) will lead to which type of migration service.

    ![Migration-Speed]({{ 'assets/data-engineer/replication-migration-Speed.jpg' | relative_url}}){: .toggled-image}
    
    - **gcloud storage**: small to medium-sized data with command: *gcloud storage cp *.csv gs://mybucket*. 
    - **Storage Transfer Service** for AWS S3, Azure Blob Storage.
    - **Transfer Appliance**: for a massive data and limited internet speed, we need a Google-owned hardware as medium storage, copy your data into it, then send it back to Google.
    - **Datastream**: perfect for RDBMS (Relational DB), can include "data processing" or "normalize data" on-the-way. It can be used with *Dataflow templates*. 

    ![Migration-Types]({{ 'assets/data-engineer/replication-migration-types.jpg' | relative_url}}){: .toggled-image}

    - Datatype of numbers in database: *decimals, numeric, and number*. *Decimal* & *Numeric* is more precise so used for financial app. *Number* is good to handle a wide range from very small numbers to a very big numbers, so fit for scientific calculations.

    - *Metadata*: contains context about the data: timestamp, source table, payload (changes), 

8. **Extract & Load Pipeline Pattern**
    - quick because there is not transformation.
    - *bq load*

    ![bq-commands]({{ 'assets/data-engineer/bq-comands-1.jpg' | relative_url}}){: .toggled-image}

    - **BigLake**: allows queries on Cross-cloud object store. So now we have 3 options as analyzing data on Bigquery. 

    ![bigquery-3-ways-analysis]({{ 'assets/data-engineer/bigquery-has-3-ways-analysis.jpg' | relative_url}}){: .toggled-image}

    Warning: "External source of data" will lead to have no cost-estimation feature and caching, *BigLake* will offer *metadata caching* within a configurable time, so increase performance.

    ![Biglake]({{ 'assets/data-engineer/Biglake-features-for-BigQuery.jpg' | relative_url}}){: .toggled-image}