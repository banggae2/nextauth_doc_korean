---
id: twitch
---

# 🌐 Twitch

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/twitch#documentation "Direct link to heading")

[https://dev.twitch.tv/docs/authentication](https://dev.twitch.tv/docs/authentication)

## Configuration[](https://next-auth.js.org/providers/twitch#configuration "Direct link to heading")

[https://dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps)

Add the following redirect URL into the console `http://<your-next-app-url>/api/auth/callback/twitch`

## Options[](https://next-auth.js.org/providers/twitch#options "Direct link to heading")

The **Twitch Provider** comes with a set of default options:

-   [Twitch Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/twitch.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/twitch#example "Direct link to heading")

```js
import TwitchProvider from "next-auth/providers/twitch";
...
providers: [
  TwitchProvider({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET
  })
]
...
```
