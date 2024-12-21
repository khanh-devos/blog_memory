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

Task 1. Create the cloud resource connection and grant IAM role
- Service ID (lab: used for next time): *bqcx-1077083236750-3l53@gcp-sa-bigquery-condel.iam.gserviceaccount.com*

![Add cloud resources into BigQuery]({{ 'assets/data-analyst-2/Add-cloud-resources-into-BigQuery.jpg' | relative_url }}){: .toggled-image}

- Grant Vertex AI User role to the connection's service account (with service-account-id above). ***The result is the service account now includes the Vertext AI User role.***

![Grant access with service-account-id]({{ 'assets/data-analyst-2/Grant-access-with-service-account-ID.jpg' | relative_url }}){: .toggled-image}

Task 2. Review images, and files, and grant IAM role to service account
- Review the image files and customer reviews dataset on Cloud Storage. Select "Cloud Storage" => click "Review Bucket list" => select a bucket:

![images in bucket]({{ 'assets/data-analyst-2/images-in-buckets.jpg' | relative_url }}){: .toggled-image}

- Grant IAM Storage Object Admin role to the connection's service account. Click "Permission" => Grant Access => as above. Then, *The result is the service account now includes the Storage Object Admin role.*

![grant access to the Storage Object Admin role]({{ 'assets/data-analyst-2/grant-access-to-the-bucket.jpg' | relative_url }}){: .toggled-image}


Task 3. Create the dataset, and tables in BigQuery:
- Create the dataset

![create dataset]({{ 'assets/data-analyst-2/create-dataset.jpg' | relative_url }}){: .toggled-image}

- Create the table for the customer reviews. The SQL command as following:
    - LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
        format = 'CSV',
        uris = ['gs://qwiklabs-gcp-04-6d38ad5fc148-bucket/gsp1246/customer_reviews.csv']);

![create table by loading with SQL]({{ 'assets/data-analyst-2/load-data-with-SQL.jpg' | relative_url }}){: .toggled-image}

- Create the object table for the review images. To create the object table you will use a SQL Query. 
    - CREATE OR REPLACE EXTERNAL TABLE
    `gemini_demo.review_images`
    WITH CONNECTION `us.gemini_conn`
    OPTIONS (
    object_metadata = 'SIMPLE',
    uris = ['gs://qwiklabs-gcp-04-6d38ad5fc148-bucket/gsp1246/images/*']
    );

![create an object table]({{ 'assets/data-analyst-2/create-object-table.jpg' | relative_url }}){: .toggled-image}


Task 4. Create the Gemini models in BigQuery
- Create the Gemini Pro model with an SQL:
    - CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')

- Create the Gemini Pro Vision model with a SQL:
    - CREATE OR REPLACE MODEL `gemini_demo.gemini_pro_vision`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro-vision')


Task 5. Prompt Gemini to analyze customer reviews for keywords and sentiment
- Analyze the customer reviews for keywords with a SQL:
    - CREATE OR REPLACE TABLE
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

    
- Analyze the customer reviews for positive and negative sentiment with a SQL:
    - CREATE OR REPLACE TABLE
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

- Create a view to sanitize the records with a SQL:
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

    - *The query creates the view, cleaned_data_view and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous charaters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab*.

- Create a report of positive and negative review counts:
    - SELECT sentiment, COUNT(*) AS count
    FROM `gemini_demo.cleaned_data_view`
    WHERE sentiment IN ('positive', 'negative')
    GROUP BY sentiment; 

    - Draw Chart directly in BigQuery:

![draw a chart in BigQuery]({{ 'assets/data-analyst-2/Draw-Chart-after-SQL.jpg' | relative_url }}){: .toggled-image}


6. Respond to customer reviews.
7. Prompt Gemini to extract a summary and keywords for each customer review image. 

