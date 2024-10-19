---
id: email
---

# 🌐 Email

다음은 NextAuth.js의 이메일 제공자에 대한 개요입니다.

## 개요
이메일 제공자는 사용자가 로그인할 수 있도록 "매직 링크"를 이메일로 전송하여 인증합니다. 이러한 링크는 Slack과 같은 서비스에서 자주 사용되는 방식입니다. 이메일을 통해 로그인할 수 있는 기능을 추가함으로써 사용자가 OAuth 계정에 접근할 수 없을 때 대안적인 로그인 방법을 제공합니다.

### 작동 방식
초기 로그인 시 제공된 이메일 주소로 **검증 토큰**이 전송됩니다. 기본적으로 이 토큰은 24시간 동안 유효합니다. 사용자가 이메일의 링크를 클릭하여 검증 토큰을 사용할 경우, 사용자 계정이 생성되고 로그인됩니다. 이미 존재하는 계정의 이메일 주소를 제공하면, 해당 이메일과 연결된 계정으로 로그인할 수 있는 이메일이 전송됩니다.

### 옵션
이메일 제공자는 기본 옵션 세트를 제공합니다:

- [이메일 제공자 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/email.ts)

이 옵션들은 사용자의 필요에 맞게 재정의할 수 있습니다.

## 구성
NextAuth.js는 이메일을 HTTP 또는 SMTP를 통해 전송할 수 있습니다.

### HTTP
[HTTP 기반 이메일 제공자 가이드](https://authjs.dev/guides/configuring-http-email)를 참고하십시오.

### SMTP
1. NextAuth.js는 `nodemailer`를 종속성으로 포함하고 있지 않으므로, 이메일 제공자를 사용하려면 직접 설치해야 합니다. 다음 명령어를 실행합니다:
   ```bash
   npm install nodemailer
   # 또는
   yarn add nodemailer
   ```
2. SMTP 계정이 필요합니다. 가능하면 [nodemailer와 호환되는 서비스](https://community.nodemailer.com/2-0-0-beta/setup-smtp/well-known-services)를 사용하세요.
3. SMTP 서버 연결을 구성하는 방법은 두 가지입니다:
   - **연결 문자열 사용**
   - **구성 객체 사용**

**연결 문자열 사용 예시:**
`.env` 파일에 다음을 추가합니다:

```plaintext
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

다음과 같이 이메일 제공자를 추가할 수 있습니다:

```javascript
import EmailProvider from "next-auth/providers/email";

providers: [
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
  }),
],
```

**구성 객체 사용 예시:**
`.env` 파일에 다음을 추가합니다:

```plaintext
EMAIL_SERVER_USER=username
EMAIL_SERVER_PASSWORD=password
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@example.com
```

이제 이메일 제공자 설정을 NextAuth.js 옵션 객체에 추가할 수 있습니다:

```javascript
import EmailProvider from "next-auth/providers/email";

providers: [
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
],
```

4. 이메일 검증 토큰을 저장하기 위해 데이터베이스 [어댑터](https://authjs.dev/getting-started/database)를 설정하는 것을 잊지 마십시오.
5. `/api/auth/signin`에서 이메일 주소로 로그인할 수 있습니다.

사용자가 이메일 주소를 검증하기 전까지는 사용자 계정이 생성되지 않습니다. 이미 계정과 연결된 이메일 주소를 사용하는 경우, 사용자는 이메일의 링크를 통해 해당 계정으로 로그인하게 됩니다.

## 이메일 사용자 정의
`sendVerificationRequest` 옵션을 사용하여 전송되는 로그인 이메일을 완전히 사용자 정의할 수 있습니다.

```javascript
import EmailProvider from "next-auth/providers/email";

providers: [
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
      /* 사용자 정의 함수 */
    },
  }),
],
```

## 검증 토큰 사용자 정의
기본적으로 무작위 검증 토큰이 생성됩니다. 이를 재정의하려면 제공자 옵션에서 `generateVerificationToken` 메서드를 정의할 수 있습니다.

```javascript
providers: [
  EmailProvider({
    async generateVerificationToken() {
      return "ABC123"; // 사용자 정의 검증 토큰
    },
  }),
],
```

## 이메일 주소 정규화
NextAuth.js는 기본적으로 이메일 주소를 정규화합니다. 이 과정에서 대소문자를 구분하지 않으며, 쉼표로 구분된 리스트의 두 번째 이메일 주소는 제거합니다. 사용자 정의 정규화를 원한다면 `normalizeIdentifier` 메서드를 사용하세요.

```javascript
EmailProvider({
  normalizeIdentifier(identifier: string): string {
    let [local, domain] = identifier.toLowerCase().trim().split("@");
    domain = domain.split(",")[0];
    return `${local}@${domain}`;
  },
}),
```

## 기존 사용자에게 매직 링크 전송
기존 사용자에게만 매직 로그인 링크를 전송하도록 설정할 수 있습니다. 사용자가 입력한 이메일을 가져와 데이터베이스에서 해당 이메일이 "User" 컬렉션에 존재하는지 확인하세요.

```javascript
import User from "../../../models/User";
import db from "../../../utils/db";

callbacks: {
  async signIn({ user, account, email }) {
    await db.connect();
    const userExists = await User.findOne({
      email: user.email, // 사용자가 입력한 이메일
    });
    if (userExists) {
      return true; // 이메일이 존재하면 매직 로그인 링크 전송
    } else {
      return "/register"; // 존재하지 않으면 등록 페이지로 이동
    }
  },
},
```
이렇게 설정하면 이메일 제공자를 통해 로그인할 수 있으며, 기존 사용자에게만 매직 링크를 전송할 수 있습니다.