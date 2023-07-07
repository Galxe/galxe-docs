---
sidebar_label: Claim Galxe NFT
sidebar_position: 5
slug: claim-galxe-nft
---
# Claim Galxe NFT

<aside> ⚠️ Didn’t support Forge and Solana chain Campaign

</aside>

<aside> ⚠️ Claim api requires recaptcha by default, if you want to integrate, please contact Galxe.

</aside>

## Claim OAT:

GraphQL API: [here](../6-graphql-api/overview.md)

### 1. Get Campaign Info:

Use GraphQL API get campaign info

### 2. Call Claim API: Use GraphQL API to claim

Request args:

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

Response: claim success

```graphql
{
  "data": {
    "prepareParticipate": {
      "allow": true,
      "disallowReason": ""
    }
  }
}
```

## Claim Gas Campaign NFT:

GraphQL API: [here](../6-graphql-api/overview.md)

SpaceStation: store campaign fee and claim NFT smart contract

### 1. Get Campaign Info:

Use GraphQL API get campaign info

### 2. Get Campaign Fee Info: Get fee from smart contract

Call SpaceStation.campaignFeeConfigs

### 3. Get claim info: Use GraphQL API get claim info from backend

Request args:

```graphql
mutation claim {
  prepareParticipate(input: {
    signature: ""            # keep empty
    campaignID: "{{campaignHashID}}" # campaign hash id
    address: "{{userAddr}}"  # user address
  }) {
    allow              # Is allow user claim nft
    disallowReason     # Disallow reason
    signature          # Claim signature
    spaceStation       # Claim nft contract address
    mintFuncInfo {     # Claim function args
      cap              # Campaign cap, 0 is no cap
      powahs           # Reserved field, currently is campaign id
      verifyIDs        # Unique id
      nftCoreAddress   # NFT contract address
    }
  }
} 
```

Response:

```graphql
{
  "data": {
    "prepareParticipate": {
      "allow": true,
      "disallowReason": "",
      "signature": "{{signature}}",
      "spaceStation": "0x5C1274456be4dd280429B9A8319e552cAD2595fA",
      "mintFuncInfo": {
        "cap": 0,
        "powahs": [
          8244
        ],
        "verifyIDs": [
          52547302
        ],
        "nftCoreAddress": "0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E"
      }
    }
  }
}
```

#### 3.1 Claim NFT on No cap campaign:

Campaign: [](https://galxe.com/Yuliverse/campaign/GCHYwUwEPU)<https://galxe.com/Yuliverse/campaign/GCHYwUwEPU>

* numberID: 8244
* hashID: GCBu6UUWvJ
* no ERC20 fee
* no ETH fee

```solidity
// spacestation contract
claim(
	8244, 
	"0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E", 
	52547302,
	8244,
	"{{userAddr}}",
	"{{signature}}"
)
```

#### 3.2 Claim NFT on cap campaign:

Campaign:

* numberID:
* hashID:
* cap: 100
* no ERC20 fee
* no ETH fee

```solidity
// spacestation contract
claimCapped(
	499, 
	"0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E", 
	52547302,
	499,
	100,
	"{{userAddr}}",
	"{{signature}}"
)
```

#### 3.4 Claim NFT with ETH fee on cap campaign

[](https://galxe.com/vevue/campaign/GCmjeUUi44/)<https://galxe.com/vevue/campaign/GCmjeUUi44/>

* numberID: 1369
* hashID: GCmjeUUi44
* cap: 8000
* no ERC20 fee
* ETH fee: 100 Ether

```solidity
// spacestation contract
claimCapped(
	1369, 
	"0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E", 
	52547302,
	1369,
	100,
	"{{userAddr}}",
	"{{signature}}"
	{"value": "100 Ether"}
)
```

#### 3.3 Claim NFT with ERC20 fee on cap campaign:

Campaign: [](https://galxe.com/platofarm/campaign/GCWzyUUnf9)<https://galxe.com/platofarm/campaign/GCWzyUUnf9>

* numberID: 849
* hashID: GCWzyUUnf9
* cap: 10000
* ERC20: BUSD
* ERC20 Amount: 19.9
* no ETH fee

1. Check ERC20 approval
2. Is not approval, need user approve
3. Call SpaceStation.ClaimCapped

```solidity
// spacestation contract
claimCapped(
	849, 
	"0x6798f4E7dA4Fc196678d75e289A9d4801C3C849E", 
	52547302,
	849,
	10000,
	"{{userAddr}}",
	"{{signature}}"
)
```

## SpaceStation Contract

### Function Signature:

* Claim: claim one NFT with no cap campaign

```solidity
function claim(
        uint256 _cid,      // Campaign number id
        address _starNFT,  // NFT contract address
        uint256 _dummyId,  // Unique id
        uint256 _powah,    // Reserved field, currently is campaign number id
        address _mintTo,   // NFT owner
        bytes calldata _signature // Claim signature
)
```

* ClaimCapped: claim NFT with cap campaign

```go
function claimCapped(
        uint256 _cid,       // Campaign number id
        address _starNFT,   // NFT contract address
        uint256 _dummyId,   // Unique id
        uint256 _powah,     // Reserved field, currently is campaign id
        uint256 _cap,       // Campaign cap
        address _mintTo,    // NFG owner
        bytes calldata _signature  // Claim signature
)
```

* campaignFeeConfigs: get campaign fee info

```solidity
struct CampaignFeeConfig {
        address erc20;       // Address of ERC20 token
        uint256 erc20Fee;    // Amount of ERC20 token
        uint256 ether;      // Amount of ether(eth, bnb, matic...), pay with msg.value
}

function campaignFeeConfigs(uint256 cid) returns (CampaignFeeConfig)
```

* numMinted: get cap campaign claimed NFT count

```solidity
function numMinted(uint256 cid) returns (uint256)
```

### SpaceStation Contract ABI:

```json
[
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"_cid",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"_dummyId",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"_nftID",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"address",
            "name":"_sender",
            "type":"address"
         }
      ],
      "name":"EventClaim",
      "type":"event"
   },
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"_cid",
            "type":"uint256"
         },
         {
            "internalType":"contract IStarNFT",
            "name":"_starNFT",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_dummyId",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_powah",
            "type":"uint256"
         },
         {
            "internalType":"address",
            "name":"_mintTo",
            "type":"address"
         },
         {
            "internalType":"bytes",
            "name":"_signature",
            "type":"bytes"
         }
      ],
      "name":"claim",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"_cid",
            "type":"uint256"
         },
         {
            "internalType":"contract IStarNFT",
            "name":"_starNFT",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_dummyId",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_powah",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_cap",
            "type":"uint256"
         },
         {
            "internalType":"address",
            "name":"_mintTo",
            "type":"address"
         },
         {
            "internalType":"bytes",
            "name":"_signature",
            "type":"bytes"
         }
      ],
      "name":"claimCapped",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "name":"campaignFeeConfigs",
      "outputs":[
         {
            "internalType":"address",
            "name":"erc20",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"erc20Fee",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"platformFee",
            "type":"uint256"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "name":"numMinted",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   }
]
```
