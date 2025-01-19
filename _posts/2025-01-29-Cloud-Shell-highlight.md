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


