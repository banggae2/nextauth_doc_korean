---
id: oauth
---
# OAuth


**NextAuth.js**의 인증 제공자는 사용자가 선호하는 기존 로그인으로 로그인할 수 있도록 하는 OAuth 정의입니다. 여러 사전 정의된 제공자를 사용하거나 자신만의 사용자 정의 OAuth 구성을 작성할 수 있습니다.

- [내장 OAuth 제공자 사용하기](https://next-auth.js.org/configuration/providers/oauth#built-in-providers) (예: Github, Twitter, Google 등)
- [사용자 정의 OAuth 제공자 사용하기](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider)

:::note[참고]
NextAuth.js는 모든 OAuth 서비스와 함께 작동하도록 설계되었으며, **OAuth 1.0**, **1.0A**, **2.0** 및 **OpenID Connect**를 지원하며, 대부분의 인기 로그인 서비스에 대한 기본 지원을 제공합니다.
:::

## OAuth 흐름 개요

OAuth 흐름은 일반적으로 6단계로 구성됩니다:

1. 애플리케이션이 사용자에게 서비스 리소스에 대한 액세스를 요청합니다.
2. 사용자가 요청을 승인하면 애플리케이션은 승인 부여를 받습니다.
3. 애플리케이션은 자신의 신원을 인증하고 승인 부여를 제시하여 인증 서버(API)에서 액세스 토큰을 요청합니다.
4. 애플리케이션의 신원이 인증되고 승인 부여가 유효하면 인증 서버(API)는 애플리케이션에 액세스 토큰을 발급합니다. 이제 인증이 완료되었습니다.
5. 애플리케이션은 리소스 서버(API)에서 리소스를 요청하고 액세스 토큰을 인증으로 제시합니다.
6. 액세스 토큰이 유효하면 리소스 서버(API)가 애플리케이션에 리소스를 제공합니다.
---
##### 추가예정
---
자세한 내용은 Aaron Parecki의 블로그 게시물 [OAuth2 Simplified](https://aaronparecki.com/oauth-2-simplified/) 또는 Postman의 블로그 게시물 [OAuth 2.0: Implicit Flow is Dead, Try PKCE Instead](https://blog.postman.com/pkce-oauth-how-to/)를 확인하세요.

## 설정 방법

1. 제공자의 개발자 포털에서 애플리케이션을 등록합니다. 각 지원 제공자에 대한 세부정보는 위에서 언급한 문서 페이지에 링크가 포함되어 있습니다.
   
2. 리디렉션 URI(콜백 URL)는 다음 형식을 따라야 합니다:
   ```
   [origin]/api/auth/callback/[provider]
   ```
   여기서 `[provider]`는 제공자의 `id`를 나타냅니다. 예를 들어, `로컬호스트`에서 Twitter의 경우 다음과 같습니다:
   ```
   http://localhost:3000/api/auth/callback/twitter
   ```
   Google을 사용하는 경우 예제 애플리케이션은 다음과 같습니다:
   ```
   https://next-auth-example.vercel.app/api/auth/callback/google
   ```

3. 프로젝트의 루트에 `.env` 파일을 생성하고 클라이언트 ID와 클라이언트 비밀을 추가합니다. Twitter의 경우:
   ```
   TWITTER_ID=YOUR_TWITTER_CLIENT_ID
   TWITTER_SECRET=YOUR_TWITTER_CLIENT_SECRET
   ```

6. 이제 제공자 설정을 NextAuth.js 옵션 객체에 추가할 수 있습니다. 여러 OAuth 제공자를 추가할 수 있으며, `providers`는 배열입니다.

   ```javascript title="pages/api/auth/[...nextauth].js"
   import TwitterProvider from "next-auth/providers/twitter";
   ...
   providers: [
     TwitterProvider({
       clientId: process.env.TWITTER_ID,
       clientSecret: process.env.TWITTER_SECRET
     })
   ],
   ...
   ```

7. 제공자가 설정되면 다음 URL에서 로그인할 수 있습니다: `[origin]/api/auth/signin`. 이는 구성된 모든 제공자가 포함된 브랜드가 없는 자동 생성 페이지입니다.

   ![Signin Screenshot](https://next-auth.js.org/img/signin.png)

## 옵션

사용자 정의 또는 내장 OAuth 제공자를 구성할 때 사용할 수 있는 옵션은 다음과 같습니다:

```javascript
interface OAuthConfig {
  /**
   * OIDC(OpenID Connect) 호환 공급자는 다음을 구성할 수 있습니다.
   * 인증`/`토큰`/`사용자정보` 옵션 대신 이 옵션을 사용할 수 있습니다.
   * 대부분의 경우 추가 구성이 필요하지 않습니다.
   * 고급 제어를 위해 `authorize`/`token`/`userinfo`
   * 옵션을 사용할 수 있습니다.
   *
   * [인증 서버 메타데이터](https://datatracker.ietf.org/doc/html/rfc8414#section-3)
   */
  wellKnown?: string;
  /**
   * 사용자를 이 URL로 전송하면 로그인 프로세스가 시작됩니다.
   *
   * [인증 엔드포인트](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)
   */
  authorization: EndpointHandler<AuthorizationParameters>;
  /**
   * OAuth 2/OIDC 토큰과 토큰에 대한 정보를 반환하는 엔드포인트.
   * 여기에는 `access_token`, `id_token`, `refresh_token` 등이 포함됩니다.
   *
   * [토큰 엔드포인트](https://datatracker.ietf.org/doc/html/rfc6749#section-3.2)
   */
  token: EndpointHandler<
    UrlParams,
    {
      /**
       * 요청에서 `/api/auth/callback/:providerId` 엔드포인트로 추출한 매개변수입니다.
       * 상태`와 같은 파라미터를 포함합니다.
       */
      params: CallbackParamsType;
      /**
       * 이 사용자 지정 플로우를 사용할 때는 필요한 모든 보안 검사를 수행해야 합니다.
       * 이 객체에는 요청이 유효한지 확인하기 위해 요청과 일치시켜야 하는 매개변수가 포함되어 있습니다.
       */
      checks: OAuthChecks;
    },
    { tokens: TokenSet }
  >;
  /**
   * OAuth 2 공급자를 사용하는 경우, 사용자 정보를 요청해야 합니다.
   * userinfo 엔드포인트의 추가 요청을 통해 요청해야 합니다.
   *
   * [사용자정보 엔드포인트](https://www.oauth.com/oauth2-servers/signing-in-with-google/verifying-the-user-info)
   */
  userinfo?: EndpointHandler<UrlParams, { tokens: TokenSet }, Profile>;
  type: "oauth";
  /**
   * 특정 공급자를 참조하기 위해 URL에 사용됩니다.
   * @예시 /api/auth/callback/twitter // 여기서 `id`는 “twitter”입니다.
   */
  id: string;
  version: string;
  profile(profile: P, tokens: TokenSet): Awaitable<User>;
  checks?: ChecksType | ChecksType[];
  clientId: string;
  clientSecret: string;
  /**
   * 'true'로 설정하면 사용자 정보를 추출합니다.
   * 'id_token' 클레임에서 사용자 정보를 추출합니다.
   * userinfo` 엔드포인트에 요청하지 않습니다.
   *
   * 일반적으로 `id_token`은 OpenID Connect(OIDC) 호환 공급자에 존재합니다.
   *
   * [`id_token` 설명](https://www.oauth.com/oauth2-servers/openid-connect/id-tokens)
   */
  idToken?: boolean;
  region?: string;
  issuer?: string;
  client?: Partial<ClientMetadata>;
  allowDangerousEmailAccountLinking?: boolean;
  /** 
   * 공급자 로그인 버튼의 스타일링 설정이 포함된 객체
   */
  style: ProviderStyleType;
}
```

### `authorization` 옵션

이 옵션은 [_Authorization endpoint_](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1) 요청 구성을 설정합니다.

이 옵션을 사용하는 방법은 두 가지가 있습니다.

1. `authorization`을 `"https://example.com/oauth/authorization?scope=email"`처럼 전체 URL로 설정할 수 있습니다.
2. `url` 및 `params`를 포함하는 객체를 사용할 수 있습니다.
```js
authorization: {
  url: "https://example.com/oauth/authorization",
  params: { scope: "email" }
}
```

:::tip[팁]
제공업체가 OIDC(OpenID Connect)를 준수하는 경우, 대신 `잘 알려진` 옵션을 사용하는 것이 좋습니다.
:::
### `token` 옵션

이 옵션은 [_Token endpoint_](https://datatracker.ietf.org/doc/html/rfc6749#section-3.2) 요청 구성을 설정합니다.

1. `token`을 `"https://example.com/oauth/token?some=param"`처럼 전체 URL로 설정할 수 있습니다.
2. `url` 및 `params`를 포함하는 객체를 사용할 수 있습니다.
   ```js
    token: {
    url: "https://example.com/oauth/token",
    params: { some: "param" }
    }
   ```
  
3. 요청을 완전히 제어하는 방법을 사용할 수 있습니다.
   ```js
    token: {
    url: "https://example.com/oauth/token",
    async request(context) {
      // 컨텍스트에는 요청에 도움이 되는 유용한 속성이 포함되어 있습니다.
      const tokens = await makeTokenRequest(context)
      return { tokens }
    }
   }
   ```

:::danger[경고]
옵션 3.은 대부분의 경우 필요하지 않지만 제공업체가 사양을 따르지 않거나 매우 독특한 제약 조건이 있는 경우 유용할 수 있습니다. 가능하면 피하는 것이 좋습니다.
:::
:::tip[팁]
제공업체가 OIDC(OpenID Connect)를 준수하는 경우, 대신 `잘 알려진` 옵션을 사용하는 것이 좋습니다.
:::
### `userinfo` 옵션

`userinfo` 엔드포인트는 로그인한 사용자에 대한 정보를 반환합니다. OAuth 사양의 일부는 아니지만, 대부분의 제공자에서 사용할 수 있습니다.

1. `userinfo`를 전체 URL로 설정할 수 있습니다.
2. `url` 및 `params`를 포함하는 객체를 사용할 수 있습니다.
    ```js
    token: {
    url: "https://example.com/oauth/userinfo",
    params: { some: "param" }
    }
   ```
3. 요청을 완전히 제어하는 방법을 사용할 수 있습니다.
    ```js
    token: {
    url: "https://example.com/oauth/userinfo",
    // 이 메서드의 결과는 `profile` 콜백에 입력됩니다.
    async request(context) {
      // 컨텍스트에는 요청에 도움이 되는 유용한 속성이 포함되어 있습니다.
      const tokens = await makeUserinfoRequest(context)
      return { tokens }
    }
   }
   ```
:::danger[경고]
옵션 3.은 대부분의 경우 필요하지 않지만 제공업체가 사양을 따르지 않거나 매우 독특한 제약 조건이 있는 경우 유용할 수 있습니다. 가능하면 피하는 것이 좋습니다.
:::
:::tip[팁]
드물지만 이 엔드포인트가 무엇을 반환하는지 신경 쓰지 않거나 제공업체에 엔드포인트가 없는 경우 noop 함수를 만들 수 있습니다:
```js
userinfo: {
  request: () => {}
}
```
:::
:::tip[팁]
공급업체가 OIDC(OpenID Connect)를 준수하는 경우 대신 `잘 알려진` 옵션을 사용하는 것이 좋습니다. OIDC는 일반적으로 `token` 엔드포인트에서 `id_token`을 반환합니다. `next-auth`는 `userinfo` 엔드포인트에 추가 요청을 하는 대신 `id_token`을 디코딩하여 사용자 정보를 가져올 수 있습니다. 공급자 구성의 최상위 수준에서 `idToken: true`를 설정하기만 하면 됩니다. 설정하지 않으면 `next-auth`는 여전히 이 엔드포인트에 연결을 시도합니다.
:::
### `client` 옵션

고급 옵션으로, 대부분의 경우 필요하지 않을 것입니다. `next-auth`는 내부적으로 `openid-client`를 사용하며, 이 옵션에 대한 문서는 [여기](https://github.com/panva/openid-client/blob/main/docs/README.md#new-clientmetadata-jwks-options)에서 확인하세요.

### `allowDangerousEmailAccountLinking` 옵션

일반적으로 OAuth 공급업체를 통해 로그인할 때 동일한 이메일 주소를 가진 다른 계정이 이미 존재하는 경우 계정이 자동으로 연결되지 않습니다. 로그인 시 자동 계정 연결은 임의의 공급업체 간에는 안전하지 않으며 기본적으로 비활성화되어 있습니다([보안 FAQ](https://next-auth.js.org/faq#security) 참조). 그러나 관련 제공업체가 계정과 연결된 이메일 주소를 안전하게 확인했다고 신뢰하는 경우 자동 계정 연결을 허용하는 것이 바람직할 수 있습니다. 자동 계정 연결을 사용하려면 공급자 구성에서 `allowDangerousEmailAccountLinking: true`를 설정하면 됩니다.

사용자가 이미 어떤 제공업체에 로그인한 경우 다른 제공업체를 통해 다시 `signIn`을 사용할 때 새 제공업체 계정은 인증된 동일한 사용자에게 자동으로 연결됩니다. 이는 각 제공업체 계정의 기본 이메일에 관계없이 발생합니다. 이 흐름은 `allowDangerousEmailAccountLinking`의 영향을 받지 않습니다.

## 사용자 정의 제공자 사용하기

내장되지 않은 OAuth 제공자를 사용하려면 사용자 정의 객체를 사용할 수 있습니다. 예를 들어 Google 제공자의 반환된 제공자 객체는 다음과 같습니다:

```javascript
{
  id: "google",
  name: "Google",
  type: "oauth",
  wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
  authorization: { params: { scope: "openid email profile" } },
  idToken: true,
  checks: ["pkce", "state"],
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    }
  },
}
```

보시다시피 공급업체가 OpenID Connect를 지원하고 `/.well-known/openid-configuration` 엔드포인트에 `grant_type`: `authorization_code`를 지원하는 경우 해당 구성 파일에 URL을 전달하고 `name` 및 `type`과 같은 몇 가지 기본 필드만 정의하기만 하면 됩니다.

그렇지 않으면, 각 OAuth2.0 플로우 단계에 대해 보다 완전한 URL 집합을 전달할 수 있습니다. 예를 들어 :
```js
{
  id: "kakao",
  name: "Kakao",
  type: "oauth",
  authorization: "https://kauth.kakao.com/oauth/authorize",
  token: "https://kauth.kakao.com/oauth/token",
  userinfo: "https://kapi.kakao.com/v2/user/me",
  profile(profile) {
    return {
      id: profile.id,
      name: profile.kakao_account?.profile.nickname,
      email: profile.kakao_account?.email,
      image: profile.kakao_account?.profile.profile_image_url,
    }
  },
}
```

이 JSON 객체의 모든 옵션을 사용자 정의 제공업체의 옵션으로 바꾸고, 고유 ID를 부여하고 필요한 URL을 지정한 다음 라이브러리를 초기화할 때 마지막으로 제공업체 배열에 추가하세요:

```js title="pages/api/auth/[...nextauth].js"
import TwitterProvider from "next-auth/providers/twitter"
...
providers: [
  TwitterProvider({
    clientId: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
  }),
  {
    id: 'customProvider',
    name: 'CustomProvider',
    type: 'oauth',
    scope: ''  // 사용자 이메일 주소를 요청해야 합니다.
    ...
  }
]
...
```

## 내장된 제공자

NextAuth.js는 내장된 제공자 세트를 제공합니다. 내장된 제공자에 대한 문서 페이지를 [여기서 확인](https://github.com/nextauthjs/next-auth/tree/v4/packages/next-auth/src/providers)하세요. 각 
내장된 제공자에는 자체 문서 페이지가 있습니다 : 

(링크 추가예정)

42 School,
Amazon Cognito,
Apple,
Atlassian,
Auth0,
Authentik,
Azure Active Directory,
Azure Active Directory B2C,
Battle.net,
Box,
BoxyHQ SAML,
Bungie,
Coinbase,
Discord,
Dropbox,
DuendeIdentityServer6,
EVE Online,
Facebook,
FACEIT,
Foursquare,
Freshbooks,
FusionAuth,
GitHub,
GitLab,
Google,
HubSpot,
IdentityServer4,
Instagram,
Kakao,
Keycloak,
LINE,
LinkedIn,
Mail.ru,
Mailchimp,
Medium,
Naver,
Netlify,
Okta,
OneLogin,
Osso,
osu!,
Patreon,
Pinterest,
Pipedrive,
Reddit,
Salesforce,
Slack,
Spotify,
Strava,
Todoist,
Trakt,
Twitch,
Twitter,
United Effects,
VK,
Wikimedia,
WordPress.com,
WorkOS,
Yandex,
Zitadel,
Zoho,
Zoom,


## 기본 옵션 재정의

내장된 제공자를 사용하는 경우, 대개 `clientId`와 `clientSecret`만 지정하면 됩니다. 기본값을 재정의해야 할 경우, [옵션](https://next-auth.js.org/configuration/providers/oauth#options)을 추가하세요.

내장된 공급자를 사용하는 경우에도 이러한 옵션을 재정의하여 기본 구성을 조정할 수 있습니다.

:::note[참고]
사용자 제공 옵션은 기본 옵션과 깊숙이 통합되어 있습니다. 즉, 달라져야 하는 옵션의 일부만 재정의하면 됩니다. 예를 들어 다른 범위를 원하는 경우 `authorization` 옵션 대신 `authorization.params.scope`를 재정의하는 것으로 충분합니다.
:::

```js title="/api/auth/[...nextauth].js"
import Auth0Provider from "next-auth/providers/auth0"

Auth0Provider({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuer: process.env.ISSUER,
  authorization: { params: { scope: "openid your_custom_scope" } },
})
```

또 다른 예로 `profile` 콜백은 기본적으로 `id`, `name`, `email`, `picture`을 반환하지만 공급업체로부터 더 많은 정보가 필요할 수 있습니다. 올바른 범위를 설정한 후에는 다음과 같은 작업을 수행할 수 있습니다:

```js title="/api/auth/[...nextauth].js"
import GoogleProvider from "next-auth/providers/google"

GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  profile(profile) {
    return {
      // 필요한 모든 프로필 정보를 반환합니다.
      // 정말 필요한 유일한 필드는 `ID`입니다.
      // 데이터베이스에 추가할 때 계정을 식별할 수 있어야 합니다.
    }
  },
})
```

자동 계정 연결을 사용 설정하는 방법의 예입니다:

```js title="/api/auth/[...nextauth].js"
import GoogleProvider from "next-auth/providers/google"

GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})
```