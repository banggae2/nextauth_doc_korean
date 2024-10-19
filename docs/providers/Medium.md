---
id: medium
---

# 🌐 Medium

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/medium#documentation "Direct link to heading")

[https://github.com/Medium/medium-api-docs](https://github.com/Medium/medium-api-docs)

## Configuration[](https://next-auth.js.org/providers/medium#configuration "Direct link to heading")

[https://medium.com/me/applications](https://medium.com/me/applications)

## Options[](https://next-auth.js.org/providers/medium#options "Direct link to heading")

The **Medium Provider** comes with a set of default options:

-   [Medium Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/medium.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/medium#example "Direct link to heading")

```js
import MediumProvider from "next-auth/providers/medium";
...
providers: [
  MediumProvider({
    clientId: process.env.MEDIUM_CLIENT_ID,
    clientSecret: process.env.MEDIUM_CLIENT_SECRET
  })
}
...
```

:::danger
Email address is not returned by the Medium API.
:::