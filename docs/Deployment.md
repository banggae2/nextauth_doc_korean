---
id: deployment
---

# 배포

NextAuth.js를 배포하는 데는 몇 가지 단계만 필요합니다. Next.js 애플리케이션이 실행될 수 있는 곳이라면 어디에서나 실행할 수 있습니다. 따라서 데이터베이스 없이 JWT 세션 전략만 사용하는 기본 구성에서는 애플리케이션 외에 다음과 같은 몇 가지가 필요합니다:

1. **NextAuth.js 환경 변수**
    - `NEXTAUTH_SECRET`
    - `NEXTAUTH_URL`
  
2. **NextAuth.js API 라우트 및 해당 구성** (`/pages/api/auth/[...nextauth].js`)
    - OAuth 공급자의 `clientId` / `clientSecret`

NextAuth.js를 사용하는 현대적인 JavaScript 애플리케이션을 배포하는 것은 환경 변수가 올바르게 설정되어 있는지, NextAuth.js API 라우트의 구성이 제대로 되어 있는지, OAuth 공급자에서 콜백 URL 등의 설정이 올바르게 되어 있는지를 확인하는 것입니다.

자세한 공급자 설정은 아래를 참고하세요.

## Vercel

1. 프로젝트 설정에서 Vercel [시스템 환경 변수](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)를 노출하는지 확인합니다.
2. 모든 환경에 대해 `NEXTAUTH_SECRET` 환경 변수를 생성합니다.
    - `openssl rand -base64 32` 또는 [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)를 사용하여 랜덤 값을 생성할 수 있습니다.
    - Vercel에서는 `NEXTAUTH_URL` 환경 변수가 필요하지 않습니다.
3. 공급자의 클라이언트 ID와 클라이언트 시크릿을 환경 변수로 추가합니다. _(OAuth 공급자를 사용하지 않는 경우 이 단계를 건너뜁니다.)_
4. 배포합니다!

예시 저장소: [https://github.com/nextauthjs/next-auth-example](https://github.com/nextauthjs/next-auth-example)

Vercel에 배포할 때 몇 가지 유의사항이 있습니다. 환경 변수는 서버 측에서 읽히므로 `NEXT_PUBLIC_`로 접두사를 붙일 필요가 없습니다. 이곳에 배포할 때 `NEXTAUTH_URL` 환경 변수를 명시적으로 설정할 필요는 없습니다. 다른 공급자에서는 **이 환경 변수를 설정해야** 합니다.

### 미리보기 배포 보호

OAuth 공급자가 있는 미리보기 배포를 보호하는 데는 몇 가지 중요한 장애물이 있습니다. 대부분의 OAuth 공급자는 단일 리디렉션/콜백 URL만 허용하거나 최소한 전체 정적 URL 집합만 허용합니다. 즉, 사이트를 게시하기 전에 값을 설정할 수 없고 OAuth 공급자의 콜백 URL 설정에서 와일드카드 하위 도메인을 사용할 수 없습니다. 여기에 따라 NextAuth.js를 사용하여 미리보기 배포를 보호할 수 있는 몇 가지 방법이 있습니다.

#### 자격 증명 공급자 사용

현재 Vercel 미리보기 환경에 있는지 확인하기 위해 `/pages/api/auth/[...nextauth].js` API 라우트/구성 파일을 확인하고, 그렇다면 단순한 "자격 증명 공급자"를 활성화할 수 있습니다. 즉, 사용자 이름/비밀번호를 사용하는 것입니다. Vercel은 `VERCEL_ENV`와 같은 몇 가지 내장된 [시스템 환경 변수](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)를 제공하므로 이를 확인할 수 있습니다. 이렇게 하면 미리보기 배포에서 테스트 전용 인증 전략을 사용할 수 있습니다.

여기서 유의해야 할 사항은 다음과 같습니다:
- 이 잠재적 테스트 전용 사용자가 중요한 데이터에 접근하지 못하도록 합니다.
- 가능하다면 이 미리보기 배포가 프로덕션 데이터베이스에 연결되지 않도록 합니다.

##### 예시

`/pages/api/auth/[...nextauth].js`

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return {
              id: 1,
              name: "J Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            };
          },
        })
      : GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
  ],
});
```

#### 분기 기반 미리보기 URL 사용

Vercel의 미리보기 배포는 종종 여러 URL를 통해 사용할 수 있습니다. 예를 들어, `master` 또는 `main`에 병합된 PR은 커밋 및 PR 특정 미리보기 URL을 통해 사용할 수 있지만, 분기 특정 미리보기 URL도 사용할 수 있습니다. 이 분기 특정 URL은 같은 분기에서 작업하는 한 변하지 않습니다. 따라서 OAuth 공급자에 `{project}-git-main-{user}.vercel.app` 미리보기 URL을 추가할 수 있습니다. 이 URL은 해당 분기에 대해 상수로 유지되므로 인증 관련 배포를 테스트하는 데 사용할 수 있습니다.

## Netlify

Netlify는 Vercel과 매우 유사하여 거의 추가 작업 없이 Next.js 프로젝트를 배포할 수 있습니다.

여기서 NextAuth.js를 올바르게 설정하려면 프로젝트 설정에서 `NEXTAUTH_SECRET` 환경 변수를 추가해야 합니다. 프로젝트 내에서 [Essential Next.js Build Plugin](https://github.com/netlify/netlify-plugin-nextjs)을 사용하는 경우 빌드 프로세스의 일환으로 자동으로 설정되므로 `NEXTAUTH_URL` 환경 변수를 설정할 필요가 없습니다.

Netlify는 현재 있는 `NODE_ENV` 및 기타 정보를 확인할 수 있는 [시스템 환경 변수](https://docs.netlify.com/configure-builds/environment-variables/)를 노출합니다.

그 후, OAuth 공급자가 `clientId` / `clientSecret` 및 콜백 URL을 올바르게 설정했는지 확인하십시오.