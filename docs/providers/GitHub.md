---
id: github
---

# GitHub

## 문서
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps

## 구성
https://github.com/settings/apps

:::info[정보]
GitHub 앱을 생성할 때 "이메일 주소" 계정 권한을 읽기 전용으로 설정하여 GitHub의 비공개 이메일 주소에 접근할 수 있도록 해야 합니다.
:::

## 옵션
GitHub 제공자는 기본 옵션 세트를 제공합니다:

- [GitHub Provider 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/github.ts)

이 옵션은 사용자의 요구에 맞게 재정의할 수 있습니다.

## 예제

```javascript
import GitHubProvider from "next-auth/providers/github";

providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  })
]
```

:::danger[경고]
GitHub은 Client ID / Client Secret당 하나의 콜백 URL만 허용합니다.
:::

:::tip[팁]
사용자가 프로필에 공개 이메일 주소가 없는 경우에도 이메일 주소는 항상 반환됩니다.
:::