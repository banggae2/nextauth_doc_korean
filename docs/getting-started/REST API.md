---
id: rest-api
---

# REST API
NextAuth.js는 NextAuth.js 클라이언트에서 사용하는 REST API를 제공합니다.

#### `GET` /api/auth/signin[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#get-apiauthsignin "직접 링크")

기본 제공/비브랜드 로그인 페이지를 표시합니다.

#### `POST` /api/auth/signin/:provider[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#post-apiauthsigninprovider "직접 링크")

공급자별 로그인 흐름을 시작합니다.

POST 제출은 `/api/auth/csrf`에서 CSRF 토큰을 필요로 합니다.

OAuth 공급자인 경우, 이 엔드포인트를 호출하면 Identity Provider에 대한 권한 부여 요청이 시작됩니다. [OAuth 사양](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1)을 참조하세요.

이메일 공급자를 사용하는 경우, 이 엔드포인트를 호출하면 사용자의 이메일 주소로 로그인 URL이 전송됩니다.

이 엔드포인트는 내부적으로 [`signIn`](https://nextauth-ko.wsbox.pw/docs/getting-started/client#signin) 메소드에서도 사용됩니다.

#### `GET`/`POST` /api/auth/callback/:provider[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#getpost-apiauthcallbackprovider "직접 링크")

로그인 중 OAuth 서비스로부터의 반환 요청을 처리합니다.

`checks: ["state"]` 옵션을 지원하는 OAuth 2.0 공급자의 경우, 상태 매개변수가 로그인 흐름이 시작될 때 생성된 것과 일치하는지 확인됩니다. 이는 CSRF 토큰의 해시를 사용하며, 로그인 중 `POST` 및 `GET` 호출 모두에서 일치해야 합니다.

[OAuth 사양](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2)을 참조하세요.

#### `GET` /api/auth/signout[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#get-apiauthsignout "직접 링크")

내장된/브랜드가 없는 로그아웃 페이지를 표시합니다.

#### `POST` /api/auth/signout[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#post-apiauthsignout "직접 링크")

사용자를 로그아웃 처리합니다 - 이는 악의적인 링크가 사용자의 동의 없이 로그아웃을 트리거하는 것을 방지하기 위한 `POST` 제출입니다. 사용자의 세션은 [세션 저장](https://nextauth-ko.wsbox.pw/docs/configuration/options#session) 흐름에 따라 쿠키/데이터베이스에서 무효화되거나 제거됩니다.

POST 제출은 `/api/auth/csrf`에서 CSRF 토큰을 필요로 합니다.

이 엔드포인트는 내부적으로 [`signOut`](https://nextauth-ko.wsbox.pw/docs/getting-started/client#signout) 메소드에서도 사용됩니다.

#### `GET` /api/auth/session[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#get-apiauthsession "직접 링크")

클라이언트 안전한 세션 객체를 반환합니다 - 세션이 없으면 빈 객체를 반환합니다.

반환되는 세션 객체의 내용은 [`session` 콜백](https://nextauth-ko.wsbox.pw/docs/configuration/callbacks#session-callback)으로 구성할 수 있습니다.

#### `GET` /api/auth/csrf[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#get-apiauthcsrf "직접 링크")

CSRF 토큰을 포함하는 객체를 반환합니다. NextAuth.js에서는 모든 인증 경로에 CSRF 보호가 적용됩니다. "더블 서밋 쿠키 방법"을 사용하며, 이는 서명된 HttpOnly, 호스트 전용 쿠키를 사용합니다.

이 엔드포인트에서 반환되는 CSRF 토큰은 모든 API 엔드포인트에 대한 모든 `POST` 제출에서 `csrfToken`이라는 이름의 폼 변수로 전달되어야 합니다.

#### `GET` /api/auth/providers[](https://nextauth-ko.wsbox.pw/docs/getting-started/rest-api#get-apiauthproviders "직접 링크")

구성된 OAuth 서비스 목록과 각 서비스에 대한 세부 정보(예: 로그인 및 콜백 URL)를 반환합니다.

동적으로 맞춤형 회원 가입 페이지를 생성하고, 구성된 각 OAuth 공급자에 대해 설정된 콜백 URL을 확인하는 데 유용합니다.

___

:::note[참고]
기본 기본 경로는 `/api/auth`이지만, `NEXTAUTH_URL`에 커스텀 경로를 지정하여 구성할 수 있습니다.

예시:

`NEXTAUTH_URL=https://example.com/myapp/api/authentication`

`/api/auth/signin` -> `/myapp/api/authentication/signin`
:::