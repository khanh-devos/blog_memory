---
category: tool
---

It will depend on what type of goal we want to analyze, we will have some common features or concepts:

1. FOR TRANSACTIONS:
    1. *total bounces* [null, 1]: "1" means a user visits a single page on the website and leaves without interacting. 'null' means the user makes some interactions. A high bounce rate (too many "1") can indicate potential issues with user experience, content, or targeting strategies

    2. *total new visits* [null, 1]: "1" is the first time of a new user to visit the page in a session, so "1" means "a new user coming". (*a session starts from the moment a new user opens the webpage and ends when he closes the site.*)

    3. *ecommerceAction.action_type* [0,1,2,3,5,7,8]: 1=click to see product list, 2=product details, 3=add to cart, 4=remove from cart, 5=checkout, 6=purchase, 7=Refund, 8=checkout, 0=unknown or others. Usually this feature belongs to "hit" category

    4. *timeOnSite* [seconds]: time to remain in the page in a session.
    - *pageViews* [1,2,3,4,...,20]: total number of pages within a session.

    5. *trafficSource.source* : way to land the page, by the google search engine or direct opening, "google", "bing", "direct".
    
    6. *trafficSource.medium* ['organic','referal','cpc', 'direct', ...]: identify the type of traffic source that brings users to a website. It's to measure and compare the effectiveness of different marketing channels.

        - "Organic": Refers to visitors who arrive through unpaid search engine results.
        - "cpc" (Cost-Per-Click): Indicates paid traffic from ads, such as those from Google Ads or Facebook Ads.
        - "Referral": Represents traffic that comes from other websites, excluding search engines.
        - "cpm": a model of online advertising where advertisers pay for every 1000 impressions of their ad, regardless of whether users click on it.
        - "affiliate": a partnership model where affiliates (partners) promote a product or service and earn a commission for every lead, click, or sale they generate.
        - *utm_medium=parameter* : "utm" means Urchin Tracking Module to track a specific marketing campaign. "Parameter" could be "cpc", "cpm", "email", "social", "affiliate".

    7. *channelGrouping*: it is a mechanism used by Google to organize traffic sources into logical categories like: Organic Search, Paid Search, Direct, Referral, Social, Email.

    8. *DeviceCategory* [true, false] : If the user is on a mobile device, then true, otherwise false.

    9. *geoNetwork.country* : the country where the session originated, based on IP address.
