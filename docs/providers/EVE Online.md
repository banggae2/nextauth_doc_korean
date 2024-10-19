---
id: eveonline
---

# 🌐 EVE Online

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/eveonline#documentation "Direct link to heading")

[https://developers.eveonline.com/blog/article/sso-to-authenticated-calls](https://developers.eveonline.com/blog/article/sso-to-authenticated-calls)

## Configuration[](https://next-auth.js.org/providers/eveonline#configuration "Direct link to heading")

[https://developers.eveonline.com/](https://developers.eveonline.com/)

## Options[](https://next-auth.js.org/providers/eveonline#options "Direct link to heading")

The **EVE Online Provider** comes with a set of default options:

-   [EVE Online Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/eveonline.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/eveonline#example "Direct link to heading")

```js
import EVEOnlineProvider from "next-auth/providers/eveonline";

...
providers: [
  EVEOnlineProvider({
    clientId: process.env.EVE_CLIENT_ID,
    clientSecret: process.env.EVE_CLIENT_SECRET
  })
]
...
```

:::tip[When creating your application, make sure to select `Authentication Only` as the connection type.]
:::

```js
...
options: {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id;
      return session;
      }
  }
}
...
```
