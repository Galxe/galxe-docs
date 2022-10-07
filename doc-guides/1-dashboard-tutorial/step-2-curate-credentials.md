---
sidebar_label: Step 2 - Curate Credentials
sidebar_position: 4
slug: /
---

# Step 2 - Curate Credentials

## Supported Credential Data Sources

Currently we support curating credentials through multiple data sources:

- CSV file
- Subgraph endpoint
- GraphQL endpoint
- REST endpoint

## CSV Credential File

### Via Galxe Dashboard

- The user can see and select all credentials from any user while creating the space campaign, but on the “Credential” - “My Credential List” page, the user can only see and edit their own created credential list.
- The user can download the existing whitelist file
- The user can easily upload addresses in batches at once with the following file requirements:
  - The file needs to be CSV format (Without Comma)
  - Each address must not be duplicated
  - The file should not contain headers
- The user can also create a reference link for credentials as needed.

#### Create/edit CSV Credentials

1. Click "Credential" to go to "My Credential List" page
2. Click "Create New Credential"
3. Fill up the Credential Title
4. Select the deployed Network
5. Upload the CSV file
   1. Error Alert if CSV file contained duplicated address and invalid address
6. Fill up the Credential Description
7. Fill up the reference link (If needed)
8. Click "Create"
9. Confirm to create the Credential by clicking "Sign" on the signature request
10. Made a mistake? No worries! You can always come back to edit the credentials that you have created

![Credential.png](assets/Credential.png)

Or check out this video for instructions: [https://youtu.be/EeE2Ngv7oEo](https://youtu.be/EeE2Ngv7oEo)

### Via credential update API

Alternatively, you can call our credential API to skip the manual steps in the dashboard.

More info [here](../../developer/guide/api-cred-items-update)

## Subgraph/GraphQL Credential Endpoint

> 💡 We are adding Galxe dashboard support to create subgraph Credentials in a self-serve fashion. Before that, please contact Galxe team for assistance.

Subgraph and GraphQL typed Credentials consist of: endpoint, query, expression, and header. The only difference being subgraph is specific to the subgraphs hosted on [thegraph](https://thegraph.com/). Galxe will send `query` to the `endpoint` with `header`, and process the returned data with `expression`. For example:

endpoint:

```
https://api.xxx.com/cred/
```

header:

```tsx
{"Authorization": "key"}
```

query:

```graphql
query getEligibility($address: String!) {
  campaignEligibility(address: $address) {
    eligible
  }
}
```

expression:

```tsx
function(data){
 if(data != null && data.campaignEligibility != null && data.campaignEligibility.eligible) {
   return 1
 }
 return 0
}
```

When `expression` returns 1, the address we checked is now confirmed to have this credential.

## REST Credential Endpoint

A REST typed credential endpoint consists of three parts: endpoint, header and expression. Similar to subgraph/graphql, Galxe will send a `GET` request to the `endpoint` with `header`, and process the returned data with `expression`. For example:

endpoint (`$address` will be swapped out with the wallet address we need to check):

```
https://api.xxx.com/cred/address=$address
```

header:

```tsx
{"Authorization": "key"}
```

expression:

```tsx
function(data){
 if(data != null && data.campaignEligibility != null && data.campaignEligibility.eligible) {
   return 1
 }
 return 0
}
```

When `expression` returns 1, the address we checked is now confirmed to have this credential.
