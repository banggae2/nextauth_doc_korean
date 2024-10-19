---
id: pipedrive
---

# 🌐 Pipedrive

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/pipedrive#documentation "Direct link to heading")

[https://pipedrive.readme.io/docs/marketplace-oauth-authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization)

## Options[](https://next-auth.js.org/providers/pipedrive#options "Direct link to heading")

The **Pipedrive Provider** comes with a set of default options:

-   [Pipedrive Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/pipedrive.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/pipedrive#example "Direct link to heading")

```js
import PipedriveProvider from "next-auth/providers/pipedrive";
...
providers: [
  PipedriveProvider({
    clientId: process.env.PIPEDRIVE_CLIENT_ID,
    clientSecret: process.env.PIPEDRIVE_CLIENT_SECRET,
  })
]
...
```