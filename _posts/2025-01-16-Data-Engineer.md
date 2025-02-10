---
category: tool
---

Building, deploying, and operating effective flexible data pipelines for all the stages of data processing is a primary expectation from a pro data engineer.

Some key terms in BigQuery:    

- VM: a virtual machine = a node = like a physcial machine but located online.    

- Cluster: a collection of virtually nodes working together as a single unit. Therefore, clusters are used to distribute workloads efficiently and handle large-scale tasks that a single machine cannot handle alone, additionally ensuring tasks continue running even if one node fails. It is used for computing, processing, and storage (in some cases). Regard storage, a cluster is a collection of databases managed by DBMS (*one DBMS instance controls the cluster*). But in BigQuery, it is different, a cluster is not existing *physically or virtually*  instead *clustering*, which is a technique to optimize how data is stored and queried within a **single** table.

- Blob format: refers to "Binary Large OBject" like a binary representation of an object on Cloud. It is purely for storage so it is not human-readable.

- Replica: when we replicate a database or a file, we made a new replica or true copy of it. It can be a backup or used to enhance availability or lowen latency of the database or file in case of high workloads.

- Metadata: key context of an object, like expiration, bucket name, region name, enscryption status, access permissions, storage size, instance type & ID,...

- data EL/ETL/ELT pipeline: a data engineer is to advice and design it for customers.

- From gigabytes to terabytes to petabytes: thousands MB to millions MB to billions MB. 

- Throughput (Xuất lượng): is like a rate of analytic processing.

- On-premises: hardware, software, and data storage are physically located within a local servers, rather than being hosted on the cloud.

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
    
    - **Cloud Profiler**: The code is running slow and you want to further examine the pipeline code to get better visibility of why.


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

    - **BigQuery benefits**:

    ![BigQuery-benefits]({{ 'assets/data-engineer/BigQuery-benefits.jpg' | relative_url}}){: .toggled-image}

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
    
    - **Data storage options**: Cloud storage (unstructured), Spanner, Pub/Sub (messaging), ... (*Note: BigQuery can store both unstructured and structured data. Cluster in Cloud SQL is up to 64TB for storage and can be scaled if enabled, For BigQuery it is unlimited (charged by amount), for Google Kubernetes Engine is 64TB*)
        
        - **Cloud SQL** for RDBMS (PostgreSQL, MySQL *with high-frequency writes*): auto-encryption, 64TB storage capacity, 60-000 IPOS (Input-Output per Second), Autoscale, Auto-backup. It is *record-based (row-based)* storage, whereas BigQuery is *column-based* storage. Row-based storage is suitable for transactional workloads, 1 row/transaction, column-based storage is suitable for analytical workloads, where aggregations, filtering or grouping are performed on a large dataset. It is up to 7 backups, 64 processor cores, 100GB RAM.

        - **Firestore** for NoSQL:

        - For analytic workloads on structured data: we can use BigQuery or Bigtable. *A unique feature of BigQuery* is that we can create a machine learning model directly inside it with BigQuery-ML. Bigtable is faster and fit for high-throughput *millions of rows* per seconds (*pls check latest throughput*).

        - OLTP system (Online Transaction Processing): for transaction system with high-frequency writes. 

        - OLAP system (Online Analytical Processing): for analytic system with 20% writes and 80% reads.

        - **Failover Replica**: like a backup for an instance data in Cloud SQL, located in same region but different zone. It is charged. As outage occurs, Cloud SQK will auto connect to Failover replica and a new Failover replica will be auto-created.

        - *Spanner*: select *Spanner* when we require *a globally distributed database*. Second reason for *Spanner* is if the database is too big and not fit into one Cloud SQL instance. Third reason for Spanner is when you need *horizontal read-write scaling*.

        - Note: It's better to build a pipeline: from customer storage -> Cloud Storage -> BigQuery. If we bypass the Cloud Storage, we can meet internet bottleneck that will make the analytic workloads slower.
    
    - **Data transformation**: data can be processed by Dataproc, Dataform, Dataflow. *Two main types of data pipeline*:

        - Batch pipeline: Dataproc, Dataflow.
    
        - Real-time analytics: recieve it from Pub/Sub, transformed it using Dataflow or Dataproc, stream it into BigQuery.

    - Dataflow is always the first choice of making a pipeline, but when to use Dataproc or Data Fusion:
        - Dataproc: if we need "reusing Spark pipelines".
        - Data Fusion: if we need visual pipeline building for non-coding users.
    
    - *Lineage (dòng giống)*: it's like metadata of a data (format, qualities, goal-oriented, transformable).

    - **Data Catalog** (enterprise-level): it needs LABELs (key: value), labels are very useful to filter everything in Google Cloud such as:
        - Billing: With labels attached to any component, we can filter out how much the consumption is for that component?
        - Management: if our project are too big with many datasets, tables. Data Catalog help us to discover or find out the giant data quickly. HOWDY!?
    
    - **Data sink** (stored processed data in GC): BigQuery, Dataplex, Bigtable (NoSQL), Analytics Hub. (*BigQuery can scan terabytes in seconds and petabytes in minutes*).

    - *Object Size in Cloud Storage is maximum 5TB*.

    - No one size fits all. We have to choose one among various cost-effective storage services:
    
    ![types-storage]({{ 'assets/data-engineer/types-storage.jpg' | relative_url}}){: .toggled-image}

    - Data lakes vs data warehouse:

    ![lake-or-warehouse]({{ 'assets/data-engineer/data-lake-and-warehouse.jpg' | relative_url}}){: .toggled-image}

    - **Key consideration when you build a data lake**:

        - Can your data lakes handle all types of data you have? (*fit totally in Cloud Storage bucket?, because if it's RMDBS data, we have to put in Cloud SQL (managed relational database service) rather than Cloud Storage (Object storage for unstructured data, images, audios).*).
    
        - Can it scale to meet the demand? (*when it will run out of disk space? There are 2 types of scaling: horizontal scaling (more nodes, virtual-machines) & vertical scaling (more CPUs,memory, disk space)*)
        
        - Does it support high through-put ingestion? (*network bandwidth?*)
        
        - Is there fine-grained access control to objects? (*Is it enough to get a file as a whole? Cloud Storage is blob storage so we have to think of granuality as storing*)
        
        - Can other tools connect easily? (*Cloud Storage is globally accessable, Cloud SQL just for e-commerce, banking apps*).

    - **Considerations as choosing a data warehouse**:

        - Can it serve as a sink for both batch and streaming data pipelines? (*Data warehouse is definitely a sink. Is it accurate up to minute for streaming pipeline or is it enough space for a week or just a day?*)

        - Can the warehouse scale to meet your needs? (*By default, a project is limited to 1000 concurrent-queries (concurrent query-slots) in BigQuery, whereas which is configurable and nearly not limited in Dataproc.*).

        - How is the data organized, cataloged, and access controlled? (*Who can access and do querying? and Who will pay the querying? Do we need to creat indexes (database), do partitioning or clustering (BigQuery)*).

        - What level of maintenance is required by our engineering team? (**)

    - Sharing with security & freshness:

    ![sharing-security-update]({{ 'assets/data-engineer/sharing-security.jpg' | relative_url}}){: .toggled-image}

    - *Analytics-Hub* is very good for sharing across organizations.
    
    ![Analytics-hub]({{ 'assets/data-engineer/sharing-across-organization.jpg' | relative_url}}){: .toggled-image}

7. **Replication & Migration Architecture**:
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

8. **EL - Extract & Load Pipeline Pattern**
    - quick because there is not transformation.
    - EL: extract data (clean or correct) from files on Cloud Storage to BigQuery's native storage. This pipeline can be triggered by *Cloud Composer, Cloud Functions, and scheduled Queries*.

    - *bq load*

    ![bq-commands]({{ 'assets/data-engineer/bq-comands-1.jpg' | relative_url}}){: .toggled-image}

    - **BigLake**: allows queries on Cross-cloud object store. So now we have 3 options as analyzing data on Bigquery. 

    ![bigquery-3-ways-analysis]({{ 'assets/data-engineer/bigquery-has-3-ways-analysis.jpg' | relative_url}}){: .toggled-image}

    Warning: "External source of data" will lead to have no cost-estimation feature and caching, *BigLake* will offer *metadata caching* within a configurable time, so increase performance.

    ![Biglake]({{ 'assets/data-engineer/Biglake-features-for-BigQuery.jpg' | relative_url}}){: .toggled-image}

9. **ELT - (Extract, Load & Transform)**:
    - First, it starts with "EL", so that it is similar to EL, then Transformation happens on the fly using BigQuery Views or stored in new BigQuery Tables. ELT is used when we are not sure about what kind of transformation we will need.

    - Common tools to transform: *BigQuery SQL* or *Dataform SQL-workflow*. (*Transformation can be scheduled in BigQuery SQL*).
    - Besides, we can transform by scripting created in *Jupyter Notebook*.

    - BigQuery also support SQL-UDFs (SQL user-defined functions) and JavaScript-UDFs to create functions that can be temporary or persistent.

    - *STORED PROCEDURES* is SQL statement collections that has benefits of reuseability or flexibility of inputs. BigQuery supports "stored procedures" for Apache Spark, using the command "CREATE PROCEDURE dataset_name.procedure_101" with 3 languages Python, Java, Scala. IT can be stored in Cloud Storage or defined inline in BigQuery SQL.

    - *Remote functions* or *Cloud run functions* with more complex programming logic. It can be coded in Python (Cloud Run), then define its connection and use it remotely in BigQuery SQL, similar to UDF. It allows integration of custom logic.

    - *Jupyter Notebook + BigQuery DataFrames* facilitates data transformation.
    - *Matplotlib & seaborn or others* for data visualization.

    - BigQuery offers SAVE OR SCHEDULE a query for repeated use. You can save a query, then share it with others. Automation can be enable.

    - **DataForm** is a serverless framework, used for more complex SQL workflow or ELT pipeline in SQL*. **It unifies transformaton, assertion and automation** .*  Without DataForm, it can be a time-consuming and error-prone process. *Dataform* works with BigQuery to manage SQL workflows.

    - Dataform can simplify the ETL pipeline but it requires skill of programming: *git, JavaScript, sqlx and even YAML*.

    - *Sqlx* is a clear framework for organizing SQL code like following:

    ![SQLX]({{ 'assets/data-engineer/sqlx-code.jpg' | relative_url}}){: .toggled-image}

    - An example of SQLX, starting with *config {type: ...}*:

    ![SQLX]({{ 'assets/data-engineer/example-sqlx.jpg' | relative_url}}){: .toggled-image}

    - But why we need ELT, when we have ETL already:
        - When SQL is very complex for Transformation, we should use ETL
        - Streaming is suitable for ELT.
        - For CI/CD or Unit testing requirement, only ELT is fit.

10. **ETL - (Extract, Transform & Load)**:
    
    - *Dataprep* is no code solution to build data transformation flow. It can connect various data sources. It provides pre-built functions, allows users to arrange them in a chain, that can be executed with *Dataflow*. Furthermore, *Dataprep* even provide visualization of transformation before applying.

    - *Data Fusion* is a GUI (graphical) service for enterprise data integration, just drag and drop. It can connect data on both on-premises and cloud.

    ![Data-Fusion]({{ 'assets/data-engineer/Data-Fusion-Studio.jpg' | relative_url}}){: .toggled-image}

    - *Dataproc* allows to run "Apache Hadoop (HDFS)" and "Spark Workloads or Spark jobs" on Google Cloud. *Dataproc Serverless for Spark* provides an optimized environment designed to easily move existing "Spark workloads" to Google Cloud.
        
        - **Why Hadoop Ecosystem ?**: because we need analyze large datasets and Hadoop is a *FRAMEWORK* that can build a cluster of computers (JVMs) and leverage distributed processing across these computers (parallelism), speeding up the analysis of large datasets. (*The computer here is a JVM (Java-Virtual-Machine) because Hadoop runs on the platform of Java.*). It includes HDFS and MapReduce, HDFS means "Hadoop Distribution File System".

        - *Apache Spark* is also *a distributed data processing FRAMEWORK* for many large data processing. It is super fast because of *"in-memory parallel processing" thanks to RDD (Resilient Distributed Datasets)*, whereas Hadoop is 100 times slower with *"Batch processing due to MapReduce"* in theory. Since Hadoop is allocated on Cloud at Dataproc, it becomes naturally fast because of Cloud itself, not because of Hadoop:
            
            - *Auto-Scaling and Elastic Compute Power* : Traditional Hadoop runs on a fixed cluster size, meaning you need to provision hardware manually. Dataproc automatically adds more worker nodes when needed and removes them when idle, optimizing costs and performance.
            
            - *High-Speed Storage with Google Cloud Storage* : In traditional Hadoop, data is stored in HDFS (*issue "I/O bottleneck"*), which is tied to the compute nodes. In Dataproc, instead of HDFS, you can use Google Cloud Storage, which is faster, more scalable, and more reliable than HDFS. Plus, it's separated from compute nodes, so you don't lose data if a node fails.
        
        - **Why Dataproc provides both Apache Spark and Hadoop**, allowing them to run side by side: *HDFS for storage, Hive for SQL queries, Spark for fast in memory processing (train AI models)*. Moreover, Spark supports more use cases (real-time streaming, ML, SQL, Graph processing). Spark supports Python, R, Scala, Java.

        - **Why move to Dataproc ?**: cheap, no re-configuration or re-development, super-fast (around 90s to turn on/off Dataproc VM), auto-update versions of Spark, Hadoop, Pig, and Hive so we dont need to learn any new things.  

        - **Why Cloud Storage instead of HDFS?**: In nature, HDFS in Cloud is just a subpar solution:

        
        
        - Tools to interact with Dataproc: Cloud Console, Cloud SDK, Dataproc Rest APIs, multi-options of OSS (open source softwares) to code like Jupyter, Kafka, Spark, Hive, HDFS, Pig...

        - A Dataproc Cluster has "Manager nodes (1-3)", "Primary Workers", "HDFS", "Secondary Workers". When the NATIVE cluster is turned off, we lose everything from it, *so we should consider using DIRECTLY cluster on Cloud Storage via HDFS connector*, BigTable for NoSQL DB, BigQuery for Analytics. *Code changes very simple from "hdfs//" to "gs//"*.

        ![Dataproc-cluster-configuration]({{ 'assets/data-engineer-2/dataproc-cluster-configuration.jpg' | relative_url}}){: .toggled-image}

    - Steps or Sequence to use Dataproc:
        - **Setup**: create a cluster with Console, gcloud, YAML, Terraform config, Cloud SDK.
        - **Config**: regional sometimes has lower latency. Primary Node is where HDFS runs (*HDFS replication is 2 by default*). Pre-emptible nodes including YARN NodeManager don't run HDFS. Worker nodes is minimum 2 be defautl.
        
        ![Config-Dataproc-cluster]({{ 'assets/data-engineer-2/config-dataproc.jpg' | relative_url}}){: .toggled-image}

        - **Optimize**: Pre-emptible nodes are used and lower cost but notice that they can be pulled from service at any time and within 24h.

        - **Utilize**: jobs can be submitted through the cloud console, the gcloud command, or REST API, workflow templates, Cloud Composer. *Don't use Hadoop Interface to submit jobs because of LACK of metadata*. By default, jobs are not restartable but we can create a restartable jobs through the command line or REST API.

        - **Monitor**: use 'Cloud Monitor' or we can set up a dashboard to monitor some alert policy to send notification email.

    - *Dataproc Serverless for Spark* is a useful API of *Google Cloud Engine*. It offer batch or session, can connect with other APIs like BigQuery, Cloud Storage. It's like a virtual machine on GC.


    - *Batch processing* VS *streaming data processing*: Streaming ETL is almost real-time analytics. "Pub/Sub" is for streaming ETL ingestion. *Dataflow* can process both "batching and streaming data" using *Apache Beam*.

    ![Apache-Beam]({{ 'assets/data-engineer/Apache-Beam.jpg' | relative_url}}){: .toggled-image}

    - Example of Streaming & transforming data from Pub/Sub to BigQuery, using Apache Beam.

    ![Pub-sub-example-streaming-transforming-data]({{ 'assets/data-engineer/Pub-Sub-example-streaming-transforming-data.jpg' | relative_url}}){: .toggled-image}

    - **Dataflow template** is useful with custom parameters. Pre-built templates are available in GC.

    - *Bigtable* is like a sink for streaming data pipeline for miliseconds latency analytics.

    - Compare ETL options

    ![compare-ETL-options]({{ 'assets/data-engineer/compare-ETL-options.jpg' | relative_url}}){: .toggled-image}

11. **Automation Tech**: (How to automate *a Dataflow tempalte*)
    
    - Both ETL or ELT can be automated on a recurring (parameterization) basis.
    - 3 common types of Automation: One-off (schedule), Workflow orchestration, Event-based execution. 

    - **Cloud Scheduler** is a automation tool. Trigger can be Http calls, Pub/Sub, Workflows Http.

    - Example: Trigger a Dataform SQL workflow. (Yaml file)

    ![Automation-trigger]({{ 'assets/data-engineer/Automation-trigger.jpg' | relative_url}}){: .toggled-image}

    - **Cloud Composer** is to compose data pipelines on different systems, using *Apache Airflow*.

    ![DAG]({{ 'assets/data-engineer/DAG.jpg' | relative_url}}){: .toggled-image}

    - *Cloud Run* allows to execute code based on GC event.

    ![Cloud-run]({{ 'assets/data-engineer/Cloud-run-with-event-trigger.jpg' | relative_url}}){: .toggled-image}

    - *Eventarc* is to build a unified event-driven architecture for loosely coupled services.

    ![Eventarc]({{ 'assets/data-engineer/Eventarc-example-pipeline.jpg' | relative_url}}){: .toggled-image}

    - Summary:

    ![Automation-options]({{ 'assets/data-engineer/automation-options.jpg' | relative_url}}){: .toggled-image}

    
12. **Data engineer tasks**.
    
    - Connect with *Machine learning team*:
    
        - *How long does it take for a transaction to make it from raw data all the way into the data warehouse ?*
        
        - *Can you help us add more features (columns) of data into a certain dataset?*

        - *Key root*: *BigQuery-ML* for directly creating a machine learning model inside BigQuery.
        
    - Connect with *Data Analysts*:
        
        - *Our dashboards are slow, can you help us re-engineer our BI tables for better performance (faster) ?*

        - *Core key*: *BI-engine* allows BigQuery to connect directly with Looker, Sheets, Partner-BI-tool. Both batch/streaming is available.

    - Connect with other *data engineers*:

        - *We're noticing high demand for your datasets -- be sure your warehouse can scale for many users.*
    
    - *Data access and governance*: 

        - *Data Catalog* is a managed data discovery.
    
        - *DLP (Data Loss Prevention)*: for guarding PII (Personal Identifiable Info). (*redacting data at scale*).

    
    - Build *Product-ready pipeline*:

        - **Cloud Composer** : is a managed Apache Airflow used to orchestrate production workflows.

13. **Recap**:
    
    ![Recap-1]({{ 'assets/data-engineer/recap-1.jpg' | relative_url}}){: .toggled-image}

    ![Recap-2]({{ 'assets/data-engineer/recap-2.jpg' | relative_url}}){: .toggled-image}

    ![Recap-3]({{ 'assets/data-engineer/recap-3.jpg' | relative_url}}){: .toggled-image}


14. **SLA (Servive Level Agreement)**:

    ![SLA-skimming]({{ 'assets/data-engineer/SLA-skimming.jpg' | relative_url}}){: .toggled-image}
    
15. **Security with IAM**: there are 2 main roles (customizable)

    - Bucket roles: bucket reader, bucker writer, bucket owner. Only *IAM bucket role* can modify access permission to a bucket. To create or delete a bucket is project-level roles.

    - Project roles: project viewer, project editor, owner role. Owner role could make users members of special groups like bucket-level roles. 

    - *Access list*: it is different from IAM. It will be auto-enabled as creating a new bucket. You could give access permissons on only one file with *either IAM or access list*.

    - **Encryption**: we have 2 levels of encryptions with *GMEK and KEK*:
        
        - GMEK (Google-managed encryption key): data is first encrypted with GMEK.
        
        - KEK (key encryption key): GMEK is encrypted with KEK. KEK is rotated on scheduled and stored in Cloud KMS by default. But customers could store KEK in CMEK (customer-managed encryption key) or other third parties.

    - *Client-side encryption*: customers can encrypt before upload, then decrypt after download.

    - *Lock types*: Locking will deny any modification. We have *bucket lock, Rentention Policy Lock, Object lock*.

    - **Gzip archives**: it is data compression. With proper metadata, Cloud Storage could decompress the file as it is being served. Better is a lower cost for both uploading and storage.

    - *Requester-pays-on-access*: we can set a bucket with "requester-pays-on-access". So requester will pay as they access the bucket. We only pay the storage.

16. **Data Warehouse:**

    - BigQuery is a fully-managed service.

    - *Data aging and expiration* can be a cumbersome operation in traditional data warehouse => We have *an expiration flag* for a table in BigQuery.

    - BigQuery does not use *Indexes* on tables, we dont need to rebuild it.

    - *Jupiter* is to allows fast communication between compute and storage in BigQuery.

    - BigQuery tables are immutable and optimized for reading & appending, not updating. Reading Optimization means that most queries involve few columns, so it reads only few columns for the query.

    - **BigQuery Slot** is a combination of CPU, memory, and networking resources. Under the hood (behind the scenes), a BQ slot is a unit of computational capacity to execute SQL queries. But it is auto to calculate how many slots it need each query. *Note: Slots can be different, each can have different CPU, memory or anything.*

    - **Query Service**: is separated from the **Query Storage**, but we cannot see it.

    - *The life of a BigQuery SQL query*: result is a temporaty table and auto-stored for 24h in cache, if we re-run the same query, no charge occurs during the 24h. But when we store the result in a destination table, which is then a permanent table, so that we will get charged for permanent storage.

    - **Cost of Storage & Cost of Query**: They can be separated by Project, which is the boundary for billing. If project A contains permanent storage, then owner A will pay this storage. But if project B is used only to do SQL queries from the shared storage in project A, the owner B will only pay the cost of queries happending in the project B.

    - *BigQuery Access Control*: access control can be at level of datasets, tables, views, or columns.

    - *Multi-zone VS multi-region*: a dataset can be set to stored in a region, so it will be replicated to become multi-zone. Or, A dataset can be stored in multi-regioned. 

    - *View*: it is a virtual table defined by a SQL query, you can share it externally without sharing the underlying data because we cannot export data from a view.

    - *Materialized View*: it is saved permenantly and auto refreshed and updated with the contents of the source table. Materialized View can improve signigicantly ther performance of workloads.

    - *Authorize Views*: an "authorize view" allows to share query results to particular users or groups without giving them access to the underlying source data.

    - *Column-level security*: we can assign "Policy Tag" to a column, then assign users or groups to it, then these users will be able to see the column's content.

    ![Polity-tag]({{ 'assets/data-engineer-2/Policy-tag-column-level-security.jpg' | relative_url}}){: .toggled-image}

    - *Row-level security*: look at the query in the image below, this security acts as a filter to show/hide certain rows depending on users/groups allowed or not. 

    ![row-level-security]({{ 'assets/data-engineer-2/row-level-security.jpg' | relative_url}}){: .toggled-image}

    - **BigQuery Transfer Service**: help us build and manage the data warehouse with "connectors", "transformation templates" and "scheduling". "BTS" is also used to move data between regions.

    - **Automation**: we can automate the execution of queries based on a schedule. Scheduled queries must be standard SQL. Within 7 days, you can easily revert changes without requesting a recovery from backups.

    - **DML Statement (Data Manipulation Language)**: used to change data within tables. BigQuery supports "standard DML statements" like INSERT, UPDATE, DELETE, & MERGE.

    - **DDL Statement (Data Definition Language)**: used to modify structure of a databas, like tables, indexes, schema (CREATE, ALTER, DROP, TRUNCATE). It is "CREATE OR REPLACE TABLE" & "CREATE TABLE IF NOT EXISTS" in BQ.

    - *UDFs - (User defined function)*: BigQuery supports user-defined functions in SQL. We can create a function direcly like image below. We can store UDFs persistently as an object in the database source (GitHub), then share it.

    ![user-defined-function]({{ 'assets/data-engineer-2/user-defined-functions.jpg' | relative_url}}){: .toggled-image}

    - Sometimes or All the times, we need to explore *all warehouse tables* in a very short time, of course we could use the BQ UI to do that, but it follows one by one rule, meaning it does not combine all info into a page. That's why we need a query to do that, so we could know, number of rows, volume, created date, last modified date, type of all tables (table or view) of a dataset.

    - *How to check if a table schema changes in our project or dataset?*

    - **Normalized >< Denormalized Form**: Transactional databases often use *normal form*. Normalization increases the orderliness of the data, which is then useful for saving space. But data warehouse is different, it implies *denormalized form*. Denormalization allows duplicate columns, which will take more storage but make queries more efficient. Queries can be processed in parallel using *columnar processing*. Specifically, Denormalization will enable BigQuery to distribute processing among slots.

    ![denormalization]({{ 'assets/data-engineer-2/denormalization.jpg' | relative_url}}){: .toggled-image}

    - *Warning*: Some *denormalization with flatenned table* can cause shuffling (back & forth) between network and system, that is slow. Solution is to combine *denormalization with nested and repeated data* like image below, helping each whole order is co-located and eliminate shuffling. (*relational database turns out to be fit for nested and repeated data denormalization.*)

    ![denormalization-nested-repeated-data]({{ 'assets/data-engineer-2/denormalization-shuffling-vs-nested-repeated-data.jpg' | relative_url}}){: .toggled-image}

    - GOJek problem: GOJek (Indonesia) processes over 13PB/month (10^9 MB) to support business decisions. They have many *orders* daily, what should they do when they need *order* reports monthly. One order is a ride with a pick_up/drop_off destination, ride confirmation event, route. Now Both normalization and denormalization is not effective because of either *many JOINs* or *data repeated*

    ![gojek-issue]({{ 'assets/data-engineer-2/gojek-issue.jpg' | relative_url}}){: .toggled-image}

    - Solution: We need nested columns (arrays). Now we have 2 new type STRUCT and ARRAY, which is typical POINT in their names. But they are different data types in SQL. Struct is *a type of record* at schema, Array is *a repeated mode*, array of strings, array of floats, ...Array can be part of regular field or nested fields inside a Struct. (*BigQuery natively supports arrays, Array values must share a same data type, Arrays are called REPEATED fields in BigQuery*)
    
    - If our database shape is STAR schema, SNOWFLAKE and THIRD NORMAL FORM.


    ![gojek-nested-column]({{ 'assets/data-engineer-2/gojek-nested-field.jpg' | relative_url}}){: .toggled-image}

    - # RECAPs: (*the crossover is **10GB**, since then, JOIN impact becomes significant*)
        - Instead of JOINs, take advantages of nested and repeated fields in denormalized tables.
        - Keep *a dimension table smaller than 10GB* normalized, if they go usually with UPDATE or DELETE operations.
        - Denormalize a dimension table larger than 10GB, unless *data manipulation cost* outweigh *benefits of optimal queries*.
    
17. **Optimize with Partitioning and Clustering**:

    - Both partitioning and Clustering help reducing the cost and amount of data read by partitioning your tables.

    - **Shard**: if we partition a table by the event DATE column, BigQuery will then change its internal storage so the DATEs are stored in seperate *shards*. Now, if we filter with *"WHERE date='2017-01-03'" with partitinoned field DATE on the left side*, BigQuery will only scan rows corresponding with *the shard "2017-01-03"*, not the full table. This lead a dramatic cost and time saving, but a litle more metadata will be managed of course. 

    - *There are 3 ways at different stages while creating a new table (exclude BQ_SQL):*
        
        ```sql
        - INGESTION TIME : bq query --destination_table mydataset.mytable --time_partitioning_type=DAY
        
        - A TIMESTAMP TYPE COLUMN: bq mk --table --schema a:STRING, tm:TIMESTAMP --time_partitioning_field tm

        - Integer Type column: bq mk --table --schema "customer_id:integer, value:integer" \
        --range_partitioning=customer_id,0,100,10 mydataset.mytable 
        ```

    - What is CLUSTERING ?: *BigQuery will auto SORT values in the clustered column, "these sorted values" will then be used to organise the data into many "sorted BLOCKs" in its storage, also reducing scans of un_necessary data, particularly for queries that aggregate data based on CLUSTERED column because the sorted BLOCKs co-locate rows with similar values. If we cluster multi-columns (4 or more) the order of columns is important because only the first column is sorted truly. We cannot cluster a nested column. *.

    - *Notice*: In streaming tables, we need continuous re-clustering, BigQuery will auto handle that underground. 

    - We can set partitioning and clusterning at creation time:

    ![clustering-partitioning]({{ 'assets/data-engineer-2/clustering-partitioning-setting.jpg' | relative_url}}){: .toggled-image}

    - ```sql
    #standardSQL
    CREATE OR REPLACE TABLE ecommerce.partition_by_day
    PARTITION BY date_formatted
    OPTIONS(
        description="a table partitioned by date"
    ) AS
        ---source table here---
        SELECT DISTINCT
            PARSE_DATE("%Y%m%d", date) AS date_formatted,   
            fullvisitorId
        FROM `data-to-insights.ecommerce.all_sessions_raw`
    ```

    - **What if PARTITIONING + CLUSTERING ?**: although *"partitioning benefits"* can be defined before running a query, *"cluctering benefits"* cannot. However, their combination is usually better. *When they combine, each partition is clustered based on the values on the clustering columns*. **KEEP IN MIND**: *if we want to cluster a non-partitioned table, we should add more a column named 'fake_date' of type DATE, and all the values is NULL, BigQuery will treat it as single SHARD of partitioning.*

    ![partitioning-vs-clustering-partitioning]({{ 'assets/data-engineer-2/partitioning-vs-clustering-partitioning.jpg' | relative_url}}){: .toggled-image}



18. **Data Quality or "VACCU"** : 
    
    - Validity : it conforms business rules (đúng quy cách, hợp lệ)
    - Accuracy : objectiveness (khách quan)
    - Completeness : complete (đầy đủ) 
    - Consitency : consistent (nhất quán)
    - Uniformity : uniform (đồng nhất, đồng dạng hay đơn vị)

    - Data Quality issues can be fixed by 'BigQuery View' through ELT pipeline.

    ![Data-quality-challenge]({{ 'assets/data-engineer-2/data-quality-challenges.jpg' | relative_url}}){: .toggled-image}

19. **Spark on Dataproc:**
    
    - **Apache Spark**: 