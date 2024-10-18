---
id: callbacks
---
# 콜백

콜백은 **비동기** 함수로, 특정 작업이 수행될 때 일어나는 일을 제어하는 데 사용할 수 있습니다.

콜백은 특히 JSON 웹 토큰을 사용하는 시나리오에서 매우 강력합니다. 데이터베이스 없이 접근 제어를 구현하거나 외부 데이터베이스 또는 API와 통합할 수 있기 때문입니다.

:::tip[팁]
JSON 웹 토큰을 사용할 때 액세스 토큰이나 사용자 ID와 같은 데이터를 브라우저로 전달하려면 `jwt` 콜백이 호출될 때 토큰에 데이터를 유지한 다음 `session` 콜백을 통해 브라우저로 전달할 수 있습니다.
:::
아래의 콜백 중 어떤 것에든 핸들러를 지정할 수 있습니다.

```javascript title="pages/api/auth/[...nextauth].js"
...  
callbacks: {    
  async signIn({ user, account, profile, email, credentials }) {      
    return true    
  },    
  async redirect({ url, baseUrl }) {      
    return baseUrl    
  },    
  async session({ session, user, token }) {      
    return session    
  },    
  async jwt({ token, user, account, profile, isNewUser }) {      
    return token    
  }
...}
```

아래 문서는 각 콜백을 구현하는 방법, 기본 동작, 그리고 각 콜백에 대한 응답 예제를 보여줍니다. 사용 중인 구성 옵션과 인증 제공자가 콜백에 전달되는 값에 영향을 미칠 수 있다는 점에 유의하세요.

## 로그인 콜백[](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#sign-in-callback "헤딩으로 직접 링크")

`signIn()` 콜백을 사용하여 사용자가 로그인할 수 있는지 제어할 수 있습니다.


```javascript title="pages/api/auth/[...nextauth].js"
...callbacks: {  
  async signIn({ user, account, profile, email, credentials }) {    
    const isAllowedToSignIn = true    
    if (isAllowedToSignIn) {      
      return true    
    } else {      
      // 기본 오류 메시지를 표시하려면 false를 반환
      return false      
      // 또는 리디렉션할 URL을 반환할 수 있습니다:
      // return '/unauthorized'    
    }  
}}...
```

- **이메일 제공자**를 사용할 때 `signIn()` 콜백은 사용자가 **인증 요청**을 할 때(로그인 링크가 포함된 이메일이 발송되기 전에)와 로그인 이메일의 링크를 활성화한 후 두 번 호출됩니다.
  
  이메일 계정은 OAuth 계정과 같은 방식으로 프로필을 가지지 않습니다. 이메일 로그인 중 첫 번째 호출 시 `email` 객체에는 인증 요청 플로우에서 트리거되고 있음을 나타내는 `verificationRequest: true` 속성이 포함됩니다. 사용자가 로그인 링크를 클릭한 후 콜백이 호출될 때는 이 속성이 존재하지 않습니다.
  
  `verificationRequest` 속성을 확인하여 블록리스트에 있는 주소나 도메인으로 이메일을 보내지 않거나 허용 리스트에 있는 이메일 주소에만 명시적으로 생성하도록 할 수 있습니다.

- **자격 증명 제공자**를 사용할 때 `user` 객체는 `authorize` 콜백에서 반환된 응답이며, `profile` 객체는 `HTTP POST` 제출의 원시 본문입니다.

:::note[참고]

NextAuth.js를 데이터베이스와 함께 사용하는 경우, 사용자 객체는 사용자가 이전에 로그인한 적이 있다면 데이터베이스의 사용자 객체(사용자 ID 포함)이며, 그렇지 않은 경우 더 간단한 프로토타입 사용자 객체(예: 이름, 이메일, 이미지)입니다.

데이터베이스 없이 NextAuth.js를 사용하는 경우, 사용자 객체는 항상 프로토타입 사용자 객체로, 프로필에서 추출한 정보가 포함됩니다.
:::
:::note[참고]
이 콜백에서 반환된 리디렉션은 인증 흐름을 취소합니다. 예를 들어 사용자가 로그인할 수 없는 이유를 알려주는 오류 페이지로만 리디렉션하세요.

성공적인 로그인 후 페이지로 리디렉션하려면 [`callbackUrl` 옵션](https://nextauth-ko.wsbox.pw/docs/getting-started/client#specifying-a-callbackurl) 또는 [리디렉션 콜백](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#redirect-callback)을 사용하세요.
:::
## 리디렉션 콜백[](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#redirect-callback "헤딩으로 직접 링크")

리디렉션 콜백은 사용자가 콜백 URL로 리디렉션될 때마다 호출됩니다(예: 로그인 또는 로그아웃 시).

기본적으로 사이트와 동일한 URL만 허용되지만, 리디렉션 콜백을 사용하여 해당 동작을 사용자 정의할 수 있습니다.

기본 리디렉션 콜백은 다음과 같습니다:

```javascript title="pages/api/auth/[...nextauth].js"
...callbacks: {  
  async redirect({ url, baseUrl }) {    
    // 상대 콜백 URL 허용    
    if (url.startsWith("/")) return `${baseUrl}${url}`    
    // 동일한 출처의 콜백 URL 허용    
    else if (new URL(url).origin === baseUrl) return url    
    return baseUrl  
}}...
```

:::note[참고]
리디렉션 콜백은 동일한 흐름에서 여러 번 호출될 수 있습니다.
:::
## JWT 콜백[](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#jwt-callback "헤딩으로 직접 링크")

이 콜백은 JSON 웹 토큰이 생성될 때(즉, 로그인 시) 또는 업데이트될 때(클라이언트에서 세션에 접근할 때마다) 호출됩니다. 반환된 값은 [암호화](https://nextauth-ko.wsbox.pw/docs/configuration/options#jwt)되어 쿠키에 저장됩니다.

`/api/auth/signin`, `/api/auth/session`에 대한 요청과 `getSession()`, `getServerSession()`, `useSession()` 호출은 이 함수를 호출하지만, [JWT 세션](https://nextauth-ko.wsbox.pw/docs/configuration/options#session)을 사용하는 경우에만 해당됩니다. 데이터베이스에 세션을 저장할 때는 이 메서드가 호출되지 않습니다.

- 데이터베이스에 저장된 세션 만료 시간과 마찬가지로, 세션이 활성 상태일 때 토큰 만료 시간이 연장됩니다.
- 인수인 `user`, `account`, `profile`, `isNewUser`는 사용자가 로그인한 후 새로운 세션에서 처음 이 콜백이 호출될 때만 전달됩니다. 이후 호출에서는 `token`만 사용할 수 있습니다.

`user`, `account`, `profile`, `isNewUser`의 내용은 제공자 및 데이터베이스 사용 여부에 따라 달라집니다. 이 토큰에 사용자 ID, OAuth 액세스 토큰과 같은 데이터를 유지할 수 있으며, 아래 예제에서 `access_token`과 `user.id`를 참조하세요. 클라이언트 측에 노출하려면 [`session()` 콜백](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#session-callback)도 확인하세요.

```javascript title="pages/api/auth/[...nextauth].js"
...callbacks: {  
  async jwt({ token, account, profile }) {    
    // 로그인 직후 OAuth access_token 또는 사용자 ID를 토큰에 유지    
    if (account) {      
      token.accessToken = account.access_token      
      token.id = profile.id    
    }    
    return token  
}}...
```

:::tip[팁]
매개변수( `token` 제외)의 존재를 확인하기 위해 `if` 분기를 사용하세요. 매개변수가 존재한다면, 이는 콜백이 처음 호출되고 있다는 의미입니다(즉, 사용자가 로그인 중임). 이 시점은 JWT에 `access_token`과 같은 추가 데이터를 유지하기에 좋은 위치입니다. 이후 호출에서는 `token` 매개변수만 포함됩니다.
:::

## 세션 콜백[](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#session-callback "헤딩으로 직접 링크")

세션 콜백은 세션이 확인될 때마다 호출됩니다. 기본적으로 보안을 강화하기 위해 **토큰의 일부만 반환**됩니다. `jwt()` 콜백을 통해 토큰에 추가한 항목(`access_token` 및 위의 `user.id` 등)을 클라이언트에서 사용할 수 있도록 하려면, 여기에서 명시적으로 전달해야 합니다.

예: `getSession()`, `useSession()`, `/api/auth/session`

- 데이터베이스 세션을 사용할 때는 사용자(`user`) 객체가 인수로 전달됩니다.
- 세션으로 JSON 웹 토큰을 사용할 때는 JWT 페이로드(`token`)가 대신 제공됩니다.

```javascript title="pages/api/auth/[...nextauth].js"
...callbacks: {  
  async session({ session, token, user }) {    
    // 제공자로부터의 access_token 및 사용자 ID와 같은 속성을 클라이언트로 전송    
    session.accessToken = token.accessToken    
    session.user.id = token.id        
    return session  
}}...
```

:::tip[팁]

JSON 웹 토큰을 사용하는 경우 `jwt()` 콜백이 `session()` 콜백보다 먼저 호출되므로, JSON 웹 토큰에 추가한 모든 항목이 즉시 세션 콜백에서 사용할 수 있습니다. 예를 들어 제공자로부터 받은 `access_token`이나 `id` 등을 사용할 수 있습니다.
:::
:::danger[경고]
세션 객체는 서버 측에 유지되지 않습니다. 데이터베이스 세션을 사용할 때도 세션 토큰, 사용자, 만료 시간과 같은 데이터만 세션 테이블에 저장됩니다.

서버 측에 세션 데이터를 유지해야 하는 경우, 세션에 반환된 `accessToken`을 키로 사용하고 `session()` 콜백에서 데이터베이스에 연결하여 접근할 수 있습니다. 세션 `accessToken` 값은 회전되지 않으며 세션이 유효한 동안 유효합니다.

JSON 웹 토큰을 사용하는 경우 데이터베이스 세션 대신 사용자 ID 또는 토큰에 저장된 고유 키를 사용해야 합니다(로그인 시 직접 키를 생성해야 합니다. JSON 웹 토큰을 사용할 때는 세션용 액세스 토큰이 생성되지 않습니다).
:::