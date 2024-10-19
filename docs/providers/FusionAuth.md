---
id: fusionauth
---

# 🌐 FusionAuth

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation
https://fusionauth.io/docs/v1/tech/oauth/

## Options
The FusionAuth Provider comes with a set of default options:

- [FusionAuth Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/fusionauth.ts)

You can override any of the options to suit your own use case.

```js
import FusionAuthProvider from "next-auth/providers/fusionauth";
...
providers: [
  FusionAuthProvider({
    id: "fusionauth",
    name: "FusionAuth",
    issuer:  process.env.FUSIONAUTH_ISSUER,
    clientId: process.env.FUSIONAUTH_CLIENT_ID,
    clientSecret: process.env.FUSIONAUTH_SECRET,
    tenantId: process.env.FUSIONAUTH_TENANT_ID // Only required if you're using multi-tenancy
  }),
]
...
```

:::danger
If you're using multi-tenancy, you need to pass in the `tenantId` option to apply the proper theme.
:::

## Instructions

### Configuration

:::tip
An application can be created at https://<!-- no url -->your-fusionauth-server-url/admin/application.

For more information, follow the [FusionAuth 5-minute setup guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide).
:::

In the OAuth settings for your application, configure the following.

- Redirect URL
  - http://<!-- no url -->localhost:3000/api/auth/callback/fusionauth
- Enabled grants
  - Make sure Authorization Code is enabled.

If using JSON Web Tokens, you need to make sure the signing algorithm is RS256, you can create an RS256 key pair by going to Settings, Key Master, generate RSA and choosing SHA-256 as algorithm. After that, go to the JWT settings of your application and select this key as Access Token signing key and Id Token signing key.
