---
id: discord
---

# Discord


## 문서

[Discord OAuth2 문서](https://discord.com/developers/docs/topics/oauth2)

## 구성

[Discord 개발자 애플리케이션](https://discord.com/developers/applications)

## 옵션

**Discord 제공자**는 기본 옵션 세트를 제공합니다:

- [Discord 제공자 옵션](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/discord.ts)

자신의 사용 사례에 맞게 옵션을 재정의할 수 있습니다.

## 예시

```javascript
import DiscordProvider from "next-auth/providers/discord";

providers: [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  })
]
```