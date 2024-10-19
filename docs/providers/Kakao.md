---
id: kakao
---

# Kakao

## 문서
https://developers.kakao.com/product/kakaoLogin

## 구성
https://developers.kakao.com/docs/latest/en/kakaologin/common

## 옵션
Kakao 제공자는 기본 옵션 세트를 제공합니다:

- [Kakao Provider 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/kakao.ts)

이 옵션은 사용자의 요구에 맞게 재정의할 수 있습니다.

## 예제

```javascript
import KakaoProvider from "next-auth/providers/kakao";

providers: [
  KakaoProvider({
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
  })
]
```

## 지침

### 구성
`https://developers.kakao.com/console/app`에서 제공자와 Kakao 애플리케이션을 만듭니다. Kakao 로그인 아래의 앱 설정에서 웹 앱을 활성화하고 동의 항목을 변경하고 콜백 URL을 구성합니다.