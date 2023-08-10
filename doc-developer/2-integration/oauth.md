---
sidebar_label: Galxe ID SDK
sidebar_position: 1
slug: galxe-id-sdk
---
# Galxe ID SDK

## Getting Started

To get started, please apply for a client ID by contacting our live chat support from your dashboard management page.

## OAuth

Galxe's OAuth implementation supports the standard [authorization code grant type](https://tools.ietf.org/html/rfc6749#section-4.1) for apps that don't have access to a web browser.

### Authorization flow

The request flow to authorize users for your app is:

1. Users are redirected to request their Galxe identity
2. Users are redirected back to your site by Galxe
3. Your app accesses the API with the user's access token

### 1. Request a user's Galxe identity

#### URL

```html
GET https://galxe.com/oauth
```

```bash
REDIRECT
https://galxe.com/oauth?client_id=${CLIENT-ID}&scope=${SCOPE}&redirect_uri=${REDIRCT-URI}&state=${STATE}
```

**scope whitelist**:

* Email
* Twitter
* Discord
* Github
* EVMAddress
* SolanaAddress

#### Parameters

| Name                  | Type   | Description                                                                                                                                                                                                                                                   |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_id             | string | **Required**. The client ID you received from Galxe when you registered.                                                                                                                                                                                      |
| scope                 | string | **Required**. A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application.                                                                                           |
| redirect_uri          | string | **Required**. The URL in your application where users will be sent after authorization, also known as callback url.                                                                                                                                           |
| state                 | string | **Required**. An unguessable random string. It is used to protect against cross-site request forgery attacks.                                                                                                                                                 |
| code_challenge        | string | PKCE (Proof Key for Code Exchange) is an extension to the Authorization Code flow to prevent CSRF and authorization code injection attacks. PKCE is not a replacement for a client secret, and PKCE is recommended even if a client is using a client secret. |
| code_challenge_method | string | Encoding method, plain or S256 (sha256), S256 is recommended.                                                                                                                                                                                                 |

#### Response

By default, the response will add the following parameter to your `redirect_uri`:

```bash
code=${CODE}&state=${STATE}
```

### 2. Get Access Token

If the user accepts your request, Galxe redirects back to your site with a temporary `code` in a code parameter as well as the state you provided in the previous step in a `state` parameter. The temporary code will expire after **10 minutes**. If the states don't match, then a third party created the request, and you should abort the process.

Exchange this `code` for an access token.

#### URL

```html
Content-Type:application/x-www-form-urlencoded
POST https://api.galxe.com/oauth/auth/2/token
```

```bash
$ curl -d 'client_id=${CLIENT-ID}&client_secret=${CLIENT-SECRET}&code=${CODE}&grant_type=authorization_code' -H "Content-Type:application/x-www-form-urlencoded" -X POST https://api.galxe.com/oauth/auth/2/token
```

#### Parameters

| Name          | Type   | Description                                                                 |
| ------------- | ------ | --------------------------------------------------------------------------- |
| client_id     | string | **Required**. The client ID you received from Galxe for your OAuth App.     |
| client_secret | string | **Required**. The client secret you received from Galxe for your OAuth App. |
| code          | string | **Required**. The code you received as a response to OAuth Authorize Step.  |
| code_verifier | string | Plain string of code_challenge, only used when requiring code_challenge.    |

#### Response

By default, the response takes the following form:

```json
{
  "access_token": "OTJLYTIWNMQTYJY1ZC0ZOGQ2LTGYMDITNWQXZWJKNTA4YZAA",
  "expires_in": 86400,
  "refresh_token": "NGM5OWUXNDKTNTEZOC01NZBMLWEXMGUTMDUYZGJMNZI3YME0",
  "scope": "Twitter",
  "token_type": "Bearer"
}
```

### 3. Refresh Access Token

#### URL

```html
Content-Type:application/x-www-form-urlencoded
POST https://api.galxe.com/oauth/auth/2/token
```

```bash
$ curl -d 'grant_type=refresh_token&refresh_token=${REFRESH-TOKEN}&client_id=${CLIENT-ID}&client_secret=${CLIENT-SECRET}' -H "Content-Type:application/x-www-form-urlencoded" -X POST https://api.galxe.com/oauth/auth/2/token
```

#### Parameters

| Name          | Type   | Description                                                                                                            |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| refresh_token | string | **Required**. The token generated when the Galxe App owner enables expiring tokens and issues a new user access token. |
| grant_type    | string | **Required**. Value must be refresh_token (required by the OAuth specification).                                       |
| client_id     | string | **Required**. The client ID for Galxe App.                                                                             |
| client_secret | string | **Required**. The client secret for Galxe App.                                                                         |

#### Response

```json
{
  "access_token": "NTLMMJKYMMQTZJZJYI0ZZGFLLWE5NZMTMZAZMDY3YWMWNMI4",
  "expires_in": 86400,
  "refresh_token": "NGQXZGVJZDCTNTQ4YY01NTEZLTHMNTMTYJZHMWZIYJUZMJE3",
  "scope": "Twitter Discord",
  "token_type": "Bearer"
}
```

### 4. Get Access Token Detail

#### URL

```html
Authorization: Bearer ${ACCESS-TOKEN}
GET https://api.galxe.com/oauth/api/2/token
```

```bash
$ curl -H "Authorization: Bearer ${ACCESS-TOKEN}" https://api.galxe.com/oauth/api/2/token
```

#### Parameters

| Name         | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| access_token | string | **Required**. Append it to header. |

#### Response

```json
{
  "client_id": "client_id",
  "expires_at": "2022-08-31 16:00:22.666401 +0800 CST",
  "scope": "twitter discord",
}
```

### 5. Use the access token to access the API

#### URL

```html
Authorization: Bearer ${ACCESS-TOKEN}
GET https://api.galxe.com/oauth/api/2/user
```

```bash
$ curl -H "Authorization: Bearer ${ACCESS-TOKEN}" https://api.galxe.com/oauth/api/2/user?scope=Twitter%20Discord
```

#### Parameters

| Name         | Type   | Description                                                                                                                          |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| access_token | string | **Required**. Append it to request header.                                                                                           |
| scope        | string | A space-delimited list of scopes of user data that your APP required. If not set, will set to access token related scope by default. |

#### Response

```json
{
  "TwitterUsername": "twitter_username",
  "TwitterUserID": "twitter_userid",
  "DiscordUsername": "discord_username"
  "DiscordUserID": "discord_userid"
}
```

## Passport

Authorized partners of Galxe can request to access user’s encrypted KYC data in their Galxe Passport through strict user consent. This document describes the workflow.

### Workflow

Assume an external company, XYZ, wants to access an user’s KYC data stored inside their Galxe Passport. From XYZ’s website, the user will first be redirected to <https://galxe.com/passportauth>, where they are prompted to connect their wallet and go through the passport decryption flow on the frontend using their own password. Decrypted data will then be sent as HTTP POST request to XYZ’s endpoint.

For example, upon user decryption, they get the following JSON (this is what will be sent as POST payload to XYZ’s endpoint): 

```json
{"body":"{\"owner\":\"0xb85b3D61439a3d70D3DF7913a3A764F352b32C55\",\"plain\":\"eyJldm0tYWRkcmVzcyI6IjB4Yjg1YjNENjE0MzlhM2Q3MEQzREY3OTEzYTNBNzY0RjM1MmIzMkM1NSIsImdvdmVybm1lbnRJRHMiOlt7ImZpcnN0LW5hbWUiOiJBTEVYQU5ERVIgSiIsImxhc3QtbmFtZSI6IlNBTVBMRSIsImJpcnRoZGF0ZSI6IjE5NzctMDctMTciLCJuYXRpb25hbGl0eSI6IiIsImRvY3VtZW50LW51bWJlciI6IiIsInNleCI6Ik1hbGUiLCJjb3VudHJ5LWNvZGUiOiJVUyIsImlkLWNsYXNzIjoiZGwiLCJmcm9udC1waG90by1rZXkiOiJodHRwczovL3dpdGhwZXJzb25hLmNvbS9hcGkvdjEvZmlsZXMvZXlKZmNtRnBiSE1pT25zaWJXVnpjMkZuWlNJNklrSkJhSE5MZDJaYU4wdFNTU0lzSW1WNGNDSTZiblZzYkN3aWNIVnlJam9pWW14dllsOXBaQ0o5ZlE9PS0tZDUzOTg4MzU2NjViODJlYTk4YTE3ZmYyMTRjODhhZjkxN2FhNzUyYy8xNjY2MTYyMjA1NzI2NjI5NzE0LmpwZyIsImJhY2stcGhvdG8ta2V5IjoiaHR0cHM6Ly93aXRocGVyc29uYS5jb20vYXBpL3YxL2ZpbGVzL2V5SmZjbUZwYkhNaU9uc2liV1Z6YzJGblpTSTZJa0pCYUhOTGQyWllOMHRTU1NJc0ltVjRjQ0k2Ym5Wc2JDd2ljSFZ5SWpvaVlteHZZbDlwWkNKOWZRPT0tLWRmNDhiMjBmYTcxMGE4NTg2MmFlMzFjMDNmZmM1YWRmZjA3NzMzOWYvMTY2NjE2MjIwNTcyNjYyOTcxNC5qcGciLCJpZGVudGlmaWNhdGlvbi1udW1iZXIiOiJJMTIzNDU2MiJ9XSwic2VsZmllIjp7ImxlZnQtcGhvdG8ta2V5IjoiaHR0cHM6Ly93aXRocGVyc29uYS5jb20vYXBpL3YxL2ZpbGVzL2V5SmZjbUZwYkhNaU9uc2liV1Z6YzJGblpTSTZJa0pCYUhOTGQyTnhTMkZXU1NJc0ltVjRjQ0k2Ym5Wc2JDd2ljSFZ5SWpvaVlteHZZbDlwWkNKOWZRPT0tLTRhZjRjZjMyODUzZTQ0NDc4NDAwYmY1MDZmM2E2ODc1ZDhkYjYwNzEvbGVmdF9waG90b19wcm9jZXNzZWQuanBnIiwiY2VudGVyLXBob3RvLWtleSI6Imh0dHBzOi8vd2l0aHBlcnNvbmEuY29tL2FwaS92MS9maWxlcy9leUpmY21GcGJITWlPbnNpYldWemMyRm5aU0k2SWtKQmFITkxkMk50UzJGV1NTSXNJbVY0Y0NJNmJuVnNiQ3dpY0hWeUlqb2lZbXh2WWw5cFpDSjlmUT09LS00NmU5NDA3MTRmNDdkZjJlNzdlZjJlY2UyNDZmNTY5YWYxODgzN2I0L2NlbnRlcl9waG90b19wcm9jZXNzZWQuanBnIiwicmlnaHQtcGhvdG8ta2V5IjoiaHR0cHM6Ly93aXRocGVyc29uYS5jb20vYXBpL3YxL2ZpbGVzL2V5SmZjbUZwYkhNaU9uc2liV1Z6YzJGblpTSTZJa0pCYUhOTGQyTnlTMkZXU1NJc0ltVjRjQ0k2Ym5Wc2JDd2ljSFZ5SWpvaVlteHZZbDlwWkNKOWZRPT0tLThjZGExZTEyOTg5Y2Y4MWIxZTVlODZkYjgyNTE5ZWFkZjU4MGFkNTAvcmlnaHRfcGhvdG9fcHJvY2Vzc2VkLmpwZyJ9LCJwYXNzcG9ydC12ZXJzaW9uIjoidjEuMSIsInBlcnNvbmEtaWQiOiJkMzFjMjVkNS0yNThlLTQ0NzgtYWI4Ni00ODI2ZGE0ZTI1OTgifQ==\",\"salt\":\"M-oWdEP9iIvrsr4Im6DiBix4kEWTQkOp\"}","signature":"1r2HXn2bJ/Eiz3+r3l5+wiSZSHivcIHvPKIWHp0WrDRA0VTyulA2syRRFMZTAUdLn5kXPR4z+PBFD44obgVYsgE="}
```

XYZ can then proceed to decode this data, as well as validate its signatures.

`body.plain` is a base64 encoded string. Decoding it as follows:

```jsx
const decodedJson = JSON.parse(decoded.toString());
const bodyJson = JSON.parse(decodedJson.body);
const body = Buffer.from(bodyJson.plain, "base64").toString();
const kycData = JSON.parse(body);
console.log(kycData);
```

We get:

```json
{
  'evm-address': '0xb85b3D61439a3d70D3DF7913a3A764F352b32C55',
  governmentIDs: [
    {
      'first-name': 'ALEXANDER J',
      'last-name': 'SAMPLE',
      birthdate: '1977-07-17',
      nationality: '',
      'document-number': '',
      sex: 'Male',
      'country-code': 'US',
      'id-class': 'dl',
      'front-photo-key': 'https://withpersona.com/api/v1/files/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHNLd2ZaN0tSSSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d5398835665b82ea98a17ff214c88af917aa752c/1666162205726629714.jpg',
      'back-photo-key': 'https://withpersona.com/api/v1/files/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHNLd2ZYN0tSSSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--df48b20fa710a85862ae31c03ffc5adff077339f/1666162205726629714.jpg',
      'identification-number': 'I1234562'
    }
  ],
  selfie: {
    'left-photo-key': 'https://withpersona.com/api/v1/files/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHNLd2NxS2FWSSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4af4cf32853e44478400bf506f3a6875d8db6071/left_photo_processed.jpg',
    'center-photo-key': 'https://withpersona.com/api/v1/files/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHNLd2NtS2FWSSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--46e940714f47df2e77ef2ece246f569af18837b4/center_photo_processed.jpg',
    'right-photo-key': 'https://withpersona.com/api/v1/files/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHNLd2NyS2FWSSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8cda1e12989cf81b1e5e86db82519eadf580ad50/right_photo_processed.jpg'
  },
  'passport-version': 'v1.1',
  'persona-id': 'd31c25d5-258e-4478-ab86-4826da4e2598'
}
```

Note that persona photo urls are not publicly accessible. These URLs purely exist for legacy reasons.

Pseudocode to validate signature:

1. `hash = keccak256(body)` 
2. `signer = recoverSigner(hash, Base64.decode(signature))`

For now, signer should match: `0x36066A2d5c8D4A486E0d1EC3FB51b0E242e3Fb75`. In future we will release a REST endpoint to verify the validity of signer.