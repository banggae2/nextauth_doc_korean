---
id: united-effects
---

# 🌐 United Effects

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation
https://docs.unitedeffects.com/integrations/nextauthjs

## Configuration
https://core.unitedeffects.com

## Options
The United Effects Provider comes with a set of default options:

- [United Effects Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/united-effects.ts)

You can override any of the options to suit your own use case.

```js
import UnitedEffectsProvider from "next-auth/providers/united-effects";
...
providers: [
  UnitedEffectsProvider({
    clientId: process.env.UNITED_EFFECTS_CLIENT_ID,
    clientSecret: process.env.UNITED_EFFECTS_CLIENT_SECRET,
    issuer: process.env.UNITED_EFFECTS_ISSUER
  })
]
...
```

:::note
`issuer` should be the fully qualified URL including your Auth Group ID – e.g. `https://auth.unitedeffects.com/YQpbQV5dbW-224dCovz-3`
:::

:::danger
The United Effects API does not return the user name or image by design, so this provider will return null for both. United Effects prioritizes user personal information security above all and has built a secured profile access request system separate from the provider API.
:::