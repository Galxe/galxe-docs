---
sidebar_label: Integrate claim API
sidebar_position: 3
slug: claim-integrate
---
# 1. Introduction

## 1.1. Entities Diagram

![Diagram.png](https://d257b89266utxb.cloudfront.net/galaxy/images/galaxy/1659682658861468090.png)

### 1.1.1. Space

Space is used for aggregating your campaigns.

### 1.1.2. Campaign

Campaign is the key object that holds all info for NFT claiming process. Except info of itself, like campaign name, thumbnail, description, it also contains info of NFT contract, NFT template etc.

### 1.1.3. NFT Core

NFT contract(ERC-721) that used for minting NFTs within the campaign.

### 1.1.4. NFT Template

NFT template of the campaign contains info that used for generating metadata of a minted NFT. Including NFT name, image, traits etc.

### 1.1.5. Credential

Credential is elemental object that determine whether an address is eligible to claim the NFT. It takes a single wallet address as input and outputs 0(false)/1(true) to indicate whether the wallet address is eligible for this credentail.

### 1.1.6. Formula

Formula is a algebraic expression of credentials and entries, the output of formula decide whether and how many NFTs a user can claim witin the campaign. e.g. (C_2&C_3)*1 means a user eligible for both credential 2 and 3 can claim one NFT, (C_4|C_5)*2 means a user eligible for either credential 4 and 5 can claim two NFTs.

## 1.2. Integration workflow

1. Sign up for Galxe Dashboard access, please refer to [Sign Up for Beta Access | Galxe Docs](https://docs.galxe.com/guide/dashboard-tutorial/beta-access).
2. Create credentials through the Dashboard. Upload data for your credentials if their source is CSV file.
3. Create NFT core(NFT contract) if needed, if you are only need to intergrate OAT campaign, then it’s not needed.
4. Create space through the Dashboard.
5. Create campaign with with “Integrate campaign claiming into third-party websites” checked  under your space through the Dashboard. *(This will turn the campaign into gasless mode, right now we only support integrate gasless claim)*
6. Go to your campaign page inside Galxe to check if the campaign info is correct and credentials lighted up for eligible users.
7. Release your campaign through Dashboard.
8. Integrate `query campaign` API, get campaign info data for rendering your NFT claim page.
9. If you need to check whether a user is eligible to claim before hand, integrate `query campaign` API to get `eligible(address:String!)` field of credential object and use `formula` field to calculate the result on your side.
10. Integrate `mutation prepareParticipate`  API, send the claim request once user claim.
11. If needed, integrate `query participations` API to check Tx status periodically.
12. If you want, integrate `query campaign` API and get `holders(first:Int, after:String)` field info to setup NFTs showcase page.

# 2. API reference

## 2.1. Overview

For endpoint and other info, please refer to [Overview | Galxe Docs](../6-graphql-api/overview.md).

And for interface of each GraphQL query, please check docs/schema from [Playground - https://graphigo.prd.galaxy.eco/query](https://graphigo.prd.galaxy.eco/) .

## 2.2. Query campaign

This API is used for get campaign object, a campaign is the key object that holds all info for NFT claiming process, integrate this API to setup your own NFT claim page. An example of how a campaign can be shown on website: [New To The Galxe? Start your adventure here! by Galxe Space | Galxe](https://galxe.com/galaxy/campaign/GCqBzUtW7w) .

### 2.2.1. Q**uery**

```graphql
query {
  campaign
}
```

### 2.2.2. **Arguments**

| Arguments  | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| id String! | You can get campaign id from Galxe Dashboard page’ url once you created a campaign |

### 2.2.3. **Fields**

| Fields                            | Description                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                | Campaign id is used to identify a certain campaign                                                                                                   |
| name                              | Campaign name                                                                                                                                        |
| description                       | Campaign description                                                                                                                                 |
| thumbnail                         | How many NFTs have been minted/claimed for this campaign                                                                                             |
| numNFTMinted                      | How many NFTs have been minted/claimed for this campaign                                                                                             |
| startTime                         | Campaign start time in unix time                                                                                                                     |
| endTime                           | Campaign end time in unix time, if null means no end time                                                                                            |
| formula                           | ormula is a algebraic expression of credentials and entries, the output of formula decide whether and how many NFTs a user can claim.                |
| claimedTimes(address: $String!)   | How many times a certain address has successfully claimed in this campaign                                                                           |
| space                             | Space is object for aggregating your campaigns. Check object fields below                                                                            |
| nftCore                           | NFT contract that used for this campaign. Check object fields below                                                                                  |
| nftTemplate                       | NFT template contains info that used for generating metadata for a minted NFT. Check object fields below                                             |
| creds                             | Credentials are element object that determine whether an address is eligible to claim the NFT. Check object fields below                             |
| holders(first:Int, after: String) | It shows user who have NFT minted from this campaign, first is same as limit, after is same as offset but it’s a number string and starts from “-1”. |

### 2.2.3.1. **Space fields**

| Fields    | Description                                      |
| --------- | ------------------------------------------------ |
| id        | Space id                                         |
| name      | Space name                                       |
| alias     | Space alias, used for constructing the space url |
| thumbnail | Space icon image                                 |

### 2.2.3.2. **NFT Core fields**

| Fields          | Description          |
| --------------- | -------------------- |
| name            | NFT contract name    |
| contractAddress | NFT contract address |

### 2.2.3.3. **NFT Template fields**

| Fields    | Description                                              |
| --------- | -------------------------------------------------------- |
| name      | NFT name metadata                                        |
| image     | NFT image url metadata                                   |
| ipfsImage | NFT decentralized image url metadata                     |
| traits    | NFT traits(you can refer to opensea NFT traits) metadata |

### 2.2.3.4. **Creds fields**

| Fields                     | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| id                         | Credential ID                                        |
| name                       | Credential name                                      |
| description                | Credential description                               |
| credType                   | Credential type                                      |
| credSource                 | Credential data source                               |
| eligible(address: $String) | If a certain address is eligible for this credential |

### 2.2.4. **Query example**

```graphql
query {
  campaign(id: "GCqBzUtW7w") {
    numberID
    name
    description
    thumbnail
    numNFTMinted
    startTime
    endTime
    formula
    claimedTimes(address: "0xBb3A7bc36b5baFa7691Ccb708EbF299B6d521b05")

    space {
      name
      alias
      thumbnail
    }

    nftCore {
      name
      contractAddress
    }

    nftTemplates {
      name
      image
      ipfsImage
      traits {
        name
        value
      }
    }

    creds {
      id
      name
      description
      credType
      credSource
      eligible(address: "0xBb3A7bc36b5baFa7691Ccb708EbF299B6d521b05")
    }

    nftHolderSnapshot{
      holders(
        block:43009180
        first:100
        after:"-1"
      ){
        list{
          id
          holder
        }
      }
    }
  }
}
```

### 2.2.5. **Response example**

```json
{
  "data": {
    "campaign": {
      "numberID": 4018,
      "name": "New To The Galaxy? Start your adventure here!",
      "description": "Galxe is a collaborative credential infrastructure that empowers brands to build better communities and products in Web3, by leveraging on and off-chain credentials into creative and influential growth campaigns.\n\nCampaigns range from on-chain (ex: depositing on the blockchain) to off-chain (Liking a Tweet, Being a Discord member or attending an AMA, etc)\n\n\nStep 1: Verify your Galaxy ID by setting a username [Here !](https://galxe.com/galaxyid/)\n\nStep 2: Follow us on Twitter \n[Here ! ](https://twitter.com/GalxeHQ?s=20&t=6fgf-DUT7ikDP9Bvuem_vQ)",
      "thumbnail": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/0xbb3a7bc36b5bafa7691ccb708ebf299b6d521b05-1655889591.jpg",
      "numNFTMinted": 49618,
      "startTime": 1656450000,
      "endTime": null,
      "formula": "(C_3028&C_3034)*1",
      "claimedTimes": 0,
      "space": {
        "name": "Galaxy Space",
        "alias": "galaxy",
        "thumbnail": "https://d257b89266utxb.cloudfront.net/galaxy/images/galaxyspace/galaxyspace-logo-1640145282.png"
      },
      "nftCore": {
        "name": "[Old version]Galaxy OAT",
        "contractAddress": "0x1871464F087dB27823Cff66Aa88599AA4815aE95"
      },
      "nftTemplates": [
        {
          "name": "New To The Galaxy? Start your adventure here!",
          "image": "https://d257b89266utxb.cloudfront.net/galaxy/images/avatar/0xbb3a7bc36b5bafa7691ccb708ebf299b6d521b05-1655889591.jpg",
          "ipfsImage": "",
          "traits": [
            {
              "name": "Location",
              "value": ""
            }
          ]
        }
      ],
      "creds": [
        {
          "id": "3034",
          "name": "Set Galaxy ID Username",
          "description": "Set your Galaxy ID username in Galxe",
          "credType": "EVM_ADDRESS",
          "credSource": "GRAPHQL",
          "eligible": 1
        },
        {
          "id": "3028",
          "name": "Galxe Twitter Follower",
          "description": "Galxe Twitter Follower",
          "credType": "TWITTER",
          "credSource": "TWITTER_FOLLOW",
          "eligible": 0
        }
      ],
      "nftHolderSnapshot": {
        "holders": {
          "list": [
            {
              "id": "840612",
              "holder": "0xb85b3d61439a3d70d3df7913a3a764f352b32c55"
            },
            {
              "id": "840633",
              "holder": "0x2357f665d833c517238eda7f6ef4a1f323f677f0"
            },
            {
              "id": "840666",
              "holder": "0x8bb60421193a2c2ea2bb442ff162f3e3f3a70f68"
            },
            ...
          ]
        }
      }
    }
  }
}
```

## 2.3. Query and mutate credential

### 2.3.1. query credential info

```graphql
query {
  credential(id:220244101447720960){
    name
    description
    referenceLink
    credType
    credSource
  }
}

# response
{
  "data": {
    "credential": {
      "name": "MantaNetwork - Twitter Followers",
      "description": "MantaNetwork‘s Twitter followers",
      "referenceLink": "https://twitter.com/MantaNetwork",
      "credType": "TWITTER",
      "credSource": "TWITTER_FOLLOW"
    }
  }
}
```

### 2.3.2. update credential items

[Use API to update credential Items | Galxe Docs](https://docs.galxe.com/developer/guide/api-cred-items-update)

### 2.3.3. check address eligiblilty

```graphql
query {
  credential(id:220244101447720960){
    eligible(address:"0xBb3A7bc36b5baFa7691Ccb708EbF299B6d521b01")
  }
}

# response
{
  "data": {
    "credential": {
      "eligible": 0
    }
  }
}
```

### 2.3.4. check address eligiblilty(verify button)

```graphql
mutation {
  verifyCredential(input:{
    credId:220244101447720960
    address:"0xBb3A7bc36b5baFa7691Ccb708EbF299B6d521b01"
  })
}

# response
{
  "data": {
    "verifyCredential": false
  }
}
```

## 2.4. Mutation prepareParticipate

This API send the request for minting a NFT once user claim, our backend will eventually call the NFT contract to have the NFT minted to user.

### 2.4.1. M**utation**

```graphql
mutation {
  prepareParticipate
}
```

### 2.4.2. **Arguments**

| Arguments          | Description                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signature String!  | Deprecating, keep it a empty string                                                                                                                                                                       |
| campaignID String! | Campaign ID                                                                                                                                                                                               |
| address String!    | User’ wallet address, you can get it from user’s wallet connection or just a plain test input. In either way, for a successful claim, this address must be eligible through credentials of this campaign. |
| mintCount Int      | Batch claim count, if batch claim is needed. Otherwise don’t pass in this argument.                                                                                                                       |

### 2.4.3. **Fields**

| Fields                        | Description                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| allow                         | If the user is able to claim the NFT                                                                     |
| disallowReason                | Claim failed reason                                                                                      |
| mintFuncInfo-> verifyIDs      | Unique ids(if it’s a batch claim, there will be multiple ids) for identifying and getting on-chain Tx(s) |
| mintFuncInfo-> nftCoreAddress | NFT contract address                                                                                     |

### 2.4.4. **Query example**

```graphql
mutation {
  prepareParticipate(input: {
    signature: ""
    campaignID: "GCqBzUtW7"
    address: "0xBb3A7bc36b5baFa7691Ccb708EbF299B6d521b05"
  }) {
    allow
    disallowReason
    mintFuncInfo {
      verifyIDs
      nftCoreAddress
    }
  }
}
```

### 2.4.5. **Response example**

```json
{
  "data": {
    "prepareParticipate": {
      "allow": true,
      "disallowReason": "",
      "mintFuncInfo": {
        "verifyIDs": [
          52547302
        ],
        "nftCoreAddress": "0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E"
      }
    }
  }
}
```

## 2.5. Query participations

Once the claim request is sent, use this API to monitor on-chain Tx status.

### 2.5.1. Query

```graphql
query {
  participations
}
```

### 2.5.2. **Arguments**

| Arguments   | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| id \[Int!]! | ids are verify ids returned by mutation prepareParticipate API |

### 2.5.3. F**ields**

| Fields | Description                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tx     | Tx address                                                                                                                                                                              |
| status | Tx status. Status enum: **Generated**, tx is just born; **Pending**, tx is in pending; **Success**, tx is succeed; **Queueing**, tx is still in message queue; **Failed**, tx is failed |

### 2.5.4. **Query example**

```graphql
query {
  participations(id:[53936841]) {
    tx
    status{
  "data": {
    "participations": [
      {
        "tx": "0x95d86011835663ff12e562e3f751817e1b4c2028dc8045bfc38d0b0e2592e2a4",
        "campaign": {
          "id": "GCtf9UUuTn"
        },
        "status": "Success"
      }
    ]
  }
}
```

### 2.5.5. **Response example**

```json
{
  "data": {
    "participations": [
      {
        "tx": "0x95d86011835663ff12e562e3f751817e1b4c2028dc8045bfc38d0b0e2592e2a4",
        "status": "Success"
      }
    ]
  }
}
```