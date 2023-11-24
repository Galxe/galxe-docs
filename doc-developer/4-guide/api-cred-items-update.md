---
sidebar_label: Use API to update credential Items
sidebar_position: 1
slug: api-cred-items-update
---
# Use API to update credential Items

## Prerequisite

1. First you need to create a credential that you want to use in your campaign. Please contact the galaxy BD team if you have no access/experience with galaxy dashboard before, they will help you to walk through the concepts of Galxe dashboard and give you access.
2. Then you will need an access token bound to your wallet address to use this API. Please go to the Galxe user setting page to generate an access token.
3. Please ensure that your wallet address has the necessary permissions to access the space to which the cred belongs. Typically, this would be the space's owner or admin. You can follow these steps to add an address as a space admin:
   1. Log in to Galxe using the space owner's address.
   2. Navigate to the Settings page in the left sidebar of the space details page.
   3. Click on the "Accounts" tab in the Settings page.
   4. Click on "Add new member".

## Endpoint

For more information on our GraphQL endpoint, please refer to [this doc](../6-graphql-api/overview.md).

## Input

1. (header, string, mandatory) access-token: use to auth if you have access to update credential items, the user with this access token must be the credential curator
2. (int, mandatory) credId: the credential id you want to update
3. (enum string, mandatory) operation:

   1. APPEND, append items in the list.
   2. REPLACE, remove all items and replace them with items in the list.
   3. REMOVE, remove items from the list.
4. (string array, mandatory) items: items list(address or email) to be modified, refer to operation.

### GraphQL

```graphql
mutation {
  credentialItems(
    input: {
      credId: "312"
      operation: APPEND
      items: [
        "0x111fd6240381af2c5f1a9e27f282bae8b92b257"
        "0x222dde76Cf5752f2bc1DC798BA1369dcA49d7c79"
        "0x333eC1a5d0BC3C4291aeb962CBda49677E9a9FcB"
        "0x444022af64bfc0f59ce1069e4ab51aa15148e60b"
        "0x55526ef96b12fba7a507afba39bdfc78e0039742"
        "0x6662c6b59e87b302b43400303427acd50f8071e6"
        "0x777742ee649ee36edcf5ac9a97df34333a97fd24"
        "0x8886b92fda46b8d9d33ca28d8837e1661edf8b97"
        "0x999886e265cf2ec39f8868d7b6c67ab78e027736"
      ]
    }
  ) {
    eligible(address:"0x999886e265cf2ec39f8868d7b6c67ab78e027736")
  }
}
```

## Examples

### Node.js

```typescript
const credId = "123";
const operation = "APPEND";
const items = ["0x123"];

// Nodejs using Axios lib
let axiosRes = await axios.post("https://graphigo.prd.galaxy.eco/query", {
  operationName: "credentialItems",
  query: `
    mutation credentialItems($credId: ID!, $operation: Operation!, $items: [String!]!) 
      { 
        credentialItems(input: { 
          credId: $credId 
          operation: $operation 
          items: $items 
        }) 
        { 
          name 
        } 
      }
    `,
    variables: {
      // Make sure this is string type as int might cause overflow
      credId: credId,
      operation: operation,
      items: items
    },
  },
  {
    headers: {
      "access-token": "access-token-of-yours",
    }
  }
);

console.log(axiosRes.data);
```