---
id: client
---
# 클라이언트 API
NextAuth.js 클라이언트 라이브러리는 React 애플리케이션에서 세션과 상호 작용을 쉽게 할 수 있게 해줍니다.

#### 예제 세션 객체[](https://nextauth-ko.wsbox.pw/getting-started/client#example-session-object "직접 링크")

```ts
{  
  user: {    
    name: string    
    email: string    
    image: string  
  },  
  expires: Date // 이는 세션의 만료 시간으로, 세션 내의 토큰의 만료 시간이 아닙니다
}
```

:::tip[팁]

클라이언트에 반환되는 세션 데이터에는 세션 토큰이나 OAuth 토큰과 같은 민감한 정보가 포함되어 있지 않습니다. 이는 사용자가 로그인한 상태에서 페이지에 사용자 정보를 표시하는 데 필요한 최소한의 페이로드(예: 이름, 이메일, 이미지)를 포함하고 있습니다.

세션 객체에 추가 데이터를 반환해야 하는 경우 [세션 콜백](https://nextauth-ko.wsbox.pw/configuration/callbacks#session-callback)을 사용하여 클라이언트에 반환되는 세션 객체를 사용자 정의할 수 있습니다.
:::
:::note[참고]
`expires` 값은 순환되므로 세션이 [REST API](https://nextauth-ko.wsbox.pw/getting-started/rest-api)에서 검색될 때마다 만료를 방지하기 위해 이 값도 업데이트됩니다.
:::
___

## useSession()[](https://nextauth-ko.wsbox.pw/getting-started/client#usesession "직접 링크")

-   클라이언트 측: **예**
-   서버 측: 아니요

NextAuth.js 클라이언트의 `useSession()` React 훅은 누군가가 로그인했는지 확인하는 가장 쉬운 방법입니다.

[`<SessionProvider>`](https://nextauth-ko.wsbox.pw/getting-started/client#sessionprovider)가 `pages/_app.js`에 추가되어 있는지 확인하세요.

#### 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#예제 "직접 링크")

```jsx
import { useSession } from "next-auth/react"

export default function Component() {  
  const { data: session, status } = useSession()  
  
  if (status === "authenticated") {    
    return <p>{session.user.email}로 로그인 됨</p>  
  }  
  
  return <a href="/api/auth/signin">로그인</a>
}
```

`useSession()`은 두 가지 값을 포함하는 객체를 반환합니다: `data`와 `status`:

-   **`data`**: 이 값은 세 가지 중 하나일 수 있습니다: [`Session`](https://github.com/nextauthjs/next-auth/blob/8ff4b260143458c5d8a16b80b11d1b93baa0690f/types/index.d.ts#L437-L444) / `undefined` / `null`.
    -   세션이 아직 가져와지지 않은 경우, `data`는 `undefined`입니다.
    -   세션을 가져오는 데 실패한 경우, `data`는 `null`입니다.
    -   성공한 경우, `data`는 [`Session`](https://github.com/nextauthjs/next-auth/blob/8ff4b260143458c5d8a16b80b11d1b93baa0690f/types/index.d.ts#L437-L444)입니다.
-   **`status`**: 세 가지 가능한 세션 상태에 매핑되는 열거형: `"loading" | "authenticated" | "unauthenticated"`

### 세션 요구[](https://nextauth-ko.wsbox.pw/getting-started/client#require-session)

Next.js가 `getServerSideProps` 및 `getInitialProps를` 처리하는 방식 때문에 보호된 페이지를 로드할 때마다 세션이 유효한지 확인한 다음 요청된 페이지(SSR)를 생성하기 위해 서버 측 요청을 수행해야 합니다. 이로 인해 서버 부하가 증가하며 클라이언트에서 요청을 수행하는 데 능숙한 경우 대안이 있습니다. 항상 유효한 세션이 있는지 확인하는 방식으로 `useSession`을 사용할 수 있습니다. 초기 로딩 상태 이후에 세션을 찾을 수 없는 경우 적절한 조치를 정의하여 응답할 수 있습니다.

기본 동작은 사용자를 로그인 페이지로 리디렉션하는 것이며, 로그인에 성공하면 사용자가 처음 시작한 페이지로 다시 전송됩니다. 다른 작업을 수행하려는 경우 `onUnauthenticated()` 콜백을 정의할 수도 있습니다:

#### 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#example-1)
```jsx title="pages/protected.jsx"
import { useSession } from "next-auth/react"

export default function Admin() {  
  const { status } = useSession({    
    required: true,    
    onUnauthenticated() {      
      // 사용자가 인증되지 않았을 때 처리할 로직      
    },  
  })  
  
  if (status === "loading") {    
    return "로딩 중이거나 인증되지 않음..."  
  }  
  
  return "인증된 유저"
}
```

### 커스텀 클라이언트 세션 처리[](https://nextauth-ko.wsbox.pw/getting-started/client#custom-client-session-handling)

Next.js가 `getServerSideProps` / `getInitialProps`를 처리하는 방식 때문에, 모든 보호된 페이지 로드는 세션이 유효한지 확인하기 위해 서버 측 요청을 해야 하고, 그 다음에 요청된 페이지를 생성해야 합니다. 이 대안 솔루션은 초기 검사 시 로딩 상태를 표시하고, 이후 모든 페이지 전환은 클라이언트 측에서 이루어져 서버와 다시 확인하거나 페이지를 재생성할 필요가 없도록 합니다.



```jsx title="pages/admin.jsx"
export default function AdminDashboard() {  
  const { data: session } = useSession()  
  
  // 세션은 이 페이지 내에서 항상 null이 아닌상태, React 트리 하위에서도 동일합니다.  
  return "엄청 비밀스러운 대시보드!"
}

AdminDashboard.auth = true
```



```jsx title="pages/_app.jsx"
export default function App({  
  Component,  
  pageProps: { session, ...pageProps },  
}) {  
  return (    
    <SessionProvider session={session}>      
      {Component.auth ? (        
        <Auth>          
          <Component {...pageProps} />        
        </Auth>      
      ) : (        
        <Component {...pageProps} />      
      )}    
    </SessionProvider>  
  )
}

function Auth({ children }) {  
  // 매개변수로`{ required: true }`가 넘어온 경우, `status`는 "loading" 또는 "authenticated"이여야 합니다
  const { status } = useSession({ required: true })  
  
  if (status === "loading") {    
    return <div>Loading...</div>  
  }  
  
  return children
}
```

역할 기반 인증을 페이지에 지원하기 위한 옵션 객체와 같은 것을 지원하도록 쉽게 확장/수정할 수 있습니다. 예를 들어:



```jsx title="pages/admin.jsx"
AdminDashboard.auth = {  
  role: "admin",  
  loading: <AdminLoadingSkeleton />,  
  unauthorized: "/login-with-different-user", // 이 URL로 리디렉션  
}
```

`_app`이 작성된 방식 때문에, 인증이 필요하지 않은 페이지에 대해 불필요하게 `/api/auth/session` 엔드포인트에 연락하지 않습니다.

자세한 정보는 다음 [GitHub 이슈](https://github.com/nextauthjs/next-auth/issues/1210)를 참조하세요.

### 세션 업데이트[](https://nextauth-ko.wsbox.pw/getting-started/client#updating-the-session "직접 링크")

`useSession()` 훅은 페이지를 다시 로드하지 않고도 세션을 업데이트할 수 있는 `update(data?: any): Promise<Session | null>` 메소드를 제공합니다.

첫 번째 인수로 임의의 객체를 전달할 수 있으며, 이는 서버에서 세션 객체와 병합됩니다.

인수를 전달하지 않으면 서버에서 세션을 다시 로드합니다. (이는 데이터베이스에서 업데이트와 같은 서버 측 변형 후에 세션을 업데이트하려는 경우 유용합니다.)

:::caution[주의]
데이터 객체는 클라이언트에서 오기 때문에 저장하기 전에 서버에서 검증해야 합니다.
:::
#### 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#example-2 "직접 링크")



```tsx title="pages/profile.tsx"
import { useSession } from "next-auth/react"

export default function Page() {  
  const { data: session, status, update } = useSession()  
  
  if (status === "authenticated") {    
    return (      
      <>        
        <p>Signed in as {session.user.name}</p>        
        {/* 백엔드에 전송하여 값을 업데이트합니다. */}        
        <button onClick={() => update({ name: "John Doe" })}>이름 변경</button>        
        {/*         
         * 서버 측에서 이미 값을 업데이트했다고 가정하고 세션 업데이트만 트리거합니다.         
         * 모든 `useSession().data` 참조가 업데이트됩니다.         
         */}        
        <button onClick={() => update()}>이름 변경</button>      
      </>    
    )  
  }  
  
  return <a href="/api/auth/signin">로그인</a>
}
```

`strategy: "jwt"`가 사용된다고 가정하면, `update()` 메소드는 `trigger: "update"` 옵션과 함께 `jwt` 콜백을 트리거합니다. 이를 사용하여 서버에서 세션 객체를 업데이트할 수 있습니다.



```ts title="pages/api/auth/\[...nextauth\].ts"
...
callbacks: {  
  async jwt({ token, account }) {    
    // '...rest` 매개변수를 사용하여 '트리거'를 기준으로 유형 범위를 좁힐 수 있습니다.
    if (account) {      
      token.accessToken = account.access_token    
    }    
    return token  
  },  
  async session({ session, token, user }) {    
    // '세션'은 임의의 객체일 수 있으므로 유효성을 검사하는 것을 잊지 마세요!
    session.accessToken = token.accessToken    
    return session  
}}
...
```

`strategy: "database"`가 사용된다고 가정하면, `update()` 메소드는 `trigger: "update"` 옵션과 함께 `session` 콜백을 트리거합니다. 이를 사용하여 서버에서 세션 객체를 업데이트할 수 있습니다.



```ts title="pages/api/auth/\[...nextauth\].ts"
...
const adapter = PrismaAdapter(prisma)
export default NextAuth({  
  ...  
  adapter,  
  callbacks: {    
    async session({ session, trigger, newSession }) {      
      // '...rest` 매개변수를 사용하여 '트리거'를 기준으로 유형 범위를 좁힐 수 있습니다.
      if (trigger === "update" && newSession?.name) {        
        // 아직 업데이트되지 않은 경우 데이터베이스에서 세션을 업데이트할 수 있습니다.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // 업데이트된 값이 클라이언트에 반영되었는지 확인합니다.   
        session.name = newSession.name      
      }      
      return session    
    }  
  }
})
```

### 세션 재조회[](https://nextauth-ko.wsbox.pw/getting-started/client#refetching-the-session "직접 링크")

[`SessionProvider#refetchInterval`](https://nextauth-ko.wsbox.pw/getting-started/client#refetch-interval)과 [`SessionProvider#refetchOnWindowFocus`](https://nextauth-ko.wsbox.pw/getting-started/client#refetch-on-window-focus)는 `update()` 메소드로 대체할 수 있습니다.

:::note[참고]
`update()` 메소드는 `refetchInterval` 및 `refetchOnWindowFocus` 옵션과 달리 탭 간 동기화를 하지 않습니다.
:::


```tsx title="pages/profile.tsx"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function Page() {  
  const { data: session, status, update } = useSession()  
  
  // 세션을 매 1시간마다 폴링합니다  
  useEffect(() => {    
    // 팁: `navigator.onLine`과 몇 가지 추가 이벤트 핸들러를 사용하여
    // 사용자가 온라인 상태인지 확인하고 온라인 상태인 경우에만 세션을 업데이트할 수도 있습니다.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine    
    const interval = setInterval(() => update(), 1000 * 60 * 60)    
    return () => clearInterval(interval)  
  }, [update])  
  
  // 사용자가 탭을 전환하고 다시 탭을 표시하는 경우 페이지가 표시되는 시점을 기다립니다.
  // 탭이 다시 표시되면 세션을 다시 가져옵니다.
  useEffect(() => {    
    const visibilityHandler = () =>      
      document.visibilityState === "visible" && update()    
    window.addEventListener("visibilitychange", visibilityHandler, false)    
    return () =>      
      window.removeEventListener("visibilitychange", visibilityHandler, false)  
  }, [update])  
  
  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
```

___

## getSession()[](https://nextauth-ko.wsbox.pw/getting-started/client#getsession "직접 링크")

-   클라이언트 측: **예**
-   서버 측: **아니요** (참조: [`getServerSession()`](https://nextauth-ko.wsbox.pw/configuration/nextjs#getserversession))

NextAuth.js는 현재 활성 세션을 반환하기 위해 **클라이언트 측에서만** 호출해야 하는 `getSession()` 헬퍼를 제공합니다.

서버 측에서도 **아직은 사용 가능하지만**, 앞으로는 `getServerSession`을 사용하는 것을 권장합니다. 그 이유는 서버 측에서 불필요한 추가 `fetch` 호출을 피하기 위함입니다. 자세한 내용은 [이 이슈](https://github.com/nextauthjs/next-auth/issues/1535)를 참고하세요.

이 헬퍼는 React 컨텍스트 외부에서 세션을 읽고자 할 때 유용합니다.

호출 시, `getSession()`은 `/api/auth/session`에 요청을 보내고 [세션 객체](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/core/types.ts#L407-L425)를 포함한 프로미스를 반환하며, 세션이 없으면 `null`을 반환합니다.

```js
async function myFunction() {  
  const session = await getSession()  
  /* ... */
}
```

서버 측 호출에서 `getServerSession()`을 사용하여 세션을 가져오는 방법을 배우려면 [페이지 및 API 경로 보호하기](https://nextauth-ko.wsbox.pw/tutorials/securing-pages-and-api-routes) 튜토리얼을 읽어보세요.

___

## getCsrfToken()[](https://nextauth-ko.wsbox.pw/getting-started/client#getcsrftoken "직접 링크")

-   클라이언트 측: **예**
-   서버 측: **예**

`getCsrfToken()` 메소드는 POST 요청(예: 로그인 및 로그아웃)을 수행하는 데 필요한 현재 교차 사이트 요청 위조 토큰(CSRF 토큰)을 반환합니다.

내장된 `signIn()` 및 `signOut()` 메소드를 사용하지 않는 경우에만 이를 사용할 필요가 있습니다.

#### 클라이언트 측 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#client-side-example "직접 링크")

```js
async function myFunction() {  
  const csrfToken = await getCsrfToken()  
  /* ... */
}
```

#### 서버 측 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#server-side-example "직접 링크")

```js
import { getCsrfToken } from "next-auth/react"

export default async (req, res) => {  
  const csrfToken = await getCsrfToken({ req })  
  /* ... */  
  res.end()
}
```

___

## getProviders()[](https://nextauth-ko.wsbox.pw/getting-started/client#getproviders "직접 링크")

-   클라이언트 측: **예**
-   서버 측: **예**

`getProviders()` 메소드는 현재 로그인에 구성된 공급자 목록을 반환합니다.

이 메소드는 `/api/auth/providers`를 호출하며, 현재 구성된 인증 공급자 목록을 반환합니다.

동적 맞춤 로그인 페이지를 만드는 경우 유용할 수 있습니다.

___

#### API 경로[](https://nextauth-ko.wsbox.pw/getting-started/client#api-route "직접 링크")



```js title="pages/api/example.js"
import { getProviders } from "next-auth/react"

export default async (req, res) => {  
  const providers = await getProviders()  
  console.log("Providers", providers)  
  res.end()
}
```

:::note[참고]
`getCsrfToken()`과 달리, 서버 측에서 `getProviders()`를 호출할 때는 클라이언트 측에서 호출하는 것처럼 아무것도 전달할 필요가 없습니다.
:::
___

## signIn()[](https://nextauth-ko.wsbox.pw/getting-started/client#signin "직접 링크")

-   클라이언트 측: **예**
-   서버 측: 아니요

`signIn()` 메소드를 사용하면 사용자가 로그인 흐름을 완료한 후 시작한 페이지로 돌아가도록 보장할 수 있습니다. 또한 이메일로 로그인할 때 CSRF 토큰을 자동으로 처리해줍니다.

`signIn()` 메소드는 클라이언트에서 다양한 방식으로 호출할 수 있습니다.

### 클릭 시 로그인 페이지로 리디렉션[](https://nextauth-ko.wsbox.pw/getting-started/client#redirects-to-sign-in-page-when-clicked "직접 링크")

```jsx
import { signIn } from "next-auth/react"

export default () => <button onClick={() => signIn()}>로그인</button>
```

### 클릭 시 OAuth 로그인 흐름 시작[](https://nextauth-ko.wsbox.pw/getting-started/client#starts-oauth-sign-in-flow-when-clicked "직접 링크")

기본적으로, `signIn()` 메소드를 인수 없이 호출하면 NextAuth.js 로그인 페이지로 리디렉션됩니다. 이를 건너뛰고 바로 공급자의 페이지로 리디렉션하려면 공급자의 `id`를 인수로 `signIn()` 메소드를 호출하세요.

예를 들어 Google로 로그인하려면:

```jsx
import { signIn } from "next-auth/react"

export default () => (
  <button onClick={() => signIn("google")}>Google로 로그인</button>
)
```

### 클릭 시 이메일 로그인 흐름 시작[](https://nextauth-ko.wsbox.pw/getting-started/client#starts-email-sign-in-flow-when-clicked "직접 링크")

이메일 흐름과 함께 사용할 때, 대상 `email`을 옵션으로 전달하세요.

```jsx
import { signIn } from "next-auth/react"

export default ({ email }) => (
  <button onClick={() => signIn("email", { email })}>Email로 로그인</button>
)
```

### `callbackUrl` 지정[](https://nextauth-ko.wsbox.pw/getting-started/client#specifying-a-callbackurl "직접 링크")

`callbackUrl`은 사용자가 로그인한 후 리디렉션될 URL을 지정합니다. 기본값은 로그인 시작한 페이지의 URL입니다.

`signIn()`의 두 번째 인수로 `callbackUrl`을 지정하여 다른 `callbackUrl`을 설정할 수 있습니다. 이는 모든 공급자에 대해 작동합니다.

예시:
- `signIn(undefined, { callbackUrl: '/foo' })`
- `signIn('google', { callbackUrl: 'http://localhost:3000/bar' })`
- `signIn('email', { email, callbackUrl: 'http://localhost:3000/foo' })`

URL은 [리디렉션 콜백 핸들러](https://nextauth-ko.wsbox.pw/configuration/callbacks#redirect-callback)에 의해 유효한 것으로 간주되어야 합니다. 기본적으로 호스트 이름이 같은 절대 URL이거나 슬래시로 시작하는 상대 URL이어야 합니다. 일치하지 않으면 홈페이지로 리디렉션됩니다. 다른 URL을 허용하려면 자체 [리디렉션 콜백](https://nextauth-ko.wsbox.pw/configuration/callbacks#redirect-callback)을 정의할 수 있습니다.

### `redirect: false` 옵션 사용[](https://nextauth-ko.wsbox.pw/getting-started/client#using-the-redirect-false-option "직접 링크")

:::note[참고]
리디렉션 옵션은 `credentials` 및 `email` 공급자에만 사용할 수 있습니다.
:::

경우에 따라, 동일한 페이지에서 로그인 응답을 처리하고 기본 리디렉션을 비활성화하고 싶을 수 있습니다. 예를 들어, 오류가 발생한 경우(사용자가 잘못된 자격 증명을 제공한 경우) 동일한 페이지에서 오류를 처리할 수 있습니다. 이를 위해 두 번째 매개변수 객체에 `redirect: false`를 전달할 수 있습니다.

예시:
-   `signIn('credentials', { redirect: false, password: 'password' })`
-   `signIn('email', { redirect: false, email: 'bill@fillmurray.com' })`

`signIn`은 다음과 같은 프로미스를 반환합니다:

```ts
{  
  /**   
   * 오류 유형에 따라 다른 오류 코드가 반환됩니다.   
   */  
  error: string | undefined,  
  /**   
   * HTTP 상태 코드, 발생한 오류 유형을 암시합니다.   
   */  
  status: number,  
  /**   
   * 로그인이 성공하면 `true`   
   */  
  ok: boolean,  
  /**   
   * 오류가 있는 경우 `null`, 그렇지 않으면 사용자가 리디렉션되어야 할 URL이 반환됩니다.   
   */  
  url: string | null
}
```

### 추가 매개변수[](https://nextauth-ko.wsbox.pw/getting-started/client#additional-parameters "직접 링크")

`signIn()`의 세 번째 인수를 통해 `/authorize` 엔드포인트에 추가 매개변수를 전달할 수 있습니다.

[Authorization Request OIDC 사양](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)을 참고하세요. (이것들이 유일한 가능한 매개변수는 아니며, 모든 매개변수가 전달됩니다.)

예시:
-   `signIn("identity-server4", null, { prompt: "login" })` _항상 사용자가 재인증하도록 요청_
-   `signIn("auth0", null, { login_hint: "info@example.com" })` _공급자에게 이메일 주소를 힌트로 제공_


:::note[참고]
[provider.authorizationParams](https://nextauth-ko.wsbox.pw/configuration/providers/oauth#options)를 통해 이러한 매개 변수를 설정할 수도 있습니다.
:::
:::note[참고]
다음 매개변수는 서버 측에서 항상 덮어씌워집니다: `redirect_uri`, `state`
:::
___

## signOut()[](https://nextauth-ko.wsbox.pw/getting-started/client#signout "직접 링크")

-   클라이언트 측: **예**
-   서버 측: 아니요

로그아웃하려면 `signOut()` 메소드를 사용하여 사용자가 로그아웃 흐름을 완료한 후 시작한 페이지로 돌아가도록 보장하세요. 또한 CSRF 토큰을 자동으로 처리해줍니다.

완료되면 브라우저에서 페이지를 다시 로드합니다.

```jsx
import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()}>로그아웃</button>
```

### `callbackUrl` 지정[](https://nextauth-ko.wsbox.pw/getting-started/client#specifying-a-callbackurl-1 "직접 링크")

`signIn()` 함수와 마찬가지로, 옵션으로 `callbackUrl` 매개변수를 전달하여 `callbackUrl`을 지정할 수 있습니다.

예: `signOut({ callbackUrl: 'http://localhost:3000/foo' })`

URL은 [리디렉션 콜백 핸들러](https://nextauth-ko.wsbox.pw/configuration/callbacks#redirect-callback)에 의해 유효한 것으로 간주되어야 합니다. 기본적으로 호스트 이름이 같은 절대 URL이거나 슬래시로 시작하는 상대 URL이어야 합니다. 일치하지 않으면 홈페이지로 리디렉션됩니다. 다른 URL을 허용하려면 자체 [리디렉션 콜백](https://nextauth-ko.wsbox.pw/configuration/callbacks#redirect-callback)을 정의할 수 있습니다.

### `redirect: false` 옵션 사용[](https://nextauth-ko.wsbox.pw/getting-started/client#using-the-redirect-false-option-1 "직접 링크")

`signOut`에 `redirect: false`를 전달하면 페이지가 다시 로드되지 않습니다. 세션이 삭제되고 `useSession` 훅이 알림을 받아 사용자가 자동으로 로그아웃된 상태로 표시됩니다. 이는 사용자에게 매우 좋은 경험을 제공할 수 있습니다.

:::tip[팁]
다른 페이지로 리디렉션해야 하지만 페이지 로드를 피하고 싶다면, `const data = await signOut({redirect: false, callbackUrl: "/foo"})`를 시도해보세요. 여기서 `data.url`은 Next.js의 `useRouter().push(data.url)`을 사용하여 깜박임 없이 사용자를 리디렉션할 수 있는 유효한 URL입니다.
:::
___

## SessionProvider[](https://nextauth-ko.wsbox.pw/getting-started/client#sessionprovider "직접 링크")

:::note[참고]
App Router를 사용하는 경우, 서버 컨텍스트에서 [`getServerSession`](https://nextauth-ko.wsbox.pw/configuration/nextjs#getserversession)을 사용하는 것을 권장합니다. (`SessionProvider`는 App Router에서 _사용할 수_ 있으며, 이는 페이지에서 마이그레이션하는 경우 더 쉬운 선택일 수 있습니다.)
:::
제공된 `<SessionProvider>`를 사용하면 `useSession()` 인스턴스가 [React Context](https://react.dev/learn/passing-data-deeply-with-context)를 내부적으로 사용하여 컴포넌트 간에 세션 객체를 공유할 수 있습니다. 또한 세션이 업데이트되고 탭/창 간에 동기화되도록 관리합니다.



```jsx title="pages/_app.js"
import { SessionProvider } from "next-auth/react"

export default function App({  
  Component,  
  pageProps: { session, ...pageProps },  
}) {  
  return (    
    <SessionProvider session={session}>      
      <Component {...pageProps} />    
    </SessionProvider>  
  )
}
```

`<SessionProvider>`에 `session` 페이지 prop을 전달하면 위 예제처럼, 서버 및 클라이언트 측 렌더링을 모두 지원하는 페이지에서 세션을 두 번 확인하는 것을 피할 수 있습니다.

하지만, 이는 올바른 `pageProps`를 제공하는 페이지에서만 작동합니다. 이는 개별 페이지 기준으로 `getInitialProps` 또는 `getServerSideProps`에서 일반적으로 수행됩니다:



```jsx title="pages/index.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

...
export async function getServerSideProps({ req, res }) {  
  return {    
    props: {      
      session: await getServerSession(req, res, authOptions)    
    }  
  }
}
```

모든 페이지가 보호되어야 하는 경우 `_app`에서 `getInitialProps`를 사용하여 이를 수행할 수 있으며, 그렇지 않은 경우 개별 페이지 기준으로 수행할 수 있습니다. 또는 [대안 클라이언트 세션 처리](https://nextauth-ko.wsbox.pw/getting-started/client#custom-client-session-handling)에서 설명된 방법을 사용하여 각 인증 확인이 차단되지 않도록 클라이언트 측에서 페이지별 인증 확인을 수행할 수 있습니다.

### 옵션[](https://nextauth-ko.wsbox.pw/getting-started/client#options "직접 링크")

세션 상태는 모든 열려 있는 탭/창 간에 자동으로 동기화되며, `refetchOnWindowFocus`가 `true`일 때 포커스를 얻거나 잃을 때마다 또는 상태가 변경될 때마다(예: 사용자가 로그인 또는 로그아웃할 때) 모두 업데이트됩니다.

세션 만료 시간이 30일(기본값) 이상인 경우, 제공자의 기본 옵션을 변경할 필요가 없을 것입니다. 필요하다면, 클라이언트 측 함수에서 [`getSession()`](https://nextauth-ko.wsbox.pw/getting-started/client#getsession)을 호출하여 모든 탭/창에서 세션 객체를 업데이트할 수 있습니다.

하지만, 세션 동작을 사용자 정의해야 하거나 짧은 세션 만료 시간을 사용하는 경우, `useSession()` 훅의 동작을 사용자 정의하기 위해 제공자에게 옵션을 전달할 수 있습니다.



```jsx title="pages/_app.js"
import { SessionProvider } from "next-auth/react"

export default function App({  
  Component,  
  pageProps: { session, ...pageProps },  
}) {  
  return (    
    <SessionProvider      
      session={session}      
      // 앱이 루트 "/"에 있을 경우 기본 경로      
      basePath="/"      
      // 세션을 5분마다 다시 가져옵니다      
      refetchInterval={5 * 60}      
      // 창이 포커스를 맞출 때 세션을 다시 가져옵니다      
      refetchOnWindowFocus={true}    
    >      
      <Component {...pageProps} />    
    </SessionProvider>  
  )
}
```

:::note[참고]
**이 옵션들은 로그인하지 않은 클라이언트에는 영향을 주지 않습니다.**

각 탭/창은 로컬 세션 상태의 자체 복사본을 유지합니다; 세션은 localStorage나 sessionStorage와 같은 공유 저장소에 저장되지 않습니다. 한 탭/창에서의 모든 업데이트는 다른 탭/창에 메시지를 보내 그들의 세션 상태를 업데이트하도록 합니다.

`refetchInterval`을 낮은 값으로 설정하면 인증된 클라이언트의 네트워크 트래픽과 로드가 증가할 수 있으며, 호스팅 비용 및 성능에 영향을 미칠 수 있습니다.
:::
#### 기본 경로[](https://nextauth-ko.wsbox.pw/getting-started/client#base-path "직접 링크")

커스텀 기본 경로를 사용하는 경우, 애플리케이션의 진입점이 도메인 "/"의 루트가 아닌 다른 경로(예: "/my-app/")에 있다면, `basePath` prop을 사용하여 NextAuth.js가 이를 인식하도록 설정할 수 있습니다. 이렇게 하면 모든 리디렉션과 세션 처리가 예상대로 작동합니다.

#### 세션 재조회 간격[](https://nextauth-ko.wsbox.pw/getting-started/client#refetch-interval "직접 링크")

[세션 재조회](https://nextauth-ko.wsbox.pw/getting-started/client#refetching-the-session) 옵션을 대안으로 참조하세요.

`refetchInterval` 옵션은 세션이 만료되지 않도록 서버에 연락하는 데 사용할 수 있습니다.

`refetchInterval`이 `0`(기본값)으로 설정된 경우, 세션 폴링이 없습니다.

`refetchInterval`을 0이 아닌 값으로 설정하면 클라이언트가 세션 상태를 업데이트하기 위해 서버에 얼마나 자주 연락해야 하는지를 초 단위로 지정합니다. 세션 상태가 만료된 경우, 모든 열려 있는 탭/창이 이를 반영하도록 업데이트됩니다.

`refetchInterval` 값은 항상 세션 `maxAge` [세션 옵션](https://nextauth-ko.wsbox.pw/configuration/options#session)의 값보다 낮아야 합니다.

기본적으로, 세션 폴링은 장치가 인터넷에 접속되어 있지 않더라도 시도합니다. 이를 방지하려면 `refetchWhenOffline`을 `false`로 설정할 수 있습니다. 이는 [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)을 사용하여 장치가 온라인일 때만 세션을 폴링합니다.

#### 창 포커스 시 재조회[](https://nextauth-ko.wsbox.pw/getting-started/client#refetch-on-window-focus "직접 링크")

[세션 재조회](https://nextauth-ko.wsbox.pw/getting-started/client#refetching-the-session) 옵션을 대안으로 참조하세요.

`refetchOnWindowFocus` 옵션은 탭/창에 포커스가 맞춰질 때 자동으로 세션 상태를 업데이트할지 여부를 제어하는 데 사용할 수 있습니다.

`refetchOnWindowFocus`가 `true`(기본값)로 설정된 경우, 탭/창이 포커스를 얻거나 잃을 때 컴포넌트의 상태가 업데이트됩니다.

하지만, `false`로 설정하면 세션을 다시 가져오는 것을 중지하고 컴포넌트는 현재 상태를 유지합니다.

:::note[참고]
Next.js 애플리케이션의 _app.js에 대한 자세한 내용은 [Next.js 설명서](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)를 참조하세요.
:::
### 커스텀 기본 경로[](https://nextauth-ko.wsbox.pw/getting-started/client#custom-base-path "직접 링크")

Next.js 애플리케이션이 커스텀 기본 경로를 사용하는 경우, `NEXTAUTH_URL` 환경 변수를 API 엔드포인트의 전체 경로로 설정하세요 - 아래 예제와 [여기](https://nextauth-ko.wsbox.pw/configuration/options#nextauth_url)에 설명된 대로 설정합니다.

또한, `<SessionProvider>`에 `basePath` 페이지 prop을 전달하여 NextAuth.js가 완전히 구성되고 커스텀 기본 경로를 사용할 수 있도록 하세요.

#### 예제[](https://nextauth-ko.wsbox.pw/getting-started/client#example-3 "직접 링크")

이 예제에서는 커스텀 기본 경로로 `/custom-route`를 사용합니다.

```
NEXTAUTH_URL=https://example.com/custom-route/api/auth
```



```jsx title="pages/_app.js"
import { SessionProvider } from "next-auth/react"

export default function App({  
  Component,  
  pageProps: { session, ...pageProps },  
}) {  
  return (    
    <SessionProvider session={session} basePath="/custom-route/api/auth">      
      <Component {...pageProps} />    
    </SessionProvider>  
  )
}
```