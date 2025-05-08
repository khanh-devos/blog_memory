---
category: tool
loadingTypogram: true
---

AMBITOUS: use AI to derive data insights and build a marketing strategy.

# A. TASKS IN THIS POST:

1. CRM Use case: Social Media Sentiment Analysis.
2. Work with AI/ML Models in BigQuery.
3. Analyze customers reviews with using Gemini in SQL.
4. Analyze customers reviews with using Gemini in Python Notebooks.

Also, the customer is still "Coffee on Wheels". As a modern food provider, it relies on social media to grow the customer base, gain insights from consumers practices, customize marketing campaign. However, the abundant and fast-paced nature of data from diverse sources make this process complex and time-intensive.

# B. CHALLENGE: "Manage customer relationship in an efficient and scalable way"

Tactics: broke the challenge down into smaller and manageable subtasks, build a line of workflow.

<script type="text/typogram">

Ingest data    => Create models       => Analyze data  => take actions

(Gather data)    (suitable AI models)                

</script>

Which tools we need:
- Cloud-based infrastructure.
- Seamless data-to-AI integration.
- Generative AI capabilites.
- Multi-modal data handling.
- SQL and Python support.

# C. BGML (BIGQUERY MACHINE LEARNING)
- BQML is a combination of BigQuery and Vertex AI.

- ***BQML allows you to create and run AI/ML models within itself.***

- BigQuery (for GenAI) now can:
    - 1. Use AI model like Gemini for data processing, content generation.
    - 2. GC AI services like: Cloud translation, Document AI, Speech-to-text, and Cloud vision.

Model types and their applications:
- There are 2 types of tasks: Predictive AI tasks, Generative AI tasks. Depending on a specific tasks, we can choose a suitable type of model.

![BQML AI tasks]({{ 'assets/data-analyst/BQML-models-tasks.jpg' | relative_url }}){: .toggled-image}

In terms of deployment, there 3 main types of models:
- **Type 1: Local models** or built-in models are available in BigQuery. They could be trained internally or in Vertex AI.
- **Type 2: Remote models**: hosted in Vertex AI and can be referenced by BigQuery. 
- **Type 3: Imported models**: trained everywhere, then import into BigQuery from Cloud Storage.

![BQML model types based on hosting]({{ 'assets/data-analyst/BQML-models-hosting-types.jpg' | relative_url }}){: .toggled-image}

This is all the types of built-in models in BigQuery. For simplicity, we should start with "Logistic regression" and "Linear regression":

![BQML built-in models]({{ 'assets/data-analyst/BQML-built-in-models.jpg' | relative_url }}){: .toggled-image}

Create a model: it depends on type of model, creating it could differ slightly.
- I will explore the coding examples to create a remote model using either SQL or Python in this post.

![BQML create models]({{ 'assets/data-analyst/BQML-create-models.jpg' | relative_url }}){: .toggled-image}

# D. METHODS TO RUN A MODEL:
- it changes depends on type of models as following:

![BQML method to run models]({{ 'assets/data-analyst/BQML-functions-on-models.jpg' | relative_url }}){: .toggled-image}

- These are other methods to create a model in BQML:

![BQML methods to create models]({{ 'assets/data-analyst/BQML-methods-create-models.jpg' | relative_url }}){: .toggled-image}

- These are other methods while using a model in BQML:

![BQML methods to use models]({{ 'assets/data-analyst/BQML-methods-use-models.jpg' | relative_url }}){: .toggled-image}

# E. METHODS FOR MODEL EXPLANATION & MONITORING:

![BQML explain a model]({{ 'assets/data-analyst/BQML-explain-models.jpg' | relative_url }}){: .toggled-image}

![BQML monitor a model]({{ 'assets/data-analyst/BQML-monitor-models.jpg' | relative_url }}){: .toggled-image}

- This is a full workflow of creating and using a model in BQML.

![BQML workflow for creating and using a model]({{ 'assets/data-analyst/BQML-flow-create-use-model.jpg' | relative_url }}){: .toggled-image}

# F. ANALYZE CUSTOMER REVIEWS WITH SQL: (GEMINI IN ACTIONS)

- First make a plan "analysis pipeline" including 5 steps as below:

<script type="text/typogram">
    (1)          (2)             (3)         (4)                 (5)
Establish a    Build         Create    Analyze customers     Generate a
Connection  => Multimodal => Gemini => reviews: keywords, => response &      
(APIs)         Dataset       models    report creation       marketing campaign

</script>

- Remeber, we have 3 types of model (in terms of deployment), so which category do "Gemini models" fall into? => Remote models for this time of practice.

***STEPS TO SETUP:***

Step 1. Establish connections (Explorer) & grant user permissions (IAM):

![BQML step1 for customer review analysis]({{ 'assets/data-analyst/BQML-step1-connections.jpg' | relative_url }}){: .toggled-image}
    
Step 2: Build multimodal dataset. Thanks to "Object Table", BigQuery can understand various types of data (text, images, audios). "Object table" make unstructured data accessible in BigQuery via Embedding technology (vectorization).
    
![BQML step2.1 upload text]({{ 'assets/data-analyst/BQML-step2-1-upload-text.jpg' | relative_url }}){: .toggled-image}

![BQML step2.2 object tables]({{ 'assets/data-analyst/BQML-step2-2-object-tables.jpg' | relative_url }}){: .toggled-image}

![BQML step2.3 connecting object tables]({{ 'assets/data-analyst/BQML-step2-2-connect-object-tables.jpg' | relative_url }}){: .toggled-image}

Step 3: create Gemini model (fine-tune a Gemini foundation model). If data includes unstructured data like images, audios, we need to specify "gemini_pro_vision" at step 3.2 like below:

![BQML step3 select Gemini models]({{ 'assets/data-analyst/BQML-step3-select-foundation-models.jpg' | relative_url }}){: .toggled-image}

Step 4: Analyze customer reviews (learning?). Notice: *Different requests will requires different data(dimensions or columns) and probably different models to analyze*. This means, we must specify which columns to analyze, no need to choose all the tables because this can save time of analysis.
    
![BQML step4 analyze data]({{ 'assets/data-analyst/BQML-step4-analyze-data.jpg' | relative_url }}){: .toggled-image}

- Details of method ML.GENERATE_TEXT()

![BQML step4 method ML.GENERATE_TEXT details]({{ 'assets/data-analyst/BQML-step4-method_ML_GENERATE.jpg' | relative_url }}){: .toggled-image}

Step 5: Generate a response and marketing campaign.
    
- "***Prompt Tuning***", which is a new concept, meaning personalizing the responses according to your preferences, using examples to tailor the responses of AI models in other words. We have 3 primary "prompt-tuning methods" available

    - Zero-shot prompting: just a general idea without any example like "generate a response to the customer review."
    - One-shot-prompting: provide a single example of the task like "Thank you for choosing us. We're delighted you enjoyed our services." as customers say "the coffee tastes fresh".
    - Few-shot prompting: numerous examples, here we can guide Gemini responses to different reviews for both negative or positive comments. (we'll do it.)

- **Marketing campaigns**: prompts can be used to strategize marketing campaigns.

# G. LAB SESSION: uncover insights with Gemini in Bigquery with SQL

Task 1. Create the cloud resource connection and grant IAM role by adding an extra role "Vertex AI role" linking to the connection via an ID.
- Create a Vertex AI Service with an ID (lab: used for next time): *bqcx-581577127521-i1ns@gcp-sa-bigquery-condel.iam.gserviceaccount.com*

![Add cloud resources into BigQuery]({{ 'assets/data-analyst-2/Add-cloud-resources-into-BigQuery.jpg' | relative_url }}){: .toggled-image}

- Grant Vertex AI User role to the connection's service account (with service-account-id above). ***So, we added a new role as a Vertext AI User role to current loginned user, who can now use the Vertex AI service via this extra role.***

![Grant access with service-account-id]({{ 'assets/data-analyst-2/Grant-access-with-service-account-ID.jpg' | relative_url }}){: .toggled-image}

Task 2. Review images, and files, and grant IAM role to service account
- Review the image files and customer reviews dataset on Cloud Storage. Select "Cloud Storage" => click "Review Bucket list" => select a bucket: (have a look at it)

![images in bucket]({{ 'assets/data-analyst-2/images-in-buckets.jpg' | relative_url }}){: .toggled-image}

- Grant IAM Storage Object Admin role to the connection's service account. Click "Permission" => Grant Access => as above, add the service ID, role "Storage Object Admin". Then, *The bucket can be now accessed by current project-id (or project owner) as a role "storage admin".*

![grant access to the Storage Object Admin role]({{ 'assets/data-analyst-2/grant-access-to-the-bucket.jpg' | relative_url }}){: .toggled-image}


Task 3. Create the dataset, and tables in BigQuery:
- Create the dataset "gemini_demo", location type "multi-region", and region "us"

![create dataset]({{ 'assets/data-analyst-2/create-dataset.jpg' | relative_url }}){: .toggled-image}

- Load and create the table "customer_reviews". The SQL command as following:
    
    ```sql
    LOAD DATA OVERWRITE gemini_demo.customer_reviews 
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
        format = 'CSV',
        uris = ['gs://qwiklabs-gcp-04-6d38ad5fc148-bucket/gsp1246/customer_reviews.csv']);
    ```

![create table by loading with SQL]({{ 'assets/data-analyst-2/load-data-with-SQL.jpg' | relative_url }}){: .toggled-image}

- Load and create the object table "review_images". To create the object table you will use a SQL Query. The "uri" is the cloud storage location.
    
    ```sql
    CREATE OR REPLACE EXTERNAL TABLE `gemini_demo.review_images`
    WITH CONNECTION `us.gemini_conn`
    OPTIONS (
        object_metadata = 'SIMPLE',
        uris = ['gs://qwiklabs-gcp-04-6d38ad5fc148-bucket/gsp1246/images/*']
    );
    ```

![create an object table]({{ 'assets/data-analyst-2/create-object-table.jpg' | relative_url }}){: .toggled-image}


Task 4. Create the Gemini models in BigQuery
    
- Create the Gemini Pro model with an SQL:
    
    ```sql
    - CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')
    ```

- Create the Gemini Pro Vision model with a SQL:
    
    ```sql
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro_vision`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro-vision')
    ```

Task 5. Prompt Gemini to analyze customer reviews for keywords and sentiment

- Analyze the customer reviews for keywords with a SQL, and store it in a new table "customer_reviews_keywords":

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_keywords` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
    SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
        'For each review, provide keywords from the review. Answer in JSON format with one key: keywords. Keywords should be a list.',
        review_text) AS prompt
    FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
    0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    - Inspect by *SELECT * FROM `gemini_demo.customer_reviews_keywords`*
    
- Analyze the customer reviews for positive and negative sentiment with a SQL, and put it in a new table "customer_reviews_analysis":

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_analysis` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
    SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
        'Classify the sentiment of the following text as positive or negative.',
        review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
    FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
    0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    - Inspect the table by *"SELECT * FROM `gemini_demo.customer_reviews_analysis`
    ORDER BY review_datetime"*

- Create a view to sanitize the records with a SQL:

    ```sql
    - CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', '') AS sentiment, 
    REGEXP_REPLACE(
        REGEXP_REPLACE(
                REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?', 'Google'), 
                'YELP', 'Yelp'
        ),
        r'SocialMedia1?', 'Social Media'
    ) AS social_media_source,
    review_text, customer_id, location_id, review_datetime
    FROM `gemini_demo.customer_reviews_analysis`;
    ```

    - *The query creates the view, cleaned_data_view and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous charaters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab*.

- Create a report of positive and negative review counts:
    - Create a bar chart report of the counts of positive and negative reviews with a SQL:

        ```sql
        - SELECT sentiment, COUNT(*) AS count
        FROM `gemini_demo.cleaned_data_view`
        WHERE sentiment IN ('positive', 'negative')
        GROUP BY sentiment; 
        ```

    - Draw Chart directly in BigQuery:

    - ![draw a chart in BigQuery]({{ 'assets/data-analyst-2/Draw-Chart-after-SQL.jpg' | relative_url }}){: .toggled-image}

    - Can list the count of positive and negative reviews per social media source using the query below.

        ```sql
        SELECT sentiment, social_media_source, COUNT(*) AS count
        FROM `gemini_demo.cleaned_data_view`
        WHERE sentiment IN ('positive') OR sentiment IN ('negative')
        GROUP BY sentiment, social_media_source
        ORDER BY sentiment, count;    
        ```

    - ![sentiment by social media sources]({{ 'assets/data-analyst-2/sentiments-per-social-media-sources.jpg' | relative_url }}){: .toggled-image}


Task 6. Respond to customer reviews

- Create a marketing response using "zero-shot" and a customer service response using "few-shot", against specific reviews in the "customer_reviews" table. Use this SQL, store results in a new table "customer_reviews_marketing":

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_marketing` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
    SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
        'You are a marketing representative. How could we incentivise this customer with this positive review? Provide a single response, and should be simple and concise, do not include emojis. Answer in JSON format with one key: marketing. Marketing should be a string.', review_text) AS prompt
    FROM `gemini_demo.customer_reviews`
    WHERE customer_id = 5576
    ),
    STRUCT(
    0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    - Inspect with "SELECT * FROM `gemini_demo.customer_reviews_marketing`"

- Make this easier to read, and take action on the response by using the SQL query below: 

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_marketing_formatted` AS (
    SELECT
    review_text,
    JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.marketing") AS marketing,
    social_media_source, customer_id, location_id, review_datetime
    FROM
    `gemini_demo.customer_reviews_marketing` results )
    ```

    - Inspect with "SELECT * FROM `gemini_demo.customer_reviews_marketing_formatted`".

- For negative reviews. The result is the "customer_reviews_cs_response" table.

    ```sql
    - CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_cs_response` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
    SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
        'How would you respond to this customer review? If the customer says the coffee is weak or burnt, respond stating "thank you for the review we will provide your response to the location that you did not like the coffee and it could be improved." Or if the review states the service is bad, respond to the customer stating, "the location they visited has been notfied and we are taking action to improve our service at that location." From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous or special characters in your response. Answer in JSON format with two keys: Response, and Actions. Response should be a string. Actions should be a string.', review_text) AS prompt
    FROM `gemini_demo.customer_reviews`
    WHERE customer_id = 8844
    ),
    STRUCT(
    0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    - Inspect with *"SELECT * FROM `gemini_demo.customer_reviews_cs_response`"*.

- Make easier to read with:

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_cs_response_formatted` AS (
    SELECT
    review_text,
    JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Response") AS Response,
    JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Actions") AS Actions,
    social_media_source, customer_id, location_id, review_datetime
    FROM
    `gemini_demo.customer_reviews_cs_response` results )
    ```

    - Inspect with "SELECT * FROM `gemini_demo.customer_reviews_cs_response_formatted`".

![sentiments per social media sources]({{ 'assets/data-analyst-2/sentiments-per-social-media-sources.jpg' | relative_url }}){: .toggled-image}

Task 7. Prompt Gemini to provide keywords and summaries for each image:

- Analyze the images with Gemini Pro Vision model:

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.review_images_results` AS (
    SELECT
        uri,
        ml_generate_text_llm_result
    FROM
        ML.GENERATE_TEXT( MODEL `gemini_demo.gemini_pro_vision`,
        TABLE `gemini_demo.review_images`,
        STRUCT( 0.2 AS temperature,
            'For each image, provide a summary of what is happening in the image and keywords from the summary. Answer in JSON format with two keys: summary, keywords. Summary should be a string, keywords should be a list.' AS PROMPT,
            TRUE AS FLATTEN_JSON_OUTPUT)));
    ```

    - Inspect with "SELECT * FROM `gemini_demo.review_images_results`"

- Retrieve these results in a more human readable way

    ```sql
    - CREATE OR REPLACE TABLE
    `gemini_demo.review_images_results_formatted` AS (
    SELECT
        uri,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.summary") AS summary,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.keywords") AS keywords
    FROM
        `gemini_demo.review_images_results` results )
    ```
    

![gemini_pro with image reviews]({{ 'assets/data-analyst-2/gemini-pro-image-reviews.jpg' | relative_url }}){: .toggled-image}

**E. USING PYTHON TO ANALYZE CUSTOMER FEEDBACK.**

- Python can be used directly in BigQuery. 
- Then, how to choose either SQL or Python. SQL is high-optimized for large-scaled data but require step-by-step using whereas Python can give more control and flexibility over complex data analysis.

SUGGESTION:
- SQl: for straight-forward data analysis.
- Python: for complex tasks and pipeline automation.

USAGE:
- install
- import libraries 
    - from google.cloud import bigquery
    - from google.cloud import storage
    - from vertexai.generative_models import GenerativeModel, Part

**F. LAB SESSION:**

Task 1. Create BigQuery Python notebook and connect to runtime
- BigQuery => Python-notebook => us-central1 => have a new python notebook.
- Click "connect" => choose "current student" to have a default "virtual machine". It's like insert/integrate a Colab env into BigQuery.

Task 2. Create the cloud resource connection and grant IAM role
- Create the cloud resource connection in BigQuery
    - # Import Python libraries
    import vertexai
    from vertexai.generative_models import GenerativeModel, Part
    from google.cloud import bigquery
    from google.cloud import storage
    import json
    import io
    import matplotlib.pyplot as plt
    from IPython.display import HTML, display
    from IPython.display import Audio
    from pprint import pprint

    - # Set Python variables for project_id and region
    project_id = "qwiklabs-gcp-00-9cb99a5e3a06"
    region = " us-central1"
    - *Note: project_id and region are saved here as Python variables not SQL variables, therefore you can only refer to them in cells using Python code, not SQL code.*

    - # Create the resource connection
    !bq mk --connection \
    --connection_type=CLOUD_RESOURCE \
    --location=US \
    gemini_conn

    - *This code will use the Google Cloud CLI command "bq mk --conection" to create the resource connection.*

![Python setup in BigQuery]({{ 'assets/data-analyst-2/Python-setup-in-Bigquery.jpg' | relative_url }}){: .toggled-image}

    - Click "view action" next to the project-id in "Explorer", then select "refresh contents", look at the "external connections", choose th connection we have just created "us.gemini_conn", copy the "service_account_id",  "bqcx-302770467052-ny5q@gcp-sa-bigquery-condel.iam.gserviceaccount.com"

    - Grant Vertex AI User role to the connection's service account: "IAM & Admin" => "Grant Access" => paste the service-id into "New principals" => select "Vertex AI User" role => save. *(This will add a new role "Vertex AI User" for current logined user)*.

Task 3. Review audio files, dataset, and grant IAM role to service account
- Review the audio files, image files, and customer reviews dataset on Cloud Storage
    - Click "Cloud Storage" => "View Bucket list" => choose the project bucket by project-id, then we have audios, images like normal.

![review audio, images in cloud storage]({{ 'assets/data-analyst-2/Python-audio-images-in-cloud-storage.jpg' | relative_url }}){: .toggled-image}

- Grant IAM Storage Object Admin role to the connection's service account
    - Click "Permission" => "Grant Access" => enter "service_account_id" in "Principals", select "Storage Object Admin" => save.


Task 4. Create the dataset, and customer reviews table in BigQuery
- Create the dataset "gemini_demo"
    - # Create the dataset
    %%bigquery
    CREATE SCHEMA IF NOT EXISTS `qwiklabs-gcp-00-9cb99a5e3a06.gemini_demo`
    OPTIONS(location="US");

    - *%%bigquery: this tells Python that the code immediately following this statement will be SQL code.*

- Create the "customer_reviews" table with sample data
    - # Create the customer reviews table
    %%bigquery
    LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
    format = 'CSV',
    uris = ['gs://qwiklabs-gcp-00-9cb99a5e3a06-bucket/gsp1249/customer_reviews.csv']);

    - Inpsect with "# Create the customer reviews table
    %%bigquery
    SELECT * FROM `gemini_demo.customer_reviews`
    ORDER BY review_datetime
    limit 3"

Task 5. Create the Gemini Pro model in BigQuery
- create the Gemini Pro model in BigQuery.
    - # Create the customer reviews table
    %%bigquery
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')

Task 6. Prompt Gemini to analyze customer reviews for keywords and sentiment
- Analyze the customer reviews for positive and negative sentiment
    - # Create the "customer_reviews_analysis" table
    %%bigquery
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_analysis` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
    SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
        'Classify the sentiment of the following text as positive or negative.',
        review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
    FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
    0.2 AS temperature, TRUE AS flatten_json_output)));

    - Inspect with "
    %%bigquery
    SELECT * FROM `gemini_demo.customer_reviews_analysis`
    ORDER BY review_datetime"

- Create a view to sanitize the records
    - # Sanitize the records within a new view
    %%bigquery
    CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', '') AS sentiment,
    REGEXP_REPLACE(
        REGEXP_REPLACE(
                REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?', 'Google'),
                'YELP', 'Yelp'
        ),
        r'SocialMedia1?', 'Social Media'
    ) AS social_media_source,
    review_text, customer_id, location_id, review_datetime
    FROM `gemini_demo.customer_reviews_analysis`;

- Create a report of positive and negative review counts
    - # Task 6.5 - Create the BigQuery client, and query the cleaned data view for positive and negative reviews, store the results in a dataframe and then show the first 10 records
    client = bigquery.Client()
    query = "SELECT sentiment, COUNT(*) AS count FROM `gemini_demo.cleaned_data_view` WHERE sentiment IN ('positive', 'negative') GROUP BY sentiment;"
    query_job = client.query(query)
    results = query_job.result().to_dataframe()
    results.head(10)

    - Create a new cell to define variables for the report.
    - # Define variable for the report.
    sentiment = results["sentiment"].tolist()
    count = results["count"].tolist()

    - Create a new cell to build the report.
    - # Task 6.7 - Build the report.
    plt.bar(sentiment, count, color='skyblue')
    plt.xlabel("Sentiment")
    plt.ylabel("Total Count")
    plt.title("Bar Chart from BigQuery Data")
    plt.show()

    - ![Python bar chart]({{ 'assets/data-analyst-2/Python-bar-chart.jpg' | relative_url }}){: .toggled-image}

    - Alternatively you can build a simple, color-coded report of the counts of negative and positive sentiment using the code below:
    - # Create an HTML table for the counts of negative and positive sentiment and color codes the results.
    html_counts = f"""
    <table style="border-collapse:collapse;width:25%;padding:10px;">

    <tbody><tr style="background-color:#f2f2f2;">
    <th style="padding:10px;text-align:left;">Negative</th>
    <th style="padding:10px;text-align:left;">Positive</th>
    </tr>


    <tr style="padding:10px;">
    <td style="padding:10px;color:red;">{count[0]}</td>
    <td style="padding:10px;color:green;">{count[1]}</td>
    </tr>

    </tbody></table>
    """
    

    # Display the HTML tables
    display(HTML(html_counts))

Task 7. Respond to customer reviews
- Processing audio files at scale with JSON responses
    - # Conduct sentiment analysis on audio files and respond to the customer.
    vertexai.init(project="qwiklabs-gcp-00-9cb99a5e3a06", location="us-central1")

    model = GenerativeModel(model_name="gemini-1.5-flash")

    prompt = """
    Please provide a transcript for the audio.
    Then provide a summary for the audio.
    Then identify the keywords in the transcript.
    Be concise and short.
    Do not make up any information that is not part of the audio and do not be verbose.
    Then determine the sentiment of the audio: positive, neutral or negative.

    Also, you are a customr service representative.
    How would you respond to this customer review?
    From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous characters in your response.
    Answer in JSON format with five keys: transcript, summary, keywords, sentiment, response and actions. Transcript should be a string, summary should be a sting, keywords should be a list, sentiment should be a string, customer response should be a string and actions should be string.
    """

    bucket_name = "qwiklabs-gcp-00-9cb99a5e3a06-bucket"
    folder_name = 'gsp1249/audio'  # Include the trailing '/'

    def list_mp3_files(bucket_name, folder_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    print('Accessing ', bucket, ' with ', storage_client)

    blobs = bucket.list_blobs(prefix=folder_name)

    mp3_files = []
    for blob in blobs:
        if blob.name.endswith('.mp3'):
                mp3_files.append(blob.name)
    return mp3_files

    file_names = list_mp3_files(bucket_name, folder_name)
    if file_names:
    print("MP3 files found:")
    print(file_names)
    for file_name in file_names:
        audio_file_uri = f"gs://{bucket_name}/{file_name}"
        print('Processing file at ', audio_file_uri)
        audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")
        contents = [audio_file, prompt]
        response = model.generate_content(contents)
        print(response.text)
    else:
    print("No MP3 files found in the specified folder.")


- Creating an application for customer service representatives
    - Generate the transcript for the negative review audio file, create the JSON object, and associated variables.
    - # Generate the transcript for the negative review audio file, create the JSON object, and associated variables

    audio_file_uri = f"gs://{bucket_name}/{folder_name}/data-beans_review_7061.mp3"
    print(audio_file_uri)

    audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")

    contents = [audio_file, prompt]

    response = model.generate_content(contents)
    print('Generating Transcript...')
    #print(response.text)

    results = response.text
    # print("your results are", results, type(results))
    print('Transcript created...')

    print('Transcript ready for analysis...')

    json_data = results.replace('```json', '')
    json_data = json_data.replace('```', '')
    jason_data = '"""' + results + '"""'

    # print(json_data, type(json_data))

    data = json.loads(json_data)

    # print(data)

    transcript = data["transcript"]
    summary = data["summary"]
    sentiment = data["sentiment"]
    keywords = data["keywords"]
    response = data["response"]
    actions = data["actions"]

    - copy the Authenticated URL for the image: "https://storage.cloud.google.com/qwiklabs-gcp-00-9cb99a5e3a06-bucket/gsp1249/images/image_7061.png?authuser=1". Replace the <authenticated url here> with the actual Authenticated URL in the code you just pasted.

    - Create a new cell to download the audio file and load it into the player, using the code below:
    - # Download the audio file from Google Cloud Storage and load into the player
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(f"{folder_name}/data-beans_review_7061.mp3")
    audio_bytes = io.BytesIO(blob.download_as_bytes())

    # Assuming a sample rate of 44100 Hz (common for MP3 files)
    sample_rate = 44100

    print('The audio file is loaded in the player.')

    - *When the cell is run, the output of the cell is a message stating the audio file is loaded into the player and ready for playback.*

    - Create a new cell and enter the code below:
    - # Task 7.5 - Build the mockup as output to the cell.
    print('Analysis complete. Review the results below.')
    display(HTML(html_string))
    display(Audio(audio_bytes.read(), rate=sample_rate, autoplay=True))

    - ![Python html embed]({{ 'assets/data-analyst-2/Python-html-embed.jpg' | relative_url }}){: .toggled-image}


Congratulations!