---
id: cognito
---

# 🌐 Amazon Cognito

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::
## Documentation[](https://next-auth.js.org/providers/cognito#documentation "Direct link to heading")

[https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html)

## Configuration[](https://next-auth.js.org/providers/cognito#configuration "Direct link to heading")

[https://console.aws.amazon.com/cognito/users/](https://console.aws.amazon.com/cognito/users/)

You need to select your AWS region to go the the Cognito dashboard.

## Options[](https://next-auth.js.org/providers/cognito#options "Direct link to heading")

The **Amazon Cognito Provider** comes with a set of default options:

-   [Amazon Cognito Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/cognito.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/cognito#example "Direct link to heading")

```js
import CognitoProvider from "next-auth/providers/cognito";
...
providers: [
    CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
    })
]
...
```

:::tip
The issuer is a URL, that looks like this: `https://cognito-idp.{region}.amazonaws.com/{PoolId}`
:::

`PoolId` is from `General Settings` in Cognito, not to be confused with the App Client ID.

:::danger
Make sure you select all the appropriate client settings or the OAuth flow will not work.
:::

:::tip
Before you can set these settings, you must [set up an Amazon Cognito hosted domain](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-assign-domain.html). The setting can be found in `App Client/Edit Hosted UI`.
:::