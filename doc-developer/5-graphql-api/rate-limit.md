---
sidebar_position: 2
---

# Rate Limit

To help manage the sheer volume of the requests we receive on our api, limits are placed on the number of requests that can be made. These limits help us provide the reliable and scalable API that our developer community relies on.

The maximum number of requests that are allowed are:

**3000 requests/5 minutes**

When an application exceeds the rate limit for a given API endpoint, the API will return a HTTP 429 “Too Many Requests” response code.

Note that this page is not an exhaustive listing of all Galxe rate limits or rate-limited endpoints, that some users may experience different rate limit thresholds from those shown, and that rate limits are subject to change at any time.
