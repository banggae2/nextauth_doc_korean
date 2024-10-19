---
id: salesforce
---

# 🌐 Salesforce

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/salesforce#documentation "Direct link to heading")

[https://help.salesforce.com/articleView?id=remoteaccess\_authenticate.htm&type=5](https://help.salesforce.com/articleView?id=remoteaccess_authenticate.htm&type=5)

## Options[](https://next-auth.js.org/providers/salesforce#options "Direct link to heading")

The **Salesforce Provider** comes with a set of default options:

-   [Salesforce Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/salesforce.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/salesforce#example "Direct link to heading")

```js
import SalesforceProvider from "next-auth/providers/salesforce";
...
providers: [
  SalesforceProvider({
    clientId: process.env.SALESFORCE_CLIENT_ID,
    clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
  })
]
...
```
