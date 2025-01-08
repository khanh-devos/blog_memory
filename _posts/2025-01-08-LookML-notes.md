---
category: tool
---

This post is used to collect some key concepts and syntax in Looker.

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

