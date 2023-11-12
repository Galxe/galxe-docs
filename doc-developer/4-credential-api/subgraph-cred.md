---
sidebar_label: How to setup a pull-based SubGraph or GraphQL-sourced credential
sidebar_position: 3
slug: subgraph-cred
---
# How to setup a Subgraph or GraphQL-sourced credential

## Introductions

GraphQL-sourced credential, including Subgraph credential, is a way for Galxe to pull data from your GraphQL endpoint (or any endpoint that you are legally allowed to use).
When a user tries to verify himself on Galxe, Galxe will construct a GraphQL Query, where the address of the user will be passed in as the argument, and send it to the specified endpoint.
After response is received, it will be passed to the Javascript expression, where it will return  0(false)/1(true) to indicate whether the wallet address is eligible. 

The workflow is

```
galxe.com                          galxe backend                                 your backend
---------------------------------------------------------------------------------------------
user_address          ---->   GraphQL Query based on config             ---->        Endpoint
crendential for user  <----   Expression evaluation on response         <---- 
```

### GraphQL Endpoint (HTTPs):

It's the HTTPs endpoint where Subgraph queries go to, see the example below. 

**For security reasons, you must add *https://galxe.com* to the GraphQL server's [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header to avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues. We will perform a [CORS check](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS#preflighted_requests_in_cors) during the creation process, and if it's not included, the creation will fail.**

**And we require that requests must be responded to within 5 seconds; otherwise, we will cancel the request.**

Please note that for addresses encoded with case-insensitive schema, like EVM and aptos addresses that are 0x-prefixed hex string, addresses will be **lowercased** before sending to the endpoint.

NOTE: If you saw a error when testing the API during creating a credential, check if the endpoint is a **valid** GraphQL
API endpoint. Common misconfigurations include 

1. incorrectly used a GraphQL *playground* url, that usually ends with `/graph`,
2. incorrectly used a URL to the subgraph explorer page, like `https://thegraph.com/explorer/***`. Usually, the correct endpoint from subgraph is like this `https://api.thegraph.com/subgraphs/***`

### Query:

The GraphQL query, that it must take a single wallet address as input. For more detials, please refer to [Querying The Graph](https://thegraph.com/docs/en/querying/querying-the-graph/). In dashboard, once you finish your query, fill in a test address and click 'Run' button to check if the query's response is expected.

### Expression:

Expression is used to evaluate against the reponse to check if the address is eligible for the credential. 
It is a JavaScript (ES6) function of type signature: `(object) => int`.
The function should return either number 1 or 0, representing if the address is eligible for this subgraph credential. 
Behind the scenes, first, we send the query with the user's address to the GraphQL endpoint, and then we will apply the function against the `data` field of the [GraphQL HTTP response](https://graphql.org/learn/serving-over-http/#response).
If the returned value is 1, then user can own this credential, otherwise not. 
The function must be anonymous, which means that the first line of the expression should be like `function(data) {}`, instead of `let expression = (data) => {}`.

## Subgraph Examples

### Endpoint

```
https://api.thegraph.com/subgraphs/name/hyd628/nomad-and-connext
```

### Query

```graphql
query info($address: String!) {
  receiveds(
    where: {
      recipient: $address
      block_gt: 1400000
      token_in: [
        "0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9"
        "0x1DC78Acda13a8BC4408B207c9E48CDBc096D95e0"
        "0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7"
      ]
    }
  ) {
    id
  }
  fulfilleds(where: { user: $address, timestamp_gt: 1651986604 }) {
    id
    timestamp
  }
}
```

### Query output

```json
{
  "receiveds": [
    {
      "id": "0x000abcdefg..."
    }
  ],
  "fullfilleds": []
}
```

### Expression

```javascript
function(resp) {
  if (resp != null && (resp.fulfilleds != null && resp.fulfilleds.length > 0 || resp.receiveds != null && resp.receiveds.length > 0)) {
     return 1
  }
  return 0
}
```

### Expression output

```
1
```

## FAQ: Users getting 403 error?

Make sure the endpoint has whitelisted our server:

```
35.185.209.0
35.203.155.18
```
