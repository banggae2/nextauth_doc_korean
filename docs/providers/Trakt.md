---
id: trakt
---

# 🌐 Trakt

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation

https://trakt.docs.apiary.io/#refernce/authentication-oauth

## Configuration

If you're using the api in production by calling [api.trakt.tv](https://api.trakt.tv/). Follow the example below. If you wish to develop on Trakt's sandbox environment by calling [api-staging.trakt.tv](https://api-staging.trakt.tv/). Use the default options with the changed the URLs.

Start by creating an OAuth app on Trakt for [production](https://trakt.tv/oauth/applications/new) or [development](https://staging.trakt.tv/oauth/applications/new). Then set the Client ID and Client Secret as `TRAKT_ID` and `TRAKT_SECRET` in `.env`.

## Options

The **Trakt Provider** comes with a set of default options:

- [Trakt Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/trakt.ts)
  
You can override any of the options to suit your own use case.


## Example

```js
providers: [
  TraktProvider({
    clientId: process.env.TRAKT_ID,
    clientSecret: process.env.TRAKT_SECRET,
  }),
]
```

:::danger
Trakt does not allow hotlinking images. Even the authenticated user's profie picture.
:::

:::danger
Trakt does not supply the authenticated user's email.
:::