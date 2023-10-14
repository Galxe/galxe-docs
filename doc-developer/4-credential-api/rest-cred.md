---
sidebar_label: How to setup a pull-based RESTful API credential
sidebar_position: 2
slug: rest-cred
---
# How to set a REST credential through dashboard

## Introductions

REST type credential is a way for Galxe to pull data from your RESTful HTTPs backend, (or any HTTP RESTful endpoint that you are legally allowed to use).
It takes a single wallet address as input and outputs 0(false)/1(true) to indicate whether the wallet address is eligible. 
The workflow is

```
galxe.com                          galxe backend                                 your backend
---------------------------------------------------------------------------------------------
user_address          ---->   HTTP request based on config              ---->        Endpoint
crendential for user  <----   Expression evaluation on response.body    <---- 
```

We support GET and POST method:

* **GET**:  Endpoint, Headers and Expression.
* **POST**: Endpoint, Headers, Post Body and Expression

In the request body, we support two placeholders:
* **$address**: which will be replaced by the hex string of the user's address with 0x prefix, e.g., `0x95ad73...`
* **$addressWithout0x**: which will be replaced by the hex string of the user's address without 0x prefix, e.g., `95ad73...`. Useful when constructing a `eth_call`, see example below.

Please note that for addresses encoded with case-insensitive schema, like EVM and aptos addresses that are 0x-prefixed hex string, addresses will be **lowercased** before sending to the endpoint.

## HTTP response format requirement

The response of the request, for both GET and POST, **must** a valid JSON body. For example,

```
// valid response 1 🦸
{
    "data": {
        "is_ok": true,
    }
}

// valid response 2 🦸
{
    "is_ok": true
}

// invalid response example 1 ⛔
is_ok: true

// invalid response example 2 ⛔
<is_ok>true</is_ok>
```

The entire response body will then be extracted and passed to the Expression for evaluation.

## GET

### Endpoint

The RESTFul style URL to which we will sent the HTTP GET request. The `$address` is the user address placeholder. You can put it on query params (`info?address=$address`) or as path variable (`/info/$address`).

The response of the request **must** a valid JSON string.

NOTE: [galxe.com](http://galxe.com) isn’t allowed.

### Headers

Optional; HTTP request header

NOTE: Cookie header isn’t allowed.

### Expression

The expression is a JavaScript (ES6) function of type signature: `(object) => int`. The object that will be passed as the parameter to the function is
the entire response.
The function should return either number 1 or 0, representing if the address is eligible for this subgraph credential. 
Behind the scenes, first, we send the request with the user's address to the endpoint, and then we will apply the function against the entire response body.
If the returned value is 1, then user can own this credential, otherwise not.
The function must be anonymous, which means that the first line of the expression should be like `function(resp) {}`, instead of `let expression = (resp) => {}`.

### Example: Polygon OAT Holder Credential

**Endpoint**

`https://api.covalenthq.com/v1/matic-mainnet/address/$address/collection/0x5D666F215a85B87Cb042D59662A7ecd2C8Cc44e6/`

**Headers**

`Authorization`: `Bearer YOU_API_KEY`

**Query Output**

```
{
    "data": {
        "updated_at": "2023-06-26T05:12:35.553904397Z",
        "address": "0x123",
        "collection": "0x5d666f215a85b87cb042d59662a7ecd2c8cc44e6",
        "is_spam": false,
        "items": []
    },
    "error": false,
    "error_message": null,
    "error_code": null
}
```

**Expression**

```javascript
function(resp) {
  if (resp.data.items != null && resp.data.items.length > 0) {
    return 1
  }
  return 0
}
```

## POST

### Endpoint

The RESTFul style URL to which we will sent the HTTP POST request. Unlike the above HTTP-GET-sourced type, no placeholder of the address is allowed in the URL.

The response of the request **must** a valid JSON string.

NOTE: [galxe.com](http://galxe.com) isn’t allowed.

### Headers

Optional; HTTP request header

NOTE: Cookie header isn’t allowed.

### Post Body

As part of a `POST` request, a data payload can be sent to the server in the body of the request. We only supported JSON format post body, and `$address` must be included.

### Expression

Expression is used to evaluate against the reponse to check if the address is eligible for the credential. 
The expression is a JavaScript (ES6) function of type signature: `(object) => int`. The object that will be passed as the parameter to the function is
the entire response.
The function should return either number 1 or 0, representing if the address is eligible for this subgraph credential. 
Behind the scenes, first, we send the request with the user's address to the endpoint, and then we will apply the function against the entire response body.
If the returned value is 1, then user can own this credential, otherwise not.
The function must be anonymous, which means that the first line of the expression should be like `function(resp) {}`, instead of `let expression = (resp) => {}`

### Example1: ETH balance credential

Ethereum Balancer ($ETH Balance > 0)

**Endpoint**

[`https://mainnet.infura.io/v3/YOUR-API-KEY`](https://mainnet.infura.io/v3/YOUR-API-KEY)

**Headers: No header**

**Post Body**

```json
{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "$address",
        "latest"
    ],
    "id": 1
}
```

**Query Output**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x7c2562030800"
}
```

**Expression**

```javascript
function(resp) {
  if (BigInt(resp.result) > 0) {
    return 1
  }
  return 0
}
```

### Example2: NFT holder

Hold at least 1 NFT of contract 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB, verify by using eth_call of `balance_of` function.

**Endpoint**

[`https://mainnet.infura.io/v3/YOUR-API-KEY`](https://mainnet.infura.io/v3/YOUR-API-KEY)

**Headers: No header**

**Post Body**

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "method":"eth_call",
   "params":[
      {
         "data":"0x70a08231000000000000000000000000$addressWithout0x",
         "to":"0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
      },
      "latest"
   ]
}
```

**Query Output**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x00000000000000000000000000000001"
}
```

**Expression**

```javascript
function(resp) {
  if (BigInt(resp.result) > 0) {
    return 1
  }
  return 0
}
```

## FAQ: Cannot test response on Galxe because of CORS?
[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a security check of browser. If your API does not add `galxe.com` to the `Access-Control-Allow-Origin` header of the response, you cannot run the 'test' on Galxe website. Although it will not affect verification, because our backend will no check CORS header, it is recommended to add `galxe.com` to the CORS list.Otherwise, you will have to disable CORS in your browser to run the test, e.g., using plugins like [this](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino).

## FAQ: Users getting 403 error?
Make sure the endpoint has whitelisted our server:
```
44.240.68.227
35.81.233.163
```
