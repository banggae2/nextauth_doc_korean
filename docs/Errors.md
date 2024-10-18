---
id: errors
---

# 오류

NextAuth.js에서 발생하는 오류 목록입니다.

모든 오류는 예기치 않은 문제를 나타내며, 오류 메시지가 표시되는 경우 뭔가 잘못된 것입니다.

---

## 클라이언트 오류

이 오류는 클라이언트에서 반환됩니다. 클라이언트는 [유니버설 자바스크립트(또는 "아이소모픽 자바스크립트")](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)로 실행되므로 서버와 클라이언트 모두에서 발생할 수 있으며, 이 오류는 터미널과 브라우저 콘솔 모두에 나타날 수 있습니다.

### CLIENT_SESSION_ERROR

이 오류는 `SessionProvider` 컨텍스트가 세션 데이터를 가져오는 데 문제가 있을 때 발생합니다.

### CLIENT_FETCH_ERROR

여러 가지 이유로 발생할 수 있습니다. [NextAuth.js를 올바르게 구성했는지](https://next-auth.js.org/configuration/initialization) 확인하고, [`NEXTAUTH_URL`](https://next-auth.js.org/configuration/options#nextauth_url)을 사용한 경우 올바르게 설정되었는지 확인하십시오.

---

## 서버 오류

이 오류는 터미널에 표시됩니다.

### OAuth 관련 오류

#### OAUTH_GET_ACCESS_TOKEN_ERROR

이 오류는 OAuth 공급자에 POST 요청에서 액세스 토큰을 검색할 수 없을 때 발생합니다. 공급자 설정을 다시 확인하십시오.

#### OAUTH_V1_GET_ACCESS_TOKEN_ERROR

이 오류는 구식 OAuth v1.x 공급자와 관련이 있습니다. 이러한 공급자를 사용하는 경우 모든 설정을 다시 확인하십시오.

#### OAUTH_GET_PROFILE_ERROR

N/A

#### OAUTH_PARSE_PROFILE_ERROR

이 오류는 공급자 응답에 문제가 있거나 사용자가 공급자에서 작업을 취소했을 때 발생합니다. 불행히도, 우리는 이 정보로 어떤 문제인지 구별할 수 없습니다. 이 오류는 예외와 사용 가능한 `profileData`를 추가로 기록하여 디버깅에 도움이 됩니다.

#### OAUTH_CALLBACK_HANDLER_ERROR

이 오류는 JSON 요청 본문을 구문 분석하는 중 문제가 발생했을 때 발생합니다. 오류가 발생했을 때는 추가 세부정보가 기록되어 있어야 하며, 예외가 발생한 위치와 요청 본체 자체가 디버깅에 도움이 됩니다.

---

### 로그인 / 콜백 오류

#### SIGNIN_OAUTH_ERROR

이 오류는 OAuth 공급자의 승인 URL로 리디렉션하는 동안 발생합니다. 가능한 원인은 다음과 같습니다:

1. 쿠키 처리: PKCE 코드 검증기 또는 내부 상태의 CSRF 토큰 해시 생성을 실패했습니다. 설정되어 있다면 [`cookies` 구성](https://next-auth.js.org/configuration/options#cookies)을 확인하고, 브라우저가 쿠키를 차단하거나 제한하고 있지 않은지 확인하십시오.
  
2. OAuth 잘못 구성: OAuth 공급자를 확인하고 URL 및 기타 옵션이 올바르게 설정되었는지 확인하십시오. OAuth v1 공급자를 사용하는 경우 OAuth 토큰 및 OAuth 토큰 비밀을 확인하십시오.

3. `openid-client` 버전 불일치: `expected 200 OK with body but no body was returned`라는 오류가 발생한다면, 이는 `openid-client`(우리가 의존하는 라이브러리)의 노드 버전 불일치 때문일 수 있습니다. 예를 들어, `openid-client`는 `>=14.2.0`을 요구하며, 호환 가능한 노드 버전의 전체 목록은 [package.json](https://github.com/panva/node-openid-client/blob/2a84e46992e1ebeaf685c3f87b65663d126e81aa/package.json#L78)에서 확인할 수 있습니다.

#### OAUTH_CALLBACK_ERROR

이 오류는 콜백 처리 중에 `code_verifier` 쿠키를 찾을 수 없거나 OAuth 공급자에서 잘못된 상태가 반환된 경우 발생할 수 있습니다.

#### SIGNIN_EMAIL_ERROR

이 오류는 사용자가 이메일 링크를 통해 로그인하려고 할 때 발생할 수 있습니다. 예를 들어 이메일 토큰을 생성할 수 없거나 확인 요청이 실패하는 경우입니다. 이메일 설정을 다시 확인하십시오.

#### CALLBACK_EMAIL_ERROR

이 오류는 이메일 콜백 프로세스 중에 발생할 수 있습니다. 특히, 이메일을 통해 사용자를 로그인시키거나 JWT를 인코딩하는 중 오류가 발생한 경우입니다. 이메일 설정을 다시 확인하십시오.

#### EMAIL_REQUIRES_ADAPTER_ERROR

이메일 인증 공급자는 데이터베이스가 구성된 경우에만 사용할 수 있습니다. 이는 검증 토큰을 저장하는 데 필요합니다. 이메일 공급자에 대한 더 자세한 정보는 [여기](https://next-auth.js.org/providers/email#configuration)에서 확인하십시오.

#### CALLBACK_CREDENTIALS_JWT_ERROR

자격 증명 공급자는 세션에 JSON 웹 토큰이 사용될 때만 사용할 수 있습니다. JSON 웹 토큰은 데이터베이스를 지정하지 않은 경우 기본적으로 세션에 사용됩니다. 그러나 데이터베이스를 사용하는 경우 데이터베이스 세션이 기본적으로 활성화되므로 자격 증명 공급자를 사용하려면 [명시적으로 JWT 세션을 활성화해야](https://next-auth.js.org/configuration/options#session) 합니다.

자격 증명 공급자를 사용하는 경우 NextAuth.js는 데이터베이스에 사용자 또는 세션을 지속하지 않습니다. 자격 증명 공급자와 함께 사용되는 사용자 계정은 NextAuth.js 외부에서 생성 및 관리해야 합니다.

대부분의 경우, NextAuth.js 옵션에 데이터베이스를 지정하고 자격 증명 공급자를 지원하는 것은 의미가 없습니다.

#### CALLBACK_CREDENTIALS_HANDLER_ERROR

이 오류는 자격 증명 인증 공급자에서 `authorize()` 핸들러가 정의되지 않았을 때 발생합니다.

#### PKCE_ERROR

사용하려고 시도한 공급자가 [PKCE 또는 코드 교환을 위한 증명 키](https://tools.ietf.org/html/rfc7636#section-4)를 설정하는 데 실패했습니다. `code_verifier`는 기본적으로 `__Secure-next-auth.pkce.code_verifier`라는 쿠키에 저장되며, 15분 후에 만료됩니다. `cookies.pkceCodeVerifier`가 올바르게 구성되었는지 확인하십시오.

기본 `code_challenge_method`는 `"S256"`입니다. 현재 `"plain"`으로 구성할 수 없으며, 이는 RFC7636에 따라 다음과 같이 규정되어 있습니다:

> 클라이언트가 "S256"을 사용할 수 있는 경우, "S256"을 사용해야 합니다. 이는 서버에서 필수적으로 구현해야 하는 사항입니다.

#### INVALID_CALLBACK_URL_ERROR

제공된 `callbackUrl`이 유효하지 않거나 정의되지 않았습니다. `callbackUrl`을 지정하는 방법에 대한 자세한 내용은 [여기](https://next-auth.js.org/getting-started/client#specifying-a-callbackurl)에서 확인하십시오.

---

### 세션 처리 오류

#### JWT_SESSION_ERROR

JWEDecryptionFailed: NextAuth.js는 JWT를 암호화하고 이메일 검증 토큰을 해시하는 데 `NEXTAUTH_SECRET` 환경 변수가 필요합니다. 이는 `NEXTAUTH_SECRET`을 변경했지만 여전히 이전 비밀로 활성 세션을 가지고 있을 때 발생할 수 있습니다. 다시 로그인하면 문제가 해결됩니다.

JWTKeySupport: 키가 HS512 검증 알고리즘을 지원하지 않습니다.

사용 중인 키의 알고리즘이 지원되지 않는 목록에 없습니다. HS512 키를 생성하려면 다음 명령을 사용하십시오.

```
  jose newkey -s 512 -t oct -a HS512
```

#### SESSION_ERROR

---

### 로그아웃 오류

#### SIGNOUT_ERROR

이 오류는 데이터베이스에서 세션을 삭제하는 데 문제가 발생할 때 발생합니다.

---

### 구성 오류

#### MISSING_NEXTAUTH_API_ROUTE_ERROR

이 오류는 `[...nextauth].js` 파일이 `pages/api/auth` 폴더에 없을 때 발생합니다. 해당 파일이 존재하고 파일 이름이 올바르게 작성되었는지 확인하십시오.

#### NO_SECRET

프로덕션에서는 구성에서 `secret` 속성을 정의할 것으로 예상합니다. 개발 환경에서는 편의를 위해 경고로 표시됩니다. [자세히 보기](https://next-auth.js.org/configuration/options#secret)

#### AUTH_ON_ERROR_PAGE_ERROR

사용자가 정의한 사용자 오류 페이지가 오류로 인해 렌더링되었지만 해당 페이지가 인증을 요구했습니다. 무한 리디렉션 루프를 피하기 위해 NextAuth.js는 기본 오류 페이지를 대신 렌더링했습니다. 미들웨어를 사용하는 경우, `middleware.ts`와 `[...nextauth].ts` 파일에서 동일한 `pages` 구성을 포함했는지 확인하십시오. 또는 `matcher` 옵션을 사용하여 특정 사이트에 대해서만 인증을 요구하고 사용자 정의 오류 페이지는 제외하십시오.

미들웨어를 사용하지 않는 경우, 사용자 정의 오류 페이지에 접근할 때 사용자를 로그인 페이지로 리디렉션하지 않도록 하십시오.

유용한 링크:

- [https://next-auth.js.org/configuration/nextjs#pages](https://next-auth.js.org/configuration/nextjs#pages)
- [https://next-auth.js.org/configuration/pages](https://next-auth.js.org/configuration/pages)
- [https://nextjs.org/docs/advanced-features/middleware#matcher](https://nextjs.org/docs/advanced-features/middleware#matcher)