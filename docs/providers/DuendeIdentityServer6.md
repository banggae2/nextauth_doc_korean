---
id: duende-identityserver6
---

# 🌐 DuendeIdentityServer6

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation
https://docs.duendesoftware.com/identityserver/v6

## Options
The **DuendeIdentityServer6 Provider** comes with a set of default options:

- [DuendeIdentityServer6 Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/duende-identity-server6.ts)

You can override any of the options to suit your own use case.

```js
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

...
providers: [
  DuendeIDS6Provider({
    clientId: process.env.DUENDE_IDS6_ID,
    clientSecret: process.env.DUENDE_IDS6_SECRET,
    issuer: process.env.DUENDE_IDS6_ISSUER,
  })
]
...
```

## Demo IdentityServer

The configuration below is for the demo server at https://demo.duendesoftware.com/

If you want to try it out, you can copy and paste the configuration below.

You can sign in to the demo service with either **bob/bob** or **alice/alice**.

```js
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"
...
providers: [
  DuendeIDS6Provider({
    clientId: "interactive.confidential",
    clientSecret: "secret",
    issuer: "https://demo.duendesoftware.com",
  })
]
...
```
