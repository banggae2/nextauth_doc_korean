---
id: linkedin
---

# 🌐 LinkedIn

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documenttation
https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow

## Configuration
https://www.linkedin.com/developers/apps/

From the Auth tab get the client ID and client secret. On the same tab, add redirect URLs such as http://localhost:3000/api/auth/callback/linkedin so LinkedIn can correctly redirect back to your application. Finally, head over to the Products tab and enable the "Sign In with LinkedIn" product. The LinkedIn team will review and approve your request before you can test it out.

![](https://nextauth-ko.wsbox.pw/img/114429603-68195600-9b72-11eb-8311-62e58383c42b.png)


## Options

The **LinkedIn Provider** comes with a set of default options:

- [LinkedIn Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/linkedin.ts)

You can override any of the options to suit your own use case.

## Example
```js
import LinkedInProvider from "next-auth/providers/linkedin";
...
providers: [
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET
  })
]
...
```
