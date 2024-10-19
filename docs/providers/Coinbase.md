---
id: coinbase
---

# 🌐 Coinbase

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/coinbase#documentation "Direct link to heading")

[https://developers.coinbase.com/api/v2](https://developers.coinbase.com/api/v2)

## Configuration[](https://next-auth.js.org/providers/coinbase#configuration "Direct link to heading")

[https://www.coinbase.com/settings/api](https://www.coinbase.com/settings/api)

## Options[](https://next-auth.js.org/providers/coinbase#options "Direct link to heading")

The **Coinbase Provider** comes with a set of default options:

-   [Coinbase Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/coinbase.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/coinbase#example "Direct link to heading")

```js
import CoinbaseProvider from "next-auth/providers/coinbase";
...
providers: [
  CoinbaseProvider({
    clientId: process.env.COINBASE_CLIENT_ID,
    clientSecret: process.env.COINBASE_CLIENT_SECRET
  })
]
...
```

:::tip
This Provider template has a 2 hour access token to it. A refresh token is also returned.
:::