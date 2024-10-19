---
id: twitter
---

# 🌐 Twitter

Twitter는 현재 OAuth 1.0 사양을 사용하는 유일한 기본 제공자입니다. 이는 `access_token`이나 `refresh_token`을 받지 않고, 대신 각각 `oauth_token`과 `oauth_token_secret`을 받음을 의미합니다. [Adapter](https://authjs.dev/getting-started/database)를 사용하는 경우, 이 값을 데이터베이스 스키마에 추가하는 것을 잊지 마세요.

## 문서

https://developer.twitter.com

## 구성

https://developer.twitter.com/en/apps

## 옵션

**Twitter 제공자**에는 다음과 같은 기본 옵션 세트가 제공됩니다:

- [Twitter 제공자 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/twitter.ts)

사용 사례에 맞게 옵션을 재정의할 수 있습니다.


## 예시
```js
import TwitterProvider from "next-auth/providers/twitter";
...
providers: [
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET
  })
]
...
```

:::tip[팁]
사용자의 이메일 주소를 얻으려면 앱 권한에서 _"사용자에게 이메일 주소 요청"_ 옵션을 활성화해야 합니다.
:::

![](https://nextauth-ko.wsbox.pw/img/168702338-a95912a7-b689-4680-aa2c-6306fe3c2ec7.jpg)


## OAuth 2.0

Twitter는 현재 선택적 옵션으로 OAuth 2.0을 지원합니다. 이를 활성화하려면, Provider 구성에 `version: "2.0"`을 추가하면 됩니다:

```javascript
TwitterProvider({
  clientId: process.env.TWITTER_ID,
  clientSecret: process.env.TWITTER_SECRET,
  version: "2.0", // Twitter OAuth 2.0에 옵트인
})
```

이 변경은 간단하지만, 상호작용할 수 있는 [Twitter API](https://developer.twitter.com/en/docs/api-reference-index)에 따라 달라질 수 있습니다. 더 자세한 내용은 [Twitter OAuth 2 문서](https://developer.twitter.com/en/docs/authentication/oauth-2-0)를 참고하세요.

:::note[참고]
현재 Twitter OAuth 2.0에서는 이메일이 지원되지 않습니다.
:::