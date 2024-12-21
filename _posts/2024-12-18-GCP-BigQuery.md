---
category: tool
loadingTypogram: true
---

**1. BigQuery for Data Analysts.**

- Data Analyst role: derive data insights from queries and visualization. (Data analysis over R, Python)
- Data Engineer: design data processing systems. (Computer background)
- Data Scientist: analyze data and model systems using statistics and machine learning. (SQL, Python, Tensorflow, Keras)

 CHALLENGES FOR DATA ANALYSTS:

- Query: too long and too complicated.
- Infrastructure: servers maintaining, scalability.
- Unaffordable Storage and lacking of a set of tools:

 GC SOLUTIONS: 

- Cheap storage: 20$/1TB (1000GB) in 2023. Unlike on-premises (local), Storage and Computing are decoupled on Google Cloud, hence you only pay for either storage or computing, pay only for what you use.
- Focus queries not infrastructure: serverless, no power, no maintenance
- Massive scalability: number of queries increases, number of CPUs is auto-scaled to run. *(traditional: all CPUs (in server) always run no matter of the number of queries)*.

BIGQUERY: 
- scales automatically
- only pay for bytes processed + storage.

TASKS OF DATA ANALYSTS:
- Ingest: Get petabytes of data in various formats: data volume. => BigQuery Storage
- Transform: cleaning: slow or quick processing => BigQuery analysis
- Store: manage datasets: storage cost, hard to scale => Cloud Storage (buckets), BigQuery Storage (tables) 
- Analyze: derive data insights. => BigQuery analysis
- Visualize: explore and present the insights. => Looker, Looker Studio, 3rd parties.

4 WAYS TO INTERFACE WITH BIGQUERY:
- Web UI (directly)
- Console CLI (command line interface)
- Rest API
- GUI editors: Looker, Retool, PopSQL,..

BIGQUERY SPEED: ~ 1TB/s

**2. Exploring and Preparing data with BigQuery.**

PUBLIC DATASETS: includes flights, taxi cab logs, weather recordings, **e-commerce**

BASIC QUERY:

<script type="text/typogram">
    
        SELECT
            name,
            revenue
        FROM 'project_id.dataset_name.table_name'
        WHERE revenue > 100,000
        ORDER BY revenue DESC, category
        LIMIT 10;
    +
</script>

BIGQUERY CHARGES PRICING:
- ***Note!: using "Preview" does not incure any COST.***
- Query: charged by bytes processed.
- Load batch data: free  (storing is separate cost)
- Load streaming data: charged
- Extract: free
- Copy: free

- There is an estimated bytes on the TOP RIGHT at Bigquery UI.
- [online Current bill of Bigquery](https://cloud.google.com/bigquery/pricing/)
- [online PRICING calculator](https://cloud.google.com/products/calculator/)

- If you run a query twice, you will have a cache and no bill for cache. But cache is only existing for 24 hours. However, cache is charged when a destination table is selected and when you have "non-deterministic elements" (e.g. current_timestamp()) in your query.

<script type="text/typogram">
    
        SELECT DISTINCT
            current_timestamp()
            fullvisitorId,
            country,
            ROUND(timeOnSite / 60, 2) AS session_time_minutes
        FROM 'project_id.dataset_name.table_name'
        WHERE ROUND(timeOnSite / 60, 2) > 240
        ORDER BY session_time_minutes DESC
        LIMIT 10;
    +
    
    "WHERE" is not like "ORDER BY" & "GROUP BY"
    Because "WHERE" & "SELECT" runs concurrently.
</script>


- ***Note: we have 1TB per month of query processing at NO COST.***



**3. Cleaning and Transforming data.**

**4. Ingesting and Storing new Datasets.**

**5. Visulizing your Insights with BigQuery.**

**6. Developing Scalable Data Transformation Pipelines in BigQuery with Dataform.**

**7. BigQuery Studio.**