---
sidebar_label: OAuth
sidebar_position: 1
slug: oauth
---
# Authorizing OAuth Apps

Galxe's OAuth implementation supports the standard [authorization code grant type](https://tools.ietf.org/html/rfc6749#section-4.1) for apps that don't have access to a web browser.

## Authorization flow

The request flow to authorize users for your app is:

1. Users are redirected to request their Galxe identity
2. Users are redirected back to your site by Galxe
3. Your app accesses the API with the user's access token

## 1. Request a user's Galxe identity

### URL

```html
GET https://galxe.com/oauth
```

```bash
REDIRECT
https://galxe.com/oauth?client_id=${CLIENT-ID}&scope=${SCOPE}&redirect_uri=${REDIRCT-URI}&state=${STATE}
```

**scope whitelist**:

- Email
- Twitter
- Discord
- Github
- EVMAddress
- SolanaAddress

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| client_id | string | **Required**. The client ID you received from Galxe when you registered. |
| scope | string | **Required**. A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. |
| redirect_uri | string | **Required**. The URL in your application where users will be sent after authorization, also known as callback url. |
| state | string | **Required**. An unguessable random string. It is used to protect against cross-site request forgery attacks. |
| code_challenge | string | PKCE (Proof Key for Code Exchange) is an extension to the Authorization Code flow to prevent CSRF and authorization code injection attacks. PKCE is not a replacement for a client secret, and PKCE is recommended even if a client is using a client secret. |
| code_challenge_method | string | Encoding method, plain or S256 (sha256), S256 is recommended. |

### Response

By default, the response will add the following parameter to your `redirect_uri`:

```bash
code=${CODE}&state=${STATE}
```

## 2. Get Access Token

If the user accepts your request, Galxe redirects back to your site with a temporary `code` in a code parameter as well as the state you provided in the previous step in a `state` parameter. The temporary code will expire after **10 minutes**. If the states don't match, then a third party created the request, and you should abort the process.

Exchange this `code` for an access token.

### URL

```html
Content-Type:application/x-www-form-urlencoded
POST https://api.galxe.com/oauth/auth/2/token
```

```bash
$ curl -d 'client_id=${CLIENT-ID}&client_secret=${CLIENT-SECRET}&code=${CODE}&grant_type=authorization_code' -H "Content-Type:application/x-www-form-urlencoded" -X POST https://api.galxe.com/oauth/auth/2/token
```

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| client_id | string | **Required**. The client ID you received from Galxe for your OAuth App. |
| client_secret | string | **Required**. The client secret you received from Galxe for your OAuth App. |
| code | string | **Required**. The code you received as a response to OAuth Authorize Step. |
| code_verifier | string | Plain string of code_challenge, only used when requiring code_challenge. |

### Response

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

## 3. Refresh Access Token

### URL

```html
Content-Type:application/x-www-form-urlencoded
POST https://api.galxe.com/oauth/auth/2/token
```

```bash
$ curl -d 'grant_type=refresh_token&refresh_token=${REFRESH-TOKEN}&client_id=${CLIENT-ID}&client_secret=${CLIENT-SECRET}' -H "Content-Type:application/x-www-form-urlencoded" -X POST https://api.galxe.com/oauth/auth/2/token
```

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| refresh_token | string | **Required**. The token generated when the Galxe App owner enables expiring tokens and issues a new user access token. |
| grant_type | string | **Required**. Value must be refresh_token (required by the OAuth specification). |
| client_id | string | **Required**. The client ID for Galxe App. |
| client_secret | string | **Required**. The client secret for Galxe App. |

### Response

```json
{
  "access_token": "NTLMMJKYMMQTZJZJYI0ZZGFLLWE5NZMTMZAZMDY3YWMWNMI4",
  "expires_in": 86400,
  "refresh_token": "NGQXZGVJZDCTNTQ4YY01NTEZLTHMNTMTYJZHMWZIYJUZMJE3",
  "scope": "Twitter Discord",
  "token_type": "Bearer"
}
```

## 4. Get Access Token Detail

### URL

```html
Authorization: Bearer ${ACCESS-TOKEN}
GET https://api.galxe.com/oauth/api/2/token
```

```bash
$ curl -H "Authorization: Bearer ${ACCESS-TOKEN}" https://api.galxe.com/oauth/api/2/token
```

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| access_token | string | **Required**. Append it to header. |

### Response

```json
{
  "client_id": "client_id",
  "expires_at": "2022-08-31 16:00:22.666401 +0800 CST",
  "scope": "twitter discord",
}
```

## 5. Use the access token to access the API

### URL

```html
Authorization: Bearer ${ACCESS-TOKEN}
GET https://api.galxe.com/oauth/api/2/user
```

```bash
$ curl -H "Authorization: Bearer ${ACCESS-TOKEN}" https://api.galxe.com/oauth/api/2/user?scope=Twitter%20Discord
```

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| access_token | string | **Required**. Append it to request header. |
| scope | string | A space-delimited list of scopes of user data that your APP required. If not set, will set to access token related scope by default. |

### Response

```json
{
  "TwitterUsername": "twitter_username",
  "TwitterUserID": "twitter_userid",
  "DiscordUsername": "discord_username"
  "DiscordUserID": "discord_userid"
}
```