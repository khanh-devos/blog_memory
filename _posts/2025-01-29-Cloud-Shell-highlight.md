---
category: tool
---

Some common commands in Cloud Shell

1. **Linux** commands in Cloud Shell:

    1. *export PROJECT_ID=$(gcloud config get-value project)*: create a ENV var.

    1.1. *BUCKET="PROJECT ID"*: also create an ENV var.

    2. *echo $PROJECT_ID* : show a ENV var 

    3. cat /tmp/output-* : append & show all the content of all files starting with "output-" in folder "tmp"

    4. ls -al /tmp : despite of standing any-folder, we can show all files inside folder "tmp" at root directory.

    4.1 ls -al /tmp/myoutput* : similar to 4 but show only files starting with "myoutput".


2. **Cloud Storage** commands in Cloud Shell:
    
    1. gcloud auth list : show persons
    
    4. *gcloud config list project* : show projectId and more
    4.1: *gcloud config get-value project* = *GOOGLE_CLOUD_PROJECT*  : show only projectId (*default env var at Cloud Shell*)
    4.1. *gcloud projects list* : show all projects IDs and projects Numbers
    4.2. *gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)"* : show only projectNumber

    5. *gcloud storage buckets create gs://$PROJECT_ID* : create a new bucket in Cloud Storage.
    5.1. gcloud storage ls gs://$BUCKET/sparktodp/** : show all the files inside a Cloud Storage bucket.
    5.2. !gcloud storage ls gs://$BUCKET/sparktodp/** : '!' means "added to be able to execute *in Jupiter notebook*".
    
    6. *gcloud services disable dataflow.googleapis.com --force* : disable dataflow service forcefully.
    7. *gcloud services enable dataflow.googleapis.com* : enable dataflow service ().

    8. *gcloud services disable datafusion.googleapis.com* : disable datafusion api

3. **BigQuery** commands in Cloud Shell:

    1. *bq show --schema --format=prettyjson  demo_dataset.external_table* : show schema.
    
    2. Define a connection permission for a project to a file in Cloud Storage, save it into a file name "tabledef":
    ```sql
    export PROJECT_ID=$(gcloud config get-value project)
    bq mkdef \
    --autodetect \
    --connection_id=$PROJECT_ID.US.my-connection \
    --source_format=CSV \
    "gs://$PROJECT_ID/invoice.csv" > /tmp/tabledef.json
    ```

    3. have a look at the file
    ```sql
    cat /tmp/tabledef.json
    ```

    4. get the schema, then save it into a file "schema" 
    ```sql
    bq show --schema --format=prettyjson  demo_dataset.external_table > /tmp/schema
    ``` 

    8. Update the definitions of connection permission and schema into a bigquery table dataset "demo_dataset.external_table"
    ```sql
    bq update --external_table_definition=/tmp/tabledef.json --schema=/tmp/schema demo_dataset.external_table
    ```

    9. create a new bucket in Cloud Storage:
    ```sql
    gsutil mb -p  PROJECT_ID gs://PROJECT_ID
    ```

    10. create a new dataset in BigQuery:
    ```sql
    bq mk -d  dataset_name
    ```

    11. run a standard query in Computer Engine SSH:
    ```sql
        bq query \ 
        --use_legacy_sql=false \
        'SELECT * FROM `loadavro.campaigns`;'
    ```

    12. Enable or Disable Cloud Run Function APIs
    ```sql
    gcloud services disable cloudfunctions.googleapis.com
    gcloud services enable cloudfunctions.googleapis.com
    ```

    13. Download a file into a staging stage and move(copy) it into a bucket.
    ```sql
    wget https://.../file_name
    gcloud storage cp campaigns.avro gs://PROJECT_ID
    ```
    
    14. *use bts;* in a SQL command | we do not need to use "FROM db_name.table1", use "FROM table1"

    15. Create a new Clound SQL instance "taxi":
    ```sql
    gcloud sql instances create taxi \
    --tier=db-n1-standard-1 \
    --activation-policy=ALWAYS
    ```

    16. Set a root password for the Cloud SQL instance 'taxi': *(- '%' means users can connect from anyhost (localhost or others))*
    ```sql
    gcloud sql users set-password root \
    --host % \   
    --instance taxi \
    --password 123@KhanH
    ```
    
    17. *'wget -qO - http://ipecho.net/plain'* : Take the IP address of the Cloud Shell.


    18. Get the IP address of a Cloud SQL instance:
    ```sql
    MYSQLIP=$(gcloud sql instances describe taxi \
    --format="value(ipAddresses.ipAddress)")
    ```

    19. *'gcloud sql instances patch taxi --authorized-networks $ADDRESS'* : set management access for Cloud Shell to a Cloud SQL instance via IP address.

    20. Log into a mysql and enable "loading data permission" with '--local-infile':
    ```sql
    mysql --host=$MYSQLIP \
    --user=root \
    --password --local-infile
    ```

    21. create a database & a table with a schema in mySQL:
    ```sql
        create database if not exists bts; \
        use bts; \

        drop table if exists trips; \

        create table trips (
            vendor_id VARCHAR(16),		
            pickup_datetime DATETIME,
            passenger_count INT,
            trip_distance FLOAT,
            rate_code VARCHAR(16),
            fare_amount FLOAT,
            total_amount FLOAT,
            pickup_location_id VARCHAR(16),
            ...
        );
    ```
    
    22. Describe a table: *describe trips;*

    23. Dowload a file from Cloud Storage into local file 'trips.csv-1':
    ```sql
    gcloud storage cp \
    gs://cloud-training/OCBL013/nyc_tlc_yellow_trips_2018_subset_1.csv \
    trips.csv-1
    ```

    24. Load data into a table in mySQL:
    ```sql
    LOAD DATA LOCAL INFILE 'trips.csv-1' INTO TABLE trips
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (vendor_id,pickup_datetime,dropoff_datetime,passenger_count,trip_distance,rate_code,store_and_fwd_flag,payment_type,fare_amount,extra,mta_tax,tip_amount,tolls_amount,imp_surcharge,total_amount,pickup_location_id,dropoff_location_id);
    ```

    25. Append data from Cloud Storage into a table '2018trips' in a BQ dataset 'nyctaxi':
    ```sql
    bq load \
    --source_format=CSV \
    --autodetect \
    --noreplace  \
    nyctaxi.2018trips \
    gs://cloud-training/OCBL013/nyc_tlc_yellow_trips_2018_subset_2.csv
    ```
