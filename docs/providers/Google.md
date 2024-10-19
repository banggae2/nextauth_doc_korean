---
id: google
---

# Google

## 문서
https://developers.google.com/identity/protocols/oauth2

## 구성
https://console.developers.google.com/apis/credentials

생성할 때 사용되는 "승인된 리디렉션 URI"는 전체 도메인을 포함하고 콜백 경로로 끝나야 합니다. 예를 들어:

- 프로덕션: `https://{YOUR_DOMAIN}/api/auth/callback/google`
- 개발: `http://localhost:3000/api/auth/callback/google`

## 옵션
Google 제공자는 기본 옵션 세트를 제공합니다:

- [Google Provider 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/google.ts)

이 옵션은 사용자의 요구에 맞게 재정의할 수 있습니다.

## 예제

```javascript
import GoogleProvider from "next-auth/providers/google";

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })
]
```

:::danger[경고]
Google은 사용자가 처음 로그인할 때만 애플리케이션에 Refresh Token을 제공합니다. 사용자가 Refresh Token을 다시 발급받으려면 애플리케이션을 자신의 계정에서 제거하고 다시 로그인해야 합니다: https://myaccount.google.com/permissions

또한, `authorization`의 `params` 객체에 옵션을 추가하여 매번 Refresh Token을 제공하도록 강제할 수 있지만, 이 경우 모든 사용자가 로그인할 때마다 애플리케이션에 대한 접근을 허용할지를 확인해야 합니다.

Refresh Token이나 Access Token에 대한 접근이 필요하고 데이터베이스를 사용하지 않는 경우, 이를 고려해야 합니다.

```javascript
const options = {
  ...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  ...
}
```
:::

:::tip[팁]
Google은 OAuth 프로필에 `email_verified` 부울 속성을 반환합니다. 이 속성을 사용하여 특정 도메인에 대해 인증된 계정의 접근을 제한할 수 있습니다.

```javascript
const options = {
  ...
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // 다른 제공자에 대해 다른 검증 수행
    },
  },
  ...
}
```
:::