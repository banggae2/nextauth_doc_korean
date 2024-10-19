---
id: authentik
---

# 🌐 Authentik

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/authentik#documentation "Direct link to heading")

[https://goauthentik.io/docs/providers/oauth2](https://goauthentik.io/docs/providers/oauth2)

## Options[](https://next-auth.js.org/providers/authentik#options "Direct link to heading")

The **Authentik Provider** comes with a set of default options:

-   [Authentik Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/authentik.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/authentik#example "Direct link to heading")

```
import AuthentikProvider from "next-auth/providers/authentik";...providers: [  AuthentikProvider({    clientId: process.env.AUTHENTIK_ID,    clientSecret: process.env.AUTHENTIK_SECRET,    issuer: process.env.AUTHENTIK_ISSUER,  })]...
```

:::note
`issuer` should include the slug without a trailing slash ?� e.g., `https://my-authentik-domain.com/application/o/My_Slug`
:::