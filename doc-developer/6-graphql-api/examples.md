---
sidebar_label: Examples
sidebar_position: 3
slug: api-examples
---

# Examples

For more information on our GraphQL endpoint, please refer to [this doc](../6-graphql-api/overview.md).

## Space Access

### User

#### Query profile and credential

### Credential

#### Query credential items

#### Update credential items

### Campaign

#### Query campaign participants

Arguments:

| Name                                                                        | Type                                                          | Description                                      |
|-----------------------------------------------------------------------------|---------------------------------------------------------------|--------------------------------------------------|
| [`id`](../6-graphql-api/references/queries/campaign.mdx)                    | [`ID!`](../6-graphql-api/references/scalars/id.mdx)           | Campaign hash id.                                |
| [`pfirst`](../6-graphql-api/references/objects/campaign-participant.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)         | Query limit.                                     |
| [`pafter`](../6-graphql-api/references/objects/campaign-participant.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx)   | Query offset.                                    |

Request:

```graphql
query campaignParticipants($id: ID!, $pfirst: Int!, $pafter: String!) {
  campaign(id: $id) {
    id
    numberID
    numNFTMinted
    participants {
      participants(first: $pfirst, after: $pafter) {
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

Variables:

```json
{
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
        "participantsCount": 310277
      }
    }
  }
}
```

#### Query NFT holder by campaign

Arguments:

| Name                                                                           | Type                                                        | Description       |
|--------------------------------------------------------------------------------|-------------------------------------------------------------|-------------------|
| [`id`](../6-graphql-api/references/queries/address-info.mdx)                   | [`ID!`](../6-graphql-api/references/scalars/id.mdx)         | Campaign hash id. |
| [`block`](../6-graphql-api/references/objects/campaign-nftholder-snapshot.mdx) | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Chain block.      |
| [`first`](../6-graphql-api/references/objects/campaign-nftholder-snapshot.mdx) | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query limit.      |
| [`after`](../6-graphql-api/references/objects/campaign-nftholder-snapshot.mdx) | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Query offset.     |

Request:

```graphql
query NFTHolders($id: ID!, $block: Int!, $first: Int!, $after: String!) {
  campaign(id: $id) {
    nftHolderSnapshot{
      holders(block: $block, first: $first, after: $after) {
        list {
          id
          holder
        }
        totalCount
        edges {
          node {
            id
            holder
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
}       
```

Variables:

```json
{
  "id": "GCCw3UD1eD",
  "block": 47291627,
  "first": 1,
  "after": "-1"
}
```

Response:

```json
{
  "data": {
    "campaign": {
      "nftHolderSnapshot": {
        "holders": {
          "list": [
            {
              "id": "1",
              "holder": "0x102daf0f0b6c5f467dc0dab22c957c412e57b4aa"
            }
          ],
          "totalCount": 1,
          "edges": [
            {
              "node": {
                "id": "1",
                "holder": "0x102daf0f0b6c5f467dc0dab22c957c412e57b4aa"
              },
              "cursor": "1"
            }
          ],
          "pageInfo": {
            "startCursor": "1",
            "endCursor": "1",
            "hasNextPage": true,
            "hasPreviousPage": false
          }
        }
      }
    }
  }
}
```

#### Create campaigns

Arguments:

| Name                                                          | Type                                                                                   | Description       |
|---------------------------------------------------------------|----------------------------------------------------------------------------------------|-------------------|
| [`input`](../6-graphql-api/references/mutations/campaign.mdx) | [`MutateCampaignInput!`](../6-graphql-api/references/inputs/mutate-campaign-input.mdx) | Campaign hash id. |

Request:
```graphql
mutation addCampaign($input: MutateCampaignInput!) {
  campaign(input: $input) {
    id
    numberID
    name
    claimEndTime
  }
}
```

Variables:
```json
{
  "input": {
    "daoId": 2,
    "nftCoreId": 0,
    "name": "eeeeee",
    "description": "eeeeee",
    "thumbnail": "",
    "startTime": 1694793600,
    "endTime": 1698336000,
    "status": "Active",
    "formula": "",
    "cap": 1,
    "gasType": "Gas",
    "isPrivate": true,
    "type": "Bounty",
    "requireIntegrate": false,
    "nftTemplates": [],
    "tokenReward": {
      "tokenLogo": "",
      "tokenDecimal": "",
      "userTokenAmount": "",
      "tokenAddress": "",
      "tokenSymbol": "",
      "tokenRewardId": 0
    },
    "children": [],
    "distributionType": "RAFFLE",
    "rewardName": "ee",
    "credentialGroups": [
      {
        "conditions": [
          {
            "expression": "true"
          }
        ],
        "conditionRelation": "ALL",
        "rewards": [
          {
            "expression": "5",
            "rewardType": "LOYALTYPOINTS"
          },
          {
            "expression": "1",
            "rewardType": "CUSTOM"
          }
        ],
        "credentials": []
      }
    ],
    "taskConfig": {
      "rewardConfigs": []
    },
    "rewardType": "EVM",
    "rewardInfo": {}
  }
}
```

Response:
```json
{
  "data": {
    "campaign": {
      "id": "GCFEXUtxc1",
      "numberID": 5448,
      "name": "eeeeee",
      "claimEndTime": null
    }
  }
}
```

#### Claim OAT campaigns on third-party website
Use GraphQL API get campaign info

Request:
```graphql
mutation claim {
  prepareParticipate(input: {
    signature:  ""            # keep empty
    campaignID: "{{campaignHashID}}" # campaign hash id
    address:    "{{userAddr}}"  # user address
  }) {
    allow              # Is allow user claim nft
    disallowReason     # Disallow reason
  }
} 
```

Response:
```json
{
  "data": {
    "prepareParticipate": {
      "allow": true,
      "disallowReason": ""
    }
  }
}
```

### Space

#### Query campaign list

Arguments:

| Name                                                                 | Type                                                                               | Description             |
|----------------------------------------------------------------------|------------------------------------------------------------------------------------|-------------------------|
| [`id`](../6-graphql-api/references/queries/space.mdx)                | [`Int!`](../6-graphql-api/references/scalars/int.mdx)                              | Space id.               |
| [`alias`](../6-graphql-api/references/objects/space.mdx)             | [`String!`](../6-graphql-api/references/scalars/string.mdx)                        | Space alias.            |
| [`campaignInput`](../6-graphql-api/references/queries/campaigns.mdx) | [`ListCampaignInput!`](../6-graphql-api/references/inputs/list-campaign-input.mdx) | Campaigns query params. |

Request:

args:

campaigns:[`CampaignConnection`](../6-graphql-api/references/objects/campaign-connection.mdx)

```graphql
query CampaignList($id: Int, $alias: String,  $campaignInput: ListCampaignInput!) {
    space(id: $id, alias: $alias) {
        id
        name
        alias
        campaigns(input: $campaignInput) {
            pageInfo {
                endCursor
                hasNextPage
            }
            list {
                id
                name
            }
        }
    }
}
```

Variables:

```json
{
  "alias": "bnbchain",
  "campaignInput": {
    "forAdmin": false,
    "first": 2,
    "after": "-1",
    "excludeChildren": true,
    "gasTypes": null,
    "credSources": null,
    "rewardTypes": null,
    "chains": null,
    "statuses": null,
    "listType": "Newest",
    "types": [
      "Drop",
      "MysteryBox",
      "Forge",
      "MysteryBoxWR",
      "Airdrop",
      "ExternalLink",
      "OptIn",
      "OptInEmail",
      "PowahDrop",
      "Parent",
      "Oat",
      "Bounty",
      "Token",
      "DiscordRole",
      "Mintlist",
      "Points",
      "PointsMysteryBox"
    ],
    "searchString": null
  }
}
```

Response:

```json
{
  "data": {
    "space": {
      "id": "40",
      "name": "BNB Chain",
      "alias": "bnbchain",
      "campaigns": {
        "pageInfo": {
          "endCursor": "1",
          "hasNextPage": true
        },
        "list": [
          {
            "id": "GCU8jUP7RS",
            "name": "BNB Chain Ecosystem Catalyst Awards -  Trailblazers"
          },
          {
            "id": "GCis8Uj4gL",
            "name": "BNB Chain 3 YA NFT "
          }
        ]
      }
    }
  }
}
```

#### Query NFT holder by contract

Arguments:

| Name                                                          | Type                                                        | Description       |
|---------------------------------------------------------------|-------------------------------------------------------------|-------------------|
| [`address`](../6-graphql-api/references/queries/nft-core.mdx) | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Contract address. |
| [`first`](../6-graphql-api/references/objects/nftcore.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query limit.      |
| [`after`](../6-graphql-api/references/objects/nftcore.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Query offset.     |


Request:
```graphql
query nftHolders($address: String!, $first: Int!, $after: String!) {
  nftCore(address: $address) {
    holders(first: $first, after: $after) {
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

Variables:
```json
{
  "address": "0x9d3895D07bF07A791Ef8d015Ab10997D22179E5c",
  "first": 2,
  "after": "-1"
}
```

Response:
```json
{
  "data": {
    "nftCore": {
      "holders": {
        "totalCount": 3,
        "pageInfo": {
          "startCursor": "0",
          "endCursor": "1",
          "hasNextPage": true,
          "hasPreviousPage": false
        },
        "list": [
          {
            "address": "0x000000000A38444e0a6E37d3b630d7e855a7cb13"
          },
          {
            "address": "0x00000015E180b01c40b881e10774Bc784bB6F4Eb"
          }
        ]
      }
    }
  }
}
```

#### Query leaderboard data
##### Overall
Arguments:

| Name                                                        | Type                                                        | Description                                       |
|-------------------------------------------------------------|-------------------------------------------------------------|---------------------------------------------------|
| [`id`](../6-graphql-api/references/queries/space.mdx)       | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Space id.                                         |
| [`first`](../6-graphql-api/references/objects/space.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query limit.                                      |
| [`after`](../6-graphql-api/references/objects/space.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Query offset.                                     |
| [`order`](../6-graphql-api/references/objects/space.mdx)    | [`LoyaltyPointsRankOrder`]()                                | Sort by Points/GalxeID.                           |
| [`seasonId`](../6-graphql-api/references/objects/space.mdx) | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query for season ranking. Overall ranking is null |


Request:

```graphql
query SpaceLeaderboard($id: Int!, $first: Int, $after: String, $order: LoyaltyPointsRankOrder, $seasonId: Int) {
    space(id: $id) {
        id
        name
        loyaltyPointsRanks(first: $first, after: $after, order: $order, sprintId: $seasonId) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            totalCount
            list {
                id
                rank
                points
                space {
                    name
                }
                address {
                    username
                    id
                    avatar
                    address
                    solanaAddress
                    aptosAddress
                    seiAddress
                    twitterUserName
                    discordUserName
                }
            }
        }
    }
}

```

Variables:

```json
{
  "id": 40,
  "first": 2,
  "after": "-1",
  "order": "Points",
  "seasonId": null
}
```

Response:

```json
{
  "data": {
    "space": {
      "id": "40",
      "name": "BNB Chain",
      "loyaltyPointsRanks": {
        "pageInfo": {
          "startCursor": "0",
          "endCursor": "2",
          "hasNextPage": true,
          "hasPreviousPage": false
        },
        "totalCount": 183473,
        "list": [
          {
            "id": "lbrank-0L1xIfY6d1VYrlKAFOmZvT-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "HansaMR",
              "id": "0L1xIfY6d1VYrlKAFOmZvT",
              "avatar": "https://source.boringavatars.com/marble/120/0x61e305B027482358eCda2e7A56a150E0593e5cdA",
              "address": "0x61e305b027482358ecda2e7a56a150e0593e5cda",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          },
          {
            "id": "lbrank-1L3UPNocTIIJid0tRIszgV-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "barossafeed",
              "id": "1L3UPNocTIIJid0tRIszgV",
              "avatar": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308-1670560267167156585.png",
              "address": "0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          }
        ]
      }
    }
  }
}
```

##### Season
Arguments:

| Name                                                        | Type                                                        | Description               |
|-------------------------------------------------------------|-------------------------------------------------------------|---------------------------|
| [`id`](../6-graphql-api/references/queries/space.mdx)       | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Space id.                 |
| [`first`](../6-graphql-api/references/objects/space.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query limit.              |
| [`after`](../6-graphql-api/references/objects/space.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Query offset.             |
| [`order`](../6-graphql-api/references/objects/space.mdx)    | [`LoyaltyPointsRankOrder`]()                                | Sort by Points/GalxeID.   |
| [`seasonId`](../6-graphql-api/references/objects/space.mdx) | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query for season ranking. |


Request:

```graphql
query SpaceLeaderboard($id: Int!, $first: Int, $after: String, $order: LoyaltyPointsRankOrder, $seasonId: Int) {
    space(id: $id) {
        id
        name
        loyaltyPointsRanks(first: $first, after: $after, order: $order, sprintId: $seasonId) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            totalCount
            list {
                id
                rank
                points
                space {
                    name
                }
                address {
                    username
                    id
                    avatar
                    address
                    solanaAddress
                    aptosAddress
                    seiAddress
                    twitterUserName
                    discordUserName
                }
            }
        }
    }
}

```

Variables:

```json
{
  "id": 40,
  "first": 2,
  "after": "-1",
  "order": "Points",
  "seasonId": 1
}
```

Response:

```json
{
  "data": {
    "space": {
      "id": "40",
      "name": "BNB Chain",
      "loyaltyPointsRanks": {
        "pageInfo": {
          "startCursor": "0",
          "endCursor": "2",
          "hasNextPage": true,
          "hasPreviousPage": false
        },
        "totalCount": 183473,
        "list": [
          {
            "id": "lbrank-0L1xIfY6d1VYrlKAFOmZvT-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "HansaMR",
              "id": "0L1xIfY6d1VYrlKAFOmZvT",
              "avatar": "https://source.boringavatars.com/marble/120/0x61e305B027482358eCda2e7A56a150E0593e5cdA",
              "address": "0x61e305b027482358ecda2e7a56a150e0593e5cda",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          },
          {
            "id": "lbrank-1L3UPNocTIIJid0tRIszgV-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "barossafeed",
              "id": "1L3UPNocTIIJid0tRIszgV",
              "avatar": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308-1670560267167156585.png",
              "address": "0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          }
        ]
      }
    }
  }
}
```

#### Distribute loyalty points

Prerequisite:
generate an access token

```graphql
mutation UpdateAccessToken($input: UpdateAccessTokenInput!) {
  updateAccessToken(input: $input) {
    accessToken
  }
}
```

```json
{
  "input": {
    "address": "0x39b36ff83b60eb54d71758cffa3ab17d2d0b216c"
  }
}
```

```json
{
    "data": {
        "updateAccessToken": {
            "accessToken": "your-access-token"
        }
    }
}
```

Task Creation

Header:
```json
{
  "accessToken": "your-access-token"
}
```

Request:

```graphql
mutation createTask {
  createTailoredTask(input: {
    title: "Connect to Galxe"
    description: "A user who connected to Galxe.com"
    link: "your_link"
    spaceId: 2
    tag: Once
    points: 10
    startTime: 0
  }) {
    id
    title
    description
    link
    spaceId
    tag
    points
    startTime
  }
}
```

Response

```graphql
{
  "data": {
    "createTailoredTask": {
      "id": "26",
      "title": "Connect to Galxe",
      "description": "A user who connected to Galxe.com",
      "link": "your_link",
      "spaceId": 2,
      "tag": "Once",
      "points": 10,
      "startTime": 0
    }
  }
}
```

Task Modification

Header:
```json
{
  "accessToken": "your-access-token"
}
```

Request:

```graphql
mutation updateTask {
  updateTailoredTask(input: {
    id: 26
    title: "update task title"
    description: "desc"
    link: "your_link",
    points: 10
    tag: Once,
    startTime: 0
  })
}
```

Response:

```graphql
{
  "data": {
    "updateTailoredTask": true
  }
}
```

Task Deletion

Header:
```json
{
  "accessToken": "your-access-token"
}
```

Request:

```graphql
mutation deleteTask {
  deleteTailoredTask(id: 26)
}
```

Distributing Points via API

Request:

```graphql
mutation {
  claimTailoredTaskLoyaltyPoints(
      id: 25, 
      addresses:["0x447D24B00937BCc3fE5768c828fb2fae52c3e8C5", "0xaC1F963Ed7454d0D3295786E4Bcc47B961918C63"])
}
```

Response:

```graphql
{
  "data": {
    "claimTailoredTaskLoyaltyPoints": true
  }
}
```


## Open Access

### User

#### Query profile and credential

### Credential

#### Query credential items

### Campaign

#### Query campaign participants

Arguments:

| Name                                                                        | Type                                                          | Description                                      |
|-----------------------------------------------------------------------------|---------------------------------------------------------------|--------------------------------------------------|
| [`id`](../6-graphql-api/references/queries/campaign.mdx)                    | [`ID!`](../6-graphql-api/references/scalars/id.mdx)           | Campaign hash id.                                |
| [`pfirst`](../6-graphql-api/references/objects/campaign-participant.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)         | Query limit.                                     |
| [`pafter`](../6-graphql-api/references/objects/campaign-participant.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx)   | Query offset.                                    |

Request:

```graphql
query campaignParticipants($id: ID!, $pfirst: Int!, $pafter: String!) {
  campaign(id: $id) {
    id
    numberID
    numNFTMinted
    participants {
      participants(first: $pfirst, after: $pafter) {
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

Variables:

```json
{
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
        "participantsCount": 310277
      }
    }
  }
}
```

### Space

#### Query campaign list

Arguments:

| Name                                                                 | Type                                                                               | Description             |
|----------------------------------------------------------------------|------------------------------------------------------------------------------------|-------------------------|
| [`id`](../6-graphql-api/references/queries/space.mdx)                | [`Int!`](../6-graphql-api/references/scalars/int.mdx)                              | Space id.               |
| [`alias`](../6-graphql-api/references/objects/space.mdx)             | [`String!`](../6-graphql-api/references/scalars/string.mdx)                        | Space alias.            |
| [`campaignInput`](../6-graphql-api/references/queries/campaigns.mdx) | [`ListCampaignInput!`](../6-graphql-api/references/inputs/list-campaign-input.mdx) | Campaigns query params. |

Request:

args: 

campaigns:[`CampaignConnection`](../6-graphql-api/references/objects/campaign-connection.mdx)

```graphql
query CampaignList($id: Int, $alias: String,  $campaignInput: ListCampaignInput!) {
    space(id: $id, alias: $alias) {
        id
        name
        alias
        campaigns(input: $campaignInput) {
            pageInfo {
                endCursor
                hasNextPage
            }
            list {
                id
                name
            }
        }
    }
}
```

Variables:

```json
{
  "alias": "bnbchain",
  "campaignInput": {
    "forAdmin": false,
    "first": 2,
    "after": "-1",
    "excludeChildren": true,
    "gasTypes": null,
    "credSources": null,
    "rewardTypes": null,
    "chains": null,
    "statuses": null,
    "listType": "Newest",
    "types": [
      "Drop",
      "MysteryBox",
      "Forge",
      "MysteryBoxWR",
      "Airdrop",
      "ExternalLink",
      "OptIn",
      "OptInEmail",
      "PowahDrop",
      "Parent",
      "Oat",
      "Bounty",
      "Token",
      "DiscordRole",
      "Mintlist",
      "Points",
      "PointsMysteryBox"
    ],
    "searchString": null
  }
}
```

Response:

```json
{
  "data": {
    "space": {
      "id": "40",
      "name": "BNB Chain",
      "alias": "bnbchain",
      "campaigns": {
        "pageInfo": {
          "endCursor": "1",
          "hasNextPage": true
        },
        "list": [
          {
            "id": "GCU8jUP7RS",
            "name": "BNB Chain Ecosystem Catalyst Awards -  Trailblazers"
          },
          {
            "id": "GCis8Uj4gL",
            "name": "BNB Chain 3 YA NFT "
          }
        ]
      }
    }
  }
}
```

#### Query leaderboard data
##### Overall
Arguments:

| Name                                                        | Type                                                        | Description                                       |
|-------------------------------------------------------------|-------------------------------------------------------------|---------------------------------------------------|
| [`id`](../6-graphql-api/references/queries/space.mdx)       | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Space id.                                         |
| [`first`](../6-graphql-api/references/objects/space.mdx)    | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query limit.                                      |
| [`after`](../6-graphql-api/references/objects/space.mdx)    | [`String!`](../6-graphql-api/references/scalars/string.mdx) | Query offset.                                     |
| [`order`](../6-graphql-api/references/objects/space.mdx)    | [`LoyaltyPointsRankOrder`]()                                | Sort by Points/GalxeID.                           |
| [`seasonId`](../6-graphql-api/references/objects/space.mdx) | [`Int!`](../6-graphql-api/references/scalars/int.mdx)       | Query for season ranking. Overall ranking is null |


Request:

```graphql
query SpaceLeaderboard($id: Int!, $first: Int, $after: String, $order: LoyaltyPointsRankOrder, $seasonId: Int) {
    space(id: $id) {
        id
        name
        loyaltyPointsRanks(first: $first, after: $after, order: $order, sprintId: $seasonId) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            totalCount
            list {
                id
                rank
                points
                space {
                    name
                }
                address {
                    username
                    id
                    avatar
                    address
                    solanaAddress
                    aptosAddress
                    seiAddress
                    twitterUserName
                    discordUserName
                }
            }
        }
    }
}

```

Variables:

```json
{
  "id": 40,
  "first": 2,
  "after": "-1",
  "order": "Points",
  "seasonId": null
}
```

Response:

```json
{
  "data": {
    "space": {
      "id": "40",
      "name": "BNB Chain",
      "loyaltyPointsRanks": {
        "pageInfo": {
          "startCursor": "0",
          "endCursor": "2",
          "hasNextPage": true,
          "hasPreviousPage": false
        },
        "totalCount": 183473,
        "list": [
          {
            "id": "lbrank-0L1xIfY6d1VYrlKAFOmZvT-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "HansaMR",
              "id": "0L1xIfY6d1VYrlKAFOmZvT",
              "avatar": "https://source.boringavatars.com/marble/120/0x61e305B027482358eCda2e7A56a150E0593e5cdA",
              "address": "0x61e305b027482358ecda2e7a56a150e0593e5cda",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          },
          {
            "id": "lbrank-1L3UPNocTIIJid0tRIszgV-40",
            "rank": 1,
            "points": 300,
            "space": {
              "name": "BNB Chain",
            },
            "address": {
              "username": "barossafeed",
              "id": "1L3UPNocTIIJid0tRIszgV",
              "avatar": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308-1670560267167156585.png",
              "address": "0xc3b8e4fedb31c756fae84e0c65475dcbb6ffd308",
              "solanaAddress": "",
              "aptosAddress": "",
              "seiAddress": "",
              "twitterUserName": "",
              "discordUserName": ""
            }
          }
        ]
      }
    }
  }
}
```