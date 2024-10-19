---
id: typescript
---
# 타입스크립트

NextAuth.js는 TypeScript 프로젝트에서 안전하게 사용할 수 있는 자체 타입 정의를 제공합니다. TypeScript를 사용하지 않더라도 VSCode와 같은 IDE는 이를 인식하여 더 나은 개발자 경험을 제공합니다. 타이핑하는 동안 특정 객체/함수가 어떻게 생겼는지에 대한 제안과 때로는 문서, 예제 및 기타 유용한 리소스에 대한 링크를 받을 수 있습니다.

TypeScript와 함께 `next-auth`를 사용하는 방법을 보여주는 예제 리포지토리를 확인하세요:  
[https://github.com/nextauthjs/next-auth-example](https://github.com/nextauthjs/next-auth-example)

___

## 어댑터[](https://nextauth-ko.wsbox.pw/getting-started/typescript#adapters "직접 링크")

자체 커스텀 어댑터를 작성하는 경우, 타입을 활용하여 구현이 예상되는 대로 준수하는지 확인할 수 있습니다:

```js
import type { Adapter } from "next-auth/adapters"

function MyAdapter(): Adapter {  
  return {    
    // 어댑터 메소드는 여기에 작성하세요
  }
}
```

순수 JavaScript로 자체 커스텀 어댑터를 작성할 때, 다음과 같이 **JSDoc**을 사용하여 유용한 편집기 힌트와 자동 완성을 얻을 수 있습니다:

```jsx
/** 
 * @return { import("next-auth/adapters").Adapter } 
 */
function MyAdapter() {  
  return {    
    // 어댑터 메소드는 여기에 작성하세요
  }
}
```

:::note[참고]
VSCode나 WebStorm과 같은 강력한 TypeScript 통합을 가진 코드 편집기에서 작동합니다. VIM이나 Atom과 같은 경량 편집기를 사용하는 경우에는 작동하지 않을 수 있습니다.
:::

## 모듈 확장[](https://nextauth-ko.wsbox.pw/getting-started/typescript#module-augmentation "직접 링크")

`next-auth`는 서브모듈 전반에 걸쳐 공유되는 특정 타입/인터페이스를 제공합니다. 좋은 예는 `Session`과 `JWT`입니다. 이상적으로는 이러한 타입을 한 곳에서만 생성하면 되고, TypeScript는 참조되는 모든 위치에서 이를 인식해야 합니다. 다행히도, 모듈 확장은 바로 그 역할을 합니다. 공유 인터페이스를 한 곳에 정의하고, `next-auth`(또는 그 서브모듈 중 하나)를 사용할 때 애플리케이션 전반에 걸쳐 타입 안전성을 확보할 수 있습니다.

### 메인 모듈[](https://nextauth-ko.wsbox.pw/getting-started/typescript#main-module "직접 링크")

`Session`을 살펴보겠습니다:



```jsx title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"

export default NextAuth({  
  callbacks: {    
    session({ session, token, user }) {      
      return session // 반환 타입은 `useSession()`에서 반환되는 것과 일치합니다    
    },  
  },
})
```



```jsx title="pages/index.ts"
import { useSession } from "next-auth/react"

export default function IndexPage() {  
  // `session`은 `NextAuth()`의 `callbacks.session()`에서 반환된 값과 일치합니다  
  const { data: session } = useSession()  
  
  return (    
    // 컴포넌트  
  )
}
```

이 타입을 확장/보강하려면, 프로젝트에 `types/next-auth.d.ts` 파일을 생성하세요:



```ts title="types/next-auth.d.ts"
import NextAuth from "next-auth"

declare module "next-auth" {  
  /**   
   * `useSession`, `getSession`에서 반환되며 `SessionProvider` React Context에서 prop으로 수신됩니다.   
   */  
  interface Session {    
    user: {      
      address: string    
    }  
  }
}
```

#### 기본 인터페이스 속성 확장[](https://nextauth-ko.wsbox.pw/getting-started/typescript#extend-default-interface-properties "직접 링크")

기본적으로 TypeScript는 새로운 인터페이스 속성을 병합하고 기존 속성을 덮어씁니다. 이 경우, 기본 세션 사용자 속성이 덮어씌워지고 위에서 정의한 새로운 속성이 추가됩니다.

기본 세션 사용자 속성을 유지하려면, 새로 선언된 인터페이스에 이를 다시 추가해야 합니다:



```ts title="types/next-auth.d.ts"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {  
  /**   
   * `useSession`, `getSession`에서 반환되며 `SessionProvider` React Context에서 prop으로 수신됩니다.   
   */  
  interface Session {    
    user: {      
      address: string    
    } & DefaultSession["user"]  
  }
}
```

#### 보강할 인기 있는 인터페이스[](https://nextauth-ko.wsbox.pw/getting-started/typescript#popular-interfaces-to-augment "직접 링크")

거의 모든 것을 보강할 수 있지만, `next-auth` 모듈에서 오버라이드하고자 할 수 있는 더 일반적인 인터페이스는 다음과 같습니다:

```ts
/** 
 * OAuth 공급자의 `profile` 콜백에서 반환되는 사용자 객체의 형태, 
 * 또는 데이터베이스를 사용할 때 `session` 콜백의 두 번째 매개변수.
 */
interface User {}

/** 
 * 일반적으로 사용 중인 공급자에 대한 정보와 
 * OAuth 공급자가 반환하는 다양한 토큰을 포함하는 `TokenSet`을 확장합니다.
 */
interface Account {}

/** 
 * 공급자에서 반환된 OAuth 프로필
 */
interface Profile {}
```

프로젝트의 `tsconfig.json` 파일에 `types` 폴더가 [`typeRoots`](https://www.typescriptlang.org/tsconfig/#typeRoots)에 추가되어 있는지 확인하세요.

### 서브모듈[](https://nextauth-ko.wsbox.pw/getting-started/typescript#submodules "직접 링크")

`JWT` 인터페이스는 `next-auth/jwt` 서브모듈에서 찾을 수 있습니다:



```ts title="types/next-auth.d.ts"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {  
  /** 
   * `jwt` 콜백과 JWT 세션을 사용할 때 `getToken`에서 반환됩니다. 
   */  
  interface JWT {    
    /** OpenID ID 토큰 */    
    idToken?: string  
  }
}
```

### 유용한 링크[](https://nextauth-ko.wsbox.pw/getting-started/typescript#useful-links "직접 링크")

1.  [TypeScript 문서: 모듈 확장](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
2.  [Digital Ocean: TypeScript에서의 모듈 확장](https://www.digitalocean.com/community/tutorials/typescript-module-augmentation)

## 기여하기[](https://nextauth-ko.wsbox.pw/getting-started/typescript#contributing "직접 링크")

모든 종류의 기여는 항상 환영합니다, 특히 TypeScript 관련 기여는 더욱 그렇습니다. 우리는 이 프로젝트를 여가 시간에 작업하는 소규모 팀임을 명심해 주세요. 지원을 제공하기 위해 최선을 다하겠지만, 문제에 대한 해결책이 있다고 생각되면 PR을 열어주세요!

:::note[참고]
TypeScript에 기여할 때 실제 JavaScript 사용자 API가 획기적인 방식으로 변경되지 않는다면, 당사는 마이너 릴리스에서 TypeScript 변경 사항을 푸시할 수 있는 권리를 보유합니다. 이를 통해 더 빠른 릴리스 주기를 유지할 수 있습니다.
:::