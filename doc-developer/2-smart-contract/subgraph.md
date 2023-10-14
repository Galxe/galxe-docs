---
sidebar_position: 4
---

# Subgraph

> 💁 Subgraph is a concept by The Graph, used to query blockchain data. The Graph is a protocol for building decentralized applications (dApps) quickly on Ethereum and IPFS using GraphQL. More infomation can be found in https://thegraph.com/docs/en/

Galxe uses multiple subgraphs for indexing and organizing data from out smart contracts. These subgraphs are hosted on The Graph hosted service and can be used to query our smart data.

## Explorer

| Chain     | URL                                                                    |
| --------- | ---------------------------------------------------------------------- |
| Ethereum  | https://thegraph.com/hosted-service/subgraph/vincentpc/playgroundeth   |
| Polygon   | https://thegraph.com/hosted-service/subgraph/vincentpc/playgroundmatic |
| BNB Chain | https://thegraph.com/hosted-service/subgraph/vincentpc/playgroundbsc   |

## GraphQL Endpoints

| Chain     | URL                                                               |
| --------- | ----------------------------------------------------------------- |
| Ethereum  | https://api.thegraph.com/subgraphs/name/vincentpc/playgroundeth   |
| Polygon   | https://api.thegraph.com/subgraphs/name/vincentpc/playgroundmatic |
| BNB Chain | https://api.thegraph.com/subgraphs/name/vincentpc/playgroundbsc   |

## GraphQL Schema

### Campaign Participation

```graphql
type Campaign @entity {
  id: ID!
  cid: String! # campaign id
  count: Int! # participation count in the specific campaign
  nft_count: Int! # nft count in the specific campaign
  address_list: [String!]! # address that participate in the specific campaign
}
```

### Wallet Participation

```graphql
type Address @entity {
  id: ID! # Wallet Address
  participate_campaign_count: Int!
  participate_nft_count: Int!
  participate_nftid: [BigInt!]!
  participate_cid: [String!]!
  participate_tx: [String!]!
}
```

### Mint Transaction

```graphql
type Mint @entity {
  id: ID! # mint transaction hash
  address: String!
  cid: String!
  nft_count: Int!
  timestamp: BigInt!
}
```

### Transfer Transaction

> Only supported in ethereum

```graphql
type Mint @entity {
  id: ID! # mint transaction hash
  address: String!
  cid: String!
  nft_count: Int!
  timestamp: BigInt!
}
```

### NFT Information

> Only supported in ethereum

```graphql
type ContractNFTPair @entity {
  id: ID!
  owner: String! # current owner of this nft
  cid: String! # campagin id of the nft
  nftid: BigInt! # nft id
  starNFT: String!
  transfer_count: Int!
  tx: String! #last transfer transaction hash
}
```

## Examples

### Number of NFT minted per campaign

```graphql
campaign(id:1003) {
    id
    cid
    count
    nft_count
  }
```

### Wallet's campaign participation count

```graphql
address(id:"0x0000000002732779240fe05873611dc4203dfb71") {
    id
    participate_campaign_count
    participate_nft_count
    participate_nftid
  }
```

### Get owner of NFT

> Only supported in ethereum

```graphql
{
  contractNFTPairs(
    where: { owner: "0xe9b3c292904114e6e6f04a363ae4c0f800f3236d" }
  ) {
    nftid
    starNFT
    owner
    tx
    transfer_count
  }
}
```
