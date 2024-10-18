---
id: introduction
---

# 개요

## NextAuth.js에 대해

NextAuth.js는 [Next.js](http://nextjs.org/) 애플리케이션을 위한 완전한 오픈 소스 인증 솔루션입니다.

처음부터 Next.js와 서버리스 환경을 지원하도록 설계되었습니다.

[예시 코드를 확인하세요](https://nextauth-ko.wsbox.pw/docs/getting-started/example) NextAuth.js를 사용해 인증을 얼마나 쉽게 구현할 수 있는지 볼 수 있습니다.

### 유연하고 사용하기 쉬움

-   [OAuth 서비스와 연동 가능](https://nextauth-ko.wsbox.pw/docs/providers)하며 OAuth 1.0, 1.0A, 2.0 및 OpenID Connect를 지원합니다.
-   [다양한 인기 로그인 서비스](https://nextauth-ko.wsbox.pw/docs/configuration/providers/oauth)를 기본으로 지원합니다.
-   [이메일/비밀번호 없이 인증](https://nextauth-ko.wsbox.pw/docs/providers/email)을 지원합니다.
-   [어느 백엔드](https://authjs.dev/getting-started/database)가 되었든 Stateless 인증을 지원합니다. (예: Active Directory, LDAP 등)
-   JSON Web Tokens(JWT)와 데이터베이스 세션을 모두 지원합니다.
-   서버리스 환경을 위해 설계되었지만 AWS Lambda, Docker, Heroku 등 어디서든 실행됩니다.

### 데이터를 소유하세요

NextAuth.js는 데이터베이스와 함께 또는 데이터베이스 없이 사용할 수 있습니다.

-   데이터를 제어할 수 있는 오픈 소스 솔루션입니다.
-   사용자가 원하는 데이터베이스를 사용할 수 있는 BYOD(Bring Your Own Database)를 지원합니다.
-   [MySQL, MariaDB, Postgres, SQL Server, MongoDB, SQLite](https://nextauth-ko.wsbox.pw/docs/configuration/databases)를 기본 지원합니다.
-   인기 있는 호스팅 제공업체의 데이터베이스와도 잘 작동합니다.
-   _데이터베이스 없이도_ 사용할 수 있습니다 (예: OAuth + JWT).

_참고: 이메일 로그인은 일회용 인증 토큰을 저장하기 위해 데이터베이스 설정이 필요합니다._

### 기본적으로 보안 유지

-   비밀번호 없는 로그인 방식을 권장합니다.
-   기본적으로 보안에 중점을 두어 사용자 데이터를 보호하기 위한 모범 사례를 따르도록 설계되었습니다.
-   POST 경로(로그인, 로그아웃)에서 CSRF(교차 사이트 요청 위조) 토큰을 사용합니다.
-   기본 쿠키 정책은 각 쿠키에 대해 가장 제한적인 정책을 목표로 합니다.
-   JSON Web Tokens가 활성화된 경우, 기본적으로 A256GCM으로 암호화(JWE)됩니다.
-   개발자의 편의를 위해 대칭 서명 및 암호화 키를 자동으로 생성합니다.
-   짧은 세션을 지원하기 위해 탭/창 동기화 및 연결 유지 메시지를 제공합니다.
-   [Open Web Application Security Project](https://owasp.org/)에서 발행한 최신 가이드를 구현하려고 노력합니다.

고급 옵션을 사용하면 로그인 허용 계정 제어, JSON Web Tokens 인코딩/디코딩, 사용자 지정 쿠키 보안 정책 및 세션 속성 설정을 처리하는 자체 루틴을 정의하여 로그인할 수 있는 사용자 및 세션 재확인 주기를 제어할 수 있습니다.

## 공로

NextAuth.js는 [기여자들](https://nextauth-ko.wsbox.pw/docs/contributors) 덕분에 가능한 오픈 소스 프로젝트입니다.

NextAuth.js 개발을 금전적으로 지원하고 싶다면 [OpenCollective](https://opencollective.com/nextauth) 페이지에서 더 많은 정보를 찾을 수 있습니다.

## 시작하기

[예시 코드를 확인하세요](/getting-started/example) NextAuth.js를 사용해 인증을 얼마나 쉽게 구현할 수 있는지 볼 수 있습니다.