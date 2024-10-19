---
id: pages
---
# 페이지

NextAuth.js는 로그인, 로그아웃, 이메일 인증 및 오류 메시지를 처리하는 간단한 비브랜딩 인증 페이지를 자동으로 생성합니다.

가입 페이지에 표시되는 옵션은 NextAuth.js에 전달된 옵션에 지정된 공급자를 기반으로 자동 생성됩니다.

커스텀 로그인 페이지를 추가하려면 `pages` 옵션을 사용할 수 있습니다:

```javascript title="pages/api/auth/[...nextauth].js"
... 
pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // 쿼리 문자열로 전달되는 오류 코드
    verifyRequest: '/auth/verify-request', // (이메일 메시지 확인에 사용)
    newUser: '/auth/new-user' // 신규 사용자가 첫 로그인 시 이곳으로 이동 (관심 없으면 속성을 생략)
}
...
```
:::note[참고]
이 구성을 사용할 때는 이러한 페이지가 실제로 존재하는지 확인해야 합니다. 예를 들어, `error: '/auth/error'`는 `pages/auth/error.js`에 있는 페이지 파일을 참조합니다.
:::

## 오류 코드

우리는 보안 강화를 위해 반환되는 오류 코드를 제한합니다.

### 오류 페이지

다음 오류는 기본 또는 오버라이드된 오류 페이지에 쿼리 매개변수로 전달됩니다:

- **Configuration**: 서버 구성에 문제가 있습니다. [옵션](https://nextauth-ko.wsbox.pw/configuration/options#options)이 올바른지 확인하세요.
- **AccessDenied**: 주로 [`signIn` 콜백](https://nextauth-ko.wsbox.pw/configuration/callbacks#sign-in-callback) 또는 [`redirect` 콜백](https://nextauth-ko.wsbox.pw/configuration/callbacks#redirect-callback)을 통해 접근을 제한했을 때 발생합니다.
- **Verification**: 이메일 공급자와 관련된 오류입니다. 토큰이 만료되었거나 이미 사용되었습니다.
- **Default**: 위의 모든 조건에 해당하지 않을 경우 적용되는 오류입니다.

예시: `/auth/error?error=Configuration`

### 로그인 페이지

다음 오류는 기본 또는 오버라이드된 로그인 페이지에 쿼리 매개변수로 전달됩니다:

- **OAuthSignin**: 인증 URL 구성 오류.
- **OAuthCallback**: OAuth 공급자로부터 응답을 처리하는 중 발생한 오류.
- **OAuthCreateAccount**: 데이터베이스에서 OAuth 공급자 사용자를 생성할 수 없습니다.
- **EmailCreateAccount**: 데이터베이스에서 이메일 공급자 사용자를 생성할 수 없습니다.
- **Callback**: [OAuth 콜백 핸들러 라우트](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/core/routes/callback.ts)의 오류.
- **OAuthAccountNotLinked**: 이메일이 이미 연결되어 있지만, 이 OAuth 계정과는 연결되지 않은 경우 발생.
- **EmailSignin**: 인증 토큰을 포함한 이메일 발송 실패.
- **CredentialsSignin**: [자격 증명 공급자](https://nextauth-ko.wsbox.pw/providers/credentials)에서 `authorize` 콜백이 `null`을 반환했습니다. 어떤 자격 증명의 부분이 잘못되었는지에 대한 정보를 제공하는 것은 권장하지 않습니다.
- **SessionRequired**: 이 페이지의 내용은 항상 로그인 상태여야 합니다. [useSession](https://nextauth-ko.wsbox.pw/getting-started/client#require-session)에서 설정을 확인하세요.
- **Default**: 위의 모든 조건에 해당하지 않을 경우 적용되는 오류입니다.

예시: `/auth/signin?error=Default`

## 테마

기본적으로 내장 페이지는 시스템 테마를 따르며, [`prefer-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 미디어 쿼리를 활용합니다. 이 설정을 오버라이드하여 항상 어두운 테마나 밝은 테마를 사용할 수 있으며, 이는 [`theme.colorScheme` 옵션](https://nextauth-ko.wsbox.pw/configuration/options#theme)을 통해 가능합니다.

또한, `theme.brandColor`를 정의하여 이러한 내장 페이지에 대한 커스텀 강조 색상을 정의할 수 있습니다. `theme.logo`에서 로고의 URL을 정의하여 이러한 페이지의 기본 카드 위에 렌더링될 수 있습니다.

### 로그인

![](https://nextauth-ko.wsbox.pw/img/pages_signin-940a5db521096f0bace59b44ecfd78b1.png)

### 로그아웃

![](https://nextauth-ko.wsbox.pw/img/pages_signout-0d202813326a52aa99579ce9894b9064.png)

## 예시

### OAuth 로그인

사용 가능한 인증 공급자와 이를 위한 URL을 얻으려면 API 엔드포인트 `/api/auth/providers`에 요청을 보낼 수 있습니다:

```tsx title="pages/auth/signin.tsx"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            {provider.name}로 로그인
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  // 사용자가 이미 로그인되어 있으면 리다이렉트합니다.
  // 주의: 동일한 페이지로 리다이렉트하지 않도록 주의하세요.
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()
  return {
    props: { providers: providers ?? [] },
  }
}
```

더 완전히 스타일링된 로그인 페이지 예시는 [여기](https://github.com/ndom91/next-auth-example-sign-in-page)에서 확인할 수 있습니다.

### 이메일 로그인

이메일 로그인용 커스터마이즈된 로그인 양식을 생성하려면, 이메일 주소와 `/api/auth/csrf`에서 CSRF 토큰 두 필드를 POST 요청으로 `/api/auth/signin/email`에 제출해야 합니다.


```tsx title="pages/auth/email-signin.tsx"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        이메일 주소
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">이메일로 로그인</button>
    </form>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
```

`signIn()` 함수를 사용하여 CSRF 토큰을 자동으로 얻을 수 있습니다:

```javascript
signIn("email", { email: "jsmith@example.com" })
```

### 자격 증명 로그인

자격 증명 기반 인증을 위한 로그인 양식을 생성하려면 `/api/auth/csrf`에서 CSRF 토큰을 POST 요청으로 `/api/auth/callback/credentials`에 전달해야 합니다.

```tsx title="pages/auth/credentials-signin.tsx"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        사용자 이름
        <input name="username" type="text" />
      </label>
      <label>
        비밀번호
        <input name="password" type="password" />
      </label>
      <button type="submit">로그인</button>
    </form>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
```

`signIn()` 함수를 사용하여 CSRF 토큰을 자동으로 얻을 수 있습니다:

```javascript
signIn("credentials", { username: "jsmith", password: "1234" })
```

:::tip[팁]
커스터마이즈된 페이지는 API 코드에 예약된 **/pages/api** 폴더 밖에 두어야 합니다. 위의 예시처럼, 위치 규칙 제안은 `pages/auth/...`입니다.
:::