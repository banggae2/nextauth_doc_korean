---
id: osu
---

# 🌐 osu!

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/osu#documentation "Direct link to heading")

[https://osu.ppy.sh/docs/index.html#authentication](https://osu.ppy.sh/docs/index.html#authentication)

## Configuration[](https://next-auth.js.org/providers/osu#configuration "Direct link to heading")

[https://osu.ppy.sh/home/account/edit#new-oauth-application](https://osu.ppy.sh/home/account/edit#new-oauth-application)

## Options[](https://next-auth.js.org/providers/osu#options "Direct link to heading")

The **osu! Provider** comes with a set of default options:

-   [osu! Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/osu.ts)

You can override any of the options to suit your own use case.

:::note
osu! does **not** provide a user email!
:::

## Example[](https://next-auth.js.org/providers/osu#example "Direct link to heading")

```js
import OsuProvider from "next-auth/providers/osu";
...
providers: [
  OsuProvider({
    clientId: process.env.OSU_CLIENT_ID,
    clientSecret: process.env.OSU_CLIENT_SECRET
  })
]
...
```
