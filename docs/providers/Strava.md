---
id: strava
---

# 🌐 Strava

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/strava#documentation "Direct link to heading")

[http://developers.strava.com/docs/reference/](http://developers.strava.com/docs/reference/)

## Options[](https://next-auth.js.org/providers/strava#options "Direct link to heading")

The **Strava Provider** comes with a set of default options:

-   [Strava Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/strava.ts)

You can override any of the options to suit your own use case. Ensure the redirect\_uri configuration fits your needs accordingly.

## Example[](https://next-auth.js.org/providers/strava#example "Direct link to heading")

```js
import StravaProvider from "next-auth/providers/strava";
...
providers: [
  StravaProvider({
    clientId: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
  })
]
...
```
