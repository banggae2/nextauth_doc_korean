---
id: naver
---

# Naver

## 문서

https://developers.naver.com/docs/login/overview/overview.md


## 구성

https://developers.naver.com/docs/login/api/api.md

## 옵션

**Naver 제공자**는 기본 옵션 세트를 제공합니다:

- [Naver Provider 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/naver.ts)

이 옵션은 사용자의 요구에 맞게 재정의할 수 있습니다.

## 예제

```javascript
import NaverProvider from "next-auth/providers/naver";

providers: [
  NaverProvider({
    clientId: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
  })
]
```