---
id: facebook
---

# 🌐 Facebook

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/facebook#documentation "Direct link to heading")

[https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/)

## Configuration[](https://next-auth.js.org/providers/facebook#configuration "Direct link to heading")

[https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)

## Options[](https://next-auth.js.org/providers/facebook#options "Direct link to heading")

The **Facebook Provider** comes with a set of default options:

-   [Facebook Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/facebook.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/facebook#example "Direct link to heading")

```js
import FacebookProvider from "next-auth/providers/facebook";

...
providers: [
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  })
]
...
```

:::tip
Production applications cannot use localhost URLs to sign in with Facebook. You need to use a dedicated development application in Facebook to use **localhost** callback URLs.
:::

:::tip
Email address may not be returned for accounts created on mobile.
:::