---
sidebar_position: 3
---

# Examples

For more information on our GraphQL endpoint, please refer to [this doc](../6-graphql-api/overview.md).

## Query NFT holders by EVM Contract

`address`: Contract address

```graphql
query nftHolders {
  nftCore(address: "0xc2aCEb37f0A79c4f4437Dd79507D9f4A30735a5C") {
    holders(first: 1000, after: "") {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      list {
        address
      }
    }
  }
}
```

## Query NFT holders by Campaign

`id`: Galxe campaign ID

```graphql
query nftHolders {
  campaign(id: "GCto8UUcU9") {
    holders(first: 1000, after: "") {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      list {
        address
      }
    }
  }
}
```

## Get Credential metadata

### Subgraph type credential

```graphql
query credMetadata {
  credential(id: 212) {
    name
    description
    credType
    chain
    curatorAddress
    referenceLink
    subgraph {
      endpoint
      query
      expression
    }
  }
}
```

Example response:

```json
{
  "data": {
    "credential": {
      "name": "Balancer Trader on Ethereum",
      "description": "Any address that traded on Balancer V2 on Ethereum Mainnet",
      "credType": "EVM_ADDRESS",
      "chain": "ETHEREUM",
      "curatorAddress": "",
      "referenceLink": "",
      "subgraph": {
        "endpoint": "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2",
        "query": "query user($address: String){\n  pools(where:{address:$address})\n  {\n    id\n    address\n  }\n}\n",
        "expression": "function(data) {\n  if (data == null || data.pools == null) {\n    return 0\n  } else if (Array.isArray(data.pools) && data.pools.length == 0) {\n    return 0\n  }\n  return 1\n}"
      }
    }
  }
}
```

### EVM Addresses type credential

```graphql
query credMetadata {
  credential(id: 442) {
    name
    description
    credType
    chain
    itemCount
  }
}
```

Example response:

```json
{
  "data": {
    "credential": {
      "name": "CyberConnect Verified ",
      "description": "**Completed Twitter Verification on CyberConnect.** \n- Head over to [app.cyberconnect.me](https://app.cyberconnect.me) and connect your wallet to access your profile. \n- On CyberConnect profile page, click on the “Verify Twitter” button and follow the ins",
      "credType": "EVM_ADDRESS",
      "chain": "MATIC",
      "itemCount": 27902
    }
  }
}
```

## Query NFT Metadata

```graphql
query nftMetadata {
  nftInfo(id: 1, nftCoreAddress: "0x0062bB52986EbeaE585898E63667D9D760Ff75A0") {
    id
    nftCore {
      name
    }
    campaign {
      name
      id
      info
    }
    chain
    name
    image
    ipfsImage
    category
    description
    owner {
      address
    }
    status
    createdAt
    createBlock
    animationURL
    traits {
      displayType
      name
      value
    }
  }
}
```

Response:

```json
{
  "data": {
    "nftInfo": {
      "id": "1",
      "nftCore": {
        "name": "1inch Network"
      },
      "campaign": {
        "name": "1inch x Galxe NFT raffle",
        "id": "GCk3oUU83c",
        "info": "The legendary 1inch cyber unicorn has managed to get the powers of all the three major chains. And seems like no one can stop him from dominating the DeFi world. 5 lucky winners will be chosen randomly on August 3rd. To enter:\n\n• Follow both [@1inch](https://twitter.com/1inch) & [@GalxeHQ](https://twitter.com/GalxeHQ) on Twitter\n\n• Like and retweet this post\n\n• Reply with [#1inchNFT](https://twitter.com/hashtag/1inchNFT) hashtag"
      },
      "chain": "ETHEREUM",
      "name": "1inch Cyber Unicorn",
      "image": "https://d257b89266utxb.cloudfront.net/galaxy/images/1inch/1inch_Cyber_Unicorn.jpg",
      "ipfsImage": "",
      "category": "",
      "description": "",
      "owner": {
        "address": "0xFfD5352e54460765CD8e74c0cc071417b4E5279A"
      },
      "status": "Alive",
      "createdAt": "1628070326",
      "createBlock": 0,
      "animationURL": "",
      "traits": []
    }
  }
}
```

## Query user profile and credentials

```graphql
query userCredentials {
  addressInfo(address: "0xb85b3D61439a3d70D3DF7913a3A764F352b32C55") {
    id
    avatar
    username
    eligibleCredentials(first: 10, after: "") {
      list {
        id
        name
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "addressInfo": {
      "id": "cAJyNCquve6qGYpV7dCk4b",
      "avatar": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/GrsBF2kvDW5t73fpeDYJMvK99NH9JDrr7njt5oucb5va-1649700058.png",
      "username": "blin",
      "eligibleCredentials": {
        "list": [
          {
            "id": "472",
            "name": "2021 NAOS Christmas Participants "
          },
          {
            "id": "471",
            "name": "2021 Christmas $Vera staker"
          },
          {
            "id": "470",
            "name": "zkLink 2021 Christmas Participants"
          },
          {
            "id": "469",
            "name": "Yearn Holiday Subscribooooor"
          },
          {
            "id": "466",
            "name": "2021 Hashflow Holiday Trader"
          },
          {
            "id": "465",
            "name": "2021 Christmas WOOFi staker"
          },
          {
            "id": "464",
            "name": "2021 Christmas $POTS Staker"
          },
          {
            "id": "442",
            "name": "CyberConnect Verified "
          },
          {
            "id": "454",
            "name": "Let’s CyberConnect"
          },
          {
            "id": "455",
            "name": "CyberConnect Dwellers"
          }
        ]
      }
    }
  }
}
```

## Space Access

### User

#### Query profile and credential

### Credential

#### Query credential items

#### Update credential items

### Campaign

#### Query campaign participants

Arguments:

| Name                                                     | Type                                                | Description                                      |
|----------------------------------------------------------|-----------------------------------------------------|--------------------------------------------------|
| [`id`](../6-graphql-api/references/queries/campaign.mdx) | [`ID!`](../6-graphql-api/references/scalars/id.mdx) | Campaign hashid.                                 |
| <a id="querycampaignParticipants"></a>`pfirst`           | [`Int!`](#string)                                   | Query limit.                                     |
| <a id="querycampaignParticipants"></a>`pafter`           | [`String!`](#string)                                | Query offset.                                    |
| <a id="querycampaignParticipants"></a>`pDownload`        | [`Boolean!`](#string)                               | Download the participant's primary address.      |
| <a id="querycampaignParticipants"></a>`isParent`         | [`Boolean!`](#string)                               | Parent campaign, if true skip query participants |


Request:

```grapgql
query campaignParticipants(
  $id: ID!, 
  $pfirst: Int!, 
  $pafter: String!, 
  $pDownload: Boolean!, 
  $isParent: Boolean!) {
  campaign(id: $id) {
    id
    numberID
    numNFTMinted
    participants @skip(if: $isParent) {
      participants(first: $pfirst, after: $pafter, download: $pDownload) {
        list {
          username
          avatar
          address
          email
          solanaAddress
          aptosAddress
          seiAddress
          discordUserID
        }
      }
      participantsCount
    }
  }
}
```

V﻿ariables:

```json
{
  "pDownload": false,
  "isParent": false,
  "id": "GCn45UjHXE",
  "pfirst": 1,
  "pafter": "-1"
}
```

Response:

```json
{
  "data": {
    "campaign": {
      "id": "GCn45UjHXE",
      "numberID": 151178,
      "numNFTMinted": 0,
      "participants": {
        "participants": {
          "list": [
            {
              "username": "oojojoj",
              "avatar": "https://source.boringavatars.com/marble/120/0x00000000ccd193975907ddb660b4692bb4257f9f",
              "address": "0x00000000ccd193975907ddb660b4692bb4257f9f",
              "email": "",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "discordUserID": ""
            }
          ]
        },
        "participantsCount": 306409
      }
    }
  }
}
```

#### Query NFT holder by campaign

#### Create campaigns

#### Claim OAT campaigns on third-party website

### Space

#### Query campaign list

#### Query NFT holder by contract

#### Query leaderboard data

#### Distribute loyalty points

## Open Access

### User

#### Query profile and credential

### Credential

#### Query credential items

### Campaign

#### Query campaign participants

### Space

#### Query campaign list

#### Query leaderboard data