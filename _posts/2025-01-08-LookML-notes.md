---
category: tool
---

This post is used to collect some key concepts and syntax in Looker.

Terms used in Looker:
- *database dialet*: refers to SQL syntax of a particular DB management system like Postgresql, MySQL, or Oracle ...
- *View* (.view) : defines a table in Looker, like a schema for a dataset, including "dimensions" and "measures".
- *Explores* : a combination of many "views" joined together
- *Model* (.model) : define database connection & a container for "explores".


1. Key concepts:
    - Dashboard: 
    - Boards:
    - My Folder: a personal folder (only you can see). (*new subfolder can be created*)
    - Shared Folder: shared across an organisation (most people can see).
        - We can create many new sub-folders inside this "shared folder", we can create like Sales subfolder, Inventory subfolder, Clients subfolder,...

    - People folders: shows all folders that we have permission to access.

    - **SHARING = DATA DELIVERY**
        - sharing or *scheduling* a look file: || can schedule to send a Look every Friday at 3pm.
        - sharing or *scheduling* a dashboard: || can even schedule and choose Timezone of the recipient by ticking "Run schedule as recipient".
        - ![recipient-timezone setting]({{ 'assets/looker/can-schedule-on-timezone-recipient.jpg' | relative_url}}){: .toggled-image}

    


2. Key syntaxes: *${...}*
    - **concat(str1, str2)**: aggregating all strings => concat(${}, "123", ${})
    - ![concat(str1, str2)]({{ 'assets/looker/concat.jpg' | relative_url}}){: .toggled-image}

    - **round(${orders.amount}, 0)** : rounding a number to the nearest integer with 0 decimal digits.

    - **mean(${orders.amount})** : calculate an average.

    - **if(${movie.revenue} > ${movie.budget}, "yes", "no")** : condition syntax.

    - **if(extract_months(${user.created_date})=8, "August", "Others")**: take only the month from a date.
    - ![extract_months()]({{ 'assets/looker/extract_months.jpg' | relative_url}}){: .toggled-image}

    - **diff_months(${user.created_date}, now())** : how many months from now.

    - ${order_items.order_count:total} || 'total' = sum() all.
    - **Offset calculations**: ('offset' means 'jumping')
        - **regular_offset()**: reference to upper or lower row in a column.
            - offset(${orders.total_revenue}, 1) : show previous month revenue in the same column following *the order* of the table.
            - offset(${orders.total_revenue}, -1) : show subsequent(next) month in revenue in the same column following *the order* of the table.
        - ![offset()]({{ 'assets/looker/offset-in-looker.jpg' | relative_url}}){: .toggled-image}


        - **offset_list()**: (rarely) reference to multiple rows and combine them in one row, mainly for calculating *rolling average*.
        - ![offset_list]({{ 'assets/looker/offset_list.jpg' | relative_url}}){: .toggled-image}

        - **pivot_offset()**: reference column to the left or right (should be in a pivoted feature)
            - pivot_offset(${orders.total_revenue}, -1) : show same month revenue of previous year (column) following the *pivot dimension* of the table.
        - ![pivot_offset]({{ 'assets/looker/pivot_offset.jpg' | relative_url}}){: .toggled-image}

    - filters: [order_is_canceled: "Yes"]
    
    - ```sql
    sql: 1.0*${total_revenue_from_canceled_orders}/NULLIF(${total_revenue}, 0) ;;
    ```

3. **For LookML developer :**
  
    - **BI (Business Intelligence)**: Looker can help to create and monitor some KPIs like "number of new users" in the dashboard below:
    - ![KPIs in Dashboard]({{ 'assets/looker/KPIs-in-Dashboard.jpg' | relative_url}}){: .toggled-image}

    - Connecting to Database is handled by Admin but LookML developer can see this connections by clicking "Develop" => "SQL Runner" at the top left corner.

    - **Ctrl+Shift+D**: is a short-cup to open the "Development Mode" in LookML. Alternatively, at top left corner, click "Develop" => "Projects" => turn on "Development Mode" => choose the project NAME "training_ecommerce" inside an built-in IDE of Looker.
    
    - ![an IDE in Looker]({{ 'assets/looker/IDE-in-Looker.jpg' | relative_url}}){: .toggled-image}

    - **Version Control**: available in LookML IDE:
        - allow a collaboration as a normal Git.
        - Can revert "uncommited changes"
        - "Project health" is a tool to check whether a change is correct or not.
        - Any time we open the "Development Mode" a new local branch will be auto created by LookML for developing.

    - ![Git-in-Looker]({{ 'assets/looker/git-in-Looker.jpg' | relative_url}}){: .toggled-image}

    - Note: *Best practise is always do the "Pulling" from the Production before developing a new feature.*
    - ![Pulling from Production first]({{ 'assets/looker/Pulling-first.jpg' | relative_url}}){: .toggled-image}

    - **Validation & Commit changes and Push**:
        - We can use "validate LookML" to validate any changes we make.
    - ![Validation-in-LookML]({{ 'assets/looker/validation-tool-in-LookML.jpg' | relative_url}}){: .toggled-image}

    - Before "Deploy to Production" we should do the "Project Health" test.
    - Resolve "Merge conflichts" can be done in LookML IDE as well.

4. LookML (Looker Model Language): *any SQL queries will be able to be re-written by LookML to achive the same task*.

    - A LookML Object hierarchy: Project > Model > Explore > View (order_items.view)
    - A project is mapped 1-to-1 to a Git repository.
    - A View should contains "Dimensions" and "Measures"

    - **Model dimensions & Model measures**: (*Before commiting, we can try our new dimension or measure locally at the Explore component, just refresh it*)
    - ![Custom-model-dimensions-measures]({{ 'assets/looker/custom-model-dimensions-and-measures.jpg' | relative_url}}){: .toggled-image}

    - Advanced dimensions & measures with "filter": 
    - ![Advanced-custom-model-dimensions-measures]({{ 'assets/looker/advanced-custom-dimensions.jpg' | relative_url}}){: .toggled-image}

    - Practice:
    - ![example-custom-measure]({{ 'assets/looker/example-custom-measures.jpg' | relative_url}}){: .toggled-image}

    - **Dashboard**: *there are 2 types of dashboard: new-user(personal) and general dashboards*. To create a general dashboard, use "Views", for a personal dashboard, select then insert (import) it into folder "My Folder".

    - ![custom-dashboard]({{ 'assets/looker/make-custom-dashboard.jpg' | relative_url}}){: .toggled-image}

    - How to get a code source of a dashboard
    - ![get-source-of-a-dashboard]({{ 'assets/looker/get-dashboard-source.jpg' | relative_url}}){: .toggled-image}

5. Modelling a "NEW EXPLORES" (like "Flights" or "E-commerce"):
    - It's similar to creating a dimension or a measure.
    - ![creat-a-new-explore]({{ 'assets/looker/make-a-new-explore.jpg' | relative_url}}){: .toggled-image}

    - Sometimes, we have to join multi-tables at the same time:
    - Sometimes, we have to join one table many times, we have to use an unique alias-names (a medium), both of them reference to the same tables. *For example: aircraft_origin & aircraft_destination basically refer to the same table "airports"*.
    - Indirect join (should not use), we can also join a new view to an existing another view inside an explore.
    - ![join-many-tables-many-times]({{ 'assets/looker/join-many-tables-many-times.jpg' | relative_url}}){: .toggled-image}

    - **Key filters in Explores** there are 3 types:
    - ![key-filters-in-explores]({{ 'assets/looker/key-filters-in-explores.jpg' | relative_url}}){: .toggled-image}
        - **sql_always_where & sql_always_having**: this filter cannot be modified by business users and be invisible to business users unless they have permission. We can use this filter to show personal data like sensitive data.
        - **always_filter** : show up and be accessible and modifiable by business users, but they cannot remove the filter. 
        - **conditionally_filter** : these filters can be seen, modified and removed by business users.
        - ![always-filter]({{ 'assets/looker/always_filter.jpg' | relative_url}}){: .toggled-image}
        
    - **Symmetric aggregation** (count, ...): we need to define the "*join relationship*" based on the primary key.
    - ![symmetric-aggregation]({{ 'assets/looker/symmetric-aggregation-in-explores.jpg' | relative_url}}){: .toggled-image}

6. **Derived Tables**: 
    - There are 2 types: 
        - a SQL derived table: created by a custom SQL.
        - a NDT (native derived table): created inside LookML. (maximum reusability)

    - Using a SQL derived table: enable "Development Mode" => "SQL Runner" => write a query to create a SQL derived table => Add to your project as a new View. We can also see back it inside "File Browser". *Some dimensions and measures can be auto-created by LookerML, we should check to hide them or modify them if necessary.* (*Warning: remove "LIMIT" in the query, and establish new "Primary-Key"*)
    - ![SQL-derived-table]({{ 'assets/looker/SQL-derived-table.jpg' | relative_url}}){: .toggled-image}

    - For Native Derived Table (Development mode): we can take "*its auto-generated 'LookML code'*" by clicking "Get LookML" > choose "derived table" tab > copy the "LookML code" > *we can create a new VIEW with this LookML-code*. We can add more dimensions into this code if we want.
    - ![SQL-from-NDT]({{ 'assets/looker/SQL-from-native-derived-table.jpg' | relative_url}}){: .toggled-image}

    - Example of a LookML code:
    - ![a-LookML-code]({{ 'assets/looker/a-LookML-code.jpg' | relative_url}}){: .toggled-image}

7. Cache with datagroup: caching is triggered with "datagroup"
    - Build a datagroup before enabling it. (*sql_trigger runs be default every 5 minutes in Looker, set only by Admin*)
    - ![create-a-datagroup]({{ 'assets/looker/create-a-datagroup.jpg' | relative_url}}){: .toggled-image}

    - Notice: *Each objects (model & explore, PDT, Looks & dashboard) will have different ways to apply caching*:
    - ![types-of-caching]({{ 'assets/looker/types-of-caching-with-datagroup.jpg' | relative_url}}){: .toggled-image}

    - **Persistent derived Table (PDT)** : after creating a new PDT, this *persistent derived table* will be saved into the database for optimizing a query. The best-practice name for a PDT is "teach-scratch.xxxx.xxx"

    - Create and Apply datagroup in a model:
    - ![apply-datagroup-in-a-model]({{ 'assets/looker/example-datagroup-applied-in-model.jpg' | relative_url}}){: .toggled-image}

    - Create and Apply datagroup in an explore "order_items":
    - ![apply-datagroup-in-an-explore]({{ 'assets/looker/example-datagroup-applied-in-explore.jpg' | relative_url}}){: .toggled-image}

    - Example to persist a derived table: (*the "WITH" clause in the SQL will be replaced or removed because its medium table is persisted in cache already as adding the "datagroup_trigger"*)
    - ![persist-a-derived-table]({{ 'assets/looker/persist-a-derived-table.jpg' | relative_url}}){: .toggled-image}

    - **Warning**: "persist_with" cannot be used for OAuth (login by third parties like Google or Facebook) for BigQuery, instead using "persist_for".

8. Best Practices:
    - description: "A value equal to Yes means that the order..."
    - label: "Total Revenue Lost From Canceled Orders"
    - hidden: yes
    - fields: [ALL_FIELDS*, -users.city, -users.email, -users.first_name, -users.gender, -users.last_name, -users.state] (*inside an explore*)
    - group_label: "Location"  (*both explore & dimension*)

9. 