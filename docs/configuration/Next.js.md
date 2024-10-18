---
id: nextjs
---
# Next.js

## `getServerSession`[](https://next-auth.js.org/configuration/nextjs#getserversession "헤딩으로 직접 링크")

:::tip[팁]
`authOptions`를 전달할 필요 없이 도우미 함수를 생성할 수 있습니다:

```typescript title="auth.ts"
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

// `app/api/auth/[...nextauth]/route.ts`에서 `NextAuth`에 전달할 필요가 있는 것을 가져와야 합니다
export const config = {  
  providers: [], // 나머지 구성
} satisfies NextAuthOptions

// 서버 컨텍스트에서 사용
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {  
  return getServerSession(...args, config)
}
```
:::
서버 측에서 호출할 때, 즉 라우트 핸들러, 리액트 서버 컴포넌트, API 라우트 또는 `getServerSideProps`에서 `session` 객체를 검색하기 위해 `getSession` 대신 이 함수를 사용하는 것을 권장합니다. 이 방법은 특히 NextAuth.js를 데이터베이스와 함께 사용할 때 유용합니다. 이 방법은 서버 측에서 `getSession`보다 응답 시간을 _극적으로_ 줄일 수 있는데, 이는 추가적인 API 라우트로의 `fetch`를 피할 수 있기 때문입니다(이는 일반적으로 [Next.js에서 권장되지 않습니다](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#getserversideprops-or-api-routes)). 또한, `getServerSession`은 `callbacks.jwt` 또는 `callbacks.session`이 무언가를 변경한 경우 쿠키 만료 시간을 올바르게 업데이트하고 세션 내용을 업데이트합니다.

`getServerSession`은 NextAuth.js를 초기화할 때 `NextAuth`에 전달할 동일한 객체를 전달해야 합니다. 이를 위해 다음과 같이 NextAuth.js 옵션을 내보낼 수 있습니다:

`[...nextauth].ts`에서:

```typescript
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {  
  // 구성 설정
}

export default NextAuth(authOptions)
```

### `getServerSideProps`에서:[](https://next-auth.js.org/configuration/nextjs#in-getserversideprops "헤딩으로 직접 링크")

```typescript
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {  
  const session = await getServerSession(context.req, context.res, authOptions)  
  if (!session) {    
    return {      
      redirect: {        
        destination: "/",        
        permanent: false,      
      },    
    }  
  }  
  return {    
    props: {      
      session,    
    },  
  }
}
```

### API 라우트에서:[](https://next-auth.js.org/configuration/nextjs#in-api-routes "헤딩으로 직접 링크")

```typescript
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {  
  const session = await getServerSession(req, res, authOptions)  
  if (!session) {    
    res.status(401).json({ message: "로그인해야 합니다." })    
    return  
  }  
  return res.json({    
    message: "성공",  
  })
}
```

### 앱 라우터에서:[](https://next-auth.js.org/configuration/nextjs#in-app-router "헤딩으로 직접 링크")

Next.js의 서버 컴포넌트에서도 `getServerSession`을 사용할 수 있습니다:

```typescript
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function Page() {  
  const session = await getServerSession(authOptions)  
  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
```

:::info[정보]
`useSession`과는 달리, `useSession`은 사용자가 로그인했는지 여부와 관계없이 `session` 객체를 반환합니다(쿠키가 존재하든 아니든). 반면에 `getServerSession`은 사용자가 로그인했을 때(인증된 쿠키가 있을 때)에만 `session` 객체를 반환하고, 그렇지 않으면 `null`을 반환합니다.
:::
:::danger[주의]
현재, 기본 Next.js `cookies()` 메서드는 요청 쿠키에 대해 [읽기 전용 액세스](https://beta.nextjs.org/docs/api-reference/cookies)만 제공합니다. 이는 서버 컴포넌트에서 `session`에서 `expires` 값이 제거됨을 의미합니다. 또한, 세션에는 고정 만료 시간이 있어 사용자가 다시 로그인해야 하는 시점이 있습니다(기본 만료는 30일입니다).
:::
### 캐싱[](https://next-auth.js.org/configuration/nextjs#caching "헤딩으로 직접 링크")

이 함수를 사용하면 개인화된 데이터가 포함되므로 [공용 캐시](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)에 페이지나 API를 저장하지 않아야 합니다. 예를 들어, [Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching)과 같은 호스트는 이 함수에서 설정된 `set-cookie` 헤더 때문에 공용 캐싱을 암묵적으로 방지합니다.

## `unstable_getServerSession`[](https://next-auth.js.org/configuration/nextjs#unstable_getserversession "헤딩으로 직접 링크")

이 메서드는 `getServerSession`으로 이름이 변경되었습니다. 위의 문서를 참조하세요.

## 미들웨어[](https://next-auth.js.org/configuration/nextjs#middleware "헤딩으로 직접 링크")

NextAuth.js와 함께 Next.js 미들웨어를 사용하여 사이트를 보호할 수 있습니다.

Next.js 12는 [미들웨어](https://nextjs.org/docs/middleware)를 도입했습니다. 이는 정적 페이지라도 접근하기 전에 로직을 실행할 수 있는 방법입니다. Vercel과 같은 플랫폼에서는 미들웨어가 [엣지](https://nextjs.org/docs/api-reference/edge-runtime)에서 실행됩니다.

다음 옵션들이 익숙하게 보인다면, 이는 [이 옵션들](https://next-auth.js.org/configuration/options#options)의 하위 집합이기 때문입니다. 이를 공통 구성 객체로 추출하여 재사용할 수 있습니다. 미래에는 모든 것을 미들웨어에서 실행할 수 있기를 바랍니다. ([제한 사항](https://next-auth.js.org/configuration/nextjs#caveats)을 참조하세요).

`next-auth/middleware`에서 `withAuth` 미들웨어 함수를 기본 또는 명명된 가져오기 방식으로 가져올 수 있습니다:

### 필수 조건[](https://next-auth.js.org/configuration/nextjs#prerequisites "헤딩으로 직접 링크")

미들웨어에서 사용하는 `secret`을 NextAuth에서도 동일하게 설정해야 합니다. 가장 쉬운 방법은 [`NEXTAUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret) 환경 변수를 설정하는 것입니다. 이는 [NextAuth 구성](https://next-auth.js.org/configuration/options#options)과 미들웨어 구성 모두에서 사용됩니다.

또는, 미들웨어 구성에서 [`secret`](https://next-auth.js.org/configuration/nextjs#secret) 옵션을 사용하여 비밀을 제공할 수도 있습니다.

**강력히 권장**합니다. `secret` 값을 완전히 `NEXTAUTH_SECRET` 환경 변수로 대체하세요.

### 기본 사용법[](https://next-auth.js.org/configuration/nextjs#basic-usage "헤딩으로 직접 링크")

가장 간단한 사용법은 사이트 전체에 대해 인증을 요구하고자 할 때입니다. 다음과 같이 `middleware.js` 파일을 추가할 수 있습니다:

```js
export { default } from "next-auth/middleware"
```

그게 다입니다! 이제 애플리케이션이 보호됩니다.

특정 페이지만 보호하고 싶다면, `matcher`와 함께 `config` 객체를 내보내세요:

```js
export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard"] }
```

이제 모든 페이지에 접근할 수 있지만, `/dashboard`만 인증이 필요합니다.

사용자가 로그인하지 않은 경우, 기본 동작은 로그인 페이지로 리디렉션하는 것입니다.

___

### `callbacks`[](https://next-auth.js.org/configuration/nextjs#callbacks "헤딩으로 직접 링크")

- **필수:** 아니오

#### 설명[](https://next-auth.js.org/configuration/nextjs#description "헤딩으로 직접 링크")

콜백은 특정 작업이 수행될 때 일어나는 일을 제어할 수 있는 비동기 함수입니다.

#### 예제 (기본 값)[](https://next-auth.js.org/configuration/nextjs#example-default-value "헤딩으로 직접 링크")

```js
callbacks: {   
  authorized({ req, token }) {     
    if(token) return true // 토큰이 있으면 사용자가 인증됨   
  } 
}
```

___

### `pages`[](https://next-auth.js.org/configuration/nextjs#pages "헤딩으로 직접 링크")

- **필수**: _아니오_

#### 설명[](https://next-auth.js.org/configuration/nextjs#description-1 "헤딩으로 직접 링크")

사용자 지정 로그인 및 오류 페이지를 생성하려는 경우 사용할 URL을 지정하세요. 지정된 페이지는 해당 내장 페이지를 대체합니다.

:::info[정보]
`pages` 구성은 `[...nextauth].ts`의 구성과 일치해야 합니다. 이는 `next-auth` 미들웨어가 사용자 지정 페이지를 인식하도록 하여 인증되지 않은 조건이 충족될 때 자신에게 리디렉션되지 않도록 하기 위함입니다.
:::

#### 예제 (기본 값)[](https://next-auth.js.org/configuration/nextjs#example-default-value-1 "헤딩으로 직접 링크")

```js
import { withAuth } from "next-auth/middleware"

export default withAuth({  
  // `[...nextauth]`의 pages 구성과 일치함  
  pages: {    
    signIn: "/login",    
    error: "/error",  
  },
})
```

더 많은 정보는 [pages 옵션 문서](https://next-auth.js.org/configuration/pages)를 참조하세요.

___

### `secret`[](https://next-auth.js.org/configuration/nextjs#secret "헤딩으로 직접 링크")

- **필수:** _아니오_

#### 설명[](https://next-auth.js.org/configuration/nextjs#description-2 "헤딩으로 직접 링크")

동일한 `secret`이 [NextAuth.js 구성](https://next-auth.js.org/configuration/options#options)에서도 사용됩니다.

#### 예제 (기본 값)[](https://next-auth.js.org/configuration/nextjs#example-default-value-2 "헤딩으로 직접 링크")

```js
secret: process.env.NEXTAUTH_SECRET
```

___

### 고급 사용법[](https://next-auth.js.org/configuration/nextjs#advanced-usage "헤딩으로 직접 링크")

NextAuth.js 미들웨어는 매우 유연하며, 여러 가지 방법으로 사용할 수 있습니다.

:::note[참고]
옵션을 정의하지 않으면, NextAuth.js는 생략된 옵션에 대해 기본 값을 사용합니다.
:::
#### 미들웨어 래핑[](https://next-auth.js.org/configuration/nextjs#wrap-middleware "헤딩으로 직접 링크")



```ts title="middleware.ts"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth`는 사용자의 토큰으로 `Request`를 확장합니다.  
  function middleware(req) {    
    console.log(req.nextauth.token)  
  },  
  {    
    callbacks: {      
      authorized: ({ token }) => token?.role === "admin",    
    },  
  },
)

export const config = { matcher: ["/admin"] }
```

`middleware` 함수는 `authorized` 콜백이 `true`를 반환할 때만 호출됩니다.

___

#### 커스텀 JWT 디코드 메서드[](https://next-auth.js.org/configuration/nextjs#custom-jwt-decode-method "헤딩으로 직접 링크")

`[...nextauth].ts`에서 커스텀 JWT 디코드 메서드를 설정한 경우, `withAuth`에도 동일한 `decode` 메서드를 전달하여 커스텀 서명된 JWT를 올바르게 읽어야 합니다. 일관성을 위해 인코딩/디코딩 로직을 별도의 함수로 추출할 수 있습니다.

```typescript title="/api/auth/[...nextauth].ts"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import jwt from "jsonwebtoken"

export const authOptions: NextAuthOptions = {  
  providers: [...],  
  jwt: {    
    async encode({ secret, token }) {      
      return jwt.sign(token, secret)    
    },    
    async decode({ secret, token }) {      
      return jwt.verify(token, secret)    
    },  
  },
}

export default NextAuth(authOptions)
```

그리고:



```typescript title="middleware.ts"
import withAuth from "next-auth/middleware"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default withAuth({  
  jwt: { decode: authOptions.jwt?.decode },  
  callbacks: {    
    authorized: ({ token }) => !!token,  
  },
})
```

### 주의 사항[](https://next-auth.js.org/configuration/nextjs#caveats "헤딩으로 직접 링크")

- 현재는 세션 검증만 지원하며, 로그인 코드의 일부는 Node.js 환경에서 실행되어야 합니다. 미래에는 NextAuth.js가 [엣지](https://nextjs.org/docs/api-reference/edge-runtime)에서 완전히 실행될 수 있도록 하고자 합니다.
- `"jwt"` [세션 전략](https://next-auth.js.org/configuration/options#session)만 지원합니다. 엣지에서 데이터베이스가 충분히 성숙해져 빠른 경험을 보장할 수 있을 때까지 기다려야 합니다. (엣지 호환 데이터베이스를 알고 있다면, 새로운 [어댑터](https://authjs.dev/guides/creating-a-database-adapter)를 제안해 주세요.)