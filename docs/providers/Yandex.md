---
id: yandex
---

# 🌐 Yandex

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/yandex#documentation "Direct link to heading")

[https://tech.yandex.com/oauth/doc/dg/concepts/about-docpage/](https://tech.yandex.com/oauth/doc/dg/concepts/about-docpage/)

## Configuration[](https://next-auth.js.org/providers/yandex#configuration "Direct link to heading")

[https://oauth.yandex.com/client/new](https://oauth.yandex.com/client/new)

## Options[](https://next-auth.js.org/providers/yandex#options "Direct link to heading")

The **Yandex Provider** comes with a set of default options:

-   [Yandex Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/yandex.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/yandex#example "Direct link to heading")

```js
import YandexProvider from "next-auth/providers/yandex";
...
providers: [
  YandexProvider({
    clientId: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET
  })
]
...
```
