---
id: initialization
---
# 초기화

NextAuth.js의 주요 진입점은 `next-auth`에서 가져오는 `NextAuth` 메서드입니다. 이는 [REST API](https://next-auth.js.org/getting-started/rest-api) 섹션에 정의된 다양한 유형의 요청을 처리합니다.

**정보**

NextAuth.js는 초기화를 위해 [Edge Runtime](https://nextjs.org/docs/api-reference/edge-runtime)을 사용할 수 없습니다. 반면에 다가오는 [`@auth/nextjs` 라이브러리](https://authjs.dev/reference/next-auth)(`next-auth`를 대체할 예정)는 완전히 호환됩니다.

NextAuth.js를 초기화하는 몇 가지 방법이 있습니다.

## 간단한 초기화[](https://next-auth.js.org/configuration/initialization#simple-initialization "헤딩으로 직접 링크")

### API 라우트 (`pages`)[](https://next-auth.js.org/configuration/initialization#api-routes-pages "헤딩으로 직접 링크")

Next.js에서는 특정 경로로 시작하는 모든 요청을 포착할 API 라우트를 정의할 수 있습니다. 편리하게도, 이는 [모든 API 라우트 포착](https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes)라고 합니다.

`/pages/api/auth/[...nextauth]` JS/TS 파일을 정의하면, `/api/auth/*`로 시작하는 모든 API 요청이 `[...nextauth]` 파일에 작성된 코드에 의해 처리되도록 NextAuth.js에 지시합니다.



```typescript title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
export default NextAuth({  ...})
```

여기서는 단지 [옵션](https://next-auth.js.org/configuration/options)을 `NextAuth`에 전달하면 되고, 나머지는 `NextAuth`가 처리합니다.

이 방식은 코드가 간단해지고 인증 흐름에서 발생할 수 있는 잠재적인 오류를 줄이기 때문에 튜토리얼 및 문서의 다른 부분에서 선호되는 초기화 방법입니다.

### 라우트 핸들러 (`app/`)[](https://next-auth.js.org/configuration/initialization#route-handlers-app "헤딩으로 직접 링크")

[Next.js 13.2](https://nextjs.org/blog/next-13-2#custom-route-handlers)에서는 App Router (`app/`)에서 REST 유사 요청을 처리하는 선호되는 방법인 [라우트 핸들러](https://beta.nextjs.org/docs/routing/route-handlers)를 도입했습니다.

API 라우트와 매우 유사하게, 라우트 핸들러로 NextAuth.js를 초기화할 수도 있습니다.



```typescript title="app/api/auth/[...nextauth]/route.ts"
import NextAuth from "next-auth"
const handler = NextAuth({  ...})
export { handler as GET, handler as POST }
```

내부적으로, NextAuth.js는 웹 [`Request` 인스턴스](https://developer.mozilla.org/en-US/docs/Web/API/Request)가 전달되었음을 이해하여 라우트 핸들러에서 초기화되고 있음을 감지하며, [`Response` 인스턴스](https://developer.mozilla.org/en-US/docs/Web/API/Response)를 반환하는 핸들러를 반환합니다. 라우트 핸들러 파일은 요청을 처리하고 응답을 반환하는 몇 가지 명명된 핸들러 함수를 내보내야 합니다. NextAuth.js는 제대로 작동하기 위해 `GET` 및 `POST` 핸들러가 필요하므로 이 두 가지를 내보냅니다.

:::info[정보]
기술적으로, 라우트 핸들러에서는 `api/` 접두사가 필요하지 않지만, 더 쉬운 마이그레이션을 위해 필수로 유지하기로 결정했습니다.
:::

## 고급 초기화[](https://next-auth.js.org/configuration/initialization#advanced-initialization "헤딩으로 직접 링크")

:::info[정보]
다음은 API 라우트로 고급 초기화를 설명하지만, [라우트 핸들러](https://beta.nextjs.org/docs/routing/route-handlers)를 사용할 때도 유사하게 적용됩니다. 대신, `NextAuth`는 라우트 핸들러의 처음 두 인수를 받고, 세 번째 인수는 [인증 옵션](https://next-auth.js.org/configuration/options)이 됩니다.
:::
특정 사용 사례가 있어 NextAuth.js가 설계된 방식과 약간 다르게 동작해야 하는 경우, `[...nextauth].ts` 구성 파일은 단지 **일반적인** [**API 라우트**](https://nextjs.org/docs/api-routes/introduction)일 뿐임을 기억하세요.

즉, NextAuth.js를 다음과 같이 초기화할 수 있습니다:

```typescript title="pages/api/auth/[...nextauth].ts"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // `NextAuth`로 요청이 전달되기 전에 원하는 작업을 수행하세요
  return await NextAuth(req, res, {
    ...  
  })
}
```

`...` 섹션은 여전히 [옵션](https://next-auth.js.org/configuration/options)일 것이지만, 이제 요청에서 특정 작업을 실행하거나 수정할 수 있는 가능성이 생겼습니다.

예를 들어, 요청을 로깅하거나 헤더를 추가하거나 `query` 또는 `body` 매개변수를 읽을 수 있습니다. API 라우트에서 하던 모든 작업을 수행할 수 있습니다.

:::tip[팁]

이것이 포착-모든 라우트이므로, 어떤 종류의 NextAuth.js "액션"이 실행되고 있는지 확인하는 것을 잊지 마세요. REST API와 `req.query.nextauth` 매개변수를 비교하세요.

예를 들어, 요청이 POST 메서드일 때 "callback" 액션에서 무언가를 실행하려면 `req.query.nextauth.includes("callback") && req.method === "POST"`를 확인할 수 있습니다.
:::
:::note[참고]
`NextAuth`는 응답을 암묵적으로 종료(`res.end`, `res.send` 또는 유사한 방법 호출)하므로, 함수 본문에서 `NextAuth` 이후에 코드를 실행하지 않아야 합니다. `return NextAuth`를 사용하면 이를 잊지 않도록 보장됩니다.
:::

이렇게 생성한 변수는 동일한 범위에 있기 때문에 `NextAuth` 옵션에서도 사용할 수 있습니다.

```typescript title="pages/api/auth/[...nextauth].ts"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }
  // 요청에서 사용자 정의 쿠키 값을 가져옵니다
  const someCookie = req.cookies["some-custom-cookie"]
  return await NextAuth(req, res, {
    ...
    callbacks: {
      session({ session, token }) {
        // 세션의 일부로 쿠키 값을 반환합니다
        // 이는 `req.query.nextauth.includes("session") && req.method === "GET"`일 때 읽힙니다
        session.someCookie = someCookie
        return session
      }
    }
  })
}
```

실용적인 예로는 기본 로그인 페이지에서 특정 제공자를 표시하지 않지만 여전히 해당 제공자로 로그인할 수 있도록 하는 것입니다. (아이디어는 [이 토론](https://github.com/nextauthjs/next-auth/discussions/3133)에서 가져왔습니다):

```typescript title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
export default async function auth(req, res) {
  const providers = [
    CredentialsProvider(...),
    GoogleProvider(...),
  ]
  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")
  // `/api/auth/signin`을 방문할 때 `GoogleProvider`를 숨깁니다
  if (isDefaultSigninPage) providers.pop()
  return await NextAuth(req, res, {
    providers,
    ...  
  })
}
```

사용 가능한 모든 액션과 지원되는 메서드에 대한 자세한 내용은 [REST API 문서](https://next-auth.js.org/getting-started/rest-api) 또는 [소스 코드의 해당 영역](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/core/index.ts)을 확인하세요.

이러한 방식으로 `NextAuth`를 초기화하는 것은 매우 강력하지만, 신중하게 사용해야 합니다.

:::danger[경고]
`NextAuth`가 제대로 작동하는 데 필수적인 요청의 일부를 변경(예: [기본 쿠키](https://next-auth.js.org/configuration/options#cookies)를 수정)하면 예기치 않은 결과가 발생할 수 있으며, 잘못 수행될 경우 보안 취약점을 도입할 가능성이 있습니다. 그 결과를 이해한 경우에만 이를 변경하세요.
:::