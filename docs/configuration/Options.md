---
id: options
---
# 옵션

## 환경 변수[](https://nextauth-ko.wsbox.pw/docs/configuration/options#environment-variables "헤딩으로 직접 링크")

### NEXTAUTH_URL[](https://nextauth-ko.wsbox.pw/docs/configuration/options#nextauth_url "헤딩으로 직접 링크")

프로덕션에 배포할 때, `NEXTAUTH_URL` 환경 변수를 사이트의 정규 URL로 설정하세요.

```
NEXTAUTH_URL=https://example.com
```

Next.js 애플리케이션이 커스텀 베이스 경로를 사용하는 경우, API 엔드포인트의 경로를 전체적으로 지정하세요. 커스텀 베이스 경로 사용에 대한 자세한 내용은 [여기](https://nextauth-ko.wsbox.pw/docs/getting-started/client#custom-base-path)를 참조하세요.

_예: `NEXTAUTH_URL=https://example.com/custom-route/api/auth`_

:::tip[팁]

커스텀 베이스 경로를 사용하는 경우, `<SessionProvider>`에 `basePath` 페이지 속성을 전달해야 합니다. 자세한 내용은 [여기](https://nextauth-ko.wsbox.pw/docs/getting-started/client#custom-base-path)를 참조하세요.
:::

:::note[참고]
[Vercel](https://vercel.com/)에 배포할 때 [시스템 환경 변수](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)를 사용하면 자동으로 감지되므로 이 변수를 정의할 필요가 없습니다. 프로젝트 설정에서 **시스템 환경 변수 자동 노출**이 체크되어 있는지 확인하세요.
:::

### NEXTAUTH_SECRET[](https://nextauth-ko.wsbox.pw/docs/configuration/options#nextauth_secret "헤딩으로 직접 링크")

NextAuth.js JWT를 암호화하고 [이메일 검증 토큰](https://authjs.dev/guides/creating-a-database-adapter#verification-tokens)을 해시하는 데 사용됩니다. 이는 [NextAuth](https://nextauth-ko.wsbox.pw/docs/configuration/options#secret) 및 [미들웨어](https://nextauth-ko.wsbox.pw/docs/configuration/nextjs#secret)의 `secret` 옵션 기본값입니다.

### NEXTAUTH_URL_INTERNAL[](https://nextauth-ko.wsbox.pw/docs/configuration/options#nextauth_url_internal "헤딩으로 직접 링크")

제공된 경우, 서버 측 호출은 `NEXTAUTH_URL` 대신 이를 사용합니다. 이는 서버가 사이트의 정규 URL에 접근할 수 없는 환경에서 유용합니다. 기본값은 `NEXTAUTH_URL`입니다.

```
NEXTAUTH_URL_INTERNAL=http://10.240.8.16
```

___

## 옵션[](https://nextauth-ko.wsbox.pw/docs/configuration/options#options "헤딩으로 직접 링크")

옵션은 API 라우트에서 NextAuth.js를 초기화할 때 전달됩니다.

### providers[](https://nextauth-ko.wsbox.pw/docs/configuration/options#providers "헤딩으로 직접 링크")

- **기본값**: `[]`
- **필수**: _예_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description "헤딩으로 직접 링크")

로그인할 때 사용할 인증 제공자(예: Google, Facebook, Twitter, GitHub, Email 등)를 임의의 순서로 나열한 배열입니다. 내장 제공자 중 하나이거나 커스텀 제공자 객체일 수 있습니다.

지원되는 제공자 목록과 사용 방법은 [제공자 문서](https://nextauth-ko.wsbox.pw/docs/configuration/providers/oauth)를 참조하세요.

___

### secret[](https://nextauth-ko.wsbox.pw/docs/configuration/options#secret "헤딩으로 직접 링크")

- **기본값**: 개발 환경에서는 `"options"` 객체의 SHA 해시 문자열, 프로덕션에서는 기본값 없음.
- **필수**: _프로덕션에서 필수!_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-1 "헤딩으로 직접 링크")

토큰을 해시하고, 쿠키를 서명/암호화하며, 암호화 키를 생성하는 데 사용되는 랜덤 문자열입니다.

[`NEXTAUTH_SECRET`](https://nextauth-ko.wsbox.pw/docs/configuration/options#nextauth_secret)을 환경 변수로 설정하면 이 옵션을 정의할 필요가 없습니다.

개발 환경에서 값이 지정되지 않은 경우(`NEXTAUTH_SECRET` 변수도 없을 때), OAuth 클라이언트 ID/비밀을 포함한 모든 구성 옵션의 해시를 사용하여 엔트로피를 제공합니다.

:::danger[경고]
`secret`이나 `NEXTAUTH_SECRET`을 제공하지 않으면 프로덕션에서 [오류](https://nextauth-ko.wsbox.pw/docs/errors#no_secret)가 발생합니다.
:::
다음 `openssl` 명령어를 사용하여 커맨드 라인에서 좋은 값을 빠르게 생성할 수 있습니다.

```
$ openssl rand -base64 32
```

:::tip[팁]
개발 환경에서 기본 비밀 생성에 의존하는 경우, 구성 변경 시 비밀이 변경되어 JWT 복호화 오류가 발생할 수 있습니다. 명시적 비밀을 정의하면 이 문제를 해결할 수 있습니다. 미래에는 개발 환경에서도 이 옵션을 필수로 만들 가능성이 큽니다.
:::
___

### session[](https://nextauth-ko.wsbox.pw/docs/configuration/options#session "헤딩으로 직접 링크")

- **기본값**: `object`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-2 "헤딩으로 직접 링크")

`session` 객체와 그 모든 속성은 선택 사항입니다.

이 옵션의 기본값은 다음과 같습니다:

```js
session: {  
  // 사용자 세션을 저장하는 방식을 선택하세요.  
  // 기본값은 세션 쿠키에 저장된 암호화된 JWT (JWE)인 `"jwt"`입니다.  
  // 그러나 `adapter`를 사용하는 경우 기본값은 `"database"`로 변경됩니다.  
  // `"jwt"`를 명시적으로 정의하여 JWT 세션을 강제할 수 있습니다.  
  // `"database"`를 사용하는 경우, 세션 쿠키에는 `sessionToken` 값만 포함되며,  
  // 이는 데이터베이스에서 세션을 조회하는 데 사용됩니다.  
  strategy: "database",  

  // 초 단위 - 유휴 세션이 만료되어 더 이상 유효하지 않을 때까지의 시간.  
  maxAge: 30 * 24 * 60 * 60, // 30일  

  // 초 단위 - 세션을 연장하기 위해 데이터베이스에 쓰는 빈도를 조절합니다.  
  // 쓰기 작업을 제한하는 데 사용하세요. 데이터베이스를 항상 업데이트하려면 0으로 설정하세요.  
  // 참고: 이 옵션은 JSON 웹 토큰을 사용할 때 무시됩니다.  
  updateAge: 24 * 60 * 60, // 24시간  

  // 세션 토큰은 일반적으로 랜덤 UUID 또는 문자열이지만,  
  // 보다 커스텀된 세션 토큰 문자열이 필요한 경우 자체 생성 함수를 정의할 수 있습니다.  
  generateSessionToken: () => {    
    return randomUUID?.() ?? randomBytes(32).toString("hex")  
  }
}
```

___

### jwt[](https://nextauth-ko.wsbox.pw/docs/configuration/options#jwt "헤딩으로 직접 링크")

- **기본값**: `object`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-3 "헤딩으로 직접 링크")

JSON 웹 토큰은 `session: { strategy: "jwt" }` 옵션을 사용하여 세션 토큰으로 사용할 수 있습니다. 어댑터를 지정하지 않은 경우 기본적으로 JSON 웹 토큰이 활성화됩니다. JSON 웹 토큰은 기본적으로 암호화된 상태(JWE)로 제공됩니다. 이 동작을 유지하는 것이 좋습니다. [JWT `encode` 및 `decode` 메서드 재정의](https://nextauth-ko.wsbox.pw/docs/configuration/options#override-jwt-encode-and-decode-methods) 고급 옵션을 참조하세요.

#### JSON 웹 토큰 옵션[](https://nextauth-ko.wsbox.pw/docs/configuration/options#json-web-token-options "헤딩으로 직접 링크")

```js
jwt: {  
  // NextAuth.js가 발급한 JWT의 최대 수명(초 단위).  
  // 기본값은 `session.maxAge`입니다.  
  maxAge: 60 * 60 * 24 * 30,  
  // 서명 및 암호화를 위한 커스텀 encode/decode 함수를 정의할 수 있습니다.  
  async encode() {},  
  async decode() {},
}
```

예제 JSON 웹 토큰 페이로드는 다음과 같습니다:

```js
{  
  name: 'Iain Collins',  
  email: 'me@iaincollins.com',  
  picture: 'https://example.com/image.jpg',  
  iat: 1594601838,  
  exp: 1597193838
}
```

#### JWT 헬퍼[](https://nextauth-ko.wsbox.pw/docs/configuration/options#jwt-helper "헤딩으로 직접 링크")

내장된 `getToken()` 헬퍼 메서드를 사용하여 토큰을 검증하고 복호화할 수 있습니다:

```js
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {  
  // `NEXTAUTH_SECRET` 환경 변수를 사용하는 경우,
  // 이를 감지하므로 실제로 `secret`을 필요로 하지 않습니다.  
  // const token = await getToken({ req })  
  const token = await getToken({ req, secret })  
  console.log("JSON Web Token", token)  
  res.end()
}
```

_편의를 위해 이 헬퍼 함수는 `Authorization: 'Bearer token'` HTTP 헤더로 전달된 토큰도 읽고 디코딩할 수 있습니다._

**필수**

`getToken()` 헬퍼는 다음 옵션을 필요로 합니다:

- `req` - (객체) 요청 객체
- `secret` - (문자열) JWT 비밀. 대신 `NEXTAUTH_SECRET`을 사용하세요.

또한, 헬퍼에 `jwt` 옵션에 구성된 _모든 옵션을_ 전달해야 합니다.

예: 커스텀 세션 `maxAge` 및 커스텀 서명 및/또는 암호화 키 또는 옵션 포함

**선택 사항**

다음 옵션도 지원합니다:

- `secureCookie` - (불리언) 보안 접두사가 있는 쿠키 이름 사용
    
    기본적으로 헬퍼 함수는 보안 접두사가 있는 쿠키를 사용해야 하는지 여부를 결정하려고 시도합니다 (예: 프로덕션에서는 `true`, 개발에서는 `false`, 단 `NEXTAUTH_URL`에 HTTPS URL이 포함되지 않은 경우).
    
- `cookieName` - (문자열) 세션 토큰 쿠키 이름
    
    `cookieName`이 명시적으로 지정된 경우 `secureCookie` 옵션은 무시됩니다.
    
- `raw` - (불리언) 원시 토큰 가져오기 (디코딩되지 않음)
    
    `true`로 설정하면 토큰을 복호화하거나 검증하지 않고 원시 토큰을 반환합니다.
    

:::tip[팁]

커스텀 세션 토큰 `cookieName`을 사용하는 경우, 동일한 이름을 `getToken`에도 제공해야 합니다. Next.js [`withAuth`](https://nextauth-ko.wsbox.pw/docs/configuration/nextjs#middleware) 미들웨어를 사용하는 경우, 동일한 `cookieName`을 사용하여 이를 구성해야 합니다.
:::

:::note[참고]
JWT는 세션 토큰 쿠키에 저장되며, 이는 데이터베이스 세션과 함께 사용하는 토큰과 동일한 쿠키입니다.
:::
___

### pages[](https://nextauth-ko.wsbox.pw/docs/configuration/options#pages "헤딩으로 직접 링크")

- **기본값**: `{}`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-4 "헤딩으로 직접 링크")

사용자 지정 로그인, 로그아웃 및 오류 페이지를 생성하려는 경우 사용할 URL을 지정하세요.

지정된 페이지는 해당 내장 페이지를 대체합니다.

_예시:_

```js
pages: {  
  signIn: '/auth/signin',  
  signOut: '/auth/signout',  
  error: '/auth/error', // 오류 코드는 쿼리 문자열로 ?error= 전달됩니다.  
  verifyRequest: '/auth/verify-request', // (이메일 확인 메시지에 사용됨)  
  newUser: '/auth/new-user' // 새로운 사용자가 첫 로그인 시 여기에 리디렉션됩니다. (관심이 없으면 속성을 제외하세요)
}
```

:::note[참고]
이 구성을 사용하는 경우, 이러한 페이지가 실제로 존재하는지 확인하세요. 예를 들어 `error: '/auth/error'`는 `pages/auth/error.js`에 있는 페이지 파일을 참조합니다.
:::
더 많은 정보는 [pages 옵션 문서](https://nextauth-ko.wsbox.pw/docs/configuration/pages)를 참조하세요.

___

### callbacks[](https://nextauth-ko.wsbox.pw/docs/configuration/options#callbacks "헤딩으로 직접 링크")

- **기본값**: `object`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-5 "헤딩으로 직접 링크")

콜백은 특정 작업이 수행될 때 일어나는 일을 제어할 수 있는 비동기 함수입니다.

콜백은 특히 JSON 웹 토큰을 사용하는 시나리오에서 매우 강력합니다. 데이터베이스 없이 접근 제어를 구현하거나 외부 데이터베이스 또는 API와 통합할 수 있기 때문입니다.

아래의 콜백 중 어떤 것에든 핸들러를 지정할 수 있습니다.

```js
callbacks: {  
  async signIn({ user, account, profile, email, credentials }) {    
    return true  
  },  
  async redirect({ url, baseUrl }) {    
    return baseUrl  
  },  
  async session({ session, token, user }) {    
    return session  
  },  
  async jwt({ token, user, account, profile, isNewUser }) {    
    return token  
  }
}
```

콜백 함수를 사용하는 방법에 대한 자세한 내용은 [콜백 문서](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks)를 참조하세요.

___

### events[](https://nextauth-ko.wsbox.pw/docs/configuration/options#events "헤딩으로 직접 링크")

- **기본값**: `object`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-6 "헤딩으로 직접 링크")

이벤트는 응답을 반환하지 않는 비동기 함수로, 감사 로깅에 유용합니다.

아래의 이벤트 중 어떤 것에든 핸들러를 지정할 수 있습니다 - 예를 들어, 디버깅이나 감사 로그 생성을 위해서입니다.

메시지 객체의 내용은 흐름(예: OAuth 또는 이메일 인증 흐름, JWT 또는 데이터베이스 세션 등)에 따라 다릅니다. 각 메시지 객체의 형식과 이벤트 함수를 사용하는 방법에 대한 자세한 내용은 [이벤트 문서](https://nextauth-ko.wsbox.pw/docs/configuration/events)를 참조하세요.

```js
events: {  
  async signIn(message) { /* 성공적인 로그인 시 */ },  
  async signOut(message) { /* 로그아웃 시 */ },  
  async createUser(message) { /* 사용자 생성 시 */ },  
  async updateUser(message) { /* 사용자 업데이트 시 - 예: 이메일이 검증됨 */ },  
  async linkAccount(message) { /* 계정 연결 시 (예: Twitter) */ },  
  async session(message) { /* 세션 활성화 시 */ },  
}
```

___

### adapter[](https://nextauth-ko.wsbox.pw/docs/configuration/options#adapter "헤딩으로 직접 링크")

- **기본값**: 없음
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-7 "헤딩으로 직접 링크")

기본적으로 NextAuth.js는 더 이상 어댑터를 포함하지 않습니다. 사용자/계정 데이터를 유지하려면 사용 가능한 많은 어댑터 중 하나를 설치하세요. 자세한 내용은 [어댑터 문서](https://authjs.dev/getting-started/database)를 참조하세요.

___

### debug[](https://nextauth-ko.wsbox.pw/docs/configuration/options#debug "헤딩으로 직접 링크")

- **기본값**: `false`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-8 "헤딩으로 직접 링크")

`debug`를 `true`로 설정하면 인증 및 데이터베이스 작업에 대한 디버그 메시지가 활성화됩니다.

___

### logger[](https://nextauth-ko.wsbox.pw/docs/configuration/options#logger "헤딩으로 직접 링크")

- **기본값**: `console`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-9 "헤딩으로 직접 링크")

로거 수준(`undefined` 수준은 내장 로거를 사용함)을 재정의하고, NextAuth.js에서 로그를 가로챌 수 있습니다. 이를 사용하여 NextAuth.js 로그를 타사 로깅 서비스로 보낼 수 있습니다.

`error` 및 `warn`의 `code` 매개변수는 각각 [경고](https://nextauth-ko.wsbox.pw/docs/warnings) 및 [오류](https://nextauth-ko.wsbox.pw/docs/errors) 페이지에서 설명됩니다.

예제:

```js title="pages/api/auth/[...nextauth].js"
import log from "logging-service"

export default NextAuth({  
  ...  
  logger: {    
    error(code, metadata) {      
      log.error(code, metadata)    
    },    
    warn(code) {      
      log.warn(code)    
    },    
    debug(code, metadata) {      
      log.debug(code, metadata)    
    }  
  }  
  ...
})
```

:::note[참고]
사용자가 `debug` 수준을 정의한 경우, `debug: false` [옵션](https://nextauth-ko.wsbox.pw/docs/configuration/options#debug)과 상관없이 호출됩니다.
:::
___

### theme[](https://nextauth-ko.wsbox.pw/docs/configuration/options#theme "헤딩으로 직접 링크")

- **기본값**: `object`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-10 "헤딩으로 직접 링크")

[페이지](https://nextauth-ko.wsbox.pw/docs/configuration/pages)의 색 구성표 테마를 변경하고 일부 소규모 커스터마이징을 허용합니다. `theme.colorScheme`을 `"light"`로 설정하면 페이지가 항상 밝은 테마를 사용하도록 강제할 수 있습니다. `"dark"`로 설정하면 페이지가 항상 어두운 테마를 사용하도록 강제할 수 있습니다. `"auto"`로 설정하거나 이 옵션을 생략하면 페이지가 선호하는 시스템 테마를 따릅니다. ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 미디어 쿼리를 사용합니다.)

추가로, `theme.logo`에 로고 URL을 정의할 수 있으며, 이는 기본 로그인/로그아웃/오류/검증 요청 페이지의 메인 카드 위에 렌더링됩니다. 또한 `theme.brandColor`를 정의하여 이러한 페이지의 강조 색상을 변경할 수 있습니다.

로그인 버튼의 배경 색상은 `brandColor`와 일치하며 기본값은 `"#346df1"`입니다. 텍스트 색상은 기본적으로 `#fff`이지만, 브랜드 색상이 대비가 약한 경우 `buttonText` 색상 옵션으로 이를 수정할 수 있습니다.

```js
theme: {  
  colorScheme: "auto", // "auto" | "dark" | "light"  
  brandColor: "", // 16진수 색상 코드  
  logo: "", // 이미지의 절대 URL  
  buttonText: "" // 16진수 색상 코드
}
```

___

## 고급 옵션[](https://nextauth-ko.wsbox.pw/docs/configuration/options#advanced-options "헤딩으로 직접 링크")

고급 옵션은 기본 옵션과 동일한 방식으로 전달되지만, 복잡한 영향이나 부작용을 가질 수 있습니다. 매우 편안하게 사용할 수 있는 경우를 제외하고는 고급 옵션 사용을 피하는 것이 좋습니다.

___

### useSecureCookies[](https://nextauth-ko.wsbox.pw/docs/configuration/options#usesecurecookies "헤딩으로 직접 링크")

- **기본값**: HTTPS 사이트에서는 `true`, HTTP 사이트에서는 `false`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-11 "헤딩으로 직접 링크")

`true`로 설정하면 (모든 `https://`로 시작하는 사이트 URL의 기본값), NextAuth.js에서 설정한 모든 쿠키는 HTTPS URL에서만 접근할 수 있습니다.

이 옵션은 개발자 편의를 위해 `http://`로 시작하는 URL(예: `http://localhost:3000`)에서는 기본적으로 `false`로 설정됩니다.

:::note[참고]
지정된 모든 커스텀 `cookies`의 속성은 이 옵션을 무시합니다.
:::
:::danger[경고]
프로덕션에서 이 옵션을 `false`로 설정하면 보안 위험이 발생하여 세션이 탈취될 수 있습니다. 이는 개발 및 테스트를 지원하기 위해 의도된 옵션입니다. 이 옵션의 사용은 권장되지 않습니다.
:::
___

### cookies[](https://nextauth-ko.wsbox.pw/docs/configuration/options#cookies "헤딩으로 직접 링크")

- **기본값**: `{}`
- **필수**: _아니오_

#### 설명[](https://nextauth-ko.wsbox.pw/docs/configuration/options#description-12 "헤딩으로 직접 링크")

NextAuth.js의 쿠키는 기본적으로 청크 단위로 처리됩니다. 이는 4KB 제한에 도달하면 `.{number}` 접미사가 있는 새 쿠키를 생성하고 올바른 순서로 쿠키를 재조립하여 파싱/읽기를 수행함을 의미합니다. 이는 사용자가 예를 들어 `sessionToken`에 추가 데이터를 저장하려고 할 때 발생할 수 있는 크기 제한을 피하기 위해 도입되었습니다.

NextAuth.js에서 사용하는 모든 쿠키의 기본 쿠키 이름과 옵션을 재정의할 수 있습니다.

이것은 고급 옵션이며, 인증을 깨뜨리거나 애플리케이션에 보안 결함을 도입할 수 있으므로 사용하는 것이 권장되지 않습니다.

커스텀 속성이 있는 하나 이상의 쿠키를 지정할 수 있지만, 쿠키에 대한 커스텀 옵션을 지정하는 경우 해당 쿠키의 모든 옵션을 제공해야 합니다.

이 기능을 사용하는 경우, 내장된 동적 정책을 선택 해제하게 되므로 개발 및 프로덕션 빌드에서 다른 쿠키 정책을 설정하는 조건부 동작을 생성하려고 할 가능성이 큽니다.

:::tip[팁]
이 옵션의 사용 사례 예시는 서브도메인 간 세션 토큰 공유를 지원하는 것입니다.
:::

#### 예제[](https://nextauth-ko.wsbox.pw/docs/configuration/options#example "헤딩으로 직접 링크")

```js
cookies: {  
  sessionToken: {    
    name: `__Secure-next-auth.session-token`,    
    options: {      
      httpOnly: true,      
      sameSite: 'lax',      
      path: '/',      
      secure: true    
    }  
  },  
  callbackUrl: {    
    name: `__Secure-next-auth.callback-url`,    
    options: {      
      sameSite: 'lax',      
      path: '/',      
      secure: true    
    }  
  },  
  csrfToken: {    
    name: `__Host-next-auth.csrf-token`,    
    options: {      
      httpOnly: true,      
      sameSite: 'lax',      
      path: '/',      
      secure: true    
    }  
  },  
  pkceCodeVerifier: {    
    name: `${cookiePrefix}next-auth.pkce.code_verifier`,    
    options: {      
      httpOnly: true,      
      sameSite: 'lax',      
      path: '/',      
      secure: true,      
      maxAge: 900    
    }  
  },  
  state: {    
    name: `${cookiePrefix}next-auth.state`,    
    options: {      
      httpOnly: true,      
      sameSite: "lax",      
      path: "/",      
      secure: true,      
      maxAge: 900    
    },  
  },  
  nonce: {    
    name: `${cookiePrefix}next-auth.nonce`,    
    options: {      
      httpOnly: true,      
      sameSite: "lax",      
      path: "/",      
      secure: true,    
    },  
  },  
}
```

:::danger[경고]
커스텀 쿠키 정책을 사용하면 애플리케이션에 보안 결함이 발생할 수 있으며, 이는 영향을 이해하는 고급 사용자를 위한 옵션입니다. 이 옵션의 사용은 권장되지 않습니다.
:::
___

### JWT `encode` 및 `decode` 메서드 재정의[](https://nextauth-ko.wsbox.pw/docs/configuration/options#override-jwt-encode-and-decode-methods "헤딩으로 직접 링크")

NextAuth.js는 기본적으로 암호화된 JSON 웹 토큰([JWE](https://datatracker.ietf.org/doc/html/rfc7516))을 사용합니다. 특별한 이유가 없다면 이 동작을 유지하는 것이 좋습니다. `encode` 및 `decode` 메서드를 사용하여 이를 재정의할 수 있습니다. 두 메서드는 동시에 정의되어야 합니다.

**중요:** 라우트를 보호하기 위해 미들웨어를 사용하는 경우, 동일한 메서드를 [`_middleware.ts` 옵션](https://nextauth-ko.wsbox.pw/docs/configuration/nextjs#custom-jwt-decode-method)에도 설정해야 합니다.

```js
jwt: {  
  async encode(params: {    
    token: JWT    
    secret: string    
    maxAge: number  
  }): Promise<string> {    
    // 커스텀 인코딩된 JWT 문자열을 반환
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"  
  },  
  async decode(params: {    
    token: string    
    secret: string  
  }): Promise<JWT | null> {    
    // `JWT` 객체를 반환하거나 디코딩에 실패하면 `null`을 반환
    return {}  
  },  
}
```