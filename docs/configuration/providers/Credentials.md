---
id: credentials
---

# Credentials

### 사용 방법

Credentials 공급자는 사용자 이름과 비밀번호, 2단계 인증 또는 하드웨어 장치(예: YubiKey U2F / FIDO)와 같은 임의의 자격 증명으로 로그인하는 것을 처리할 수 있게 해줍니다.

이는 사용자를 인증해야 하는 기존 시스템이 있는 경우를 지원하기 위한 것입니다.

```javascript title="pages/api/auth/[...nextauth].js"
import CredentialsProvider from "next-auth/providers/credentials"

...
providers: [
  CredentialsProvider({
    // 로그인 양식에 표시할 이름 (예: '로그인하기...')
    name: 'Credentials',
    // 자격 증명은 로그인 페이지에서 적절한 양식을 생성하는 데 사용됩니다.
    // 제출할 것으로 예상되는 필드를 지정할 수 있습니다.
    // 예: 도메인, 사용자 이름, 비밀번호, 2FA 토큰 등.
    // HTML 태그에 속성을 전달할 수 있습니다.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // 제출된 자격 증명을 가져와 사용자 객체를 반환하거나
      // 자격 증명이 유효하지 않으면 false/null을 반환하는 로직을 제공해야 합니다.
      // 예: return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // `req` 객체를 사용하여 추가 매개변수 (예: 요청 IP 주소)를 얻을 수 있습니다.
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()
      // 오류가 없고 사용자 데이터가 있는 경우 반환합니다.
      if (res.ok && user) {
        return user
      }
      // 사용자 데이터를 가져올 수 없으면 null 반환
      return null
    }
  })
]
...
```

[Credentials 공급자 문서](https://nextauth-ko.wsbox.pw/providers/credentials)에서 더 많은 정보를 확인해 보세요.

:::note[참고]
Credentials 공급자는 세션에 대해 JSON 웹 토큰이 활성화된 경우에만 사용할 수 있습니다. Credentials 공급자로 인증된 사용자는 데이터베이스에 지속되지 않습니다.
:::
### 옵션

| 이름         | 설명                               | 유형              | 필수 여부   |
|--------------|------------------------------------|-------------------|--------------|
| id           | 공급자의 고유 ID                  | `string`          | 예           |
| name         | 공급자에 대한 설명적 이름        | `string`          | 예           |
| type         | 공급자의 유형, 이 경우 `credentials` | `"credentials"`   | 예           |
| credentials  | 로그인할 자격 증명                | `Object`          | 예           |
| authorize    | 사용자가 승인될 때 실행할 콜백   | `(credentials, req) => Promise<User>` | 예           |