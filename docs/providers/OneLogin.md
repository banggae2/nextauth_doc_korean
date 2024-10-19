---
id: onelogin
---

# OneLogin

## 문서

https://developers.onelogin.com/openid-connect

## 구성

https://developers.onelogin.com/openid-connect/connect-to-onelogin

## 옵션
OneLogin 제공자는 기본 옵션 세트를 제공합니다:

- [OneLogin Provider 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/onelogin.js)

이 옵션은 사용자의 요구에 맞게 재정의할 수 있습니다.

## 예제

```javascript
import OneLoginProvider from "next-auth/providers/onelogin";

providers: [
  OneLoginProvider({
    clientId: process.env.ONELOGIN_CLIENT_ID,
    clientSecret: process.env.ONELOGIN_CLIENT_SECRET,
    issuer: process.env.ONELOGIN_ISSUER,
  })
]
```