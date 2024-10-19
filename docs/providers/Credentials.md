---
id: credentials
---

# Credentials

## 개요

Credentials 제공자는 사용자 이름 및 비밀번호, 도메인, 2단계 인증 또는 하드웨어 장치(예: YubiKey U2F / FIDO)와 같은 임의의 자격 증명을 사용하여 로그인할 수 있도록 합니다. 이는 사용자를 인증해야 하는 기존 시스템이 있는 경우에 사용됩니다.

이 방법으로 인증된 사용자들은 데이터베이스에 저장되지 않으며, 따라서 자격 증명 제공자는 세션에 JSON 웹 토큰이 활성화된 경우에만 사용할 수 있습니다.

:::danger[경고]
자격 증명 기반 인증에 제공되는 기능은 암호 사용을 권장하지 않기 위해 의도적으로 제한되어 있으며, 암호와 관련된 내재된 보안 위험 및 사용자 이름과 비밀번호를 지원하는 데 따른 추가 복잡성과 관련이 있습니다.
:::

## 옵션

**Credentials 제공자**는 기본 옵션 세트를 제공합니다:

- [Credentials 제공자 옵션](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/credentials.ts)

자신의 사용 사례에 맞게 옵션을 재정의할 수 있습니다.

## 예시 - 사용자 이름/비밀번호

Credentials 제공자는 다른 제공자와 같이 지정되지만, HTTP POST로 제출된 자격 증명을 입력으로 받아들이고 다음 중 하나를 반환하는 `authorize()` 핸들러를 정의해야 합니다:

1. 유효한 자격 증명을 나타내는 `user` 객체.
   - 객체를 반환하면 JSON 웹 토큰의 `user` 속성에 저장되며, 사용자는 로그인됩니다. 만약 사용자 정의 `signIn()` 콜백이 설정되어 있으면 이를 거부할 수 있습니다.
  
2. `null`을 반환하면 사용자의 세부 정보를 확인하라는 오류 메시지가 표시됩니다.

3. 오류를 던지면 사용자는 오류 메시지를 쿼리 매개변수로 포함한 오류 페이지로 이동합니다.

Credentials 제공자의 `authorize()` 메서드는 두 번째 매개변수로 요청 객체를 제공합니다(아래 예시 참조).

```js title="pages/api/auth/\[...nextauth\].js"
import CredentialsProvider from "next-auth/providers/credentials";

providers: [
  CredentialsProvider({
    // 로그인 양식에 표시할 이름 (예: "Sign in with...")
    name: "Credentials",
    // `credentials`는 로그인 페이지에서 양식을 생성하는 데 사용됩니다.
    // 제출할 필드를 지정할 수 있습니다.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // 제공된 자격 증명을 사용하여 사용자를 조회하는 로직 추가
      const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      if (user) {
        // 반환된 객체는 JWT의 `user` 속성에 저장됩니다.
        return user
      } else {
        // null을 반환하면 사용자의 세부 정보를 확인하라는 오류가 표시됩니다.
        return null
      }
    }
  })
]
```

[콜백 문서](https://next-auth.js.org/configuration/callbacks)에서 토큰과 상호 작용하는 방법에 대한 더 많은 정보를 확인할 수 있습니다.

## 예시 - Web3 / 이더리움으로 로그인

Credentials 제공자는 [이더리움으로 로그인](https://login.xyz/)과 같은 서비스와 통합하는 데 사용할 수도 있습니다.

더 많은 정보는 아래 링크를 확인하세요:

- [튜토리얼](https://docs.login.xyz/integrations/nextauth.js)
- [예시 앱 저장소](https://github.com/spruceid/siwe-next-auth-example)
- [예시 앱 데모](https://siwe-next-auth-example2.vercel.app/)

## 여러 제공자

### 예시

각 자격 증명 제공자에 대해 고유한 `id`를 지정하여 여러 제공자를 설정할 수 있습니다. 다른 제공자 옵션과 함께 사용할 수도 있습니다. 모든 제공자와 마찬가지로, 제공자를 지정하는 순서가 로그인 페이지에 표시되는 순서입니다.

```javascript
providers: [
  CredentialsProvider({
    id: "domain-login",
    name: "Domain Account",
    async authorize(credentials, req) {
      const user = {
        /* 사용자 조회 기능 추가 */
      }
      return user
    },
    credentials: {
      domain: { label: "Domain", type: "text", placeholder: "CORPNET", value: "CORPNET" },
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
  }),
  CredentialsProvider({
    id: "intranet-credentials",
    name: "Two Factor Auth",
    async authorize(credentials, req) {
      const user = {
        /* 사용자 조회 기능 추가 */
      }
      return user
    },
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      "2fa-key": { label: "2FA Key" },
    },
  }),
  /* ... 추가 제공자 ... */
]
```

![](https://nextauth-ko.wsbox.pw/images/signin-complex-ee85e2ba139b73903bbb9723aa846865.png)