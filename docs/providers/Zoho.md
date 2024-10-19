---
id: zoho
---

# 🌐 Zoho

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

:::note
Zoho returns a field on `Account` called `api_domain` which is a string. See their [docs](https://www.zoho.com/accounts/protocol/oauth/web-apps/access-token.html). Remember to add this field to your database schema, in case if you are using an [Adapter](https://next-auth.js.org/adapters).
:::
## Documentation[](https://next-auth.js.org/providers/zoho#documentation "Direct link to heading")

[https://www.zoho.com/accounts/protocol/oauth/web-server-applications.html](https://www.zoho.com/accounts/protocol/oauth/web-server-applications.html)

## Configuration[](https://next-auth.js.org/providers/zoho#configuration "Direct link to heading")

[https://api-console.zoho.com/](https://api-console.zoho.com/)

## Options[](https://next-auth.js.org/providers/zoho#options "Direct link to heading")

The **Zoho Provider** comes with a set of default options:

-   [Zoho Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/zoho.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/zoho#example "Direct link to heading")

```js
import ZohoProvider from "next-auth/providers/zoho";
...
providers: [
    ZohoProvider({
        clientId: process.env.ZOHO_CLIENT_ID,
        clientSecret: process.env.ZOHO_CLIENT_SECRET
    })
]
...
```
