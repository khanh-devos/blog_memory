---
category: tool
---

Some common commands in Cloud Shell

1. *gcloud auth list* : show persons

2. *gcloud config list project* : show projects

3. *bq show --schema --format=prettyjson  demo_dataset.external_table* : show schema

4. *export PROJECT_ID=$(gcloud config get-value project)*: create a ENV var.

5. ```sql
    export PROJECT_ID=$(gcloud config get-value project)
    bq mkdef \
    --autodetect \
    --connection_id=$PROJECT_ID.US.my-connection \
    --source_format=CSV \
    "gs://$PROJECT_ID/invoice.csv" > /tmp/tabledef.json
    ```

    - define a connection permission for a project to a file in Cloud Storage, save it into a file name "tabledef"

6. ```sql
    cat /tmp/tabledef.json
    ```
    
    - have a look at the file

7. ```sql
    bq show --schema --format=prettyjson  demo_dataset.external_table > /tmp/schema
    ```

    - get the schema, then save it into a file "schema"

8. ```sql
    bq update --external_table_definition=/tmp/tabledef.json --schema=/tmp/schema demo_dataset.external_table
    ```

    - Update the definitions of connection permission and schema into a bigquery table dataset "demo_dataset.external_table"

9. create a new bucket in Cloud Storage:
    ```sql
    gsutil mb -p  PROJECT_ID gs://PROJECT_ID
    ```

10. create a new dataset in BigQuery:
    ```sql
    bq mk -d  dataset_name
    ```

10.a. run a standard query in Computer Engine SSH:
    ```sql
    bq query \ 
    --use_legacy_sql=false \
    'SELECT * FROM `loadavro.campaigns`;'
    ```


11. Enable or Disable Cloud Run Function APIs
    ```sql
    gcloud services disable cloudfunctions.googleapis.com
    gcloud services enable cloudfunctions.googleapis.com
    ```

12. Download a file into a staging stage and move(copy) it into a bucket.
    ```sql
    wget https://.../file_name
    gcloud storage cp campaigns.avro gs://PROJECT_ID
    ```

13. use bts; | we do not need to use "FROM db_name.table1", use "FROM table1"

    <br>
14. Create a new Clound SQL instance "taxi":
    ```sql
    gcloud sql instances create taxi \
    --tier=db-n1-standard-1 \
    --activation-policy=ALWAYS
    ```

15. Set a root password for the Cloud SQL instance 'taxi':
    ```sql
    gcloud sql users set-password root \
    --host % \   
    --instance taxi \
    --password 123@KhanH
    ```
    
    '%' means users can connect from anyhost (localhost or others).

16. Take the IP address of the Cloud Shell: *'wget -qO - http://ipecho.net/plain'*


17. Get the IP address of a Cloud SQL instance:
    ```sql
    MYSQLIP=$(gcloud sql instances describe taxi \
    --format="value(ipAddresses.ipAddress)")
    ```

18. Set management access for Cloud Shell to a Cloud SQL instance via IP address:
    - *'gcloud sql instances patch taxi --authorized-networks $ADDRESS'*

19. Read an env var: *echo $MYSQLIP*

20. Log into a mysql and enable "loading data permission" with '--local-infile':
    ```sql
    mysql --host=$MYSQLIP \
    --user=root \
    --password --local-infile
    ```

21. create a database & a table with a schema in mySQL:
    ```sql
    create database if not exists bts;
    use bts;

    drop table if exists trips;

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

25. append data from Cloud Storage into a table '2018trips' in a BQ dataset 'nyctaxi':
    ```sql
    bq load \
    --source_format=CSV \
    --autodetect \
    --noreplace  \
    nyctaxi.2018trips \
    gs://cloud-training/OCBL013/nyc_tlc_yellow_trips_2018_subset_2.csv
    ```
