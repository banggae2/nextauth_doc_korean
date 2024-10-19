---
id: slack
---

# 🌐 Slack

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/slack#documentation "Direct link to heading")

[https://api.slack.com/authentication](https://api.slack.com/authentication) [https://api.slack.com/docs/sign-in-with-slack](https://api.slack.com/docs/sign-in-with-slack)

## Configuration[](https://next-auth.js.org/providers/slack#configuration "Direct link to heading")

[https://api.slack.com/apps](https://api.slack.com/apps)

:::danger
Slack requires that the redirect URL of your app uses `https`, even for local development. An easy workaround for this is using a service like [`ngrok`](https://ngrok.com/) that creates a secure tunnel to your app, using `https`. Remember to set the url as `NEXTAUTH_URL` as well.
:::

![](https://nextauth-ko.wsbox.pw/img/ydYKTLD.png)

## Options[](https://next-auth.js.org/providers/slack#options "Direct link to heading")

The **Slack Provider** comes with a set of default options:

-   [Slack Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/slack.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/slack#example "Direct link to heading")

```js
import SlackProvider from "next-auth/providers/slack";
...
providers: [
  SlackProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET
  })
]
...
```
